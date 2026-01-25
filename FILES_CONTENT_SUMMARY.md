# Содержимое Ключевых Файлов для Анализа

---

## 1. ФАЙЛЫ ГЛОБАЛЬНЫХ СТИЛЕЙ (Дизайн)

### `tailwind.config.ts`

**Ключевые моменты:**
- Container max-width: 1440px ✅
- Institutional colors: `champagne: '#F3E5AB'`, `obsidian: { DEFAULT: '#0A0A0A' }`, `antique: { white: '#FAEBD7' }` ✅
- Typography: letter-spacing -0.02em, base font 15px ✅
- ⚠️ Проблема: `gold-600: '#d97706'` слишком яркий для темного фона

### `src/app/globals.css`

**Ключевые моменты:**
- Glassmorphism: `.glass-institutional` с `backdrop-blur-16px` ✅
- Gradient border: `.border-gradient-gold` с градиентной обводкой ✅
- Mobile optimization: padding -30% на мобильных ✅
- ⚠️ Проблема: `.text-gradient-gold` использует `#d97706` вместо мягкого оттенка
- Кнопки: `.btn-gold` с Champagne Gold (#F3E5AB) ✅

---

## 2. СТРУКТУРА И КОНТЕНТ (Наполнение)

### `src/content/copy.ru.ts`

**Ключевые моменты:**
- Hero: "GSTD: Глобальный суперкомпьютер с золотым обеспечением" ✅
- What We Build: Wallet-as-Node, Escrow 2.0, Real-Time Gold Backing ✅
- Roadmap: "глобальной DePIN-сети вычислений" ✅
- Investors: Начинается с "GSTD — это децентрализованный суперкомпьютер..." ✅
- FAQ: 10 вопросов, включая механику Treasury ✅
- ⚠️ Проблемы:
  - Строка 135: "Gold Accumulation:" на английском
  - Строка 137: "Low-Interest Lending:" на английском
  - Строка 33: `ctaDescription` упоминает "поставщиком ликвидности"

### `src/app/page.tsx`

**Структура главной страницы:**
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

**Анализ:**
- ✅ Логичная последовательность
- ✅ Bento Grid используется в LiveNetworkStatus и FeatureCards
- ⚠️ Некоторые компоненты еще используют светлые фоны

---

## 3. ОСНОВНОЙ НАВИГАТОР (Меню)

### `src/components/Navbar.tsx`

**Текущая реализация:**
- ✅ Adaptive Glass Header (`isScrolled` состояние)
- ✅ Champagne Stroke навигация (`text-[#FAEBD7] hover:text-[#F3E5AB]`)
- ✅ Bento-Style Mobile Menu (Grid 2 колонки)
- ✅ Тонкие обводки при hover (`border-[#F3E5AB]/30`)
- ⚠️ Размер текста: `text-xs` (12px) — можно увеличить до `text-sm` (14px)

**Код ключевых частей:**
```typescript
// Adaptive header
className={cn(
  "sticky top-0 z-50 w-full transition-all duration-300",
  "border-b border-[#F3E5AB]/10",
  "glass-institutional",
  isScrolled 
    ? "bg-[#0A0A0A]/90 backdrop-blur-xl" 
    : "bg-[#0A0A0A]/60 backdrop-blur-md"
)}

// Desktop navigation
className={cn(
  "text-xs font-medium transition-all duration-300 whitespace-nowrap",
  "text-[#FAEBD7] hover:text-[#F3E5AB]",
  "border-b border-transparent hover:border-[#F3E5AB]/30",
  "pb-1 hover:pb-0.5"
)}

// Mobile Bento Grid
<div className="grid grid-cols-2 gap-2">
  {navItems.map((item) => (
    <Link className="... glass-institutional border-gradient-gold ...">
```

---

## 4. ДОПОЛНИТЕЛЬНЫЕ КОМПОНЕНТЫ

### Компоненты с проблемами цветов:

**Используют светлые фоны (нужно обновить на темные):**
- `CloudComparison.tsx`: `bg-gradient-to-b from-white to-slate-50`
- `WalletAsNode.tsx`: `bg-white`
- `EscrowTreasury.tsx`: `bg-gradient-to-b from-slate-50 to-white`
- `UtilityCycle.tsx`: `bg-gradient-to-b from-white to-slate-50`
- `MultichainBridge.tsx`: `bg-white`
- `CTA.tsx`: `bg-white/40 backdrop-blur-md`
- `PageHeader.tsx`: `bg-white`

**Используют старые цвета (нужно заменить на Champagne Gold):**
- `text-amber-600` → `text-[#F3E5AB]`
- `border-amber-500/30` → `border-[#F3E5AB]/30`
- `bg-amber-500` → `bg-[#F3E5AB]`
- `from-amber-500 to-amber-600` → `from-[#F3E5AB] to-[#C9A961]`

**Низкий контраст текста:**
- `text-slate-300` на темном фоне → `text-slate-200`
- `text-slate-400` на темном фоне → `text-slate-300`

---

## 5. КРАТКИЙ ЧЕКЛИСТ ИСПРАВЛЕНИЙ

### Приоритет 1 (Критично - Цвета):
1. Заменить `#d97706` на `#C9A961` в `.text-gradient-gold` (globals.css)
2. Заменить все `text-slate-300` → `text-slate-200` на темном фоне
3. Обновить все `amber-500/600` → `#F3E5AB` / `#C9A961`

### Приоритет 2 (Важно - Фоны):
4. Обновить 9 компонентов со светлыми фонами на темные
5. Обновить Footer на Deep Obsidian фон
6. Обновить PageHeader на темный glass

### Приоритет 3 (Желательно - Локализация):
7. Перевести "Gold Accumulation:" и "Low-Interest Lending:" в RU
8. Обновить `ctaDescription` для фокуса на DePIN

---

**Готово к исправлению:** Все файлы проанализированы, проблемы идентифицированы, рекомендации предоставлены.
