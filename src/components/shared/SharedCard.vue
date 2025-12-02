<script setup>
import ThemifyIcon from '@/components/icons/ThemifyIcon.vue'

const props = defineProps({
  title: { type: String, default: '' },
  subtitle: { type: String, default: '' },
  icon: { type: String, default: '' },
  iconSize: { type: Number, default: 24 },
  iconColor: { type: String, default: '' },
  fullWidth: { type: Boolean, default: false },

  clickable: { type: Boolean, default: false },
  size: {
    type: String,
    default: 'md',
    validator: v => ['sm', 'md', 'lg', 'xl'].includes(v),
  },

  disabled: { type: Boolean, default: false },
  loading: { type: Boolean, default: false },
})

const emit = defineEmits(['click', 'iconClick'])

const handleClick = e => {
  if (!props.disabled && !props.loading) emit('click', e)
}

const handleIconClick = e => {
  e.stopPropagation()
  if (!props.disabled && !props.loading) emit('iconClick', e)
}
</script>

<template>
  <v-card
    class="pa-8"
    :class="{ 'shared-card': clickable }"
    :style="{ width: fullWidth ? '100% !important' : 'fit-content', border: '1px solid #ddd' }"
    :disabled="disabled"
    @click="handleClick"
    variant="outlined"
    rounded="lg"
    elevation="0"
  >
    <v-overlay :model-value="loading" contained persistent scrim="rgba(255,255,255,0.6)">
      <v-progress-circular indeterminate color="secondary" />
    </v-overlay>

    <template v-if="title || subtitle || icon || $slots.header">
      <div class="mb-3">
        <slot name="header">
          <div class="d-flex align-start justify-space-between" style="gap: 12px">
            <div class="d-flex align-start" style="gap: 12px; flex: 1 1 auto">
              <div
                v-if="icon"
                class="icon-wrapper"
                @click="handleIconClick"
                style="cursor: pointer"
              >
                <div
                  style="
                    width: 48px;
                    height: 48px;
                    border-radius: 12px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                  "
                >
                  <ThemifyIcon :name="icon" :size="iconSize" />
                </div>
              </div>
              <div v-if="title || subtitle" style="flex: 1 1 auto">
                <h3 class="text-subtitle-1 font-weight-bold">
                  {{ title }}
                </h3>
                <p class="text-body-2">
                  {{ subtitle }}
                </p>
              </div>
            </div>
            <div v-if="$slots.actions" style="flex-shrink: 0">
              <slot name="actions"></slot>
            </div>
          </div>
        </slot>
      </div>
    </template>

    <v-divider v-if="showDivider && (title || subtitle || icon || $slots.header)" class="mb-4" />

    <div v-if="$slots.content">
      <slot name="content"></slot>
    </div>

    <div v-if="$slots.footer" class="mt-4 pt-4" style="border-top: 1px solid rgba(0, 0, 0, 0.12)">
      <slot name="footer"></slot>
    </div>
  </v-card>
</template>

<style lang="scss" scoped>
.shared-card {
  width: fit-content;
  height: 620px;
  overflow-y: auto;
  position: relative;
  border: 1px solid #ddd;
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-2px);
  }
  /* hide scrollbar */
  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
  overflow-y: auto;
}
</style>
