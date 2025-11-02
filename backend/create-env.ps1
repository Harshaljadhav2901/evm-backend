# PowerShell Script to Create .env File
# Run this script: .\create-env.ps1

Write-Host "======================================" -ForegroundColor Cyan
Write-Host "Creating .env File" -ForegroundColor Cyan
Write-Host "======================================" -ForegroundColor Cyan
Write-Host ""

# Get MySQL password from user
$dbPass = Read-Host "Enter your MySQL password (press Enter for empty password)"

# Create .env content
$envContent = @"
DB_HOST=localhost
DB_NAME=db_hementrasane
DB_USER=root
DB_PASS=$dbPass
API_ENV=development
"@

# Save to file
$envContent | Out-File -FilePath ".env" -Encoding utf8 -NoNewline

Write-Host ""
Write-Host "✓ .env file created successfully!" -ForegroundColor Green
Write-Host ""
Write-Host "File contents:" -ForegroundColor Yellow
Get-Content .env
Write-Host ""
Write-Host "You can now start the server with: composer start" -ForegroundColor Cyan


