<template>
  <i :class="iconClass" :style="iconStyle" />
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  size: {
    type: [String, Number],
    default: '16px',
  },
  color: {
    type: String,
    default: 'currentColor',
  },
})

const iconClass = computed(() => {
  return `ti ti-${props.name}`
})

const iconStyle = computed(() => {
  const sizeValue = typeof props.size === 'number' ? `${props.size}px` : props.size
  return {
    fontSize: sizeValue,
    color: props.color,
  }
})
</script>

<style scoped>
i {
  display: inline-block;
  vertical-align: middle;
}
</style>
