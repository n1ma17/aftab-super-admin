<template>
  <div class="min-h-screen bg-primary">
    <!-- Header -->
    <HeaderComponent />
    <SubHeader />
    <!-- Main Content -->
    <main class="relative w-full z-[100]">
      <div class="w-full">
        <!-- Seam Capsule: overlaps SubHeader to expose rounded top edge -->
        <div
          class="-mt-3 rounded-t-[28px] bg-white shadow-[0_-8px_24px_rgba(0,0,0,0.08)] overflow-hidden"
        >
          <div class="py-8 min-h-[calc(100vh-140px)]">
            <router-view v-slot="{ Component, route }">
              <transition
                :css="false"
                @before-enter="onBeforeEnter"
                @enter="onEnter"
                @leave="onLeave"
              >
                <div :key="route.path" class="w-full px-6">
                  <component :is="Component" />
                </div>
              </transition>
            </router-view>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { gsap } from 'gsap'
import HeaderComponent from '../components/layout/HeaderComponent.vue'
import SubHeader from '../components/layout/SubHeader.vue'

// Hook برای transition
const onBeforeEnter = el => {
  gsap.set(el, {
    y: '100%',
    opacity: 0,
  })
}

const onEnter = (el, done) => {
  gsap.to(el, {
    y: '0%',
    opacity: 1,
    duration: 0.6,
    ease: 'sine.easeInOut',
    onComplete: done,
  })
}

const onLeave = (el, done) => {
  gsap.to(el, {
    y: '100%',
    opacity: 0,
    duration: 0.5,
    ease: 'sine.easeInOut',
    onComplete: done,
  })
}
</script>

<style scoped>
/* Layout styles */
</style>
