#!/bin/bash

# Transportation Planner - Development Server
# Quick start script for macOS/Linux

echo "🚀 Starting Transportation Planner..."
echo "====================================="

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    echo "   Visit: https://nodejs.org/"
    exit 1
fi

# Install dependencies if needed
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
    if [ $? -ne 0 ]; then
        echo "❌ Failed to install dependencies"
        exit 1
    fi
fi

echo "🌐 Starting development server at http://localhost:3000"
echo "   Press Ctrl+C to stop the server"
echo ""

# Start the development server
npm run dev
