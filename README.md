# Super Admin Panel

پنل ادمین با Vue 3 و Tailwind CSS با پشتیبانی کامل RTL

## ویژگی‌ها

- ✅ Vue 3 با Composition API
- ✅ Pinia برای مدیریت state
- ✅ Vue Router برای routing
- ✅ Tailwind CSS با پیکربندی RTL
- ✅ فایل تم رنگی قابل تنظیم (`src/config/theme.js`)
- ✅ پشتیبانی کامل از راست به چپ (RTL)
- ✅ فونت فارسی Digi Hamishe
- ✅ ESLint برای بررسی کیفیت کد
- ✅ Prettier برای فرمت کردن کد

## نصب

```bash
npm install
```

## اجرا

برای اجرای پروژه در حالت توسعه:

```bash
npm run dev
```

برای ساخت پروژه:

```bash
npm run build
```

برای پیش‌نمایش نسخه ساخته شده:

```bash
npm run preview
```

برای بررسی کد با ESLint:

```bash
npm run lint
```

برای فرمت کردن کد با Prettier:

```bash
npm run format
```

## ساختار پروژه

```
super-admin/
├── public/
│   └── fonts/                # فونت‌های محلی
├── src/
│   ├── config/
│   │   └── theme.js          # فایل تم رنگی
│   ├── stores/
│   │   ├── index.js          # تنظیمات Pinia
│   │   └── example.js        # نمونه store
│   ├── router/
│   │   └── index.js          # تنظیمات Vue Router
│   ├── views/
│   │   ├── Home.vue          # صفحه اصلی
│   │   └── About.vue         # صفحه درباره
│   ├── App.vue               # کامپوننت اصلی
│   ├── main.js               # نقطه ورود برنامه
│   └── main.css              # فایل استایل اصلی
├── .eslintrc.cjs             # پیکربندی ESLint
├── .prettierrc               # پیکربندی Prettier
├── .prettierignore           # فایل‌های نادیده گرفته شده توسط Prettier
├── index.html
├── package.json
├── tailwind.config.js        # پیکربندی Tailwind با RTL
├── vite.config.js
└── postcss.config.js
```

## تم رنگی

تمام رنگ‌های پروژه در فایل `src/config/theme.js` تعریف شده‌اند و می‌توانید آن‌ها را تغییر دهید:

- Primary: رنگ اصلی پروژه
- Secondary: رنگ ثانویه
- Success: برای پیام‌های موفقیت
- Warning: برای هشدارها
- Error: برای خطاها
- Gray: رنگ‌های خاکستری

## RTL Support

پروژه کاملاً با پشتیبانی RTL طراحی شده است. برای این کار از پلاگین `tailwindcss-rtl` استفاده شده است.

## State Management (Pinia)

برای مدیریت state از Pinia استفاده می‌شود. یک نمونه store در `src/stores/example.js` موجود است.

استفاده:
```javascript
import { useExampleStore } from '@/stores/example'

const store = useExampleStore()
store.increment()
```

## Routing (Vue Router)

رouting با Vue Router انجام می‌شود. routes در `src/router/index.js` تعریف شده‌اند.

## Code Quality

- **ESLint**: برای بررسی کیفیت و خطاهای کد
- **Prettier**: برای فرمت یکپارچه کد

هر دو به صورت خودکار در پروژه پیکربندی شده‌اند.

