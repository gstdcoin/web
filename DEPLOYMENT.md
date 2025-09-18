# 🚀 GSTD Token Marketing Site - Инструкции по деплою

## Быстрый запуск

### Вариант 1: Автоматический (рекомендуется)
```bash
./quick-start.sh
```
Этот скрипт автоматически установит Docker (если нужно) и запустит проект.

### Вариант 2: Ручной
```bash
# 1. Установка Docker (если не установлен)
./install-docker.sh

# 2. Запуск проекта
./start.sh
```

## Что происходит при запуске

1. **Проверка Docker** - если не установлен, предлагается установка
2. **Создание .env** - из .env.example если не существует
3. **Сборка контейнеров** - Next.js приложение + Caddy
4. **Запуск сервисов** - веб-сервер на портах 80/443

## Доступ к сайту

После успешного запуска сайт будет доступен:
- **Основной домен**: https://gstdtoken.net
- **Alias домен**: https://gstdtoken.com
- **Локально**: http://localhost

## Управление сервисами

```bash
# Просмотр логов
./start.sh logs

# Остановка
./start.sh stop

# Перезапуск
./start.sh restart

# Статус
./start.sh status

# Пересборка
./start.sh build
```

## Настройка перед запуском

### 1. DNS записи
Убедитесь, что DNS записи указывают на ваш сервер:
```
gstdtoken.net    A    YOUR_SERVER_IP
gstdtoken.com    A    YOUR_SERVER_IP
```

### 2. Email для SSL
Отредактируйте `Caddyfile`:
```bash
nano Caddyfile
```
Замените `you@example.com` на ваш реальный email для получения SSL сертификатов.

### 3. Переменные окружения (опционально)
Отредактируйте `.env` файл:
```bash
nano .env
```

## Структура проекта

```
gstdtoken-site/
├── src/                    # Исходный код Next.js
├── public/                 # Статические файлы
├── docker-compose.yml      # Docker конфигурация
├── Caddyfile              # Конфигурация веб-сервера
├── start.sh               # Основной скрипт запуска
├── install-docker.sh      # Установка Docker
├── quick-start.sh         # Быстрый запуск
└── .env.example           # Пример переменных окружения
```

## Требования

- Ubuntu 20.04+ (или другая Linux система)
- Минимум 1GB RAM
- Минимум 2GB свободного места
- Порты 80 и 443 должны быть открыты

## Устранение проблем

### Docker не запускается
```bash
# Проверка статуса
sudo systemctl status docker

# Перезапуск
sudo systemctl restart docker

# Проверка прав
groups $USER
```

### Нет прав доступа к Docker
```bash
# Добавление в группу docker
sudo usermod -aG docker $USER

# Перезаход в систему
newgrp docker
```

### Проблемы с SSL
- Проверьте, что порты 80 и 443 открыты
- Убедитесь, что email в Caddyfile корректный
- Проверьте DNS записи

### Сайт не загружается
```bash
# Проверка логов
./start.sh logs

# Проверка статуса контейнеров
docker ps

# Проверка портов
sudo netstat -tlnp | grep :80
sudo netstat -tlnp | grep :443
```

## Обновление проекта

```bash
# Остановка
./start.sh stop

# Обновление кода (git pull или замена файлов)

# Пересборка и запуск
./start.sh build
```

## Безопасность

- Регулярно обновляйте систему: `sudo apt update && sudo apt upgrade`
- Используйте firewall: `sudo ufw enable`
- Настройте fail2ban для защиты от брутфорса
- Регулярно создавайте бэкапы

## Поддержка

При возникновении проблем:
1. Проверьте логи: `./start.sh logs`
2. Проверьте статус: `./start.sh status`
3. Перезапустите: `./start.sh restart`
4. Пересоберите: `./start.sh build`

---

**GSTD Token Marketing Site** - готов к продакшн использованию! 🚀
