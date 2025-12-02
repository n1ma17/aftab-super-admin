import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import moment from 'jalali-moment'

export const useCalendarStore = defineStore('calendar', () => {
  // State
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
      title: 'Task 5',
      description: 'Description 2',
      date: '2025-12-02',
      time: '15:00',
      color: 'blue',
      gust: '',
    },
    {
      title: 'Task 6',
      description: 'Description 2',
      date: '2025-12-02',
      time: '10:00',
      color: 'blue',
      gust: '',
    },
    {
      title: 'Task 3',
      description: 'Description 2',
      date: '2025-12-03',
      time: '16:00',
      color: 'blue',
      gust: '',
    },
    {
      title: 'Task 7',
      description: 'Description 2',
      date: '2025-12-03',
      time: '10:00',
      color: 'blue',
      gust: '',
    },
    {
      title: 'Task 8',
      description: 'Description 2',
      date: '2025-12-03',
      time: '13:00',
      color: 'blue',
      gust: '',
    },
    {
      title: 'Task 9',
      description: 'Description 2',
      date: '2025-12-03',
      time: '21:00',
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

  // Helper functions
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

  // Getters
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

  // Actions
  function addTask(payload) {
    if (!payload?.title) return
    tasks.value.push({
      title: payload.title,
      description: payload.description || '',
      date: payload.date,
      time: payload.time || '00:00',
      color: payload.color || '#6b7280',
      gust: payload.gust || '',
    })
  }

  function deleteTask(task) {
    const index = tasks.value.findIndex(t => t === task)
    if (index !== -1) {
      tasks.value.splice(index, 1)
    }
  }

  function updateTaskColor(task, color) {
    const foundTask = tasks.value.find(t => t === task)
    if (foundTask) {
      foundTask.color = color
    }
  }

  function updateTask(oldTask, newTaskData) {
    const index = tasks.value.findIndex(t => t === oldTask)
    if (index !== -1) {
      tasks.value[index] = {
        ...tasks.value[index],
        ...newTaskData,
      }
    }
  }

  return {
    // State
    tasks,
    // Getters
    tasksByKey,
    // Actions
    addTask,
    deleteTask,
    updateTaskColor,
    updateTask,
  }
})

