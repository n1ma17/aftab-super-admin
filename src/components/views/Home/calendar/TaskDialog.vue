<script setup>
import { ref } from 'vue'
import TaskForm from '@/components/views/Home/calendar/TaskForm.vue'

const props = defineProps({
  colorOptions: {
    type: Array,
    default: () => ['#ef4444', '#f59e0b', '#22c55e', '#0ea5e9', '#8b5cf6', '#6b7280'],
  },
})

const emit = defineEmits(['delete', 'setColor', 'save'])

const isOpen = ref(false)
const selectedTask = ref(null)
const editMode = ref(false)

function open(task) {
  console.log(task)

  selectedTask.value = task
  isOpen.value = true
  editMode.value = false
}
function close() {
  isOpen.value = false
  selectedTask.value = null
  editMode.value = false
}

function deleteSelectedTask() {
  if (!selectedTask.value) return
  emit('delete', selectedTask.value)
  close()
}
function setSelectedTaskColor(color) {
  if (!selectedTask.value) return
  selectedTask.value.color = color
  emit('setColor', { task: selectedTask.value, color })
}

function startEdit() {
  if (!selectedTask.value) return
  editMode.value = true
}

function saveEdit(e) {
  console.log(e)

  editMode.value = false
}

defineExpose({ open, close })
</script>

<template>
  <v-dialog v-model="isOpen" max-width="400">
    <v-card rounded="lg" style="width: 400px">
      <v-card-title class="text-subtitle-1 font-weight-bold"> عملیات تسک </v-card-title>
      <v-divider />
      <v-list density="compact">
        <v-list-item @click="deleteSelectedTask" class="text-error">
          <template #prepend>
            <ThemifyIcon name="trash" size="18" />
          </template>
          <v-list-item-title>حذف</v-list-item-title>
        </v-list-item>
        <v-list-item @click="startEdit">
          <template #prepend>
            <ThemifyIcon name="pencil" size="18" />
          </template>
          <v-list-item-title>ویرایش</v-list-item-title>
        </v-list-item>
      </v-list>
      <v-divider />
      <v-card-text>
        <div v-if="!editMode" class="color-grid">
          <button
            v-for="c in props.colorOptions"
            :key="c"
            class="color-swatch"
            :style="{ backgroundColor: c }"
            @click="setSelectedTaskColor(c)"
          />
        </div>
        <div v-else>
          <TaskForm
            v-model:task="selectedTask"
            type="edit"
            @cancel="editMode = false"
            @save="saveEdit"
          />
        </div>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<style scoped>
.color-grid {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}
.color-swatch {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  border: none;
  cursor: pointer;
}
</style>
