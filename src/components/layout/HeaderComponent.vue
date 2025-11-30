<script setup>
import { onMounted, ref, watch, nextTick, computed } from 'vue'
import { gsap } from 'gsap'
import { useRoute } from 'vue-router'
import { useNavigationStore } from '@/stores/navigation'

const menuRef = ref(null)
const route = useRoute()

// استفاده از navigation store
const navigationStore = useNavigationStore()
const menuItems = navigationStore.menuItems
const isSubHeaderExpanded = computed(() => navigationStore.subHeaderExpanded)

// چک کردن اینکه آیا آیتم فعال است یا نه
const isActive = itemPath => {
  return route.path === itemPath
}

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
  <v-app-bar color="primary" height="60" scroll-behavior="elevate" class="px-4" border>
    <!-- Logo -->
    <v-toolbar-title class="font-weight-bold">
      <v-btn icon color="white" @click="navigationStore.toggleSubHeader()">
        <ThemifyIcon :name="isSubHeaderExpanded ? 'angle-up' : 'angle-down'" size="sm" /> </v-btn
      >Panel</v-toolbar-title
    >

    <!-- Navigation Menu -->
    <nav ref="menuRef" class="d-flex align-center" style="gap: 32px">
      <v-btn
        v-for="item in menuItems"
        :key="item.id"
        :to="item.path"
        variant="text"
        color="white"
        class="nav-item"
        :class="{ 'active-menu': isActive(item.path) }"
        rounded="xl"
      >
        <ThemifyIcon :name="item.icon" :size="item.iconSize" class="ml-2" />
        <span v-if="isActive(item.path)" class="menu-title text-body-2 font-weight-medium">
          {{ item.title }}
        </span>
      </v-btn>
    </nav>

    <v-spacer />

    <!-- Actions -->
    <div class="d-flex align-center" style="gap: 12px">
      <v-btn icon variant="text" color="white">
        <ThemifyIcon name="settings" size="16" />
      </v-btn>
      <v-badge location="top right" color="error" content="99">
        <ThemifyIcon name="bell" size="16" />
      </v-badge>
    </div>
  </v-app-bar>
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
