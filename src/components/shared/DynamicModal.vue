<script setup>
import { ref, watch, nextTick, onMounted, onUnmounted } from 'vue'
import { gsap } from 'gsap'
import ThemifyIcon from '@/components/icons/ThemifyIcon.vue'

const props = defineProps({
  // v-model برای کنترل باز و بسته بودن
  modelValue: {
    type: Boolean,
    default: false,
  },
  // عنوان مودال
  title: {
    type: String,
    default: '',
  },
  // اندازه مودال: sm, md, lg, xl, fullscreen
  size: {
    type: String,
    default: 'md',
    validator: value => ['sm', 'md', 'lg', 'xl', 'fullscreen'].includes(value),
  },
  // نمایش دکمه بستن
  showCloseButton: {
    type: Boolean,
    default: true,
  },
  // بستن با کلیک روی backdrop
  closeOnBackdrop: {
    type: Boolean,
    default: true,
  },
  // بستن با دکمه Escape
  closeOnEscape: {
    type: Boolean,
    default: true,
  },
  // نمایش header
  showHeader: {
    type: Boolean,
    default: true,
  },
  // نمایش footer
  showFooter: {
    type: Boolean,
    default: false,
  },
  // تنظیمات دکمه‌های footer
  buttons: {
    type: Array,
    default: () => [],
    // فرمت: [{ label: 'تایید', variant: 'primary', action: 'confirm' }, ...]
  },
  // کلاس‌های سفارشی برای backdrop
  backdropClass: {
    type: String,
    default: '',
  },
  // کلاس‌های سفارشی برای محتوا
  contentClass: {
    type: String,
    default: '',
  },
  // انیمیشن ورود
  enterAnimation: {
    type: String,
    default: 'fade',
    validator: value => ['fade', 'scale', 'slide', 'zoom'].includes(value),
  },
  // انیمیشن خروج
  exitAnimation: {
    type: String,
    default: 'fade',
    validator: value => ['fade', 'scale', 'slide', 'zoom'].includes(value),
  },
})

const emit = defineEmits(['update:modelValue', 'close', 'confirm', 'cancel'])

const backdropRef = ref(null)
const modalRef = ref(null)
const contentRef = ref(null)

// تابع بستن مودال
const closeModal = () => {
  emit('update:modelValue', false)
  emit('close')
}

// تابع اجرای action دکمه‌ها
const handleButtonAction = button => {
  if (button.action === 'close' || button.action === 'cancel') {
    closeModal()
    if (button.action === 'cancel') {
      emit('cancel')
    }
  } else if (button.action === 'confirm') {
    emit('confirm', button)
  } else if (button.handler && typeof button.handler === 'function') {
    button.handler()
  }
}

// مدیریت دکمه Escape
const handleEscape = e => {
  if (props.closeOnEscape && props.modelValue && e.key === 'Escape') {
    closeModal()
  }
}

// انیمیشن ورود
const animateIn = async () => {
  await nextTick()
  if (!backdropRef.value || !modalRef.value) return

  const backdrop = backdropRef.value
  const modal = modalRef.value

  // تنظیم حالت اولیه
  gsap.set(backdrop, { opacity: 0 })

  switch (props.enterAnimation) {
    case 'scale':
      gsap.set(modal, { scale: 0.8, opacity: 0 })
      break
    case 'slide':
      gsap.set(modal, { y: -50, opacity: 0 })
      break
    case 'zoom':
      gsap.set(modal, { scale: 1.1, opacity: 0 })
      break
    default: // fade
      gsap.set(modal, { opacity: 0 })
  }

  // انیمیشن
  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
  tl.to(backdrop, { opacity: 1, duration: 0.3 })

  switch (props.enterAnimation) {
    case 'scale':
      tl.to(modal, { scale: 1, opacity: 1, duration: 0.4 }, '-=0.2')
      break
    case 'slide':
      tl.to(modal, { y: 0, opacity: 1, duration: 0.4 }, '-=0.2')
      break
    case 'zoom':
      tl.to(modal, { scale: 1, opacity: 1, duration: 0.4 }, '-=0.2')
      break
    default:
      tl.to(modal, { opacity: 1, duration: 0.3 }, '-=0.2')
  }
}

// انیمیشن خروج
const animateOut = callback => {
  if (!backdropRef.value || !modalRef.value) {
    callback?.()
    return
  }

  const backdrop = backdropRef.value
  const modal = modalRef.value

  const tl = gsap.timeline({
    defaults: { ease: 'power3.in' },
    onComplete: callback,
  })

  switch (props.exitAnimation) {
    case 'scale':
      tl.to(modal, { scale: 0.8, opacity: 0, duration: 0.3 })
      break
    case 'slide':
      tl.to(modal, { y: -50, opacity: 0, duration: 0.3 })
      break
    case 'zoom':
      tl.to(modal, { scale: 1.1, opacity: 0, duration: 0.3 })
      break
    default:
      tl.to(modal, { opacity: 0, duration: 0.25 })
  }

  tl.to(backdrop, { opacity: 0, duration: 0.25 }, '-=0.2')
}

// مدیریت قفل اسکرول body
const lockBodyScroll = () => {
  document.body.style.overflow = 'hidden'
}

const unlockBodyScroll = () => {
  document.body.style.overflow = ''
}

// Watch برای تغییر modelValue
watch(
  () => props.modelValue,
  newValue => {
    if (newValue) {
      lockBodyScroll()
      animateIn()
    } else {
      animateOut(() => {
        unlockBodyScroll()
      })
    }
  }
)

// مدیریت رویداد Escape
onMounted(() => {
  document.addEventListener('keydown', handleEscape)
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleEscape)
  unlockBodyScroll()
})

// کلاس‌های اندازه
const sizeClasses = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
  xl: 'max-w-xl',
  fullscreen: 'max-w-full w-full h-full max-h-full m-0 rounded-none',
}

// کلاس‌های variant دکمه‌ها
const buttonVariantClasses = {
  primary: 'bg-secondary text-white hover:bg-secondary-600',
  secondary: 'bg-gray-600 text-white hover:bg-gray-700',
  success: 'bg-success-500 text-white hover:bg-success-600',
  warning: 'bg-warning-500 text-white hover:bg-warning-600',
  danger: 'bg-error-500 text-white hover:bg-error-600',
  info: 'bg-info-500 text-white hover:bg-info-600',
  outline: 'border border-gray-300 text-gray-700 hover:bg-gray-50',
}
</script>

<template>
  <Teleport to="body">
    <Transition name="modal">
      <div
        v-if="modelValue"
        ref="backdropRef"
        class="fixed inset-0 z-[9999] flex items-center justify-center"
        :class="backdropClass"
        @click.self="closeOnBackdrop ? closeModal() : null"
      >
        <!-- Backdrop -->
        <div class="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>

        <!-- Modal Container -->
        <div
          ref="modalRef"
          class="relative z-10 w-full mx-4"
          :class="[sizeClasses[size], contentClass]"
        >
          <!-- Modal Content -->
          <div
            ref="contentRef"
            class="bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
            :class="size === 'fullscreen' ? 'h-full rounded-none' : ''"
          >
            <!-- Header -->
            <div
              v-if="showHeader && (title || $slots.header || showCloseButton)"
              class="flex items-center justify-between px-6 py-4 border-b border-primary-200"
            >
              <!-- Custom Header Slot -->
              <slot name="header">
                <h3 v-if="title" class="text-xl font-bold text-primary">{{ title }}</h3>
              </slot>

              <!-- Close Button -->
              <button
                v-if="showCloseButton"
                @click="closeModal"
                class="text-primary transition-colors p-2 hover:bg-white/10 rounded-lg"
              >
                <ThemifyIcon name="close" :size="20" />
              </button>
            </div>

            <!-- Body -->
            <div
              class="flex-1 overflow-y-auto px-6 py-8"
              :class="size === 'fullscreen' ? 'h-full' : ''"
            >
              <slot></slot>
            </div>

            <!-- Footer -->
            <div
              v-if="showFooter && (buttons.length > 0 || $slots.footer)"
              class="flex items-center justify-end gap-3 px-6 py-4 border-t border-gray-200 bg-gray-50"
            >
              <!-- Custom Footer Slot -->
              <slot name="footer">
                <template v-if="buttons.length > 0">
                  <button
                    v-for="(button, index) in buttons"
                    :key="index"
                    @click="handleButtonAction(button)"
                    :class="[
                      'px-4 py-2 rounded-lg font-medium transition-all duration-200',
                      buttonVariantClasses[button.variant || 'primary'],
                      button.class || '',
                    ]"
                    :disabled="button.disabled"
                  >
                    {{ button.label }}
                  </button>
                </template>
              </slot>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style lang="scss" scoped>
// جلوگیری از اسکرول body وقتی مودال باز است
.modal-enter-active,
.modal-leave-active {
  overflow: hidden;
}

// استایل‌های اضافی برای backdrop
.backdrop-blur-sm {
  backdrop-filter: blur(4px);
}
</style>
