<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
import SharedCard from '@/components/shared/SharedCard.vue'
import { useRouter } from 'vuetify/lib/composables/router.mjs'

const calendar = ref()

const value = ref('')

function nowY() {
  return calendar.value ? calendar.value.timeToY(calendar.value.times.now) + 'px' : '-10px'
}

let updateInterval = -1
onMounted(() => {
  scrollToTime()
  updateInterval = setInterval(() => calendar.value?.updateTimes(), 60_000)
})

onUnmounted(() => {
  clearInterval(updateInterval)
})

function getCurrentTime() {
  return calendar.value ? calendar.value.times.now.hour * 60 + calendar.value.times.now.minute : 0
}
function scrollToTime() {
  const time = getCurrentTime()
  const first = Math.max(0, time - (time % 30) - 30)
  calendar.value?.scrollToTime(first)
}
const router = useRouter()
</script>

<template>
  <SharedCard showDivider>
    <template #header>
      <div class="d-flex align-center justify-space-between" style="width: 100%; gap: 12px">
        <div class="d-flex align-center" style="gap: 8px">
          <ThemifyIcon name="calendar" size="32" style="color: var(--v-theme-primary)" />
          <h2 class="text-h6 font-weight-bold">تقویم</h2>
        </div>
        <v-btn
          color="primary"
          class="font-weight-medium"
          rounded="xl"
          @click="router.push('/calendar')"
        >
          مشاهده تقویم
        </v-btn>
      </div>
    </template>
    <template #content>
      <v-calendar
        ref="calendar"
        v-model="value"
        type="week"
        style="width: 500px; height: 500px; direction: ltr"
      >
        <template v-slot:day-body="{ date, week }">
          <div
            :class="{ first: date === week[0].date }"
            :style="{ top: nowY() }"
            class="v-current-time"
          ></div>
        </template>
      </v-calendar>
    </template>
  </SharedCard>
</template>

<style lang="scss" scoped>
.v-current-time {
  height: 2px;
  background-color: #ea4335;
  position: absolute;
  left: -1px;
  right: 0;
  pointer-events: none;

  &.first::before {
    content: '';
    position: absolute;
    background-color: #ea4335;

    border-radius: 50%;
    margin-top: -5px;
    margin-left: -6.5px;
  }
}
</style>
