@echo off
REM Test script to verify the build works correctly

echo 🧪 Testing Transportation Planner Build...
echo ========================================

REM Check if build directory exists
if not exist "build" (
    echo ❌ Build directory not found. Building now...
    npm run build
    if %errorlevel% neq 0 (
        echo ❌ Build failed
        pause
        exit /b 1
    )
)

REM Check if required files exist
if not exist "build\index.html" (
    echo ❌ index.html not found in build directory
    pause
    exit /b 1
)

if not exist "build\map_image.PNG" (
    echo ❌ map_image.PNG not found in build directory
    pause
    exit /b 1
)

if not exist "build\img_2452.PNG" (
    echo ❌ img_2452.PNG not found in build directory
    pause
    exit /b 1
)

echo ✅ All required files found in build directory
echo ✅ Build test passed!
echo.
echo You can now run start-server.bat to start the application
pause
