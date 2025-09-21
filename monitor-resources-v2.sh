#!/bin/bash

# Enhanced resource monitoring script for GSTD Token Site
# Monitors system resources, application health, and provides alerts

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

# Configuration
MEMORY_THRESHOLD=80  # Memory usage threshold (%)
CPU_THRESHOLD=80     # CPU usage threshold (%)
DISK_THRESHOLD=85    # Disk usage threshold (%)
HEALTH_CHECK_URL="http://localhost:3000/api/health"

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

info() {
    echo -e "${CYAN}[INFO]${NC} $1"
}

# Get system information
get_system_info() {
    echo -e "${GREEN}=== System Information ===${NC}"
    
    # Memory usage
    MEMORY_INFO=$(free -h)
    echo -e "${BLUE}Memory Usage:${NC}"
    echo "$MEMORY_INFO" | grep -E "(Mem|Swap)"
    
    # CPU usage
    CPU_USAGE=$(top -bn1 | grep "Cpu(s)" | awk '{print $2}' | sed 's/%us,//')
    echo -e "${BLUE}CPU Usage:${NC} ${CPU_USAGE}%"
    
    # Disk usage
    DISK_INFO=$(df -h / | tail -1)
    DISK_USAGE=$(echo $DISK_INFO | awk '{print $5}' | sed 's/%//')
    echo -e "${BLUE}Disk Usage:${NC} $DISK_INFO"
    
    # Load average
    LOAD_AVG=$(uptime | awk -F'load average:' '{print $2}')
    echo -e "${BLUE}Load Average:${NC}$LOAD_AVG"
    
    echo ""
}

# Check application health
check_application_health() {
    echo -e "${GREEN}=== Application Health ===${NC}"
    
    # Check if process is running
    if pgrep -f "next" > /dev/null; then
        success "Next.js process is running"
        
        # Get process info
        PROCESS_INFO=$(ps aux | grep -E "(next|node.*server)" | grep -v grep | head -1)
        if [ -n "$PROCESS_INFO" ]; then
            PID=$(echo $PROCESS_INFO | awk '{print $2}')
            CPU=$(echo $PROCESS_INFO | awk '{print $3}')
            MEM=$(echo $PROCESS_INFO | awk '{print $4}')
            echo -e "${BLUE}Process Info:${NC} PID=$PID, CPU=${CPU}%, MEM=${MEM}%"
        fi
    else
        error "Next.js process is not running"
    fi
    
    # Check Docker containers if running
    if command -v docker &> /dev/null && docker compose ps 2>/dev/null | grep -q "gstdtoken"; then
        echo -e "${BLUE}Docker Status:${NC}"
        docker compose ps
    fi
    
    # Health check endpoint
    if curl -f -s "$HEALTH_CHECK_URL" > /dev/null 2>&1; then
        success "Health check endpoint is responding"
    else
        warning "Health check endpoint is not responding"
    fi
    
    echo ""
}

# Check resource thresholds
check_thresholds() {
    echo -e "${GREEN}=== Resource Thresholds ===${NC}"
    
    # Memory threshold check
    MEMORY_USAGE=$(free | awk 'NR==2{printf "%.0f", $3*100/$2}')
    if [ "$MEMORY_USAGE" -gt "$MEMORY_THRESHOLD" ]; then
        warning "High memory usage: ${MEMORY_USAGE}% (threshold: ${MEMORY_THRESHOLD}%)"
    else
        success "Memory usage OK: ${MEMORY_USAGE}%"
    fi
    
    # Disk threshold check
    DISK_USAGE=$(df / | tail -1 | awk '{print $5}' | sed 's/%//')
    if [ "$DISK_USAGE" -gt "$DISK_THRESHOLD" ]; then
        warning "High disk usage: ${DISK_USAGE}% (threshold: ${DISK_THRESHOLD}%)"
    else
        success "Disk usage OK: ${DISK_USAGE}%"
    fi
    
    echo ""
}

# Show network connections
show_network_info() {
    echo -e "${GREEN}=== Network Information ===${NC}"
    
    # Active connections
    CONNECTIONS=$(netstat -tuln | grep -E ":80|:443|:3000" | wc -l)
    echo -e "${BLUE}Active connections on ports 80, 443, 3000:${NC} $CONNECTIONS"
    
    # Show listening ports
    echo -e "${BLUE}Listening ports:${NC}"
    netstat -tuln | grep -E ":80|:443|:3000" | while read line; do
        echo "  $line"
    done
    
    echo ""
}

# Show recent logs
show_recent_logs() {
    echo -e "${GREEN}=== Recent Logs ===${NC}"
    
    # Docker logs if available
    if command -v docker &> /dev/null && docker compose ps 2>/dev/null | grep -q "gstdtoken"; then
        echo -e "${BLUE}Docker logs (last 10 lines):${NC}"
        docker compose logs --tail=10
    fi
    
    # Node.js logs if available
    if [ -f "server.log" ]; then
        echo -e "${BLUE}Node.js logs (last 10 lines):${NC}"
        tail -10 server.log
    fi
    
    echo ""
}

# Performance recommendations
show_recommendations() {
    echo -e "${GREEN}=== Performance Recommendations ===${NC}"
    
    # Memory recommendations
    AVAILABLE_MEM=$(free -m | awk 'NR==2{printf "%.0f", $7}')
    if [ "$AVAILABLE_MEM" -lt 100 ]; then
        warning "Low available memory (${AVAILABLE_MEM}MB). Consider:"
        echo "  - Restarting the application with --clean flag"
        echo "  - Clearing system cache: sudo sync && echo 3 | sudo tee /proc/sys/vm/drop_caches"
        echo "  - Stopping unnecessary services"
    fi
    
    # Disk recommendations
    DISK_USAGE=$(df / | tail -1 | awk '{print $5}' | sed 's/%//')
    if [ "$DISK_USAGE" -gt 80 ]; then
        warning "High disk usage (${DISK_USAGE}%). Consider:"
        echo "  - Cleaning Docker: docker system prune -f"
        echo "  - Removing old logs: sudo journalctl --vacuum-time=7d"
        echo "  - Cleaning npm cache: npm cache clean --force"
    fi
    
    echo ""
}

# Continuous monitoring mode
continuous_monitor() {
    echo -e "${GREEN}Starting continuous monitoring (press Ctrl+C to stop)...${NC}"
    echo ""
    
    while true; do
        clear
        echo -e "${CYAN}=== GSTD Token Site - Resource Monitor ===${NC}"
        echo -e "${BLUE}Last updated: $(date)${NC}"
        echo ""
        
        get_system_info
        check_application_health
        check_thresholds
        
        echo -e "${YELLOW}Press Ctrl+C to stop monitoring${NC}"
        sleep 30
    done
}

# Main execution
main() {
    case "${1:-}" in
        --continuous|-c)
            continuous_monitor
            ;;
        --help|-h)
            echo "Usage: $0 [OPTIONS]"
            echo ""
            echo "Options:"
            echo "  --continuous, -c    Start continuous monitoring mode"
            echo "  --help, -h         Show this help message"
            echo ""
            echo "Examples:"
            echo "  $0                 Show current status"
            echo "  $0 --continuous    Start continuous monitoring"
            exit 0
            ;;
        *)
            echo -e "${CYAN}=== GSTD Token Site - Resource Monitor ===${NC}"
            echo -e "${BLUE}Generated: $(date)${NC}"
            echo ""
            
            get_system_info
            check_application_health
            check_thresholds
            show_network_info
            show_recent_logs
            show_recommendations
            
            echo -e "${GREEN}Monitor completed successfully${NC}"
            ;;
    esac
}

main "$@"
