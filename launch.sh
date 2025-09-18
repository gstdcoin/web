#!/bin/bash

# 🚀 GSTD Token Site - Fast Launch Script
# Быстрый запуск с минимальным потреблением ресурсов

set -e

# Цвета для вывода
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

log() { echo -e "${BLUE}[INFO]${NC} $1"; }
success() { echo -e "${GREEN}[SUCCESS]${NC} $1"; }
warning() { echo -e "${YELLOW}[WARNING]${NC} $1"; }
error() { echo -e "${RED}[ERROR]${NC} $1"; }

# Быстрая проверка Docker
check_docker() {
    if ! command -v docker &> /dev/null; then
        error "Docker не установлен. Установите Docker и повторите попытку."
        exit 1
    fi
    
    if ! docker ps &> /dev/null; then
        error "Нет доступа к Docker. Запустите с sudo или добавьте пользователя в группу docker."
        exit 1
    fi
    
    success "Docker готов"
}

# Остановка существующих контейнеров
cleanup() {
    log "Очистка существующих контейнеров..."
    docker compose down --remove-orphans 2>/dev/null || true
    success "Очистка завершена"
}

# Быстрый запуск
launch() {
    log "Запуск GSTD Token Site..."
    
    # Используем продакшн конфигурацию
    cp Caddyfile.production Caddyfile
    
    # Запуск с оптимизациями
    docker compose up -d --build
    
    success "Сервисы запущены"
}

# Проверка здоровья
health_check() {
    log "Проверка здоровья сервисов..."
    
    local max_attempts=30
    local attempt=0
    
    while [ $attempt -lt $max_attempts ]; do
        if docker compose ps | grep -q "healthy"; then
            success "Сервисы здоровы!"
            return 0
        fi
        
        attempt=$((attempt + 1))
        echo -n "."
        sleep 2
    done
    
    echo ""
    warning "Сервисы запускаются медленнее обычного"
    return 0
}

# Показать статус
show_status() {
    echo ""
    success "🌐 GSTD Token Site запущен!"
    echo ""
    echo "📱 Доступ к сайту:"
    echo "   • https://gstdtoken.net (основной домен)"
    echo "   • http://82.115.48.232 (IP адрес)"
    echo ""
    echo "📊 Статус сервисов:"
    docker compose ps --format "table {{.Name}}\t{{.Status}}\t{{.Ports}}"
    echo ""
    echo "💾 Использование ресурсов:"
    docker stats --no-stream --format "table {{.Container}}\t{{.CPUPerc}}\t{{.MemUsage}}"
    echo ""
    echo "🔧 Управление:"
    echo "   • Логи: docker compose logs -f"
    echo "   • Остановка: docker compose down"
    echo "   • Перезапуск: ./launch.sh"
}

# Основная функция
main() {
    echo "🚀 GSTD Token Site - Fast Launch"
    echo "================================"
    echo ""
    
    check_docker
    cleanup
    launch
    health_check
    show_status
}

# Обработка аргументов
case "${1:-}" in
    "stop")
        log "Остановка сервисов..."
        docker compose down
        success "Сервисы остановлены"
        ;;
    "restart")
        log "Перезапуск сервисов..."
        docker compose restart
        success "Сервисы перезапущены"
        ;;
    "status")
        docker compose ps
        ;;
    "logs")
        docker compose logs -f
        ;;
    "help"|"-h"|"--help")
        echo "GSTD Token Site - Fast Launch Script"
        echo ""
        echo "Использование:"
        echo "  ./launch.sh          - Запуск сайта"
        echo "  ./launch.sh stop     - Остановить сервисы"
        echo "  ./launch.sh restart  - Перезапустить сервисы"
        echo "  ./launch.sh status   - Показать статус"
        echo "  ./launch.sh logs     - Показать логи"
        echo "  ./launch.sh help     - Показать справку"
        ;;
    "")
        main
        ;;
    *)
        error "Неизвестная команда: $1"
        echo "Используйте './launch.sh help' для справки"
        exit 1
        ;;
esac
