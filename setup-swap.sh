#!/bin/bash

# Create swap file to prevent memory issues
echo "Setting up swap file..."

# Check if swap already exists
if [ $(swapon --show | wc -l) -gt 0 ]; then
    echo "Swap already exists:"
    swapon --show
    exit 0
fi

# Create 1GB swap file
sudo fallocate -l 1G /swapfile
sudo chmod 600 /swapfile
sudo mkswap /swapfile
sudo swapon /swapfile

# Make it permanent
echo '/swapfile none swap sw 0 0' | sudo tee -a /etc/fstab

# Optimize swap settings
echo 'vm.swappiness=10' | sudo tee -a /etc/sysctl.conf
echo 'vm.vfs_cache_pressure=50' | sudo tee -a /etc/sysctl.conf

echo "Swap file created successfully!"
echo "Current memory status:"
free -h
