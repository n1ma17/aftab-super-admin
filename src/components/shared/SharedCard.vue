<script setup>
import { ref, computed, onMounted } from 'vue'
import { gsap } from 'gsap'
import ThemifyIcon from '@/components/icons/ThemifyIcon.vue'

const props = defineProps({
  // عنوان کارت
  title: {
    type: String,
    default: '',
  },
  // زیرعنوان کارت
  subtitle: {
    type: String,
    default: '',
  },
  // آیکون
  icon: {
    type: String,
    default: '',
  },
  // اندازه آیکون
  iconSize: {
    type: Number,
    default: 24,
  },
  // رنگ آیکون
  iconColor: {
    type: String,
    default: '',
  },
  // نوع کارت: default, outlined, elevated, gradient, glass
  variant: {
    type: String,
    default: 'default',
    validator: value => ['default', 'outlined', 'elevated', 'gradient', 'glass'].includes(value),
  },
  // رنگ تم: primary, secondary, info, success, warning, error
  color: {
    type: String,
    default: 'primary',
    validator: value =>
      ['primary', 'secondary', 'info', 'success', 'warning', 'error', 'gray'].includes(value),
  },
  // اندازه کارت: sm, md, lg, xl
  size: {
    type: String,
    default: 'md',
    validator: value => ['sm', 'md', 'lg', 'xl'].includes(value),
  },
  // قابل کلیک بودن
  clickable: {
    type: Boolean,
    default: false,
  },
  // نمایش سایه در hover
  hoverable: {
    type: Boolean,
    default: false,
  },
  // نمایش بادج
  badge: {
    type: [String, Number],
    default: '',
  },
  // موقعیت بادج: top-left, top-right, bottom-left, bottom-right
  badgePosition: {
    type: String,
    default: 'top-right',
    validator: value => ['top-left', 'top-right', 'bottom-left', 'bottom-right'].includes(value),
  },
  // رنگ بادج
  badgeColor: {
    type: String,
    default: 'secondary',
  },
  // نمایش دیوایدر (خط جداکننده)
  showDivider: {
    type: Boolean,
    default: false,
  },
  // Padding سفارشی
  padding: {
    type: String,
    default: '',
  },
  // ارتفاع ثابت
  height: {
    type: String,
    default: '',
  },
  // عرض کامل
  fullWidth: {
    type: Boolean,
    default: false,
  },
  // غیرفعال بودن
  disabled: {
    type: Boolean,
    default: false,
  },
  // نمایش لودینگ
  loading: {
    type: Boolean,
    default: false,
  },
  // انیمیشن ورود
  animated: {
    type: Boolean,
    default: true,
  },
  // تاخیر انیمیشن (برای استگر)
  animationDelay: {
    type: Number,
    default: 0,
  },
})

const emit = defineEmits(['click', 'iconClick'])

const cardRef = ref(null)

// کلاس‌های variant
const variantClasses = computed(() => {
  const classes = {
    default: 'bg-white border border-gray-200 shadow-sm',
    outlined: `bg-transparent border-2 border-${props.color}-500`,
    elevated: `bg-white shadow-lg hover:shadow-2xl shadow-card`,
    gradient: `bg-gradient-to-br from-${props.color}-500 to-${props.color}-700 text-white border-none shadow-lg`,
    glass: 'bg-white/80 backdrop-blur-md border border-white/20 shadow-xl',
  }
  return classes[props.variant]
})

// کلاس‌های اندازه padding
const sizeClasses = computed(() => {
  if (props.padding) return props.padding

  const sizes = {
    sm: 'p-3',
    md: 'p-4',
    lg: 'p-6',
    xl: 'p-8',
  }
  return sizes[props.size]
})

// کلاس‌های clickable و hoverable
const interactionClasses = computed(() => {
  const classes = []
  if (props.clickable && !props.disabled) {
    classes.push('cursor-pointer transition-all duration-300')
  }
  if (props.hoverable && !props.disabled) {
    classes.push('hover:scale-[1.02] hover:shadow-xl')
  }
  if (props.disabled) {
    classes.push('opacity-50 cursor-not-allowed')
  }
  return classes.join(' ')
})

// موقعیت بادج
const badgePositionClasses = computed(() => {
  const positions = {
    'top-left': 'top-2 left-2',
    'top-right': 'top-2 right-2',
    'bottom-left': 'bottom-2 left-2',
    'bottom-right': 'bottom-2 right-2',
  }
  return positions[props.badgePosition]
})

// رنگ‌های تم
const themeColors = {
  primary: {
    bg: 'bg-primary',
    text: 'text-primary',
    border: 'border-primary-500',
    hover: 'hover:bg-primary-50',
  },
  secondary: {
    bg: 'bg-secondary',
    text: 'text-secondary',
    border: 'border-secondary-500',
    hover: 'hover:bg-secondary-50',
  },
  info: {
    bg: 'bg-info-500',
    text: 'text-info-500',
    border: 'border-info-500',
    hover: 'hover:bg-info-50',
  },
  success: {
    bg: 'bg-success-500',
    text: 'text-success-500',
    border: 'border-success-500',
    hover: 'hover:bg-success-50',
  },
  warning: {
    bg: 'bg-warning-500',
    text: 'text-warning-500',
    border: 'border-warning-500',
    hover: 'hover:bg-warning-50',
  },
  error: {
    bg: 'bg-error-500',
    text: 'text-error-500',
    border: 'border-error-500',
    hover: 'hover:bg-error-50',
  },
  gray: {
    bg: 'bg-gray-500',
    text: 'text-gray-500',
    border: 'border-gray-500',
    hover: 'hover:bg-gray-50',
  },
}

// کلیک روی کارت
const handleClick = event => {
  if (!props.disabled && !props.loading) {
    emit('click', event)
  }
}

// کلیک روی آیکون
const handleIconClick = event => {
  event.stopPropagation()
  if (!props.disabled && !props.loading) {
    emit('iconClick', event)
  }
}

// انیمیشن ورود
onMounted(() => {
  if (props.animated && cardRef.value) {
    gsap.fromTo(
      cardRef.value,
      {
        opacity: 0,
        y: 20,
        scale: 0.95,
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.5,
        delay: props.animationDelay,
        ease: 'power3.out',
      }
    )
  }
})
</script>

<template>
  <div
    ref="cardRef"
    class="shared-card rounded-xl overflow-hidden relative transition-all duration-300"
    :class="[
      variantClasses,
      sizeClasses,
      interactionClasses,
      {
        'w-full': fullWidth,
        'pointer-events-none': disabled,
      },
    ]"
    :style="{ height: height }"
    @click="handleClick"
  >
    <!-- Loading Overlay -->
    <div
      v-if="loading"
      class="absolute inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center z-50"
    >
      <div class="loading-spinner"></div>
    </div>

    <!-- Badge -->
    <div
      v-if="badge"
      class="absolute z-10 px-2.5 py-1 rounded-full text-xs font-bold shadow-md"
      :class="[badgePositionClasses, `${themeColors[badgeColor].bg} text-white`]"
    >
      {{ badge }}
    </div>

    <!-- Header Slot یا Title با Icon -->
    <div v-if="title || subtitle || icon || $slots.header" class="card-header mb-3">
      <slot name="header">
        <div class="flex items-start justify-between gap-3">
          <div class="flex items-start gap-3 flex-1">
            <!-- Icon -->
            <div
              v-if="icon"
              class="icon-wrapper flex-shrink-0 cursor-pointer transition-transform hover:scale-110"
              @click="handleIconClick"
            >
              <div
                class="w-12 h-12 rounded-xl flex items-center justify-center"
                :class="
                  variant === 'gradient' ? 'bg-white/20' : `${themeColors[color].bg} bg-opacity-10`
                "
              >
                <ThemifyIcon
                  :name="icon"
                  :size="iconSize"
                  :style="{ color: iconColor || (variant === 'gradient' ? '#fff' : '') }"
                  :class="!iconColor && variant !== 'gradient' ? themeColors[color].text : ''"
                />
              </div>
            </div>

            <!-- Title & Subtitle -->
            <div v-if="title || subtitle" class="flex-1">
              <h3
                v-if="title"
                class="text-lg font-bold mb-1"
                :class="variant === 'gradient' ? 'text-white' : 'text-gray-800'"
              >
                {{ title }}
              </h3>
              <p
                v-if="subtitle"
                class="text-sm"
                :class="variant === 'gradient' ? 'text-white/80' : 'text-gray-500'"
              >
                {{ subtitle }}
              </p>
            </div>
          </div>

          <!-- Actions Slot در Header -->
          <div v-if="$slots.actions" class="flex-shrink-0">
            <slot name="actions"></slot>
          </div>
        </div>
      </slot>
    </div>

    <!-- Divider -->
    <div
      v-if="showDivider && (title || subtitle || icon || $slots.header)"
      class="divider mb-4 border-t"
      :class="variant === 'gradient' ? 'border-white/20' : 'border-gray-200'"
    ></div>

    <!-- Content Slot -->
    <div v-if="$slots.content" class="card-content">
      <slot name="content"></slot>
    </div>

    <!-- Footer Slot -->
    <div
      v-if="$slots.footer"
      class="card-footer mt-4 pt-4 border-t"
      :class="variant === 'gradient' ? 'border-white/20' : 'border-gray-200'"
    >
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.shared-card {
  position: relative;

  // Hover Effects
  &:hover:not(.pointer-events-none) {
    transform: translateY(-2px);
  }
}

// Loading Spinner Animation
.loading-spinner {
  width: 40px;
  height: 40px;
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-top-color: #c493dc;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

// Gradient Backgrounds
.bg-gradient-to-br {
  background-image: linear-gradient(to bottom right, var(--tw-gradient-stops));
}
.shadow-card {
  box-shadow: 0 0px 20px rgba(0, 0, 0, 0.3);
  //   &:hover {
  //     box-shadow: 0 0px 20px rgba(0, 0, 0, 0.4);
  //   }
}
</style>
