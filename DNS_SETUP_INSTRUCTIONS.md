# 🌐 Настройка DNS для gstdtoken.net

## ✅ Текущий статус

**Сайт успешно развернут и работает!**

- **IP адрес сервера**: `82.115.48.232`
- **Статус**: Сайт доступен по HTTP
- **Логотип**: Обновлен с новым дизайном рукопожатия
- **Продакшн сборка**: Готова и работает

## 🔧 Настройка DNS

Для того чтобы сайт работал по адресу **https://gstdtoken.net**, необходимо настроить DNS записи:

### 1. A-записи
Создайте следующие A-записи в DNS настройках домена:

```
gstdtoken.net    A    82.115.48.232
gstdtoken.com    A    82.115.48.232
www.gstdtoken.net A   82.115.48.232
www.gstdtoken.com A   82.115.48.232
```

### 2. CNAME записи (опционально)
```
*.gstdtoken.net  CNAME gstdtoken.net
*.gstdtoken.com  CNAME gstdtoken.com
```

## 🚀 Активация HTTPS

После настройки DNS выполните следующие команды:

```bash
# 1. Переключение на продакшн конфигурацию
./switch-config.sh production

# 2. Перезапуск Caddy для получения SSL сертификата
docker compose restart caddy

# 3. Проверка статуса
docker compose ps
docker compose logs caddy
```

## 📊 Проверка работы

После настройки DNS и активации HTTPS:

```bash
# Проверка HTTP (должен перенаправлять на HTTPS)
curl -I http://gstdtoken.net

# Проверка HTTPS
curl -I https://gstdtoken.net

# Проверка SSL сертификата
openssl s_client -connect gstdtoken.net:443 -servername gstdtoken.net
```

## 🎯 Ожидаемый результат

После настройки DNS сайт будет доступен по адресам:
- **https://gstdtoken.net** (основной домен)
- **https://gstdtoken.com** (алиас домен)
- **https://www.gstdtoken.net** (с www)
- **https://www.gstdtoken.com** (с www)

## 🔍 Мониторинг

Для мониторинга работы сайта:

```bash
# Просмотр логов
docker compose logs -f

# Статус контейнеров
docker compose ps

# Проверка здоровья
curl http://localhost/api/health
```

## 📝 Важные файлы

- **Caddyfile.production** - конфигурация для продакшна
- **docker-compose.yml** - настройки Docker
- **Dockerfile** - образ приложения
- **public/logo-gstd.svg** - новый логотип
- **public/logo-icon.svg** - иконка логотипа
- **public/favicon.svg** - favicon

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

---

**Дата создания**: 17 сентября 2025  
**IP сервера**: 82.115.48.232  
**Статус**: Готов к работе после настройки DNS
