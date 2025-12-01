<script setup>
import { ref, computed } from 'vue'
import useJalaliCalendar from '@/composables/useJalaliCalendar'
import { useCalendarStore } from '@/stores/calendar'
import DayTasksDialog from '@/components/views/Home/calendar/DayTasksDialog.vue'
const { monthCells } = useJalaliCalendar()
const calendarStore = useCalendarStore()
const dayTasksDialogRef = ref()
// Find today's cell from monthCells
const dayCell = computed(() => {
  const today = monthCells.value.find(cell => cell.isToday && cell.inCurrent)
  return today || null
})
</script>

<template>
  <div class="day-plan">
    <DayTasksDialog
      ref="dayTasksDialogRef"
      :cell="dayCell"
      :tasks="calendarStore.tasks"
      isFlatCard
    />
  </div>
</template>

<style lang="scss" scoped>
.day-plan {
  width: 470px;
  height: 620px;
  overflow: scroll;
  border: 1px solid rgba(0, 0, 0, 0.12);
  border-radius: 8px;
  /* hide scrollbar */
  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
