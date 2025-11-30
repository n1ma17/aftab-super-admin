<script setup>
import { ref, computed, watch, nextTick } from 'vue'
import { gsap } from 'gsap'
import ThemifyIcon from '@/components/icons/ThemifyIcon.vue'
import DynamicModal from '@/components/shared/DynamicModal.vue'
import { useNavigationStore } from '@/stores/navigation'

const navigationStore = useNavigationStore()
// Store target vs rendered state
const targetExpanded = computed(() => navigationStore.subHeaderExpanded)
const renderExpanded = ref(targetExpanded.value)
const contentRef = ref(null)
const subHeaderRef = ref(null)

// User data - می‌تونید از store یا API دریافت کنید
const user = ref({
  name: 'Olivia Emma',
  email: 'Kelly.mecullen@gmail.com',
  avatar: 'https://i.pravatar.cc/150?img=47',
})

// واکنش به تغییر وضعیت از Store با کنترل دقیق رندر برای حذف اسنپ
watch(
  targetExpanded,
  async newVal => {
    const containerEl = subHeaderRef.value?.$el || subHeaderRef.value
    if (!containerEl) return

    const heightBefore = containerEl.offsetHeight
    if (newVal) {
      // Expand: ابتدا ارتفاع فعلی را بگیر، نمای Expanded را رندر کن، بعد ارتفاع جدید را انیمیت کن
      renderExpanded.value = true
    } else {
      // Collapse: ارتفاع را قفل کن، محتوای فعلی را محو کن، سپس نمای Collapsed را رندر و ارتفاع را انیمیت کن
      renderExpanded.value = false
    }
    await nextTick()
    const contentEl = contentRef.value
    const heightAfter = containerEl.offsetHeight
    if (contentEl) {
      gsap.set(contentEl, { autoAlpha: 0, y: 20, scale: 1 })
    }
    gsap.set(containerEl, { height: heightBefore, overflow: 'hidden' })
    gsap
      .timeline({ defaults: { ease: 'power3.inOut' } })
      .to(containerEl, { height: heightAfter, duration: 0.55 })
      .to(contentEl, { autoAlpha: 1, y: 0, scale: 1, duration: 0.45, ease: 'power3.out' }, '+=0.05')
      .set(containerEl, { clearProps: 'height,overflow' })
  },
  { immediate: false }
)

const favoriteProducts = computed(() => navigationStore.favoriteProducts)
if (favoriteProducts.value?.length < 1) {
  navigationStore.setDefaultFavorites()
}
const products = computed(() => navigationStore.products)
const showCustomModal = ref(false)

const isFavorite = productId => {
  return favoriteProducts.value.some(fav => fav.id === productId)
}

const handleProductClick = productId => {
  navigationStore.toggleFavoriteProduct(productId)
}
</script>

<template>
  <v-sheet
    ref="subHeaderRef"
    color="primary"
    class="sub-header"
    :style="
      renderExpanded
        ? 'padding: 24px 24px; position: relative; z-index: 50; color: #fff;'
        : 'padding: 12px 24px; position: relative; z-index: 50; color: #fff;'
    "
  >
    <v-container>
      <!-- Expanded View -->
      <div v-if="renderExpanded" ref="contentRef" class="d-flex align-center justify-space-between">
        <!-- Left: Welcome + User -->
        <div class="d-flex flex-column align-center" style="gap: 24px">
          <div class="welcome-section">
            <h1 class="text-h4 font-weight-bold" style="margin-bottom: 4px">به پنل مدیریتی</h1>
            <h2 class="text-h4 font-weight-bold">خوش آمدید</h2>
          </div>
          <div
            class="user-card d-flex align-center"
            style="gap: 12px; border-radius: 16px; padding: 12px 20px"
          >
            <v-avatar size="48">
              <img :src="user.avatar" :alt="user.name" />
            </v-avatar>
            <div>
              <p class="font-weight-semibold">{{ user.name }}</p>
              <p style="font-size: 12px; color: rgba(255, 255, 255, 0.7)">{{ user.email }}</p>
            </div>
          </div>
        </div>

        <!-- Right: Stats -->
        <div class="stats-grid">
          <div
            v-for="stat in favoriteProducts"
            :key="stat.id"
            class="d-flex align-center"
            style="gap: 8px; padding: 12px 12px; cursor: pointer"
          >
            <div
              class="icon-wrapper d-flex align-center justify-center"
              style="width: 32px; height: 32px; border-radius: 9999px"
              :style="{ backgroundColor: stat.bgColor }"
            >
              <ThemifyIcon name="layout-tab-window" :size="16" :style="{ color: stat.color }" />
            </div>
            <div>
              <p style="font-size: 14px; font-weight: 700" :style="{ color: stat.color }">
                {{ stat.label }}
              </p>
            </div>
          </div>
          <div
            style="
              padding: 16px 20px;
              display: flex;
              align-items: center;
              gap: 8px;
              cursor: pointer;
            "
            @click="showCustomModal = true"
          >
            <div
              class="icon-wrapper d-flex align-center justify-center"
              style="width: 32px; height: 32px; border-radius: 9999px"
            >
              <ThemifyIcon name="more-alt" :size="10" :style="{ color: '#EF4444' }" />
            </div>
            <div>
              <p style="font-size: 14px; font-weight: 700; color: #ef4444">مشاهده همه</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Collapsed View -->
      <div v-else class="d-flex align-start">
        <div
          class="user-card-collapsed d-flex align-center"
          style="gap: 12px; border-radius: 16px; padding: 8px 20px"
        >
          <v-avatar size="40">
            <img :src="user.avatar" :alt="user.name" />
          </v-avatar>
          <div>
            <p class="font-weight-semibold" style="font-size: 14px">{{ user.name }}</p>
            <p style="font-size: 12px; color: rgba(255, 255, 255, 0.7)">{{ user.email }}</p>
          </div>
        </div>
      </div>
    </v-container>

    <DynamicModal v-model="showCustomModal" title="انتخاب پروژه" size="xl" enter-animation="scale">
      <div class="products-grid">
        <div
          v-for="value in products"
          :key="value.id"
          class="d-flex align-center justify-between w-100 border rounded-lg pa-4 shadow-sm cursor-pointer"
          style="gap: 8px"
        >
          <div
            class="icon-wrapper d-flex align-center justify-center"
            style="width: 32px; height: 32px; border-radius: 9999px; cursor: pointer"
            @click="handleProductClick(value.id)"
          >
            <ThemifyIcon
              name="pin2"
              :size="16"
              :style="{ color: isFavorite(value.id) ? '#EF4444' : '#000000' }"
            />
          </div>
          <div>
            <p style="font-size: 14px; font-weight: 700" :style="{ color: value.color }">
              {{ value.label }}
            </p>
          </div>
        </div>
      </div>
    </DynamicModal>
  </v-sheet>
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

.stats-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 8px;
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 24px;
  align-items: center;
  justify-items: center;
}
</style>
