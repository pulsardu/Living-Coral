#!/bin/bash

# Transportation Planner - Local Server
# 启动本地服务器来查看构建后的文件

echo "🚀 Starting Transportation Planner Local Server..."
echo "================================================"

# 检查Node.js是否安装（用于构建）
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    echo "   Visit: https://nodejs.org/"
    exit 1
fi

# 检查Python是否安装
if ! command -v python3 &> /dev/null; then
    echo "❌ Python3 is not installed. Please install Python3 first."
    echo "   Visit: https://www.python.org/downloads/"
    exit 1
fi

# 构建项目
echo "📦 Building project for production..."
npm run build
if [ $? -ne 0 ]; then
    echo "❌ Failed to build project"
    exit 1
fi
echo "✅ Project built successfully into 'build/' directory"
echo ""

# 检查build目录是否存在
if [ ! -d "build" ]; then
    echo "❌ Build directory not found. Please run 'npm run build' first."
    exit 1
fi

echo "🌐 Starting local server at http://localhost:8080"
echo "   Open your browser and visit: http://localhost:8080"
echo "   Press Ctrl+C to stop the server"
echo ""

# 启动服务器
cd build && python3 -m http.server 8080
