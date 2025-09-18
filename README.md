# GSTD Token Marketing Site

Продакшн-готовый маркетинговый сайт для GSTD токена с золото/черной темой в стиле тестнета.

## 🚀 Особенности

- **Next.js 14** с App Router и TypeScript
- **Золотая тема** в стиле тестнета (золото/черный)
- **Интернационализация** (EN/RU) с next-intl (EN по умолчанию)
- **Адаптивный дизайн** с Tailwind CSS и shadcn/ui
- **SEO оптимизация** с метаданными, sitemap, robots.txt
- **Docker деплой** с Caddy для HTTPS
- **Аналитика** Plausible
- **Домены**: gstdtoken.net (основной) + gstdtoken.com (alias)

## 📁 Структура проекта

```
/
├── src/
│   ├── app/
│   │   ├── [locale]/          # Интернационализированные страницы
│   │   │   ├── page.tsx       # Главная
│   │   │   ├── about/page.tsx # О проекте
│   │   │   ├── token/page.tsx # Токен
│   │   │   ├── buy/page.tsx   # Как купить
│   │   │   ├── roadmap/page.tsx # Дорожная карта
│   │   │   └── legal/page.tsx # Правовая информация
│   │   ├── api/health/        # Health check API
│   │   ├── sitemap.ts         # Sitemap генератор
│   │   ├── robots.ts          # Robots.txt
│   │   └── layout.tsx         # Основной layout
│   ├── components/
│   │   ├── ui/                # shadcn/ui компоненты
│   │   ├── Navbar.tsx         # Навигация
│   │   ├── Footer.tsx         # Футер
│   │   ├── Hero.tsx           # Главная секция
│   │   ├── FeatureCards.tsx   # Карточки функций
│   │   ├── TokenCard.tsx      # Карточка токена
│   │   ├── HowToSteps.tsx     # Шаги покупки
│   │   ├── CTA.tsx            # Призыв к действию
│   │   ├── SocialLinks.tsx    # Социальные ссылки
│   │   └── LanguageSwitcher.tsx # Переключатель языка
│   ├── content/
│   │   ├── config.ts          # Центральный конфиг
│   │   ├── roadmap.ts         # Данные дорожной карты
│   │   ├── copy.en.ts         # Английские тексты
│   │   └── copy.ru.ts         # Русские тексты
│   └── lib/
│       ├── i18n.ts            # Интернационализация
│       ├── seo.ts             # SEO метаданные
│       └── utils.ts           # Утилиты
├── public/                    # Статические файлы
├── Dockerfile                 # Docker образ
├── docker-compose.yml         # Docker Compose
├── Caddyfile                  # Caddy конфигурация
└── .env.example              # Переменные окружения
```

## 🎨 Дизайн-система

### Цвета
- **Фон**: #0B0B0F (почти черный)
- **Текст**: #F5F7FA
- **Золото**: #F7D774 (основной), #EBCB67, #C9A33A, #9F7C22
- **Акценты**: шкала slate для нейтральных поверхностей

### Градиенты
- Мягкое золотое свечение: `linear-gradient(135deg, rgba(247,215,116,.2), rgba(201,163,58,.05))`

### Типографика
- **Текст**: Inter
- **Заголовки**: Playfair Display

### Компоненты
- **Карточки**: rounded-2xl, мягкая тень, золотая рамка 1px с 10–15% прозрачностью

## 🛠 Установка и запуск

### Локальная разработка

```bash
# Клонировать репозиторий
git clone <repository-url>
cd gstdtoken-site

# Установить зависимости
npm install

# Запустить в режиме разработки
npm run dev
```

### Продакшн деплой

```bash
# Собрать проект
npm run build

# Запустить продакшн сервер
npm start
```

### Docker деплой

```bash
# Создать .env файл из .env.example
cp .env.example .env

# Запустить с Docker Compose
docker compose up -d --build
```

## �� Домены и SSL

Сайт настроен на два домена:
- **Основной**: https://gstdtoken.net
- **Alias**: https://gstdtoken.com

Caddy автоматически:
- Перенаправляет HTTP → HTTPS
- Устанавливает SSL сертификаты
- Добавляет security headers
- Кэширует статические файлы

## 📱 Функциональность

### Страницы
- **Главная**: Hero секция, функции, токен, CTA
- **О проекте**: Миссия, что строим, золотое обеспечение, как работает, безопасность, валидаторы
- **Токен**: Информация о токене, контракт, утилити
- **Как купить**: Пошаговая инструкция, биржи, безопасность
- **Дорожная карта**: Этапы развития с Multichain, Validators, Gold Reserve
- **Правовая информация**: Дисклеймеры, риски, комплаенс

### Компоненты
- **Навигация**: Адаптивное меню с переключателем языка
- **Hero**: Анимированная главная секция
- **Карточки**: Информация о функциях и токене
- **Шаги**: Пошаговые инструкции
- **CTA**: Призывы к действию
- **Футер**: Ссылки и социальные сети

### Интернационализация
- **Языки**: Английский (по умолчанию), Русский
- **Сохранение**: Выбор языка сохраняется в localStorage
- **URL**: Поддержка локализованных URL (/ru/, /en/)
- **Правила**: В EN нет запятой перед "and", в RU термины на английском

## 🔧 Конфигурация

### Переменные окружения (.env)

```env
NEXT_PUBLIC_SITE_URL=https://gstdtoken.net
NEXT_PUBLIC_PLAUSIBLE_DOMAIN=gstdtoken.net
NEXT_PUBLIC_TELEGRAM=https://t.me/goldstandardcoin
NEXT_PUBLIC_TWITTER=https://x.com/gstdtoken
NEXT_PUBLIC_GITHUB=https://github.com/gstdcoin
NEXT_PUBLIC_STONFI=https://app.ston.fi/swap?ft=TON&tt=EQDv6cYW9nNiKjN3Nwl8D6ABjUiH1gYfWVGZhfP7-9tZskTO&amount=1
NEXT_PUBLIC_TON_CONTRACT=EQDv6cYW9nNiKjN3Nwl8D6ABjUiH1gYfWVGZhfP7-9tZskTO
```

### Контент (src/content/config.ts)

Все ссылки и адреса настраиваются в центральном конфиге без изменения кода.

## 📊 SEO и аналитика

### SEO
- **Метаданные**: Title, description, OG, Twitter cards
- **Sitemap**: Автоматическая генерация из конфига
- **Robots.txt**: Настроен для поисковых систем
- **JSON-LD**: Структурированные данные
- **Canonical URLs**: Правильные канонические ссылки

### Аналитика
- **Plausible**: Легкая аналитика без cookies
- **Настраивается** через переменные окружения

## 🚀 Критерии приёмки

- ✅ Lighthouse ≥ 90 (Performance/Accessibility/Best Practices/SEO)
- ✅ Адаптив 360px → 1440px+, TTI < 2.5s
- ✅ Переключатель EN/RU сохраняется
- ✅ Кнопки ведут на правильные ссылки
- ✅ Страница Token показывает адрес контракта с копированием
- ✅ sitemap.xml, robots.txt генерируются
- ✅ OG/Twitter карты рендерятся корректно
- ✅ docker-compose up -d поднимает сайт на https://gstdtoken.net
- ✅ EN по умолчанию, RU дополнительный
- ✅ В EN нет запятой перед "and"
- ✅ Roadmap включает Solana, XRPL, Validators, Gold Reserve

## 📝 Команды

```bash
# Разработка
npm run dev          # Запуск dev сервера
npm run build        # Сборка проекта
npm run start        # Запуск продакшн сервера
npm run lint         # Линтинг
npm run type-check   # Проверка типов

# Docker
docker compose up -d --build  # Запуск в Docker
docker compose down           # Остановка
docker compose logs -f        # Логи
```

## 🔄 Миграция домена

Для переключения с gstdtoken.net на gstdtoken.com:

1. Обновить DNS записи
2. Изменить SITE.url в src/content/config.ts
3. Обновить Caddyfile (уже настроен для обоих доменов)
4. Перезапустить: `docker compose restart caddy`

## 📞 Поддержка

- **Telegram**: @goldstandardcoin
- **Twitter**: @gstdtoken
- **GitHub**: @gstdcoin
- **Документация**: https://docs.gstdtoken.com
