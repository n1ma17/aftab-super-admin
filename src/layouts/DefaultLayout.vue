<template>
  <v-sheet color="primary" style="min-height: 100vh">
    <!-- Header -->
    <HeaderComponent />
    <SubHeader />

    <!-- Main Content -->
    <main class="position-relative w-100" style="z-index: 100">
      <!-- Seam Capsule -->
      <v-sheet
        color="white"
        class="overflow-hidden"
        elevation="4"
        style="margin-top: -12px; border-top-left-radius: 28px; border-top-right-radius: 28px"
      >
        <div style="padding-top: 32px; padding-bottom: 24px; min-height: calc(100vh - 140px)">
          <router-view v-slot="{ Component, route }">
            <transition
              :css="false"
              @before-enter="onBeforeEnter"
              @enter="onEnter"
              @leave="onLeave"
            >
              <div :key="route.path" style="padding-inline: 24px">
                <component :is="Component" />
              </div>
            </transition>
          </router-view>
        </div>
      </v-sheet>
    </main>
  </v-sheet>
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
