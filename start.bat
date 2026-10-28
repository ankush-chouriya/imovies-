@echo off
title IMovies Cinema Ticket Booking System
color 0B
echo ==========================================================
echo    IMovies - Cinema Ticket Booking System Launcher
echo ==========================================================
echo.

where node >nul 2>nul
if %errorlevel% neq 0 (
    color 0C
    echo [ERROR] Node.js is not installed or not in PATH!
    echo Please install Node.js from https://nodejs.org/ and rerun this script.
    echo.
    pause
    exit /b 1
)

if not exist "node_modules\" (
    echo [1/2] Installing root and workspace dependencies...
    call npm run install:all
)

echo [2/2] Launching IMovies Development Servers (API + Web UI)...
echo Frontend: http://localhost:5173
echo Backend API: http://localhost:5000/api
echo.
call npm run dev
pause
