Write-Host "==========================================================" -ForegroundColor Cyan
Write-Host "   IMOVIES - Cinema Ticket Booking System Setup Script" -ForegroundColor Yellow
Write-Host "==========================================================" -ForegroundColor Cyan

# 1. Check Node.js
Write-Host "[1/4] Checking Node.js installation..." -ForegroundColor White
$nodeCmd = Get-Command node -ErrorAction SilentlyContinue
if (-not $nodeCmd) {
    Write-Host "❌ Node.js is not found in your PATH." -ForegroundColor Red
    Write-Host "Please download and install Node.js 20+ LTS from: https://nodejs.org/" -ForegroundColor Yellow
    Write-Host "After installing Node.js, restart your PowerShell terminal." -ForegroundColor Yellow
    exit 1
}
$nodeVersion = & node -v
Write-Host "✅ Found Node.js version: $nodeVersion" -ForegroundColor Green

# 2. Check npm
Write-Host "[2/4] Checking npm..." -ForegroundColor White
$npmVersion = & npm -v
Write-Host "✅ Found npm version: $npmVersion" -ForegroundColor Green

# 3. Install Dependencies
Write-Host "[3/4] Installing all dependencies (Root, Server, Client)..." -ForegroundColor White
npm run install:all

# 4. Prompt to Seed Database
Write-Host "[4/4] Do you want to initialize/seed the database now? (y/n)" -ForegroundColor Yellow
$response = Read-Host
if ($response -eq 'y' -or $response -eq 'Y') {
    Write-Host "Seeding database with movies, cinemas, schedules, and test accounts..." -ForegroundColor Cyan
    npm run seed
}

Write-Host "==========================================================" -ForegroundColor Cyan
Write-Host "🎉 Setup Complete! To start the app, run:" -ForegroundColor Green
Write-Host "   npm run dev" -ForegroundColor Yellow
Write-Host "Frontend: http://localhost:5173" -ForegroundColor White
Write-Host "Backend:  http://localhost:5000/api" -ForegroundColor White
Write-Host "==========================================================" -ForegroundColor Cyan
