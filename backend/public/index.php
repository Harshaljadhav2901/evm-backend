<?php
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Slim\Factory\AppFactory;

require __DIR__ . '/../vendor/autoload.php';

// Load environment variables if using .env file
if (file_exists(__DIR__ . '/../.env')) {
    try {
        $dotenv = \Dotenv\Dotenv::createImmutable(__DIR__ . '/../');
        $dotenv->load();
    } catch (\Dotenv\Exception\InvalidFileException $e) {
        // If .env file has syntax errors, show helpful message
        error_log("Error loading .env file: " . $e->getMessage());
        // Continue without .env - will use defaults below
    }
}

// Create App
$app = AppFactory::create();

// Add Error Middleware
$app->addErrorMiddleware(true, true, true);

// CORS Middleware
$app->add(function (Request $request, $handler) {
    $response = $handler->handle($request);
    
    return $response
        ->withHeader('Access-Control-Allow-Origin', '*')
        ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
        ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
});

// Handle OPTIONS requests for CORS
$app->options('/{routes:.+}', function (Request $request, Response $response) {
    return $response;
});

// Parse JSON body
$app->addBodyParsingMiddleware();

// Database configuration
$dbConfig = [
    'host' => $_ENV['DB_HOST'] ?? 'localhost',
    'dbname' => $_ENV['DB_NAME'] ?? 'db_hementrasane',
    'username' => $_ENV['DB_USER'] ?? 'root',
    'password' => $_ENV['DB_PASS'] ?? '',
    'charset' => 'utf8mb4'
];

// Create PDO connection
try {
    $dsn = "mysql:host={$dbConfig['host']};dbname={$dbConfig['dbname']};charset={$dbConfig['charset']}";
    $pdo = new PDO($dsn, $dbConfig['username'], $dbConfig['password'], [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES => false,
    ]);
} catch (PDOException $e) {
    error_log("Database connection failed: " . $e->getMessage());
    die("Database connection failed");
}

// Routes
$app->get('/api/health', function (Request $request, Response $response) {
    $response->getBody()->write(json_encode(['status' => 'ok', 'message' => 'API is running']));
    return $response->withHeader('Content-Type', 'application/json');
});

// Save User Information
$app->post('/api/users', function (Request $request, Response $response) use ($pdo) {
    try {
        $data = $request->getParsedBody();
        
        // Validate required fields
        $requiredFields = ['userName', 'contactNumber', 'villageCity', 'district'];
        foreach ($requiredFields as $field) {
            if (empty($data[$field])) {
                $response->getBody()->write(json_encode([
                    'success' => false,
                    'message' => "Field '$field' is required"
                ]));
                return $response
                    ->withStatus(400)
                    ->withHeader('Content-Type', 'application/json');
            }
        }

        // Validate contact number (should be 10 digits)
        if (!preg_match('/^[0-9]{10}$/', $data['contactNumber'])) {
            $response->getBody()->write(json_encode([
                'success' => false,
                'message' => 'Contact number must be 10 digits'
            ]));
            return $response
                ->withStatus(400)
                ->withHeader('Content-Type', 'application/json');
        }

        // Insert into database
        $stmt = $pdo->prepare("
            INSERT INTO user_info (user_name, contact_number, village_city, district, created_at) 
            VALUES (:user_name, :contact_number, :village_city, :district, NOW())
        ");

        $stmt->execute([
            ':user_name' => trim($data['userName']),
            ':contact_number' => trim($data['contactNumber']),
            ':village_city' => trim($data['villageCity']),
            ':district' => trim($data['district'])
        ]);

        $userId = $pdo->lastInsertId();

        $response->getBody()->write(json_encode([
            'success' => true,
            'message' => 'User information saved successfully',
            'data' => [
                'id' => $userId,
                'userName' => $data['userName'],
                'contactNumber' => $data['contactNumber'],
                'villageCity' => $data['villageCity'],
                'district' => $data['district']
            ]
        ]));

        return $response
            ->withStatus(201)
            ->withHeader('Content-Type', 'application/json');

    } catch (PDOException $e) {
        error_log("Database error: " . $e->getMessage());
        $response->getBody()->write(json_encode([
            'success' => false,
            'message' => 'Failed to save user information',
            'error' => $e->getMessage()
        ]));
        return $response
            ->withStatus(500)
            ->withHeader('Content-Type', 'application/json');
    } catch (Exception $e) {
        error_log("Error: " . $e->getMessage());
        $response->getBody()->write(json_encode([
            'success' => false,
            'message' => 'An error occurred',
            'error' => $e->getMessage()
        ]));
        return $response
            ->withStatus(500)
            ->withHeader('Content-Type', 'application/json');
    }
});

// Get all users (optional - for admin/testing)
$app->get('/api/users', function (Request $request, Response $response) use ($pdo) {
    try {
        $stmt = $pdo->query("SELECT id, user_name, contact_number, village_city, district, created_at FROM user_info ORDER BY created_at DESC");
        $users = $stmt->fetchAll();

        $response->getBody()->write(json_encode([
            'success' => true,
            'data' => $users
        ]));

        return $response->withHeader('Content-Type', 'application/json');
    } catch (PDOException $e) {
        error_log("Database error: " . $e->getMessage());
        $response->getBody()->write(json_encode([
            'success' => false,
            'message' => 'Failed to fetch users',
            'error' => $e->getMessage()
        ]));
        return $response
            ->withStatus(500)
            ->withHeader('Content-Type', 'application/json');
    }
});

$app->run();

