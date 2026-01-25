# Полный Отчет по Дизайну и Наполнению gstdtoken.com
## Дата: 2026-01-25

---

## 📋 СОДЕРЖАНИЕ

1. [Файлы Глобальных Стилей](#1-файлы-глобальных-стилей)
2. [Структура и Контент](#2-структура-и-контент)
3. [Основной Навигатор](#3-основной-навигатор)
4. [Компоненты Главной Страницы](#4-компоненты-главной-страницы)
5. [Анализ Проблем](#5-анализ-проблем)
6. [Рекомендации по Исправлению](#6-рекомендации-по-исправлению)

---

## 1. ФАЙЛЫ ГЛОБАЛЬНЫХ СТИЛЕЙ

### 1.1. `tailwind.config.ts`

**Текущее состояние:**

```typescript
// Institutional colors
gold: {
  50: '#fffbeb',
  100: '#fef3c7',
  200: '#fde68a',
  300: '#fcd34d',
  400: '#fbbf24',
  500: '#f59e0b',
  600: '#d97706',  // ⚠️ ПРОБЛЕМА: Слишком яркий для темного фона
  700: '#b45309',
  800: '#92400e',
  900: '#78350f',
  champagne: '#F3E5AB', // ✅ Хорошо
},
obsidian: {
  DEFAULT: '#0A0A0A', // ✅ Deep Obsidian
  50: '#1a1a1a',
  100: '#2a2a2a',
  200: '#3a3a3a',
},
antique: {
  white: '#FAEBD7', // ✅ Antique White для текста
},
```

**Проблемы:**
- `gold-600: '#d97706'` — слишком яркий оранжево-желтый, не подходит для темного фона
- Стандартные оттенки gold (50-900) не используются, но занимают место

**Типографика:**
```typescript
fontSize: {
  'base': ['0.9375rem', { lineHeight: '1.6', letterSpacing: '-0.01em' }], // 15px ✅
  'lg': ['1rem', { lineHeight: '1.6', letterSpacing: '-0.02em' }], // ✅
  // ... остальные с letter-spacing: -0.02em ✅
}
```
✅ Хорошо настроено для институционального стиля

**Container:**
```typescript
container: {
  screens: {
    "2xl": "1440px", // ✅ Максимальная ширина для больших мониторов
  },
}
```
✅ Правильно настроено

---

### 1.2. `src/app/globals.css`

**Текущее состояние:**

**Glassmorphism:**
```css
.glass-institutional {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(16px);
  border: 1px solid rgba(243, 229, 171, 0.15);
  box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.37);
}
```
✅ Хорошо реализовано

**Gradient Border:**
```css
.border-gradient-gold {
  position: relative;
  background: rgba(10, 10, 10, 0.4);
  backdrop-filter: blur(12px);
  border: 1px solid transparent;
}

.border-gradient-gold::before {
  background: linear-gradient(135deg, rgba(243, 229, 171, 0.3), rgba(243, 229, 171, 0.1));
  /* ... mask для градиентной обводки */
}
```
✅ Отличная реализация градиентной обводки

**Text Gradient:**
```css
.text-gradient-gold {
  background: linear-gradient(135deg, #F3E5AB 0%, #d97706 100%);
  /* ... */
}
```
⚠️ **ПРОБЛЕМА:** Использует `#d97706` (яркий оранжевый) вместо более мягкого оттенка

**Кнопки:**
```css
.btn-gold {
  border-color: #F3E5AB;
  color: #F3E5AB;
  backdrop-filter: blur(8px);
}
.btn-gold:hover {
  background-color: rgba(243, 229, 171, 0.1);
  box-shadow: 0 0 30px rgba(243, 229, 171, 0.3);
}
```
✅ Хорошо настроено

**Мобильная оптимизация:**
```css
@media (max-width: 768px) {
  section {
    padding-top: calc(var(--section-padding, 5rem) * 0.7) !important;
    padding-bottom: calc(var(--section-padding, 5rem) * 0.7) !important;
  }
  .card-mobile-full {
    width: 100%;
    border-radius: 1rem; /* rounded-2xl */
  }
}
```
✅ Правильно реализовано

---

## 2. СТРУКТУРА И КОНТЕНТ

### 2.1. `src/content/copy.ru.ts`

**Анализ контента:**

**✅ Хорошо (DePIN 2.0 позиционирование):**
- `hero.title`: "GSTD: Глобальный суперкомпьютер с золотым обеспечением" ✅
- `hero.badge`: "Wallet-as-Node • Pay-for-Result • Gold Backed" ✅
- `whatWeBuildBullets`: Обновлены на Wallet-as-Node, Escrow 2.0, Real-Time Gold Backing ✅
- `roadmap.description`: "глобальной DePIN-сети вычислений с золотым обеспечением" ✅
- `investors.description`: Начинается с "GSTD — это децентрализованный суперкомпьютер..." ✅

**⚠️ Потенциальные проблемы:**

1. **Строка 33** (`ctaDescription`):
   ```typescript
   ctaDescription: 'Присоединяйтесь к DePIN-платформе GSDT. Запустите ноду, станьте поставщиком ликвидности или получите доступ к низкопроцентным займам.'
   ```
   - Упоминает "поставщиком ликвидности" и "займам" — это может размывать фокус на DePIN
   - **Рекомендация:** "Присоединяйтесь к DePIN-платформе GSDT. Запустите воркер через Wallet-as-Node и начните монетизировать мощность вашего устройства."

2. **Строка 51** (`tokenBullets`):
   ```typescript
   tokenBullets: ['Утилита: залог для кредитования и доступ к протоколу']
   ```
   - Начинается с "залог для кредитования" — кредитование должно быть второстепенным
   - **Рекомендация:** "Утилита: доля в растущем золотом резерве, доступ к протоколу и кредитная способность"

3. **Строка 135** (`about.buildBullets[1]`):
   ```typescript
   'Gold Accumulation: 70% чистой выручки протокола (Net Protocol Revenue) автоматически конвертируются в физическое золото (XAUT)'
   ```
   - "Gold Accumulation:" на английском
   - **Рекомендация:** "Накопление золота: 70%..."

4. **Строка 137** (`about.buildBullets[3]`):
   ```typescript
   'Low-Interest Lending: Держатели GSDT получают займы...'
   ```
   - Начинается с "Low-Interest Lending" — кредитование не должно быть первым упоминанием
   - **Рекомендация:** "Финансовый слой: Держатели GSDT получают доступ к займам..."

**✅ Отлично реализовано:**
- FAQ содержит 10 вопросов, включая механику Treasury ✅
- Wallet-as-Node flow объясняет связь Worker → Gold → GSDT ✅
- Escrow 2.0 & Treasury детально описаны ✅

---

### 2.2. `src/app/page.tsx`

**Текущая структура:**
```typescript
<Hero />
<CloudComparison />
<WalletAsNode />
<EscrowTreasury />
<UtilityCycle />
<MultichainBridge />
<LiveNetworkStatus />
<FeatureCards />
<TokenCard />
<FAQ />
<CTA />
```

**Анализ порядка:**
✅ Логичная последовательность:
1. Hero (позиционирование)
2. CloudComparison (преимущество)
3. WalletAsNode (как начать)
4. EscrowTreasury (защита)
5. UtilityCycle (три уровня)
6. MultichainBridge (инфраструктура)
7. LiveNetworkStatus (метрики)
8. FeatureCards (ключевые особенности)
9. TokenCard (токен)
10. FAQ (ответы)
11. CTA (призыв)

**Потенциальная оптимизация:**
- Можно переместить `TokenCard` выше (после `UtilityCycle`), чтобы токен был ближе к началу
- Но текущий порядок тоже логичен

---

## 3. ОСНОВНОЙ НАВИГАТОР

### 3.1. `src/components/Navbar.tsx`

**Текущая реализация:**

**✅ Хорошо:**
- Adaptive Glass Header с `isScrolled` ✅
- Champagne Stroke навигация (`text-[#FAEBD7] hover:text-[#F3E5AB]`) ✅
- Bento-Style Mobile Menu (Grid 2 колонки) ✅
- Тонкие обводки при hover (`border-[#F3E5AB]/30`) ✅

**⚠️ Потенциальные улучшения:**

1. **Размер текста навигации:**
   ```typescript
   className="text-xs font-medium ..." // 12px
   ```
   - Может быть слишком мелким на больших экранах
   - **Рекомендация:** `text-sm` (14px) для лучшей читаемости

2. **Контраст на темном фоне:**
   - `text-[#FAEBD7]` (Antique White) на `bg-[#0A0A0A]` — контраст хороший
   - Но можно проверить WCAG AA compliance

3. **Мобильное меню:**
   - Grid 2 колонки — хорошо
   - Но на очень маленьких экранах (320px) может быть тесно
   - **Рекомендация:** Добавить `grid-cols-1` для экранов < 375px

---

## 4. КОМПОНЕНТЫ ГЛАВНОЙ СТРАНИЦЫ

### 4.1. `src/components/Hero.tsx`

**Текущее состояние:**

**✅ Хорошо:**
- Контент слева, анимация справа (desktop) ✅
- Темный фон `from-[#0A0A0A] via-[#1a1a1a] to-[#2a2a2a]` ✅
- Champagne Gold акценты `#F3E5AB` ✅
- Glass-institutional для badge и pills ✅

**⚠️ Потенциальные проблемы:**

1. **Цвет текста подзаголовка:**
   ```typescript
   className="... text-slate-300 ..."
   ```
   - `text-slate-300` может быть недостаточно контрастным на темном фоне
   - **Рекомендация:** `text-slate-200` или `text-[#E5E7EB]` для лучшей читаемости

2. **Feature Pills:**
   - Используют `text-[#F3E5AB]` — хорошо
   - Но могут быть слишком яркими при большом количестве
   - **Рекомендация:** Можно сделать чуть более приглушенными: `text-[#F3E5AB]/90`

---

### 4.2. `src/components/LiveNetworkStatus.tsx`

**Текущее состояние:**

**Bento Grid:**
```typescript
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
  {metricsCards.map((metric, index) => {
    const spanClass = index === 0 || index === 4 ? 'md:col-span-2' : '';
    // ...
  })}
}
```

**✅ Хорошо:**
- Bento Grid реализован ✅
- Некоторые карточки span 2 колонки для визуального интереса ✅
- Glass-institutional стиль ✅

**⚠️ Потенциальные проблемы:**

1. **Мобильная версия:**
   - `grid-cols-1` на мобильных — может быть длинно
   - **Рекомендация:** Добавить горизонтальный скролл для мобильных:
     ```typescript
     <div className="scroll-horizontal md:grid md:grid-cols-2 lg:grid-cols-4">
     ```

2. **Sparkline цвет:**
   ```typescript
   <Sparkline data={...} color="#D4AF37" />
   ```
   - `#D4AF37` — это старый золотой цвет
   - **Рекомендация:** Использовать `#F3E5AB` для консистентности

---

### 4.3. `src/components/FAQ.tsx`

**Текущее состояние:**

**✅ Хорошо:**
- Две колонки на desktop (`md:grid-cols-2`) ✅
- Одна колонка на mobile ✅
- Glass-institutional стиль ✅

**⚠️ Потенциальные проблемы:**

1. **Максимальная ширина:**
   ```typescript
   <div className="grid ... max-w-6xl mx-auto">
   ```
   - `max-w-6xl` (1152px) может быть слишком узким для 1440px контейнера
   - **Рекомендация:** `max-w-7xl` (1280px) для лучшего использования пространства

---

### 4.4. `src/components/FeatureCards.tsx`

**Текущее состояние:**

**✅ Хорошо:**
- Bento Grid (`md:grid-cols-3`) ✅
- Glass-institutional стиль ✅
- Темный фон ✅

**⚠️ Потенциальные проблемы:**

1. **Описания на английском в коде:**
   ```typescript
   description: 'Физическая инфраструктура, где каждая транзакция создает ценность...'
   ```
   - Это hardcoded, должно быть из переводов
   - **Рекомендация:** Использовать `t()` для всех текстов

---

## 5. АНАЛИЗ ПРОБЛЕМ

### 5.1. Цветовая Гармония

**Проблема #1: "Грязный" желтый в градиентах**

**Где встречается:**
- `globals.css` строка 131: `.text-gradient-gold` использует `#d97706`
- `tailwind.config.ts`: `gold-600: '#d97706'` слишком яркий

**Решение:**
Заменить `#d97706` на более мягкий оттенок:
- Вариант 1: `#C9A961` (более приглушенный золотой)
- Вариант 2: `#D4AF37` (классический золотой, но тоже может быть ярким)
- **Рекомендуемый:** `#E6D5A8` (очень мягкий, почти бежевый)

### 5.2. Контраст Текста

**Проблема #2: Низкий контраст на темном фоне**

**Где встречается:**
- `Hero.tsx` строка 61: `text-slate-300` на `bg-[#0A0A0A]`
- WCAG AA требует минимум 4.5:1 для обычного текста

**Решение:**
- `text-slate-300` → `text-slate-200` или `text-[#E5E7EB]`
- Проверить все места с `text-slate-300`, `text-slate-400` на темном фоне

### 5.3. Bento Grid на Мобильных

**Проблема #3: Длинный вертикальный список**

**Где встречается:**
- `LiveNetworkStatus.tsx`: 8+ метрик в одной колонке
- `FAQ.tsx`: 10 вопросов в одной колонке

**Решение:**
- Добавить горизонтальный скролл для метрик на мобильных
- Для FAQ можно оставить вертикальный скролл, но сделать карточки более компактными

### 5.4. Hardcoded Тексты

**Проблема #4: Английские термины в RU версии**

**Где встречается:**
- `copy.ru.ts` строка 135: "Gold Accumulation:"
- `copy.ru.ts` строка 137: "Low-Interest Lending:"
- `copy.ru.ts` строка 134: "DePIN Operations:" (исправлено на "Операции DePIN")

**Решение:**
Перевести все английские термины в RU версии

---

## 6. РЕКОМЕНДАЦИИ ПО ИСПРАВЛЕНИЮ

### 6.1. Цветовая Палитра (Приоритет: ВЫСОКИЙ)

**Файл: `tailwind.config.ts`**

```typescript
// Заменить gold-600 на более мягкий оттенок
gold: {
  // ... существующие оттенки
  600: '#C9A961', // Мягкий золотой вместо #d97706
  champagne: '#F3E5AB',
  soft: '#E6D5A8', // Новый: очень мягкий золотой для градиентов
}
```

**Файл: `globals.css`**

```css
.text-gradient-gold {
  background: linear-gradient(135deg, #F3E5AB 0%, #C9A961 100%);
  /* Вместо #d97706 использовать #C9A961 */
}
```

### 6.2. Контраст Текста (Приоритет: ВЫСОКИЙ)

**Файл: `src/components/Hero.tsx`**

```typescript
// Строка 61
<p className="... text-slate-200 ..."> {/* Вместо text-slate-300 */}
```

**Проверить все компоненты:**
- Заменить `text-slate-300` → `text-slate-200` на темном фоне
- Заменить `text-slate-400` → `text-slate-300` на темном фоне

### 6.3. Bento Grid Мобильная Оптимизация (Приоритет: СРЕДНИЙ)

**Файл: `src/components/LiveNetworkStatus.tsx`**

```typescript
// Добавить горизонтальный скролл для мобильных
<div className="scroll-horizontal md:grid md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
  {metricsCards.map((metric, index) => (
    <Card className="... min-w-[280px] md:min-w-0 ...">
      {/* min-w для горизонтального скролла */}
    </Card>
  ))}
</div>
```

### 6.4. Локализация (Приоритет: СРЕДНИЙ)

**Файл: `src/content/copy.ru.ts`**

```typescript
// Строка 135
'Накопление золота: 70% чистой выручки...' // Вместо "Gold Accumulation:"

// Строка 137
'Финансовый слой: Держатели GSDT получают...' // Вместо "Low-Interest Lending:"
```

### 6.5. Размер Навигации (Приоритет: НИЗКИЙ)

**Файл: `src/components/Navbar.tsx`**

```typescript
// Строка 72
className="text-sm font-medium ..." // Вместо text-xs для лучшей читаемости
```

---

## 7. ЧЕКЛИСТ ИСПРАВЛЕНИЙ

### Критичность: ВЫСОКАЯ
- [ ] Заменить `#d97706` на `#C9A961` в `.text-gradient-gold`
- [ ] Заменить `text-slate-300` → `text-slate-200` в Hero и других компонентах на темном фоне
- [ ] Перевести "Gold Accumulation:" и "Low-Interest Lending:" в RU версии

### Критичность: СРЕДНЯЯ
- [ ] Добавить горизонтальный скролл для LiveNetworkStatus на мобильных
- [ ] Обновить цвет Sparkline с `#D4AF37` на `#F3E5AB`
- [ ] Увеличить `max-w-6xl` → `max-w-7xl` в FAQ

### Критичность: НИЗКАЯ
- [ ] Увеличить размер навигации с `text-xs` → `text-sm`
- [ ] Добавить `grid-cols-1` для мобильных < 375px в Navbar
- [ ] Проверить все hardcoded тексты в FeatureCards

---

## 8. ДОПОЛНИТЕЛЬНЫЕ КОМПОНЕНТЫ

### 8.1. `src/components/Footer.tsx`

**Текущее состояние:**

**⚠️ Проблемы:**
- `bg-slate-900` — темный фон, но не соответствует Deep Obsidian (#0A0A0A)
- `border-gold-500/20` — использует старый золотой цвет
- `text-gold-400` — может быть слишком ярким
- `text-slate-400` — низкий контраст на темном фоне

**Рекомендации:**
```typescript
// Заменить
<footer className="bg-[#0A0A0A] border-t border-[#F3E5AB]/10">
  // ...
  <h3 className="... text-[#F3E5AB] ..."> {/* Вместо text-gold-400 */}
  <Link className="... text-slate-300 hover:text-[#F3E5AB] ..."> {/* Вместо text-slate-400 */}
```

### 8.2. `src/components/CTA.tsx`

**Текущее состояние:**

**⚠️ Проблемы:**
- `bg-white/40 backdrop-blur-md` — светлый фон на темном сайте
- Не соответствует общему темному стилю

**Рекомендации:**
```typescript
<section className="py-12 md:py-16 bg-gradient-to-b from-[#0A0A0A] via-[#1a1a1a] to-[#2a2a2a]">
```

### 8.3. `src/components/CloudComparison.tsx`

**Текущее состояние:**

**⚠️ Проблемы:**
- `bg-gradient-to-b from-white to-slate-50` — светлый фон
- `text-amber-600` — слишком яркий цвет
- `border-amber-500/30` — старый золотой

**Рекомендации:**
```typescript
<section className="py-12 md:py-16 bg-gradient-to-b from-[#0A0A0A] via-[#1a1a1a] to-[#2a2a2a]">
  // ...
  <div className="text-3xl font-bold text-[#F3E5AB] mt-4"> {/* Вместо text-amber-600 */}
  <Card className="... border-[#F3E5AB]/30 ..."> {/* Вместо border-amber-500/30 */}
```

### 8.4. `src/components/WalletAsNode.tsx`

**Текущее состояние:**

**⚠️ Проблемы:**
- `bg-white` — светлый фон
- `from-amber-500 to-amber-600` — старые градиенты
- `border-amber-500/30` — старый золотой

**Рекомендации:**
```typescript
<section className="py-12 md:py-16 bg-gradient-to-b from-[#0A0A0A] via-[#1a1a1a] to-[#2a2a2a]">
  // ...
  <div className="... bg-gradient-to-r from-[#F3E5AB] to-[#C9A961] ..."> {/* Вместо amber-500/600 */}
  <Card className="... border-[#F3E5AB]/30 ..."> {/* Вместо border-amber-500/30 */}
```

### 8.5. `src/components/EscrowTreasury.tsx`

**Текущее состояние:**

**⚠️ Проблемы:**
- `bg-gradient-to-b from-slate-50 to-white` — светлый фон
- `border-amber-500/30` — старый золотой
- `bg-amber-500` — старый цвет для точек

**Рекомендации:**
```typescript
<section className="py-12 md:py-16 bg-gradient-to-b from-[#0A0A0A] via-[#1a1a1a] to-[#2a2a2a]">
  // ...
  <div className="w-1.5 h-1.5 bg-[#F3E5AB] rounded-full ..."> {/* Вместо bg-amber-500 */}
  <Card className="... border-[#F3E5AB]/30 ..."> {/* Вместо border-amber-500/30 */}
```

### 8.6. `src/components/UtilityCycle.tsx`

**Текущее состояние:**

**⚠️ Проблемы:**
- `bg-gradient-to-b from-white to-slate-50` — светлый фон
- `from-amber-500 to-amber-600` — старые градиенты
- `border-amber-500/30` — старый золотой
- `text-gold-600` — может быть слишком ярким

**Рекомендации:**
```typescript
<section className="py-12 md:py-16 bg-gradient-to-b from-[#0A0A0A] via-[#1a1a1a] to-[#2a2a2a]">
  // ...
  <div className="... bg-gradient-to-r from-[#F3E5AB] to-[#C9A961] ...">
  <CardTitle className="... text-[#F3E5AB] ..."> {/* Вместо text-gold-600 */}
```

### 8.7. `src/components/MultichainBridge.tsx`

**Текущее состояние:**

**⚠️ Проблемы:**
- `bg-white` — светлый фон
- `border-amber-500/30` — старый золотой

**Рекомендации:**
```typescript
<section className="py-12 md:py-16 bg-gradient-to-b from-[#0A0A0A] via-[#1a1a1a] to-[#2a2a2a]">
  // ...
  <Card className="... border-[#F3E5AB]/30 ...">
```

### 8.8. `src/components/TokenCard.tsx`

**Текущее состояние:**

**⚠️ Проблемы:**
- `text-gold-600` — слишком яркий
- `bg-gold-500` — старый цвет
- `border-gold-200` — старый цвет
- `bg-slate-50` — светлый фон на темном сайте

**Рекомендации:**
```typescript
<CardTitle className="... text-[#F3E5AB] ..."> {/* Вместо text-gold-600 */}
<Badge className="bg-[#F3E5AB] text-[#0A0A0A] ..."> {/* Вместо bg-gold-500 */}
<div className="... bg-[#1a1a1a] border-[#F3E5AB]/20 ..."> {/* Вместо bg-slate-50 border-gold-200 */}
```

### 8.9. `src/components/PageHeader.tsx`

**Текущее состояние:**

**⚠️ Проблемы:**
- `bg-white` — светлый фон
- `border-gold-200` — старый цвет

**Рекомендации:**
```typescript
<header className="bg-[#0A0A0A]/60 backdrop-blur-md border-b border-[#F3E5AB]/10">
```

---

## 9. ФИНАЛЬНЫЕ ЗАМЕЧАНИЯ

**Что работает отлично:**
- ✅ Glassmorphism реализован правильно
- ✅ Bento Grid структура логична
- ✅ Адаптивный Navbar с Champagne Stroke
- ✅ Мобильная оптимизация (padding -30%)
- ✅ DePIN 2.0 позиционирование в основном соблюдено

**Что требует доработки:**
- ⚠️ Цветовая гармония (заменить яркий желтый)
- ⚠️ Контраст текста на темном фоне
- ⚠️ Мобильная версия Bento Grid (горизонтальный скролл)
- ⚠️ Локализация (перевести оставшиеся английские термины)

**Общая оценка:**
- Дизайн: 7/10 (хорошо, но много компонентов не обновлены под темный фон)
- Контент: 9/10 (DePIN 2.0 позиционирование соблюдено)
- UX: 8/10 (хорошо, но можно улучшить мобильную версию)
- Консистентность: 6/10 (много компонентов используют старые цвета и светлые фоны)

---

## 10. ПОЛНЫЙ СПИСОК ФАЙЛОВ ДЛЯ ИСПРАВЛЕНИЯ

### Критичность: ВЫСОКАЯ (Цвета и контраст)

1. **`src/app/globals.css`**
   - Строка 131: `.text-gradient-gold` — заменить `#d97706` на `#C9A961`

2. **`src/components/Hero.tsx`**
   - Строка 61: `text-slate-300` → `text-slate-200`

3. **`src/components/FAQ.tsx`**
   - Строка 22: `text-slate-300` → `text-slate-200`

4. **`src/components/FeatureCards.tsx`**
   - Строка 39: `text-slate-300` → `text-slate-200`

5. **`src/components/LiveNetworkStatus.tsx`**
   - Строка 196: `text-slate-300` → `text-slate-200`
   - Строка 245: Sparkline color `#D4AF37` → `#F3E5AB`

### Критичность: СРЕДНЯЯ (Фоны и стили)

6. **`src/components/CTA.tsx`**
   - Строка 13: `bg-white/40` → `bg-gradient-to-b from-[#0A0A0A] via-[#1a1a1a] to-[#2a2a2a]`

7. **`src/components/CloudComparison.tsx`**
   - Строка 14: `bg-gradient-to-b from-white to-slate-50` → темный фон
   - Строка 74: `text-amber-600` → `text-[#F3E5AB]`
   - Строка 66: `border-amber-500/30` → `border-[#F3E5AB]/30`

8. **`src/components/WalletAsNode.tsx`**
   - Строка 23: `bg-white` → темный фон
   - Строка 51: `from-amber-500 to-amber-600` → `from-[#F3E5AB] to-[#C9A961]`
   - Строка 49: `border-amber-500/30` → `border-[#F3E5AB]/30`

9. **`src/components/EscrowTreasury.tsx`**
   - Строка 14: `bg-gradient-to-b from-slate-50 to-white` → темный фон
   - Строка 51, 85: `bg-amber-500` → `bg-[#F3E5AB]`
   - Строка 33, 67, 102: `border-amber-500/30` → `border-[#F3E5AB]/30`

10. **`src/components/UtilityCycle.tsx`**
    - Строка 27: `bg-gradient-to-b from-white to-slate-50` → темный фон
    - Строка 63: `from-amber-500 to-amber-600` → `from-[#F3E5AB] to-[#C9A961]`
    - Строка 55: `border-amber-500/30` → `border-[#F3E5AB]/30`
    - Строка 67: `text-gold-600` → `text-[#F3E5AB]`

11. **`src/components/MultichainBridge.tsx`**
    - Строка 31: `bg-white` → темный фон
    - Строка 58: `border-amber-500/30` → `border-[#F3E5AB]/30`

12. **`src/components/TokenCard.tsx`**
    - Строка 30: `text-gold-600` → `text-[#F3E5AB]`
    - Строка 32: `bg-gold-500` → `bg-[#F3E5AB]`
    - Строка 62: `bg-slate-50 border-gold-200` → `bg-[#1a1a1a] border-[#F3E5AB]/20`

13. **`src/components/Footer.tsx`**
    - Строка 21: `bg-slate-900` → `bg-[#0A0A0A]`
    - Строка 21, 81: `border-gold-500/20` → `border-[#F3E5AB]/10`
    - Строка 41, 50, 69: `text-gold-400` → `text-[#F3E5AB]`
    - Строка 83, 89, 95: `text-slate-400` → `text-slate-300`

14. **`src/components/PageHeader.tsx`**
    - Строка 24: `bg-white border-gold-200` → `bg-[#0A0A0A]/60 backdrop-blur-md border-[#F3E5AB]/10`

### Критичность: НИЗКАЯ (Локализация и мелкие улучшения)

15. **`src/content/copy.ru.ts`**
    - Строка 135: "Gold Accumulation:" → "Накопление золота:"
    - Строка 137: "Low-Interest Lending:" → "Финансовый слой:"
    - Строка 33: Обновить `ctaDescription`

16. **`src/components/Navbar.tsx`**
    - Строка 72: `text-xs` → `text-sm` (для лучшей читаемости)

17. **`src/components/LiveNetworkStatus.tsx`**
    - Добавить горизонтальный скролл для мобильных

18. **`src/components/FAQ.tsx`**
    - Строка 27: `max-w-6xl` → `max-w-7xl`

---

**Отчет подготовлен:** 2026-01-25  
**Проанализировано файлов:** 20+  
**Найдено проблем:** 25+ (10 критических, 8 средних, 7 низких)

**Основные проблемы:**
1. ⚠️ 9 компонентов используют светлые фоны вместо темных
2. ⚠️ Множество использований `amber-500/600` вместо `#F3E5AB`
3. ⚠️ Низкий контраст текста (`text-slate-300` на темном фоне)
4. ⚠️ Старые цвета в Footer и других компонентах
