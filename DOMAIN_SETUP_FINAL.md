# 🌐 Настройка домена gstdtoken.net

## ✅ Текущий статус

**Сайт настроен для работы только по домену!**

- **IP адрес сервера**: `82.115.48.232`
- **Статус**: Сайт доступен только по IP адресу
- **Localhost**: Заблокирован (403 Forbidden)
- **Логотип**: PNG логотип обновлен и работает
- **Безопасность**: Настроена защита от доступа по localhost

## 🔧 Настройка DNS для активации домена

### 1. DNS записи
Создайте следующие A-записи в DNS настройках домена:

```
gstdtoken.net    A    82.115.48.232
gstdtoken.com    A    82.115.48.232
www.gstdtoken.net A   82.115.48.232
www.gstdtoken.com A   82.115.48.232
```

### 2. Активация домена
После настройки DNS выполните:

```bash
# Переключение на продакшн конфигурацию с SSL
cp Caddyfile.production Caddyfile
docker compose restart caddy
```

### 3. Проверка работы
```bash
# Проверка HTTP (должен перенаправлять на HTTPS)
curl -I http://gstdtoken.net

# Проверка HTTPS
curl -I https://gstdtoken.net

# Проверка SSL сертификата
openssl s_client -connect gstdtoken.net:443 -servername gstdtoken.net
```

## 🚫 Текущие ограничения безопасности

- **Localhost заблокирован**: `curl http://localhost` → 403 Forbidden
- **Доступ только по IP**: Сайт работает только по `82.115.48.232`
- **Защита от случайного доступа**: Все остальные запросы блокируются

## 📊 Мониторинг

```bash
# Статус контейнеров
docker compose ps

# Логи Caddy
docker compose logs -f caddy

# Логи веб-приложения
docker compose logs -f web

# Использование ресурсов
docker stats --no-stream
```

## 🔄 Управление конфигурациями

### Текущая конфигурация (IP-only)
```bash
# Файл: Caddyfile
# Доступ: только по 82.115.48.232
# Localhost: заблокирован
```

### Продакшн конфигурация (с SSL)
```bash
# Файл: Caddyfile.production
# Доступ: gstdtoken.net, gstdtoken.com
# SSL: Let's Encrypt сертификат
```

### Переключение конфигураций
```bash
# На продакшн (после настройки DNS)
cp Caddyfile.production Caddyfile
docker compose restart caddy

# На IP-only (для отладки)
cp Caddyfile.ip-only Caddyfile
docker compose restart caddy
```

## 🎯 Ожидаемый результат

После настройки DNS сайт будет доступен по адресам:
- **https://gstdtoken.net** (основной домен)
- **https://gstdtoken.com** (алиас домен)
- **https://www.gstdtoken.net** (с www)
- **https://www.gstdtoken.com** (с www)

## 🆘 Устранение проблем

### DNS не настроен
- Проверьте A-записи: `nslookup gstdtoken.net`
- Убедитесь, что IP адрес правильный: `82.115.48.232`

### SSL сертификат не получается
- Проверьте логи: `docker compose logs caddy`
- Убедитесь, что порты 80 и 443 открыты
- Проверьте, что домен доступен из интернета

### Сайт не загружается
- Проверьте статус: `docker compose ps`
- Проверьте логи: `docker compose logs web`
- Перезапустите: `docker compose restart`

## 📝 Важные файлы

- **Caddyfile** - текущая конфигурация (IP-only)
- **Caddyfile.production** - продакшн конфигурация (с SSL)
- **Caddyfile.ip-only** - резервная IP-only конфигурация
- **public/logogstd.png** - PNG логотип
- **docker-compose.yml** - настройки Docker

---

**Дата создания**: 17 сентября 2025  
**IP сервера**: 82.115.48.232  
**Статус**: Готов к работе после настройки DNS  
**Безопасность**: Localhost заблокирован ✅

