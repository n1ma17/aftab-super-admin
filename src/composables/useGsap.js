import { onMounted, onUnmounted } from 'vue'
import { gsap } from 'gsap'

/**
 * Composable برای استفاده راحت‌تر از GSAP در Vue 3
 * @param {Object} options - تنظیمات انیمیشن
 * @returns {Object} - متدهای کنترل انیمیشن
 */
export function useGsap(options = {}) {
  let animation = null

  const animate = (targets, vars) => {
    return gsap.to(targets, vars)
  }

  const animateFrom = (targets, vars) => {
    return gsap.from(targets, vars)
  }

  const animateFromTo = (targets, fromVars, toVars) => {
    return gsap.fromTo(targets, fromVars, toVars)
  }

  const timeline = (vars) => {
    return gsap.timeline(vars)
  }

  const kill = () => {
    if (animation) {
      animation.kill()
    }
  }

  onUnmounted(() => {
    kill()
  })

  return {
    animate,
    animateFrom,
    animateFromTo,
    timeline,
    kill,
    gsap, // دسترسی مستقیم به GSAP در صورت نیاز
  }
}

