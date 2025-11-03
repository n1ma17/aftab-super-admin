# Layouts

این پوشه شامل layoutهای مختلف پروژه است. هر layout یک ساختار کلی برای صفحات مختلف فراهم می‌کند.

## Layoutهای موجود

### DefaultLayout
Layout پیش‌فرض برای صفحات عمومی:
- Header با منوی ناوبری
- Footer
- Container برای محتوا

### AuthLayout
Layout برای صفحات احراز هویت:
- طراحی متمرکز
- پس‌زمینه گرادیان
- مناسب برای صفحات Login و Register

### DashboardLayout
Layout برای صفحات داشبورد:
- Sidebar برای منو
- Top bar برای هدر
- فضای مناسب برای داشبورد ادمین

## افزودن Layout جدید

برای افزودن یک layout جدید:

1. یک فایل Vue جدید در این پوشه بسازید (مثلاً `MyLayout.vue`)
2. ساختار layout را تعریف کنید با `<router-view />` برای نمایش محتوای صفحات
3. layout را در `index.js` export کنید:

```javascript
export { default as MyLayout } from './MyLayout.vue'
```

4. در `router/index.js` استفاده کنید:

```javascript
import { MyLayout } from '../layouts'

{
  path: '/my-page',
  component: MyLayout,
  children: [
    {
      path: '',
      component: () => import('../views/MyPage.vue'),
    },
  ],
}
```

## مثال استفاده

```vue
<!-- MyLayout.vue -->
<template>
  <div class="my-custom-layout">
    <header>
      <!-- Header content -->
    </header>
    <main>
      <router-view />
    </main>
    <footer>
      <!-- Footer content -->
    </footer>
  </div>
</template>
```

