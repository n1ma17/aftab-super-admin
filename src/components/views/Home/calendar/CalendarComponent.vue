<script setup>
import { ref } from 'vue'
import useJalaliCalendar from '@/composables/useJalaliCalendar'
import { useCalendarStore } from '@/stores/calendar'
import TaskDialog from '@/components/views/Home/calendar/TaskDialog.vue'
import DayDialog from '@/components/views/Home/calendar/DayDialog.vue'
import DayTasksDialog from '@/components/views/Home/calendar/DayTasksDialog.vue'

const { headerTitle, monthCells, prevMonth, nextMonth, goToToday } = useJalaliCalendar()
const calendarStore = useCalendarStore()

const taskDialogRef = ref()
const dayDialogRef = ref()
const dayTasksDialogRef = ref()
const weekDayNames = ['شنبه', 'یکشنبه', 'دوشنبه', 'سه‌شنبه', 'چهارشنبه', 'پنجشنبه', 'جمعه']

function openDay(cell) {
  if (cell?.inCurrent) {
    dayDialogRef.value?.open(cell)
  }
}

const colorOptions = ['#ef4444', '#f59e0b', '#22c55e', '#0ea5e9', '#8b5cf6', '#6b7280']

function openTaskMenu(task, e) {
  if (e && typeof e.stopPropagation === 'function') e.stopPropagation()
  taskDialogRef.value?.open(task)
}

function handleAddTask(payload) {
  calendarStore.addTask(payload)
}

function handleDeleteTask(task) {
  calendarStore.deleteTask(task)
}

function handleSetTaskColor({ task, color }) {
  calendarStore.updateTaskColor(task, color)
}

function handleUpdateTask({ oldTask, newTask }) {
  calendarStore.updateTask(oldTask, newTask)
}

function openMoreForDay(cell) {
  const key = `${cell.jYear}-${cell.jMonth}-${cell.jDay}`
  const list = calendarStore.tasksByKey[key] || []
  dayTasksDialogRef.value?.open(cell, list)
  dayCell.value = cell
  isDayTasksDialogOpen.value = true
}

const isDayTasksDialogOpen = ref(false)
const dayCell = ref(null)
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
          <div v-for="(d, i) in weekDayNames" :key="i" class="cell day-name">
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
            <div class="day-bg">{{ cell.jDay }}</div>
            <div class="tasks">
              <div
                v-for="(t, ti) in (
                  calendarStore.tasksByKey[`${cell.jYear}-${cell.jMonth}-${cell.jDay}`] || []
                ).slice(0, 3)"
                :key="ti"
                class="task"
                @click.stop="openTaskMenu(t, $event)"
              >
                <span class="task-title" :style="{ '--task-color': t.color || '#888' }">{{
                  t.title
                }}</span>
              </div>
              <v-btn
                v-if="
                  (calendarStore.tasksByKey[`${cell.jYear}-${cell.jMonth}-${cell.jDay}`] || [])
                    .length > 3
                "
                size="x-small"
                variant="text"
                class="show-more"
                @click.stop="openMoreForDay(cell)"
              >
                نمایش بیشتر (+{{
                  (calendarStore.tasksByKey[`${cell.jYear}-${cell.jMonth}-${cell.jDay}`] || [])
                    .length - 3
                }})
              </v-btn>
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
    @update:task="handleUpdateTask"
  />
  <DayDialog ref="dayDialogRef" @add="handleAddTask" />
  <v-dialog v-model="isDayTasksDialogOpen" transition="dialog-bottom-transition" fullscreen>
    <DayTasksDialog
      ref="dayTasksDialogRef"
      :cell="dayCell"
      :tasks="calendarStore.tasks"
      @closeDayTasksDialog="isDayTasksDialogOpen = false"
    />
  </v-dialog>
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
.day-bg {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  font-weight: 800;
  font-size: 58px;
  line-height: 1;
  color: rgba(0, 0, 0, 0.08);
  pointer-events: none;
  user-select: none;
  padding: 12px;
}
.today .day-bg {
  color: $primary;
  opacity: 1;
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
  gap: 2px;
  width: 100%;
  margin-top: 4px;
  position: relative;
  z-index: 1;
}
.show-more {
  align-self: flex-start;
  margin-top: 2px;
  padding: 0 4px;
  min-height: 22px;
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
  padding: 2px 10px;
  border-radius: 8px;
  font-size: 12px;
  line-height: 1.2;
  white-space: ellipsis;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 100%;
  border-radius: 8px;
  font-size: 12px;
  line-height: 1.2;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 100%;
  border-radius: 8px;
  font-size: 12px;
  font-weight: 700;
  line-height: 1.2;
  color: $primary;
  background: rgba(0, 0, 0, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.3);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
  backdrop-filter: blur(2px);
  border: 1px solid var(--task-color, #33333323);
}

.not-current {
  opacity: 0.5;
  color: rgba(145, 145, 145, 0.61);
}
.today {
  border-top: 2px solid $primary;
  font-weight: 600;
  font-size: 18px;
}
.friday {
  color: #ef4444;
}
</style>
