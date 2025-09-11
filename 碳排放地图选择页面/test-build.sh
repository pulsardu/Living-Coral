#!/bin/bash

# Test script to verify the build works correctly

echo "🧪 Testing Transportation Planner Build..."
echo "========================================"

# Check if build directory exists
if [ ! -d "build" ]; then
    echo "❌ Build directory not found. Building now..."
    npm run build
    if [ $? -ne 0 ]; then
        echo "❌ Build failed"
        exit 1
    fi
fi

# Check if required files exist
if [ ! -f "build/index.html" ]; then
    echo "❌ index.html not found in build directory"
    exit 1
fi

if [ ! -f "build/map_image.PNG" ]; then
    echo "❌ map_image.PNG not found in build directory"
    exit 1
fi

if [ ! -f "build/img_2452.PNG" ]; then
    echo "❌ img_2452.PNG not found in build directory"
    exit 1
fi

echo "✅ All required files found in build directory"
echo "✅ Build test passed!"
echo ""
echo "You can now run ./start-server.sh to start the application"
