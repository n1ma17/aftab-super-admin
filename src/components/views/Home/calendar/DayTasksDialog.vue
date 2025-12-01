<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { toPersianDigits, persianMonthNames } from '@/composables/useJalaliCalendar'
import moment from 'jalali-moment'

const isOpen = ref(false)
const dayCell = ref(null)
const tasksLocal = ref([])

const title = computed(() => {
  if (!dayCell.value) return ''
  const { jYear, jMonth, jDay } = dayCell.value
  const name = persianMonthNames[jMonth - 1]
  const weekday = moment(`${jYear}/${jMonth}/${jDay}`, 'jYYYY/jM/jD').locale('fa').format('dddd')
  return `${weekday} ( ${toPersianDigits(jDay)} ${name} ${toPersianDigits(jYear)} )`
})

// Day timeline (12 AM -> 11 PM)
const startHour = 0
const endHour = 23
const pxPerMinute = 1.2

function parseTimeToMinutes(timeStr) {
  const m = String(timeStr ?? '').match(/^(\d{1,2}):(\d{2})$/)
  if (!m) return null
  const hh = Number(m[1])
  const mm = Number(m[2])
  if (Number.isNaN(hh) || Number.isNaN(mm)) return null
  return hh * 60 + mm
}

const gridHeight = computed(() => Math.max(0, (endHour - startHour) * 60 * pxPerMinute))
const hoursList = computed(() =>
  Array.from({ length: endHour - startHour + 1 }, (_, i) => startHour + i)
)
function formatHour(h) {
  if (h === 0) return '12 AM'
  if (h === 12) return '12 PM'
  if (h < 12) return `${h} AM`
  return `${h - 12} PM`
}

const eventItems = computed(() => {
  const startMin = startHour * 60
  const endMin = endHour * 60
  return (tasksLocal.value || [])
    .map((t, i) => {
      const mins = parseTimeToMinutes(t.time)
      if (mins == null) return null
      const clamped = Math.min(Math.max(mins, startMin), endMin)
      return {
        key: i,
        title: t.title || '',
        color: t.color || '#888',
        time: t.time,
        top: (clamped - startMin) * pxPerMinute,
      }
    })
    .filter(Boolean)
    .sort((a, b) => a.top - b.top)
})

// Current time indicator
const tick = ref(Date.now())
let timer = null
onMounted(() => {
  timer = setInterval(() => (tick.value = Date.now()), 60_000)
})
onUnmounted(() => {
  if (timer) clearInterval(timer)
})
const nowIndicator = computed(() => {
  if (!dayCell.value) return { show: false, top: 0 }
  const now = moment(tick.value)
  const jy = Number(now.format('jYYYY'))
  const jm = Number(now.format('jM'))
  const jd = Number(now.format('jD'))
  const sameDay =
    jy === dayCell.value.jYear && jm === dayCell.value.jMonth && jd === dayCell.value.jDay
  if (!sameDay) return { show: false, top: 0 }
  const minutes = now.hours() * 60 + now.minutes()
  const startMin = startHour * 60
  const endMin = endHour * 60
  if (minutes < startMin || minutes > endMin) return { show: false, top: 0 }
  return { show: true, top: (minutes - startMin) * pxPerMinute }
})

function open(cell, tasks) {
  dayCell.value = cell
  tasksLocal.value = Array.isArray(tasks) ? [...tasks] : []
  isOpen.value = true
}
function close() {
  isOpen.value = false
  dayCell.value = null
  tasksLocal.value = []
}

defineExpose({ open, close })
</script>

<template>
  <v-dialog v-model="isOpen" transition="dialog-bottom-transition" fullscreen>
    <v-card variant="flat" elevation="20">
      <v-card-title class="card-header">
        <div class="d-flex align-center justify-space-between">
          <span>{{ title }}</span>
          <v-spacer />
          <v-btn icon variant="text" @click="close" aria-label="بستن">
            <ThemifyIcon name="close" />
          </v-btn>
        </div>
      </v-card-title>

      <v-card-text class="day-wrap">
        <div class="hours-col" :style="{ height: gridHeight + 'px' }">
          <div
            v-for="h in hoursList"
            :key="h"
            class="hour-label"
            :style="{ top: (h - startHour) * 60 * pxPerMinute + 'px' }"
          >
            {{ formatHour(h) }}
          </div>
        </div>
        <div class="grid-col">
          <div class="day-grid" :style="{ height: gridHeight + 'px' }">
            <div
              v-for="h in hoursList"
              :key="'line-' + h"
              class="hour-line"
              :style="{ top: (h - startHour) * 60 * pxPerMinute + 'px' }"
            />
            <div
              v-if="nowIndicator.show"
              class="now-line"
              :style="{ top: nowIndicator.top + 'px' }"
            >
              <span class="now-dot"></span>
            </div>
            <div
              v-for="ev in eventItems"
              :key="ev.key"
              class="event-pill"
              :style="{
                top: ev.top + 'px',
                '--task-color': ev.color,
              }"
              :title="ev.time + ' - ' + ev.title"
            >
              <span class="ev-title">{{ ev.title }}</span>
              <span class="ev-time">{{ ev.time }}</span>
            </div>
          </div>
        </div>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<style scoped>
.day-wrap {
  display: grid;
  grid-template-columns: 88px 1fr;
  gap: 12px;
  height: calc(100vh - 112px);
  overflow: auto;
}
.hours-col {
  position: relative;
}
.hour-label {
  position: absolute;
  transform: translateY(-8px);
  color: rgba(0, 0, 0, 0.6);
  font-weight: 600;
  font-size: 12px;
  padding-inline-end: 8px;
  text-align: start;
  width: 100%;
  direction: ltr;
  unicode-bidi: embed;
}
.grid-col {
  position: relative;
}
.day-grid {
  position: relative;
  width: 100%;
  background: linear-gradient(to bottom, transparent, transparent), #fff;
  border: none;
}
.hour-line {
  position: absolute;
  left: 0;
  right: 0;
  height: 1px;
  background: rgba(0, 0, 0, 0.08);
}
.now-line {
  position: absolute;
  left: 0;
  right: 0;
  height: 2px;
  background: #ef4444;
  pointer-events: none;
  z-index: 3;
}
.now-dot {
  position: absolute;
  left: 0px;
  top: -4px;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #ef4444;
  z-index: 4;
}
.event-pill {
  position: absolute;
  left: 8px;
  right: 8px;
  height: 20px;
  padding: 0px 12px;
  border-radius: 4px;
  background: var(--task-color, #fff);
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
}
.ev-time {
  color: #fff;
  font-weight: 600;
  font-size: 10px;
  direction: ltr;
  unicode-bidi: embed;
}
.ev-title {
  font-weight: 600;
  font-size: 10px;
}
</style>
