@echo off
REM Transportation Planner - Development Server for Windows
REM Quick start script

echo 🚀 Starting Transportation Planner...
echo =====================================

REM Check if Node.js is installed
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Node.js is not installed. Please install Node.js first.
    echo    Visit: https://nodejs.org/
    pause
    exit /b 1
)

REM Install dependencies if needed
if not exist "node_modules" (
    echo 📦 Installing dependencies...
    npm install
    if %errorlevel% neq 0 (
        echo ❌ Failed to install dependencies
        pause
        exit /b 1
    )
)

echo 🌐 Starting development server at http://localhost:3000
echo    Press Ctrl+C to stop the server
echo.

REM Start the development server
npm run dev

