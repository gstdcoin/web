# Инструкции для загрузки проекта в GitHub

## 🚀 Статус проекта

Проект полностью оптимизирован и готов к загрузке в репозиторий https://github.com/gstdcoin/web

### ✅ Выполненные изменения:
- **33 файла изменено**: 878 добавлений, 1961 удалений
- **Оптимизация для 1GB RAM VPS**
- **Изменен URL**: `/investors` → `/advantages`
- **Обновлен логотип** на всех страницах
- **Исправлена мобильная версия**
- **Очищены неиспользуемые файлы**

## 📋 Команды для загрузки

### Вариант 1: Через Git (рекомендуется)

```bash
# 1. Перейти в папку проекта
cd /home/ubuntu/gstdtoken-site

# 2. Проверить статус
git status

# 3. Настроить аутентификацию (выберите один способ):

# Способ A: SSH ключ
git remote set-url origin git@github.com:gstdcoin/web.git
ssh-add ~/.ssh/id_rsa  # если ключ есть

# Способ B: Personal Access Token
git remote set-url origin https://github.com/gstdcoin/web.git
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"

# 4. Выполнить принудительную отправку
git push --force-with-lease origin main
```

### Вариант 2: Через веб-интерфейс GitHub

1. **Перейти на**: https://github.com/gstdcoin/web
2. **Нажать**: "Upload files" или "Add file"
3. **Загрузить все файлы** из папки `/home/ubuntu/gstdtoken-site`
4. **Сообщение коммита**:
```
🚀 Complete project optimization and cleanup

✅ Major improvements:
- Optimized for 1GB RAM VPS with memory limits
- Changed /investors to /advantages URL
- Updated logo to use logogstd.png consistently
- Fixed mobile layout issues with back button

🧹 Cleanup:
- Removed 15+ unused files (scripts, docs, components)
- Cleaned Docker cache (1.71GB freed)
- Optimized system settings and swap configuration

⚙️ New features:
- Low-resource VPS optimized configuration
- System monitoring and optimization scripts
- Automatic resource management
- Production environment settings

🔧 Technical changes:
- Updated Next.js config for memory optimization
- Enhanced Docker setup with resource limits
- Improved Caddy configuration
- Added ESLint configuration

📊 Performance:
- Disk usage: 52% → 42% (1.8GB freed)
- Memory usage: 74% → 70% (optimized)
- Swap settings optimized for stability
- Auto-optimization service created
```

## 🔑 Настройка аутентификации

### Personal Access Token (рекомендуется):

1. **Перейти**: https://github.com/settings/tokens
2. **Создать новый токен** с правами:
   - `repo` (полный доступ к репозиториям)
   - `workflow` (обновление GitHub Actions)
3. **Скопировать токен**
4. **Использовать команды**:
```bash
git remote set-url origin https://github.com/gstdcoin/web.git
git push --force-with-lease origin main
# При запросе логина: username = ваш GitHub username
# При запросе пароля: вставить Personal Access Token
```

### SSH ключ:

1. **Создать SSH ключ**:
```bash
ssh-keygen -t rsa -b 4096 -C "your.email@example.com"
```

2. **Добавить ключ в GitHub**:
```bash
cat ~/.ssh/id_rsa.pub
# Скопировать вывод и добавить в https://github.com/settings/keys
```

3. **Проверить соединение**:
```bash
ssh -T git@github.com
```

## 📁 Структура проекта

### Основные файлы:
```
gstdtoken-site/
├── src/                    # Исходный код Next.js
├── public/                 # Статические файлы
├── docker-compose.yml      # Docker конфигурация
├── Dockerfile             # Docker образ
├── next.config.mjs        # Next.js конфигурация
├── package.json           # Зависимости Node.js
├── start-optimized.sh     # Оптимизированный запуск
├── monitor-resources.sh   # Мониторинг ресурсов
├── optimize-system.sh     # Оптимизация системы
└── .env.production        # Переменные окружения
```

### Документация:
- `LOW_RESOURCE_SETUP.md` - инструкции для VPS
- `CLEANUP_REPORT.md` - отчет об очистке
- `DISK_SWAP_OPTIMIZATION_REPORT.md` - отчет об оптимизации

## ✅ Проверка после загрузки

После успешной загрузки проверьте:

1. **Репозиторий обновлен**: https://github.com/gstdcoin/web
2. **Все файлы загружены**
3. **Последний коммит**: `cb727b2 🚀 Complete project optimization and cleanup`
4. **Размер репозитория** уменьшился (удалены неиспользуемые файлы)

## 🚀 Запуск после загрузки

После загрузки на новом сервере:

```bash
# Клонировать репозиторий
git clone https://github.com/gstdcoin/web.git
cd web

# Установить зависимости
npm install

# Запустить оптимизированную версию
./start-optimized.sh
```

## 📞 Поддержка

При проблемах с загрузкой:
1. Проверьте права доступа к репозиторию
2. Убедитесь в правильности аутентификации
3. Используйте веб-интерфейс GitHub как альтернативу
4. Проверьте логи: `git log --oneline -5`
