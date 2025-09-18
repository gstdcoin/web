# Руководство по настройке SSL для gstdtoken.net

## 🎯 Текущий статус

✅ **Сайт запущен и работает** на HTTP (порт 80)
✅ **Оптимизации применены** - сервер стабилен
✅ **Конфигурации готовы** для разных сценариев
❌ **SSL сертификат** требует настройки DNS

## 📋 Доступные конфигурации

### 1. Testing (текущая)
```bash
./switch-config.sh testing
```
- **URL**: http://localhost
- **SSL**: Нет
- **Назначение**: Локальная разработка и тестирование

### 2. Local
```bash
./switch-config.sh local
```
- **URL**: https://localhost (с самоподписанным сертификатом)
- **SSL**: Самоподписанный сертификат
- **Назначение**: Локальное тестирование HTTPS

### 3. Production (для gstdtoken.net)
```bash
./switch-config.sh production
```
- **URL**: https://gstdtoken.net
- **SSL**: Let's Encrypt сертификат
- **Назначение**: Продакшен с доменом

## 🔧 Настройка SSL для gstdtoken.net

### Шаг 1: Настройка DNS
Убедитесь, что домен `gstdtoken.net` указывает на ваш сервер:
```bash
# Проверить DNS
nslookup gstdtoken.net
dig gstdtoken.net
```

### Шаг 2: Переключение на продакшен конфигурацию
```bash
./switch-config.sh production
docker compose restart caddy
```

### Шаг 3: Проверка SSL сертификата
```bash
# Проверить статус контейнеров
docker compose ps

# Посмотреть логи Caddy
docker compose logs caddy

# Проверить SSL сертификат
curl -I https://gstdtoken.net
```

## 🚨 Возможные проблемы

### 1. DNS не настроен
**Симптом**: Caddy не может получить сертификат
**Решение**: Настроить A-запись для gstdtoken.net

### 2. Файрвол блокирует порты
**Симптом**: ACME challenge не проходит
**Решение**: Открыть порты 80 и 443

### 3. Домен недоступен из интернета
**Симптом**: Let's Encrypt не может проверить домен
**Решение**: Убедиться, что сервер доступен из интернета

## 📊 Мониторинг

### Проверка статуса
```bash
./monitor.sh
```

### Просмотр логов
```bash
# Все логи
docker compose logs -f

# Только Caddy
docker compose logs -f caddy

# Только Web
docker compose logs -f web
```

### Проверка SSL
```bash
# Проверить сертификат
openssl s_client -connect gstdtoken.net:443 -servername gstdtoken.net

# Проверить срок действия
echo | openssl s_client -connect gstdtoken.net:443 2>/dev/null | openssl x509 -noout -dates
```

## 🔄 Команды управления

### Запуск/остановка
```bash
# Запуск
docker compose up -d

# Остановка
docker compose down

# Перезапуск
docker compose restart
```

### Переключение конфигураций
```bash
# Продакшен
./switch-config.sh production
docker compose restart caddy

# Тестирование
./switch-config.sh testing
docker compose restart caddy

# Локальная разработка
./switch-config.sh local
docker compose restart caddy
```

## ✅ Чек-лист для продакшена

- [ ] DNS настроен (A-запись для gstdtoken.net)
- [ ] Порты 80 и 443 открыты
- [ ] Сервер доступен из интернета
- [ ] Конфигурация переключена на production
- [ ] Caddy перезапущен
- [ ] SSL сертификат получен
- [ ] Сайт доступен по https://gstdtoken.net
- [ ] Мониторинг настроен

## 📞 Поддержка

При возникновении проблем:
1. Проверьте логи: `docker compose logs caddy`
2. Проверьте DNS: `nslookup gstdtoken.net`
3. Проверьте доступность: `curl -I https://gstdtoken.net`
4. Запустите мониторинг: `./monitor.sh`

**Дата создания**: 16 сентября 2025
**Версия**: GSTD Token Site v0.1.0
