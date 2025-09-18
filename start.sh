#!/bin/bash

# GSTD Token Marketing Site - Launch Script
# Автоматический запуск проекта с проверками

set -e

# Цвета для вывода
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Функция для вывода сообщений
log() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Проверка наличия Docker
check_docker() {
    if ! command -v docker &> /dev/null; then
        error "Docker не установлен."
        echo ""
        echo "🔧 Автоматическая установка Docker:"
        echo "   Выполните: ./install-docker.sh"
        echo ""
        echo "📖 Или установите вручную:"
        echo "   https://docs.docker.com/engine/install/ubuntu/"
        echo ""
        exit 1
    fi
    
    if ! command -v docker-compose &> /dev/null && ! docker compose version &> /dev/null; then
        error "Docker Compose не установлен."
        echo ""
        echo "🔧 Автоматическая установка Docker:"
        echo "   Выполните: ./install-docker.sh"
        echo ""
        exit 1
    fi
    
    success "Docker и Docker Compose найдены"
}

# Проверка наличия .env файла
check_env() {
    if [ ! -f ".env" ]; then
        warning ".env файл не найден. Создаю из .env.example..."
        cp .env.example .env
        success ".env файл создан из .env.example"
        warning "ВАЖНО: Отредактируйте .env файл с вашими настройками перед запуском!"
    else
        success ".env файл найден"
    fi
}

# Проверка Caddyfile
check_caddyfile() {
    if grep -q "you@example.com" Caddyfile; then
        warning "В Caddyfile используется тестовый email you@example.com"
        warning "Замените его на ваш реальный email для получения SSL сертификатов"
    fi
    success "Caddyfile проверен"
}

# Остановка существующих контейнеров
stop_containers() {
    log "Остановка существующих контейнеров..."
    docker-compose down 2>/dev/null || docker compose down 2>/dev/null || true
    success "Контейнеры остановлены"
}

# Сборка и запуск
build_and_start() {
    log "Сборка и запуск контейнеров..."
    
    # Используем docker compose (новый) или docker-compose (старый)
    if docker compose version &> /dev/null; then
        docker compose up -d --build
    else
        docker-compose up -d --build
    fi
    
    success "Контейнеры запущены"
}

# Проверка статуса
check_status() {
    log "Проверка статуса сервисов..."
    
    # Проверяем web сервис
    if docker ps | grep -q "gstdtoken-site-web"; then
        success "Web сервис запущен"
    else
        error "Web сервис не запущен"
        return 1
    fi
    
    # Проверяем caddy сервис
    if docker ps | grep -q "gstdtoken-site-caddy"; then
        success "Caddy сервис запущен"
    else
        error "Caddy сервис не запущен"
        return 1
    fi
}

# Показать логи
show_logs() {
    log "Показываю логи сервисов..."
    echo ""
    echo "=== Логи Web сервиса ==="
    if docker compose version &> /dev/null; then
        docker compose logs web --tail=20
    else
        docker-compose logs web --tail=20
    fi
    
    echo ""
    echo "=== Логи Caddy сервиса ==="
    if docker compose version &> /dev/null; then
        docker compose logs caddy --tail=20
    else
        docker-compose logs caddy --tail=20
    fi
}

# Показать информацию о доступе
show_access_info() {
    echo ""
    success "🚀 GSTD Token Marketing Site запущен!"
    echo ""
    echo "📱 Доступ к сайту:"
    echo "   • Основной домен: https://gstdtoken.net"
    echo "   • Alias домен: https://gstdtoken.com"
    echo "   • Локальный доступ: http://localhost (порт 80)"
    echo ""
    echo "🔧 Полезные команды:"
    echo "   • Просмотр логов: ./start.sh logs"
    echo "   • Остановка: ./start.sh stop"
    echo "   • Перезапуск: ./start.sh restart"
    echo "   • Статус: ./start.sh status"
    echo ""
    echo "⚠️  Важно:"
    echo "   • Убедитесь, что DNS записи указывают на этот сервер"
    echo "   • Замените you@example.com в Caddyfile на ваш email"
    echo "   • Проверьте настройки в .env файле"
}

# Основная функция
main() {
    echo "🚀 Запуск GSTD Token Marketing Site"
    echo "=================================="
    echo ""
    
    # Проверки
    check_docker
    check_env
    check_caddyfile
    
    # Остановка существующих контейнеров
    stop_containers
    
    # Сборка и запуск
    build_and_start
    
    # Ожидание запуска
    log "Ожидание запуска сервисов..."
    sleep 10
    
    # Проверка статуса
    if check_status; then
        show_access_info
    else
        error "Не удалось запустить все сервисы"
        show_logs
        exit 1
    fi
}

# Обработка аргументов командной строки
case "${1:-}" in
    "logs")
        show_logs
        ;;
    "stop")
        log "Остановка сервисов..."
        if docker compose version &> /dev/null; then
            docker compose down
        else
            docker-compose down
        fi
        success "Сервисы остановлены"
        ;;
    "restart")
        log "Перезапуск сервисов..."
        if docker compose version &> /dev/null; then
            docker compose restart
        else
            docker-compose restart
        fi
        success "Сервисы перезапущены"
        ;;
    "status")
        check_status
        ;;
    "build")
        log "Пересборка и запуск..."
        if docker compose version &> /dev/null; then
            docker compose up -d --build --force-recreate
        else
            docker-compose up -d --build --force-recreate
        fi
        success "Сервисы пересобраны и запущены"
        ;;
    "help"|"-h"|"--help")
        echo "GSTD Token Marketing Site - Скрипт запуска"
        echo ""
        echo "Использование:"
        echo "  ./start.sh          - Запуск проекта"
        echo "  ./start.sh logs     - Показать логи"
        echo "  ./start.sh stop     - Остановить сервисы"
        echo "  ./start.sh restart  - Перезапустить сервисы"
        echo "  ./start.sh status   - Проверить статус"
        echo "  ./start.sh build    - Пересобрать и запустить"
        echo "  ./start.sh help     - Показать эту справку"
        ;;
    "")
        main
        ;;
    *)
        error "Неизвестная команда: $1"
        echo "Используйте './start.sh help' для справки"
        exit 1
        ;;
esac
