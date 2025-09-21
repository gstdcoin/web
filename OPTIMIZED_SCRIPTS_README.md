# Оптимизированные скрипты запуска GSTD Token Site

## 🚀 Обзор

Созданы оптимизированные скрипты для запуска и мониторинга GSTD Token Site на низкопроизводительных VPS (1 CPU, 1GB RAM).

## 📁 Файлы

### 1. `start-optimized-v2.sh` - Основной скрипт запуска
- **Назначение**: Автоматический запуск проекта с оптимизацией ресурсов
- **Особенности**:
  - Проверка системных ресурсов
  - Очистка процессов и кэша
  - Автоматическое создание .env.production
  - Приоритет Docker, fallback на Node.js
  - Цветной вывод и логирование
  - Health check после запуска

### 2. `monitor-resources-v2.sh` - Мониторинг ресурсов
- **Назначение**: Мониторинг состояния системы и приложения
- **Особенности**:
  - Информация о памяти, CPU, диске
  - Статус Docker контейнеров
  - Проверка портов и соединений
  - Рекомендации по оптимизации
  - Режим непрерывного мониторинга

### 3. `.env.production` - Переменные окружения
- **Назначение**: Конфигурация для продакшн среды
- **Содержит**: URL сайта, социальные ссылки, контракт токена, оптимизации Node.js

## 🛠 Использование

### Запуск проекта
```bash
# Обычный запуск
./start-optimized-v2.sh

# Запуск с очисткой кэша
./start-optimized-v2.sh --clean

# Справка
./start-optimized-v2.sh --help
```

### Мониторинг
```bash
# Разовый мониторинг
./monitor-resources-v2.sh

# Непрерывный мониторинг
./monitor-resources-v2.sh --continuous

# Справка
./monitor-resources-v2.sh --help
```

## 📊 Статус после запуска

### ✅ Успешно запущено:
- **Docker контейнеры**: web (Next.js) и caddy (прокси/SSL)
- **Порты**: 80 (HTTP), 443 (HTTPS)
- **Домен**: https://gstdtoken.net
- **Ресурсы**: Оптимизированы для 1GB RAM

### 📈 Текущие показатели:
- **Память**: 58% использования (420MB доступно)
- **Диск**: 47% использования
- **CPU**: Низкая нагрузка
- **Статус контейнеров**: Healthy

## 🔧 Управление

### Остановка
```bash
docker compose down
```

### Перезапуск
```bash
./start-optimized-v2.sh --clean
```

### Просмотр логов
```bash
docker compose logs -f
```

### Проверка статуса
```bash
docker compose ps
```

## 🎯 Оптимизации

### Память
- Node.js: `--max-old-space-size=256 --max-semi-space-size=64`
- Docker: лимиты 400MB для web, 100MB для caddy
- Next.js: standalone output, memory-based workers

### Производительность
- Сжатие: zstd, gzip
- Кэширование: статические файлы
- Минификация: SWC
- Оптимизация пакетов: tree-shaking

### Безопасность
- Non-root пользователь в контейнере
- Read-only файловая система
- Security headers через Caddy
- TLS автоматически

## 🚨 Устранение неполадок

### Если не запускается:
1. Проверить доступную память: `free -h`
2. Очистить кэш: `./start-optimized-v2.sh --clean`
3. Проверить логи: `docker compose logs`

### Если медленно работает:
1. Запустить мониторинг: `./monitor-resources-v2.sh --continuous`
2. Проверить рекомендации в выводе
3. Очистить Docker: `docker system prune -f`

### Если не отвечает:
1. Проверить статус: `docker compose ps`
2. Проверить порты: `ss -tuln | grep -E ":80|:443"`
3. Перезапустить: `docker compose restart`

## 📝 Логи и мониторинг

### Логи Docker
```bash
# Все сервисы
docker compose logs -f

# Только web
docker compose logs -f web

# Только caddy
docker compose logs -f caddy
```

### Мониторинг ресурсов
```bash
# Разовый отчет
./monitor-resources-v2.sh

# Непрерывный мониторинг (Ctrl+C для остановки)
./monitor-resources-v2.sh --continuous
```

## 🔄 Обновление

Для обновления проекта:
1. Остановить: `docker compose down`
2. Обновить код
3. Запустить: `./start-optimized-v2.sh --clean`

## 📞 Поддержка

При проблемах проверьте:
1. Доступную память (минимум 200MB)
2. Свободное место на диске (минимум 1GB)
3. Статус Docker: `docker --version`
4. Логи: `docker compose logs`

---

**Версия**: 2.0  
**Дата**: 2025-09-21  
**Оптимизировано для**: 1 CPU, 1GB RAM VPS
