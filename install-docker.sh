#!/bin/bash

# GSTD Token Marketing Site - Docker Installation Script
# Автоматическая установка Docker и Docker Compose на Ubuntu

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

# Проверка прав root
check_root() {
    if [[ $EUID -eq 0 ]]; then
        error "Не запускайте этот скрипт от имени root. Используйте sudo при необходимости."
        exit 1
    fi
}

# Проверка операционной системы
check_os() {
    if [[ ! -f /etc/os-release ]]; then
        error "Не удалось определить операционную систему"
        exit 1
    fi
    
    . /etc/os-release
    
    if [[ "$ID" != "ubuntu" ]]; then
        warning "Этот скрипт предназначен для Ubuntu. Текущая ОС: $ID"
        read -p "Продолжить установку? (y/N): " -n 1 -r
        echo
        if [[ ! $REPLY =~ ^[Yy]$ ]]; then
            exit 1
        fi
    fi
    
    success "Операционная система: $PRETTY_NAME"
}

# Обновление системы
update_system() {
    log "Обновление списка пакетов..."
    sudo apt-get update
    
    log "Установка необходимых пакетов..."
    sudo apt-get install -y \
        apt-transport-https \
        ca-certificates \
        curl \
        gnupg \
        lsb-release \
        software-properties-common
}

# Установка Docker
install_docker() {
    log "Добавление официального GPG ключа Docker..."
    curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg
    
    log "Добавление репозитория Docker..."
    echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
    
    log "Обновление списка пакетов..."
    sudo apt-get update
    
    log "Установка Docker Engine..."
    sudo apt-get install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
    
    success "Docker установлен"
}

# Настройка Docker
setup_docker() {
    log "Добавление пользователя в группу docker..."
    sudo usermod -aG docker $USER
    
    log "Включение и запуск Docker..."
    sudo systemctl enable docker
    sudo systemctl start docker
    
    success "Docker настроен и запущен"
}

# Проверка установки
verify_installation() {
    log "Проверка установки Docker..."
    
    if command -v docker &> /dev/null; then
        success "Docker установлен: $(docker --version)"
    else
        error "Docker не найден"
        return 1
    fi
    
    if docker compose version &> /dev/null; then
        success "Docker Compose установлен: $(docker compose version)"
    else
        error "Docker Compose не найден"
        return 1
    fi
    
    # Проверка прав доступа
    if docker ps &> /dev/null; then
        success "Права доступа к Docker настроены"
    else
        warning "Права доступа к Docker не настроены. Перезайдите в систему или выполните: newgrp docker"
    fi
}

# Основная функция
main() {
    echo "🐳 Установка Docker для GSTD Token Marketing Site"
    echo "================================================"
    echo ""
    
    check_root
    check_os
    
    log "Начинаю установку Docker..."
    echo ""
    
    update_system
    install_docker
    setup_docker
    
    echo ""
    verify_installation
    
    echo ""
    success "🎉 Docker успешно установлен!"
    echo ""
    echo "📋 Следующие шаги:"
    echo "   1. Перезайдите в систему или выполните: newgrp docker"
    echo "   2. Запустите проект: ./start.sh"
    echo ""
    echo "⚠️  Важно:"
    echo "   • Если Docker не работает, перезайдите в систему"
    echo "   • Проверьте настройки в .env файле"
    echo "   • Замените you@example.com в Caddyfile на ваш email"
}

# Запуск
main "$@"
