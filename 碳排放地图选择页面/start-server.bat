@echo off
REM Transportation Planner - Local Server for Windows
REM 启动本地服务器来查看构建后的文件

echo 🚀 Starting Transportation Planner Local Server...
echo ================================================

REM 检查Python是否安装
python --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Python is not installed. Please install Python first.
    echo    Visit: https://www.python.org/downloads/
    pause
    exit /b 1
)

REM 构建项目（如果需要）
if not exist "build" (
    echo 📦 Building project...
    npm run build
)

echo 🌐 Starting local server at http://localhost:8080
echo    Open your browser and visit: http://localhost:8080
echo    Press Ctrl+C to stop the server
echo.

REM 启动服务器
cd build && python -m http.server 8080
