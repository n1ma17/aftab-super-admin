<script setup>
import { onMounted, ref, watch, nextTick } from 'vue'
import { gsap } from 'gsap'
import { useRoute } from 'vue-router'
import { useNavigationStore } from '@/stores/navigation'

const headerRef = ref(null)
const menuRef = ref(null)
const route = useRoute()

// استفاده از navigation store
const navigationStore = useNavigationStore()
const menuItems = navigationStore.menuItems

// چک کردن اینکه آیا آیتم فعال است یا نه
const isActive = itemPath => {
  return route.path === itemPath
}

// تعداد اعلان‌های جدید
const notificationCount = ref(5)

// تابع انیمیشن تایتل وقتی آیتم فعال میشه
const animateActiveTitle = () => {
  nextTick(() => {
    if (menuRef.value) {
      // پیدا کردن آیتم فعال
      const activeItem = menuRef.value.querySelector('.nav-item.active-menu')
      if (activeItem) {
        const titleElement = activeItem.querySelector('.menu-title')
        if (titleElement) {
          // انیمیشن تایتل از راست به چپ با fade in
          gsap.fromTo(
            titleElement,
            {
              opacity: 0,
              x: -20,
              width: 0,
            },
            {
              opacity: 1,
              x: 0,
              width: 'auto',
              duration: 0.5,
              ease: 'power3.out',
            }
          )
        }

        // انیمیشن background آیتم فعال
        gsap.fromTo(
          activeItem,
          {
            scale: 0.95,
          },
          {
            scale: 1,
            duration: 0.3,
            ease: 'back.out(1.7)',
          }
        )
      }
    }
  })
}

onMounted(() => {
  // انیمیشن اولیه تایتل آیتم فعال
})

// Watch برای تغییر route و انیمیشن تایتل جدید
watch(
  () => route.path,
  () => {
    animateActiveTitle()
  }
)
</script>

<template>
  <header
    ref="headerRef"
    class="bg-primary text-white h-[60px] flex items-center justify-between px-6 shadow-lg border-b border-gray-800"
  >
    <!-- Logo Section -->
    <div class="flex items-center">
      <h1 class="text-xl font-bold tracking-wide">Panel</h1>
    </div>

    <!-- Navigation Menu (Center) -->
    <nav ref="menuRef" class="flex items-center gap-8">
      <router-link
        v-for="item in menuItems"
        :key="item.id"
        :to="item.path"
        :class="[
          'nav-item p-2 rounded-2xl flex items-center text-white  relative overflow-hidden',
          isActive(item.path)
            ? 'gap-2 px-4 border border-secondary-500 active-menu'
            : 'justify-center hover:bg-white/5 hover:scale-110',
        ]"
      >
        <!-- Hover Glow Effect -->
        <div
          v-if="!isActive(item.path)"
          class="absolute inset-0 opacity-0 rounded-2xl pointer-events-none transition-opacity duration-300"
        ></div>

        <ThemifyIcon :name="item.icon" :size="item.iconSize" class="relative z-10" />
        <span
          v-if="isActive(item.path)"
          class="menu-title text-sm font-medium whitespace-nowrap relative z-10"
          >{{ item.title }}</span
        >
      </router-link>
    </nav>

    <!-- User Profile Section (Right) -->
    <div class="flex items-center gap-3">
      <button class="text-white/70 hover:text-white transition-colors">
        <ThemifyIcon name="settings" size="16" />
      </button>
      <button class="text-white/70 hover:text-white transition-colors relative notification-btn">
        <ThemifyIcon name="bell" size="16" />
        <span v-if="notificationCount > 0" class="notification-badge">
          {{ notificationCount > 99 ? '99+' : notificationCount }}
        </span>
      </button>
    </div>
  </header>
</template>

<style lang="scss" scoped>
.nav-item {
  cursor: pointer;
  user-select: none;

  // Active menu item styles
}

// Menu title animation styles
.menu-title {
  display: inline-block;
  overflow: hidden;
}

// Notification button and badge styles
.notification-btn {
  position: relative;

  .notification-badge {
    position: absolute;
    top: -8px;
    right: -8px;
    min-width: 18px;
    height: 18px;
    padding: 0 5px;
    background: linear-gradient(135deg, #ff4757, #ff6348);
    color: white;
    border-radius: 10px;
    font-size: 10px;
    font-weight: 600;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 2px 8px rgba(255, 71, 87, 0.4);
    animation: pulse-badge 2s ease-in-out infinite;
  }
}

@keyframes pulse-badge {
  0%,
  100% {
    transform: scale(1);
    box-shadow: 0 2px 8px rgba(255, 71, 87, 0.4);
  }
  50% {
    transform: scale(1.1);
    box-shadow: 0 4px 12px rgba(255, 71, 87, 0.6);
  }
}
</style>
