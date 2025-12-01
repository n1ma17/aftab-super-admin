<script setup>
import { onMounted, ref } from 'vue'

const props = defineProps({
  // v-model for task object
  task: {
    type: Object,
    default: () => ({}),
  },
  type: {
    type: String,
    default: 'create',
  },
})

const emit = defineEmits(['update:task', 'cancel'])

const taskLocal = ref({
  title: '',
  date: '',
  time: '',
  gust: '',
})

onMounted(() => {
  if (props.type === 'edit') {
    taskLocal.value = {
      title: props.task.title,
      date: props.task.date,
      time: props.task.time,
      gust: props.task.gust,
    }
  }
  if (props.type === 'create') {
    taskLocal.value = {
      title: '',
      date: '',
      time: '',
      gust: '',
    }
  }
})
</script>

<template>
  <div class="d-flex flex-column" style="gap: 12px">
    <v-text-field
      v-model="taskLocal.title"
      variant="outlined"
      density="comfortable"
      label="عنوان تسک"
      hide-details
    />

    <div>
      <v-text-field
        type="text"
        variant="outlined"
        density="comfortable"
        hide-details
        class="date-picker"
        :label="taskLocal.date || 'روز'"
      />
      <date-picker
        v-model="taskLocal.date"
        format="YYYY-MM-DD"
        display-format="jYYYY-jMM-jDD"
        custom-input=".date-picker"
      />
    </div>

    <div>
      <v-text-field
        type="text"
        variant="outlined"
        density="comfortable"
        :label="taskLocal.time || 'ساعت'"
        hide-details
        class="time-picker"
      />
      <date-picker
        v-model="taskLocal.time"
        type="time"
        min="08:08"
        max="22:00"
        custom-input=".time-picker"
      />
    </div>

    <v-text-field
      v-model="taskLocal.gust"
      type="email"
      variant="outlined"
      density="comfortable"
      label="ایمیل مهمان"
      hide-details
    />
  </div>
  <div class="d-flex justify-end mt-5">
    <v-btn variant="text" @click="emit('cancel')">انصراف</v-btn>
    <v-btn color="primary" variant="flat" @click="emit('update:task', taskLocal)">ذخیره</v-btn>
  </div>
</template>

<style scoped></style>
