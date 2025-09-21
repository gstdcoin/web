#!/bin/bash

# Resource monitoring script for low-resource VPS
# Helps track memory and CPU usage

echo "📊 GSTD Token Site - Resource Monitor"
echo "======================================"

# Function to get memory usage
get_memory_usage() {
    echo "💾 Memory Usage:"
    free -h
    echo ""
    
    # Check if Docker is running
    if command -v docker &> /dev/null && docker ps &> /dev/null; then
        echo "🐳 Docker Container Memory:"
        docker stats --no-stream --format "table {{.Container}}\t{{.CPUPerc}}\t{{.MemUsage}}\t{{.MemPerc}}" | grep -E "(gstd|web|caddy)" || echo "No containers found"
        echo ""
    fi
    
    # Check Node.js processes
    if pgrep -f "node" > /dev/null; then
        echo "📦 Node.js Processes:"
        ps aux | grep -E "(node|next)" | grep -v grep | awk '{print $2, $3, $4, $11}' | column -t
        echo ""
    fi
}

# Function to get disk usage
get_disk_usage() {
    echo "💿 Disk Usage:"
    df -h | grep -E "(Filesystem|/dev/)"
    echo ""
    
    echo "📁 Project Directory Size:"
    du -sh . 2>/dev/null || echo "Cannot access directory"
    echo ""
}

# Function to get network connections
get_network_info() {
    echo "🌐 Network Connections:"
    netstat -tlnp 2>/dev/null | grep -E ":3000|:80|:443" || echo "No active connections found"
    echo ""
}

# Function to check application health
check_health() {
    echo "🏥 Application Health:"
    
    # Check if port 3000 is listening
    if netstat -tlnp 2>/dev/null | grep -q ":3000"; then
        echo "✅ Port 3000 is listening"
        
        # Try to make a health check request
        if command -v curl &> /dev/null; then
            if curl -s -f http://localhost:3000/api/health > /dev/null; then
                echo "✅ Health endpoint responding"
            else
                echo "⚠️  Health endpoint not responding"
            fi
        fi
    else
        echo "❌ Port 3000 is not listening"
    fi
    echo ""
}

# Main monitoring function
monitor() {
    clear
    echo "📊 GSTD Token Site - Resource Monitor ($(date))"
    echo "================================================"
    
    get_memory_usage
    get_disk_usage
    get_network_info
    check_health
    
    echo "🔄 Refreshing in 10 seconds... (Ctrl+C to exit)"
}

# Check if running in watch mode
if [ "$1" = "--watch" ]; then
    while true; do
        monitor
        sleep 10
    done
else
    monitor
fi



