# Themify Icons

این پوشه شامل کامپوننت‌های آیکن برای استفاده از Themify Icons در پروژه است.

## استفاده از ThemifyIcon

کامپوننت `ThemifyIcon` به صورت global ثبت شده است و می‌توانید مستقیماً از آن استفاده کنید.

### مثال‌های استفاده:

```vue
<template>
  <!-- استفاده ساده -->
  <ThemifyIcon name="home" />
  
  <!-- با اندازه سفارشی -->
  <ThemifyIcon name="user" size="24" />
  <ThemifyIcon name="settings" size="32px" />
  
  <!-- با رنگ سفارشی -->
  <ThemifyIcon name="heart" color="#ef4444" />
  <ThemifyIcon name="star" color="primary" />
  
  <!-- ترکیب اندازه و رنگ -->
  <ThemifyIcon name="bell" size="20" color="currentColor" />
</template>
```

### Props:

- **name** (required): نام آیکن مورد نظر (مثلاً `home`, `user`, `settings`)
- **size** (optional): اندازه آیکن - می‌تواند عدد (به px تبدیل می‌شود) یا رشته باشد (مثلاً `"24px"`). پیش‌فرض: `"16px"`
- **color** (optional): رنگ آیکن - می‌تواند کد hex، نام رنگ CSS، یا `currentColor` باشد. پیش‌فرض: `"currentColor"`

### لیست آیکن‌های پرکاربرد:

- `home`, `user`, `settings`, `dashboard`
- `shopping-cart`, `package`, `box`
- `bar-chart`, `pie-chart`, `line-chart`
- `bell`, `search`, `menu`, `close`
- `arrow-left`, `arrow-right`, `arrow-up`, `arrow-down`
- `heart`, `star`, `bookmark`
- `edit`, `delete`, `trash`, `save`

برای لیست کامل آیکن‌ها به [Themify Icons Documentation](https://themify.me/themify-icons) مراجعه کنید.

### استفاده در لینک‌ها و دکمه‌ها:

```vue
<template>
  <router-link to="/dashboard" class="flex items-center gap-2">
    <ThemifyIcon name="dashboard" size="18" />
    داشبورد
  </router-link>
  
  <button class="flex items-center gap-2">
    <ThemifyIcon name="save" size="16" />
    ذخیره
  </button>
</template>
```

