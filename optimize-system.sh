#!/bin/bash

# System optimization script for low-resource VPS (1 CPU, 1GB RAM)
# This script optimizes system performance and memory usage

set -e

echo "🚀 GSTD Token Site - System Optimization"
echo "========================================"

# Function to check if running as root
check_root() {
    if [ "$EUID" -eq 0 ]; then
        echo "❌ Please run this script as regular user, not root"
        exit 1
    fi
}

# Function to apply memory optimizations
optimize_memory() {
    echo "🧠 Optimizing memory settings..."
    
    # Apply optimized kernel parameters
    sudo sysctl vm.swappiness=1
    sudo sysctl vm.vfs_cache_pressure=50
    sudo sysctl vm.dirty_ratio=15
    sudo sysctl vm.dirty_background_ratio=5
    sudo sysctl vm.dirty_expire_centisecs=3000
    sudo sysctl vm.dirty_writeback_centisecs=500
    
    echo "✅ Memory settings optimized"
}

# Function to clean system caches
clean_caches() {
    echo "🧹 Cleaning system caches..."
    
    # Clean package cache
    sudo apt clean
    sudo apt autoremove -y
    
    # Clean Docker cache
    docker system prune -f
    
    # Clean npm cache
    npm cache clean --force
    
    # Clean temporary files
    sudo rm -rf /tmp/*
    sudo rm -rf /var/tmp/*
    
    echo "✅ System caches cleaned"
}

# Function to optimize swap
optimize_swap() {
    echo "💾 Optimizing swap usage..."
    
    # Check current swap usage
    echo "Current swap usage:"
    free -h | grep Swap
    
    # Clear swap if it's heavily used
    SWAP_USED=$(free | grep Swap | awk '{print $3}')
    SWAP_TOTAL=$(free | grep Swap | awk '{print $2}')
    
    if [ "$SWAP_USED" -gt 0 ] && [ "$SWAP_TOTAL" -gt 0 ]; then
        SWAP_PERCENT=$((SWAP_USED * 100 / SWAP_TOTAL))
        echo "Swap usage: ${SWAP_PERCENT}%"
        
        if [ "$SWAP_PERCENT" -gt 50 ]; then
            echo "⚠️  High swap usage detected. Clearing swap..."
            sudo swapoff -a
            sudo swapon -a
            echo "✅ Swap cleared"
        else
            echo "✅ Swap usage is acceptable"
        fi
    fi
}

# Function to optimize disk I/O
optimize_disk() {
    echo "💿 Optimizing disk I/O..."
    
    # Set I/O scheduler to deadline for better performance
    echo deadline | sudo tee /sys/block/sda/queue/scheduler > /dev/null
    
    # Increase read-ahead for better sequential read performance
    sudo blockdev --setra 1024 /dev/sda
    
    echo "✅ Disk I/O optimized"
}

# Function to show system status
show_status() {
    echo "📊 System Status After Optimization:"
    echo "===================================="
    
    echo "💾 Memory Usage:"
    free -h
    
    echo ""
    echo "💿 Disk Usage:"
    df -h /
    
    echo ""
    echo "🔄 Swap Status:"
    swapon --show
    
    echo ""
    echo "⚙️  Current Kernel Parameters:"
    echo "vm.swappiness = $(cat /proc/sys/vm/swappiness)"
    echo "vm.vfs_cache_pressure = $(cat /proc/sys/vm/vfs_cache_pressure)"
    echo "vm.dirty_ratio = $(cat /proc/sys/vm/dirty_ratio)"
    echo "vm.dirty_background_ratio = $(cat /proc/sys/vm/dirty_background_ratio)"
}

# Function to create systemd service for automatic optimization
create_service() {
    echo "🔧 Creating automatic optimization service..."
    
    sudo tee /etc/systemd/system/gstd-optimize.service > /dev/null << 'EOF'
[Unit]
Description=GSTD Token Site System Optimization
After=network.target

[Service]
Type=oneshot
ExecStart=/home/ubuntu/gstdtoken-site/optimize-system.sh --auto
User=ubuntu
Group=ubuntu

[Install]
WantedBy=multi-user.target
EOF

    sudo tee /etc/systemd/system/gstd-optimize.timer > /dev/null << 'EOF'
[Unit]
Description=Run GSTD optimization every 6 hours
Requires=gstd-optimize.service

[Timer]
OnCalendar=*-*-* 00,06,12,18:00:00
Persistent=true

[Install]
WantedBy=timers.target
EOF

    sudo systemctl daemon-reload
    sudo systemctl enable gstd-optimize.timer
    sudo systemctl start gstd-optimize.timer
    
    echo "✅ Automatic optimization service created"
    echo "📅 Optimization will run every 6 hours"
}

# Main execution
main() {
    check_root
    
    if [ "$1" = "--auto" ]; then
        echo "🤖 Running in automatic mode..."
        optimize_memory
        clean_caches
        optimize_swap
        optimize_disk
    elif [ "$1" = "--service" ]; then
        create_service
    else
        echo "🔧 Running full optimization..."
        optimize_memory
        clean_caches
        optimize_swap
        optimize_disk
        show_status
        
        echo ""
        echo "🎉 System optimization completed!"
        echo "💡 To enable automatic optimization, run: $0 --service"
    fi
}

# Run main function with all arguments
main "$@"
