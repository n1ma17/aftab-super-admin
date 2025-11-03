<script setup>
import { ref, nextTick } from 'vue'
import { gsap } from 'gsap'
import ThemifyIcon from '@/components/icons/ThemifyIcon.vue'
import DynamicModal from '@/components/shared/DynamicModal.vue'

// Toggle state
const isExpanded = ref(true)
const contentRef = ref(null)
const subHeaderRef = ref(null)

// User data - می‌تونید از store یا API دریافت کنید
const user = ref({
  name: 'Olivia Emma',
  email: 'Kelly.mecullen@gmail.com',
  avatar: 'https://i.pravatar.cc/150?img=47',
})

// Toggle SubHeader با انیمیشن بسیار نرم و قابل اعتماد
const toggleSubHeader = async () => {
  const containerEl = subHeaderRef.value

  if (!containerEl) return

  if (!isExpanded.value) {
    // EXPAND: ابتدا ارتفاع فعلی را بگیر
    const heightBefore = containerEl.offsetHeight

    // تغییر state و صبر برای رندر DOM
    isExpanded.value = true
    await nextTick()

    const contentEl = contentRef.value
    const heightAfter = containerEl.offsetHeight

    // وضعیت اولیه محتوا و container
    if (contentEl) {
      gsap.set(contentEl, { autoAlpha: 0, y: 20, scale: 1 })
    }
    gsap.set(containerEl, { height: heightBefore })

    // تایم‌لاین نرم: اول ارتفاع، بعد نمایش محتوا
    const tl = gsap.timeline({ defaults: { ease: 'power3.inOut' } })
    tl.to(containerEl, { height: heightAfter, duration: 0.55 })
      .to(contentEl, { autoAlpha: 1, y: 0, scale: 1, duration: 0.45, ease: 'power3.out' }, '+=0.05')
      .set(containerEl, { clearProps: 'height' })
  } else {
    // COLLAPSE: ابتدا محتوا را خیلی نرم محو کن با استگر
    const contentEl = contentRef.value
    const heightBefore = containerEl.offsetHeight

    if (contentEl) {
      const q = gsap.utils.selector(contentEl)
      const parts = q('.welcome-section, .user-card, .grid')

      // استگر روی آیتم‌های داخل محتوا برای احساس طبیعی‌تر
      await new Promise(resolve =>
        gsap
          .timeline({ defaults: { ease: 'power3.inOut' } })
          .to(
            parts,
            { autoAlpha: 0, y: -10, filter: 'blur(2px)', duration: 0.28, stagger: 0.035 },
            0
          )
          .to(contentEl, { autoAlpha: 0, duration: 0.15 }, '-=0.05')
          .add(resolve)
      )
    }

    // تغییر state و صبر برای رندر DOM collapsed
    isExpanded.value = false
    await nextTick()

    const heightAfter = containerEl.offsetHeight

    // انیمیشن کاهش ارتفاع بسیار نرم
    gsap.set(containerEl, { height: heightBefore })
    gsap.to(containerEl, {
      height: heightAfter,
      duration: 0.55,
      ease: 'power3.inOut',
      onComplete: () => gsap.set(containerEl, { clearProps: 'height' }),
    })
  }
}

// Financial stats
const stats = ref([
  {
    id: 1,
    label: 'Your Current Balance',
    value: '$654,101',
    icon: 'wallet',
    color: '#6366f1',
    bgColor: 'rgba(99, 102, 241, 0.1)',
  },
  {
    id: 2,
    label: 'Total Income',
    value: '$1,323,341',
    icon: 'arrow-up',
    color: '#10b981',
    bgColor: 'rgba(16, 185, 129, 0.1)',
  },
  {
    id: 3,
    label: 'Total Outcome',
    value: '$365,513',
    icon: 'arrow-down',
    color: '#f59e0b',
    bgColor: 'rgba(245, 158, 11, 0.1)',
  },
  {
    id: 4,
    label: 'Total Savings',
    icon: 'money',
    value: '$373,335',
    color: '#8b5cf6',
    bgColor: 'rgba(139, 92, 246, 0.1)',
  },
  {
    id: 5,
    label: 'Total Savings',
    icon: 'money',
    value: '$373,335',
    color: '#C493DC',
    bgColor: 'rgba(139, 92, 246, 0.1)',
  },
])
const showCustomModal = ref(false)
</script>

<template>
  <div
    ref="subHeaderRef"
    class="sub-header bg-primary text-white px-6 relative"
    :class="isExpanded ? 'py-6' : 'py-3'"
  >
    <!-- Toggle Button -->
    <button
      @click="toggleSubHeader"
      class="bg-secondary absolute top-[-10px] left-4 z-[9999] w-5 h-5 rounded-full flex items-center justify-center transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-110 cursor-pointer"
    >
      <ThemifyIcon
        :name="isExpanded ? 'angle-up' : 'angle-down'"
        :size="10"
        class="transition-transform duration-300"
      />
    </button>

    <div class="container mx-auto">
      <!-- Expanded View -->
      <div v-if="isExpanded" ref="contentRef" class="flex items-center justify-between">
        <!-- Left Side: Welcome & User Info -->
        <div class="flex items-center flex-col gap-6">
          <!-- Welcome Text -->
          <div class="welcome-section">
            <h1 class="text-4xl font-bold gradient-text mb-1">به پنل مدیریتی</h1>
            <h2 class="text-4xl font-bold gradient-text">خوش آمدید</h2>
          </div>

          <!-- User Card -->
          <div class="user-card flex items-center gap-3 rounded-2xl px-5 py-3">
            <img :src="user.avatar" :alt="user.name" class="w-12 h-12 rounded-full" />
            <div>
              <p class="font-semibold text-white">{{ user.name }}</p>
              <p class="text-sm text-gray-400">{{ user.email }}</p>
            </div>
          </div>
        </div>

        <!-- Right Side: Stats Cards -->
        <div class="grid grid-cols-3 gap-2">
          <div
            v-for="stat in stats"
            :key="stat.id"
            class="px-3 py-4 flex items-center gap-2 hover:scale-105 transition-transform duration-300 cursor-pointer"
          >
            <!-- Icon -->
            <div
              class="icon-wrapper w-8 h-8 rounded-full flex items-center justify-center"
              :style="{ backgroundColor: stat.bgColor }"
            >
              <ThemifyIcon name="layout-tab-window" :size="16" :style="{ color: stat.color }" />
            </div>

            <!-- Text -->
            <div>
              <p class="text-sm font-bold" :style="{ color: stat.color }">{{ stat.label }}</p>
            </div>
          </div>
          <div
            class="px-5 py-4 flex items-center gap-2 hover:scale-105 transition-transform duration-300 cursor-pointer"
            @click="showCustomModal = true"
          >
            <div class="icon-wrapper w-8 h-8 rounded-full flex items-center justify-center">
              <ThemifyIcon name="more-alt" :size="10" :style="{ color: '#EF4444' }" />
            </div>
            <div>
              <p class="text-sm font-bold" :style="{ color: '#EF4444' }">مشاهده همه</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Collapsed View: Only User Card (Right Side) -->
      <div v-else class="flex items-start justify-start">
        <div class="user-card-collapsed flex items-center gap-3 rounded-2xl px-5 py-2">
          <img :src="user.avatar" :alt="user.name" class="w-10 h-10 rounded-full" />
          <div>
            <p class="font-semibold text-white text-sm">{{ user.name }}</p>
            <p class="text-xs text-gray-400">{{ user.email }}</p>
          </div>
        </div>
      </div>
    </div>
    <DynamicModal v-model="showCustomModal" title="انتخاب پروژه" size="lg" enter-animation="scale">
      <div class="grid grid-cols-2 gap-6 items-center justify-center">
        <div v-for="value in stats" :key="value.id" class="flex items-center gap-2 flex-col">
          <div class="icon-wrapper w-8 h-8 rounded-full flex items-center justify-center">
            <ThemifyIcon name="layout-tab-window" :size="16" :style="{ color: value.color }" />
          </div>
          <div>
            <p class="text-sm font-bold" :style="{ color: value.color }">{{ value.label }}</p>
          </div>
        </div>
      </div>
    </DynamicModal>
  </div>
</template>

<style lang="scss" scoped>
.sub-header {
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
  /* height transitions are driven by GSAP to avoid double-easing */
  position: relative;
  z-index: 50;
}

.gradient-text {
  background: linear-gradient(135deg, #a855f7 0%, #ec4899 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  line-height: 1.2;
}

.icon-wrapper {
  flex-shrink: 0;
}

.user-card-collapsed {
  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.02);
  }
}
</style>
