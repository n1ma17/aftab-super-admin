# Navigation Store

این store برای مدیریت منوی navigation استفاده می‌شود.

## استفاده در کامپوننت

```vue
<script setup>
import { useNavigationStore } from '@/stores/navigation'

const navigationStore = useNavigationStore()
</script>
```

## State

### menuItems
آرایه‌ای از آبجکت‌های منو با ساختار زیر:

```javascript
{
  id: 'dashboard',           // شناسه یکتا
  title: 'Dashboard',        // عنوان منو
  icon: 'dashboard',         // نام آیکون
  iconSize: 18,             // سایز آیکون
  path: '/',                // مسیر route
  showTitle: true           // نمایش عنوان یا فقط آیکون
}
```

## Getters

### menusWithTitle
منوهایی که عنوان دارند:
```javascript
const menusWithTitle = navigationStore.menusWithTitle
```

### iconOnlyMenus
منوهایی که فقط آیکون دارند:
```javascript
const iconOnlyMenus = navigationStore.iconOnlyMenus
```

### getMenuById
پیدا کردن منو با id:
```javascript
const menu = navigationStore.getMenuById('dashboard')
```

## Actions

### addMenuItem
اضافه کردن منوی جدید:
```javascript
navigationStore.addMenuItem({
  id: 'settings',
  title: 'Settings',
  icon: 'settings',
  iconSize: 20,
  path: '/settings',
  showTitle: false
})
```

### removeMenuItem
حذف منو:
```javascript
navigationStore.removeMenuItem('settings')
```

### updateMenuItem
به‌روزرسانی منو:
```javascript
navigationStore.updateMenuItem('dashboard', {
  title: 'داشبورد',
  showTitle: true
})
```

### toggleShowTitle
تغییر وضعیت نمایش عنوان:
```javascript
navigationStore.toggleShowTitle('dashboard')
```

## مثال استفاده کامل

```vue
<script setup>
import { useNavigationStore } from '@/stores/navigation'

const navigationStore = useNavigationStore()

// دریافت همه منوها
const allMenus = navigationStore.menuItems

// اضافه کردن منوی جدید
const addNewMenu = () => {
  navigationStore.addMenuItem({
    id: 'messages',
    title: 'Messages',
    icon: 'email',
    iconSize: 20,
    path: '/messages',
    showTitle: false
  })
}

// حذف یک منو
const deleteMenu = (id) => {
  navigationStore.removeMenuItem(id)
}

// تغییر نمایش عنوان
const toggleTitle = (id) => {
  navigationStore.toggleShowTitle(id)
}
</script>

<template>
  <div>
    <nav>
      <router-link
        v-for="item in allMenus"
        :key="item.id"
        :to="item.path"
      >
        <ThemifyIcon :name="item.icon" :size="item.iconSize" />
        <span v-if="item.showTitle">{{ item.title }}</span>
      </router-link>
    </nav>
  </div>
</template>
```

