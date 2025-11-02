# EVM Simulator - PHP Slim API Backend

RESTful API backend for the EVM Simulator application using PHP Slim Framework.

## Setup Instructions

### 1. Install Dependencies

```bash
cd backend
composer install
```

### 2. Database Setup

1. Create MySQL database:
```sql
CREATE DATABASE db_hementrasane;
```

2. Run the schema file:
```bash
mysql -u root -p db_hementrasane < database/schema.sql
```

Or import the `database/schema.sql` file using phpMyAdmin or your MySQL client.

### 3. Configuration

1. Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```

2. Update `.env` with your database credentials:
```
DB_HOST=localhost
DB_NAME=db_hementrasane
DB_USER=your_username
DB_PASS=your_password
```

### 4. Run the Server

#### Development (PHP Built-in Server)
```bash
composer start
```
Server will run at `http://localhost:8000`

#### Production (Apache/Nginx)
- Point your web server document root to `backend/public/`
- Ensure `.htaccess` files are enabled
- Configure virtual host if needed

## API Endpoints

### Health Check
- **GET** `/api/health`
- Returns API status

### Save User Information
- **POST** `/api/users`
- **Body**: 
```json
{
  "userName": "John Doe",
  "contactNumber": "1234567890",
  "villageCity": "Mumbai",
  "district": "Mumbai"
}
```

### Get All Users (Optional)
- **GET** `/api/users`
- Returns list of all registered users

## CORS

CORS is enabled to allow requests from your React frontend. Update CORS settings in `public/index.php` for production.

## Database Schema

Table: `user_info`
- `id` - Auto increment primary key
- `user_name` - VARCHAR(255)
- `contact_number` - VARCHAR(10)
- `village_city` - VARCHAR(255)
- `district` - VARCHAR(255)
- `created_at` - TIMESTAMP
- `updated_at` - TIMESTAMP


