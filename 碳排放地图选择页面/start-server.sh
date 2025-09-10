#!/bin/bash

# Transportation Planner - Local Server
# 启动本地服务器来查看构建后的文件

echo "🚀 Starting Transportation Planner Local Server..."
echo "================================================"

# 检查Python是否安装
if ! command -v python3 &> /dev/null; then
    echo "❌ Python3 is not installed. Please install Python3 first."
    echo "   Visit: https://www.python.org/downloads/"
    exit 1
fi

# 构建项目（如果需要）
if [ ! -d "build" ]; then
    echo "📦 Building project..."
    npm run build
fi

echo "🌐 Starting local server at http://localhost:8080"
echo "   Open your browser and visit: http://localhost:8080"
echo "   Press Ctrl+C to stop the server"
echo ""

# 启动服务器
cd build && python3 -m http.server 8080
