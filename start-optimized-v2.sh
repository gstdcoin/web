#!/bin/bash

# Optimized startup script for GSTD Token Site
# Optimized for low-resource VPS (1 CPU, 1GB RAM)
# Version 2.0 - Enhanced with better error handling and monitoring

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Logging function
log() {
    echo -e "${BLUE}[$(date +'%Y-%m-%d %H:%M:%S')]${NC} $1"
}

error() {
    echo -e "${RED}[ERROR]${NC} $1" >&2
}

success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

# Check system resources
check_resources() {
    log "Checking system resources..."
    
    # Check available memory
    AVAILABLE_MEM=$(free -m | awk 'NR==2{printf "%.0f", $7}')
    if [ "$AVAILABLE_MEM" -lt 200 ]; then
        warning "Low available memory: ${AVAILABLE_MEM}MB. Consider freeing up memory."
    else
        success "Available memory: ${AVAILABLE_MEM}MB"
    fi
    
    # Check disk space
    DISK_USAGE=$(df -h / | awk 'NR==2 {print $5}' | sed 's/%//')
    if [ "$DISK_USAGE" -gt 80 ]; then
        warning "High disk usage: ${DISK_USAGE}%"
    else
        success "Disk usage: ${DISK_USAGE}%"
    fi
}

# Clean up processes
cleanup_processes() {
    log "Cleaning up existing processes..."
    
    # Kill existing Next.js processes
    pkill -f "next" 2>/dev/null || true
    pkill -f "node.*server.js" 2>/dev/null || true
    
    # Wait for processes to terminate
    sleep 2
    
    # Force kill if still running
    pkill -9 -f "next" 2>/dev/null || true
    pkill -9 -f "node.*server.js" 2>/dev/null || true
    
    success "Process cleanup completed"
}

# Clean cache if requested
clean_cache() {
    if [ "$1" = "--clean" ] || [ "$1" = "-c" ]; then
        log "Cleaning cache and build artifacts..."
        rm -rf .next
        rm -rf node_modules/.cache
        rm -rf out
        success "Cache cleaned"
    fi
}

# Check dependencies
check_dependencies() {
    log "Checking dependencies..."
    
    # Check if package.json exists
    if [ ! -f "package.json" ]; then
        error "package.json not found. Are you in the correct directory?"
        exit 1
    fi
    
    # Check if node_modules exists
    if [ ! -d "node_modules" ]; then
        warning "node_modules not found. Installing dependencies..."
        npm ci --silent --no-audit --no-fund
        success "Dependencies installed"
    fi
    
    # Check if .env.production exists
    if [ ! -f ".env.production" ]; then
        warning ".env.production not found. Creating default configuration..."
        cat > .env.production << 'EOF'
NODE_ENV=production
NEXT_TELEMETRY_DISABLED=1
NEXT_PUBLIC_SITE_URL=https://gstdtoken.com
NEXT_PUBLIC_PLAUSIBLE_DOMAIN=gstdtoken.com
NEXT_PUBLIC_TELEGRAM=https://t.me/goldstandardcoin
NEXT_PUBLIC_TWITTER=https://x.com/gstdtoken
NEXT_PUBLIC_GITHUB=https://github.com/gstdcoin
NEXT_PUBLIC_STONFI=https://app.ston.fi/swap?ft=TON&tt=EQDv6cYW9nNiKjN3Nwl8D6ABjUiH1gYfWVGZhfP7-9tZskTO&amount=1
NEXT_PUBLIC_TON_CONTRACT=EQDv6cYW9nNiKjN3Nwl8D6ABjUiH1gYfWVGZhfP7-9tZskTO
NODE_OPTIONS=--max-old-space-size=256 --max-semi-space-size=64
EOF
        success "Default .env.production created"
    fi
}

# Build application if needed
build_application() {
    if [ ! -d ".next" ]; then
        log "Building application..."
        export NODE_OPTIONS="--max-old-space-size=512"
        npm run build
        success "Application built successfully"
    else
        log "Build already exists, skipping build step"
    fi
}

# Start with Docker
start_docker() {
    log "Starting with Docker Compose..."
    
    # Check if Docker is available
    if ! command -v docker &> /dev/null; then
        error "Docker is not installed or not available"
        return 1
    fi
    
    # Check if docker-compose.yml exists
    if [ ! -f "docker-compose.yml" ]; then
        error "docker-compose.yml not found"
        return 1
    fi
    
    # Stop existing containers
    log "Stopping existing containers..."
    docker compose down 2>/dev/null || true
    
    # Build and start with resource limits
    log "Building and starting containers..."
    docker compose up --build -d --wait
    
    # Check if services are running
    if docker compose ps | grep -q "healthy\|running"; then
        success "Site started with Docker Compose"
        log "🌐 Available at: https://gstdtoken.com"
        log "📊 Monitor with: docker compose logs -f"
        log "🛑 Stop with: docker compose down"
        return 0
    else
        error "Services failed to start properly"
        log "📊 Check status with: docker compose ps"
        log "📊 Check logs with: docker compose logs"
        return 1
    fi
}

# Start with Node.js
start_nodejs() {
    log "Starting with Node.js..."
    
    # Set environment variables
    export NODE_OPTIONS="--max-old-space-size=256 --max-semi-space-size=64"
    export NODE_ENV=production
    export NEXT_TELEMETRY_DISABLED=1
    
    # Start the application
    log "Starting Next.js server..."
    nohup npm run start:prod > server.log 2>&1 &
    SERVER_PID=$!
    
    # Wait and check if it's running
    sleep 5
    if kill -0 $SERVER_PID 2>/dev/null; then
        success "Site started successfully (PID: $SERVER_PID)"
        log "🌐 Available at: http://localhost:3000"
        log "📊 Monitor with: tail -f server.log"
        log "🛑 Stop with: kill $SERVER_PID"
        echo $SERVER_PID > server.pid
        return 0
    else
        error "Failed to start the application"
        log "📊 Check logs with: cat server.log"
        return 1
    fi
}

# Health check
health_check() {
    log "Performing health check..."
    
    # Wait a bit for the service to be ready
    sleep 10
    
    # Try to reach the health endpoint
    if curl -f -s http://localhost:3000/api/health > /dev/null 2>&1; then
        success "Health check passed"
        return 0
    else
        warning "Health check failed - service may still be starting"
        return 1
    fi
}

# Main execution
main() {
    echo -e "${GREEN}🚀 GSTD Token Site - Optimized Startup Script v2.0${NC}"
    echo -e "${BLUE}Optimized for low-resource VPS (1 CPU, 1GB RAM)${NC}"
    echo ""
    
    # Check system resources
    check_resources
    echo ""
    
    # Clean up existing processes
    cleanup_processes
    echo ""
    
    # Clean cache if requested
    clean_cache "$1"
    echo ""
    
    # Check dependencies
    check_dependencies
    echo ""
    
    # Build application if needed
    build_application
    echo ""
    
    # Try Docker first, fallback to Node.js
    if start_docker; then
        echo ""
        success "🎉 GSTD Token Site is now running with Docker!"
    elif start_nodejs; then
        echo ""
        health_check
        echo ""
        success "🎉 GSTD Token Site is now running with Node.js!"
    else
        error "❌ Failed to start the application"
        exit 1
    fi
    
    echo -e "${GREEN}💡 Memory usage optimized for 1GB RAM VPS${NC}"
    echo -e "${BLUE}🔧 For troubleshooting, check logs or restart with --clean flag${NC}"
    echo -e "${YELLOW}📊 Monitor resources with: ./monitor-resources.sh${NC}"
}

# Handle script arguments
case "${1:-}" in
    --help|-h)
        echo "Usage: $0 [OPTIONS]"
        echo ""
        echo "Options:"
        echo "  --clean, -c    Clean cache and build artifacts before starting"
        echo "  --help, -h     Show this help message"
        echo ""
        echo "Examples:"
        echo "  $0             Start the application"
        echo "  $0 --clean     Clean cache and start"
        exit 0
        ;;
    *)
        main "$@"
        ;;
esac
