<script setup>
import { ref, computed } from 'vue'
import useJalaliCalendar, { toPersianDigits, weekDayShort } from '@/composables/useJalaliCalendar'
import moment from 'jalali-moment'
import TaskDialog from '@/components/views/Home/calendar/TaskDialog.vue'
import DayDialog from '@/components/views/Home/calendar/DayDialog.vue'

const { headerTitle, monthCells, prevMonth, nextMonth, goToToday } = useJalaliCalendar()

const taskDialogRef = ref()
const dayDialogRef = ref()
function openDay(cell) {
  if (cell?.inCurrent) {
    dayDialogRef.value?.open(cell)
  }
}
// Convert Gregorian string (YYYY-MM-DD or YYYY/MM/DD) to Jalali parts
function gregorianToJalaliParts(dateStr) {
  const m = moment(dateStr, ['YYYY-MM-DD', 'YYYY/M/D', 'YYYY/MM/DD', 'YYYY-M-D'], true)
  if (!m.isValid()) return null
  return {
    jy: Number(m.format('jYYYY')),
    jm: Number(m.format('jM')),
    jd: Number(m.format('jD')),
  }
}
function parseTimeToMinutes(timeStr) {
  const m = String(timeStr ?? '').match(/^(\d{1,2}):(\d{2})$/)
  if (!m) return Number.POSITIVE_INFINITY
  const hh = Number(m[1])
  const mm = Number(m[2])
  if (Number.isNaN(hh) || Number.isNaN(mm)) return Number.POSITIVE_INFINITY
  return hh * 60 + mm
}
const tasksByKey = computed(() => {
  const dict = {}
  for (const t of tasks.value) {
    if (!t || !t.date) continue
    const p = gregorianToJalaliParts(t.date)
    if (!p) continue
    const key = `${p.jy}-${p.jm}-${p.jd}`
    if (!dict[key]) dict[key] = []
    dict[key].push(t)
  }
  for (const k in dict) {
    dict[k].sort((a, b) => parseTimeToMinutes(a.time) - parseTimeToMinutes(b.time))
  }
  return dict
})
const tasks = ref([
  {
    title: 'Task 1',
    description: 'Description 1',
    date: '2025-12-02',
    time: '14:00',
    color: 'red',
    gust: '',
  },
  {
    title: 'Task 2',
    description: 'Description 2',
    date: '2025-12-02',
    time: '12:00',
    color: 'blue',
    gust: '',
  },
  {
    title: 'Task 3',
    description: 'Description 2',
    date: '2025-12-03',
    time: '10:00',
    color: 'blue',
    gust: '',
  },
  {
    title: 'Task 4',
    description: 'Description 3',
    date: '2025-12-06',
    time: '10:00',
    color: 'green',
    gust: '',
  },
])

function handleAddTask(payload) {
  if (!payload?.title) return
  tasks.value.push({
    title: payload.title,
    description: '',
    date: payload.date,
    time: payload.time || '00:00',
    color: '#6b7280',
    gust: payload.gust || '',
  })
}

const colorOptions = ['#ef4444', '#f59e0b', '#22c55e', '#0ea5e9', '#8b5cf6', '#6b7280']
function openTaskMenu(task, e) {
  if (e && typeof e.stopPropagation === 'function') e.stopPropagation()
  taskDialogRef.value?.open(task)
}
function handleDeleteTask(task) {
  tasks.value = tasks.value.filter(x => x !== task)
}
function handleSetTaskColor({ task, color }) {
  if (!task) return
  task.color = color
}
</script>

<template>
  <div class="calendar-header mb-4">
    <div class="title">
      <h2 class="text-h6 font-weight-bold">{{ headerTitle }}</h2>
    </div>
    <div class="actions">
      <v-btn icon variant="text" @click="prevMonth" aria-label="ماه قبل">
        <ThemifyIcon name="angle-double-right" size="18" />
      </v-btn>
      <v-btn rounded="lg" color="primary" variant="outlined" @click="goToToday"> امروز </v-btn>
      <v-btn icon variant="text" @click="nextMonth" aria-label="ماه بعد">
        <ThemifyIcon name="angle-double-left" size="18" />
      </v-btn>
    </div>
  </div>

  <v-card variant="flat" elevation="2" rounded="xl">
    <v-card-text>
      <div class="calendar">
        <div class="grid header">
          <div v-for="(d, i) in weekDayShort" :key="i" class="cell day-name">
            {{ d }}
          </div>
        </div>

        <div class="grid body">
          <div
            v-for="(cell, idx) in monthCells"
            :key="idx"
            class="cell day"
            :class="{
              'not-current': !cell.inCurrent,
              today: cell.isToday,
              friday: idx % 7 === 6,
            }"
            @click="openDay(cell)"
          >
            <span class="day-number">{{ toPersianDigits(cell.jDay) }}</span>
            <div class="tasks">
              <div
                v-for="(t, ti) in tasksByKey[`${cell.jYear}-${cell.jMonth}-${cell.jDay}`] || []"
                :key="ti"
                class="task"
                @click.stop="openTaskMenu(t, $event)"
              >
                <span class="task-title" :style="{ backgroundColor: t.color || '#888' }">{{
                  t.title
                }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </v-card-text>
  </v-card>
  <TaskDialog
    ref="taskDialogRef"
    :color-options="colorOptions"
    @delete="handleDeleteTask"
    @setColor="handleSetTaskColor"
  />
  <DayDialog ref="dayDialogRef" @add="handleAddTask" />
</template>

<style lang="scss" scoped>
$primary: #14121c;
.calendar-header {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  gap: 12px;
}
.actions {
  display: flex;
  gap: 8px;
  align-items: center;
}

.calendar {
  width: 100%;
  height: 100%;
}

.grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
}

.cell {
  border-right: 1px solid rgba(0, 0, 0, 0.12);
  border-bottom: 1px solid rgba(0, 0, 0, 0.12);
  background-color: #fff;
  padding: 8px;
  width: 100%;
  height: calc(100dvh / 8);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
}

.header > .cell {
  background: #fff;
  color: $primary;
  border: none;
  width: 100%;
  height: 30px;
  font-weight: 600;
}

.body > .cell:nth-child(7n + 1) {
  border-right: none;
}

.body > .cell:nth-last-child(-n + 7) {
  border-bottom: none;
}

.day {
  position: relative;
  color: rgba(0, 0, 0, 0.8);
}
.day-name {
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgba(0, 0, 0, 0.6);
}
.day-number {
  font-weight: 600;
}

.tasks {
  display: flex;
  flex-direction: column;
  gap: 4px;
  width: 100%;
  margin-top: 4px;
}
.task {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  line-height: 1.2;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.task-title {
  overflow: hidden;
  text-overflow: ellipsis;
  width: 100%;
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 12px;
  line-height: 1.2;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: #fff;
}

.not-current {
  opacity: 0.5;
  color: rgba(145, 145, 145, 0.61);
}
.today {
  border: 2px solid $primary;
  font-weight: 600;
  font-size: 18px;
}
.friday {
  color: #ef4444;
}
</style>
