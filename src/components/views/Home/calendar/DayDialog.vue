<script setup>
import { ref, computed } from 'vue'
import { toPersianDigits, persianMonthNames } from '@/composables/useJalaliCalendar'
import TaskForm from '@/components/views/Home/calendar/TaskForm.vue'

const emit = defineEmits(['add'])

const isOpen = ref(false)
const selectedCell = ref(null)
const newTask = ref({
  title: '',
  date: '',
  time: '',
  gust: '',
})

function pad2(n) {
  return String(n).padStart(2, '0')
}
function formatDDMMYYYY(jy, jm, jd) {
  return `${pad2(jd)}/${pad2(jm)}/${jy}`
}

const selectedTitle = computed(() => {
  if (!selectedCell.value) return ''
  const { jYear, jMonth, jDay } = selectedCell.value
  const name = persianMonthNames[jMonth - 1]
  return `${toPersianDigits(jDay)} ${name} ${toPersianDigits(jYear)}`
})

function open(cell) {
  if (!cell) return
  selectedCell.value = cell
  newTask.value = {
    title: '',
    date: formatDDMMYYYY(cell.jYear, cell.jMonth, cell.jDay),
    time: '',
    gust: '',
  }
  dpYear.value = cell.jYear
  dpMonth.value = cell.jMonth
  dpOpen.value = false
  isOpen.value = true
}
function close() {
  isOpen.value = false
}

function addTaskFromModal() {
  if (!newTask.value?.title) return
  emit('add', { ...newTask.value })
  close()
}

// Mini Jalali datepicker state for the modal
const dpOpen = ref(false)
const dpYear = ref(1400)
const dpMonth = ref(1)

defineExpose({ open, close })
</script>

<template>
  <v-dialog v-model="isOpen" max-width="400">
    <v-card rounded="lg" style="width: 400px">
      <v-card-title class="text-subtitle-1 font-weight-bold">
        {{ selectedTitle }}
      </v-card-title>
      <v-card-text>
        <TaskForm v-model:task="newTask" @update:task="addTaskFromModal" @cancel="close" />
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<style scoped>
.mini-datepicker {
  border: 1px solid rgba(0, 0, 0, 0.12);
  border-radius: 8px;
  padding: 8px;
  background: #fff;
}
.mdp-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 6px;
}
.mdp-title {
  font-weight: 600;
}
.mdp-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 4px;
}
.mdp-week {
  margin-bottom: 6px;
}
.mdp-cell {
  border: 1px solid rgba(0, 0, 0, 0.12);
  border-radius: 6px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  background: #fff;
}
.mdp-cell.mdp-dayname {
  border: none;
  background: transparent;
  color: rgba(0, 0, 0, 0.6);
  font-weight: 600;
}
.mdp-cell.mdp-out {
  color: rgba(0, 0, 0, 0.38);
  background: #fafafa;
}
</style>
