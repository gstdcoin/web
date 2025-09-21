#!/bin/bash

# Optimized startup script for low-resource VPS (1 CPU, 1GB RAM)
# This script ensures stable operation without memory issues

set -e

echo "🚀 Starting GSTD Token Site (Optimized for 1GB RAM VPS)"

# Set memory limits
export NODE_OPTIONS="--max-old-space-size=256 --max-semi-space-size=64"
export NODE_ENV=production
export NEXT_TELEMETRY_DISABLED=1

# Clean up any existing processes
echo "🧹 Cleaning up existing processes..."
pkill -f "next" || true
pkill -f "node" || true
sleep 2

# Clean cache if needed
if [ "$1" = "--clean" ]; then
    echo "🧹 Cleaning cache..."
    rm -rf .next
    rm -rf node_modules/.cache
fi

# Check if we're using Docker
if command -v docker &> /dev/null; then
    echo "🐳 Starting with Docker Compose..."
    
    # Stop existing containers
    docker compose down || true
    
    # Build and start with resource limits
    docker compose up --build -d
    
    # Wait for services to be healthy
    echo "⏳ Waiting for services to start..."
    sleep 10
    
    # Check if services are running
    if docker compose ps | grep -q "healthy"; then
        echo "✅ Site started with Docker Compose"
        echo "🌐 Available at: https://gstdtoken.net"
        echo "📊 Monitor with: docker compose logs -f"
        echo "🛑 Stop with: docker compose down"
    else
        echo "⚠️  Services started but may not be fully ready yet"
        echo "📊 Check status with: docker compose ps"
    fi
    
else
    echo "📦 Starting with Node.js..."
    
    # Check if build exists
    if [ ! -d ".next" ]; then
        echo "🔨 Building application..."
        npm run build
    fi
    
    # Start the application
    echo "🚀 Starting Next.js server..."
    npm run start:prod &
    
    # Wait a moment and check if it's running
    sleep 5
    if pgrep -f "next start" > /dev/null; then
        echo "✅ Site started successfully"
        echo "🌐 Available at: http://localhost:3000"
        echo "📊 Monitor with: tail -f .next/server.log"
        echo "🛑 Stop with: pkill -f 'next start'"
    else
        echo "❌ Failed to start the application"
        exit 1
    fi
fi

echo "🎉 GSTD Token Site is now running!"
echo "💡 Memory usage optimized for 1GB RAM VPS"
echo "🔧 For troubleshooting, check logs or restart with --clean flag"



