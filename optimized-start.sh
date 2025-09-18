#!/bin/bash

# Optimized startup script for GSTD Token Site
set -e

echo "🚀 Starting GSTD Token Site with optimizations..."

# Check if swap is available
if [ $(swapon --show | wc -l) -eq 0 ]; then
    echo "⚠️  No swap detected. Running setup-swap.sh..."
    ./setup-swap.sh
fi

# Clean up any existing containers
echo "🧹 Cleaning up existing containers..."
docker compose down --remove-orphans || true

# Remove unused Docker resources
echo "🗑️  Cleaning up unused Docker resources..."
docker system prune -f || true

# Build and start with optimizations
echo "🔨 Building and starting services..."
docker compose up -d --build

# Wait for services to be healthy
echo "⏳ Waiting for services to be healthy..."
timeout=60
counter=0

while [ $counter -lt $timeout ]; do
    if docker compose ps | grep -q "healthy"; then
        echo "✅ Services are healthy!"
        break
    fi
    echo "Waiting for services... ($counter/$timeout)"
    sleep 2
    counter=$((counter + 2))
done

# Show status
echo "📊 Service status:"
docker compose ps

echo "📈 Resource usage:"
docker stats --no-stream

echo "🌐 Site should be available at:"
echo "   - http://localhost (HTTP)"
echo "   - https://localhost (HTTPS)"
echo "   - https://gstdtoken.net (if DNS configured)"

echo "📝 To view logs: docker compose logs -f"
echo "🛑 To stop: docker compose down"
