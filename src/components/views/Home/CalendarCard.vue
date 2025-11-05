<script setup>
import { ref } from 'vue'
import SharedCard from '@/components/shared/SharedCard.vue'
import ThemifyIcon from '@/components/icons/ThemifyIcon.vue'

// Calendar Data (جمعه در آخر)
const weekDays = ref(['ش', 'ی', 'د', 'س', 'چ', 'پ', 'ج'])
const currentMonth = ref('آبان')
const currentYear = ref('۱۴۰۳')
const currentDayName = ref('شنبه، ۱۵ آبان')

// Generate Calendar Days (example for current month)
// شروع از شنبه، جمعه در آخر هفته
const calendarDays = ref([
  // Current month days (Aban 1403 - starts on Saturday)
  { day: 1, isCurrentMonth: true, isToday: false, isHoliday: false }, // شنبه
  { day: 2, isCurrentMonth: true, isToday: false, isHoliday: false }, // یکشنبه
  { day: 3, isCurrentMonth: true, isToday: false, isHoliday: false }, // دوشنبه
  { day: 4, isCurrentMonth: true, isToday: false, isHoliday: false }, // سه‌شنبه
  { day: 5, isCurrentMonth: true, isToday: false, isHoliday: false }, // چهارشنبه
  { day: 6, isCurrentMonth: true, isToday: false, isHoliday: false }, // پنج‌شنبه
  { day: 7, isCurrentMonth: true, isToday: false, isHoliday: true }, // جمعه
  { day: 8, isCurrentMonth: true, isToday: false, isHoliday: false }, // شنبه
  { day: 9, isCurrentMonth: true, isToday: false, isHoliday: false }, // یکشنبه
  { day: 10, isCurrentMonth: true, isToday: false, isHoliday: false }, // دوشنبه
  { day: 11, isCurrentMonth: true, isToday: false, isHoliday: false }, // سه‌شنبه
  { day: 12, isCurrentMonth: true, isToday: false, isHoliday: false }, // چهارشنبه
  { day: 13, isCurrentMonth: true, isToday: false, isHoliday: false }, // پنج‌شنبه
  { day: 14, isCurrentMonth: true, isToday: false, isHoliday: true }, // جمعه
  { day: 15, isCurrentMonth: true, isToday: true, isHoliday: false }, // شنبه - امروز
  { day: 16, isCurrentMonth: true, isToday: false, isHoliday: false }, // یکشنبه
  { day: 17, isCurrentMonth: true, isToday: false, isHoliday: false }, // دوشنبه
  { day: 18, isCurrentMonth: true, isToday: false, isHoliday: false }, // سه‌شنبه
  { day: 19, isCurrentMonth: true, isToday: false, isHoliday: false }, // چهارشنبه
  { day: 20, isCurrentMonth: true, isToday: false, isHoliday: false }, // پنج‌شنبه
  { day: 21, isCurrentMonth: true, isToday: false, isHoliday: true }, // جمعه
  { day: 22, isCurrentMonth: true, isToday: false, isHoliday: false }, // شنبه
  { day: 23, isCurrentMonth: true, isToday: false, isHoliday: false }, // یکشنبه
  { day: 24, isCurrentMonth: true, isToday: false, isHoliday: false }, // دوشنبه
  { day: 25, isCurrentMonth: true, isToday: false, isHoliday: false }, // سه‌شنبه
  { day: 26, isCurrentMonth: true, isToday: false, isHoliday: false }, // چهارشنبه
  { day: 27, isCurrentMonth: true, isToday: false, isHoliday: false }, // پنج‌شنبه
  { day: 28, isCurrentMonth: true, isToday: false, isHoliday: true }, // جمعه
  { day: 29, isCurrentMonth: true, isToday: false, isHoliday: false }, // شنبه
  { day: 30, isCurrentMonth: true, isToday: false, isHoliday: false }, // یکشنبه

  // Next month days to fill the grid
  { day: 1, isCurrentMonth: false, isToday: false, isHoliday: false }, // دوشنبه
  { day: 2, isCurrentMonth: false, isToday: false, isHoliday: false }, // سه‌شنبه
  { day: 3, isCurrentMonth: false, isToday: false, isHoliday: false }, // چهارشنبه
  { day: 4, isCurrentMonth: false, isToday: false, isHoliday: false }, // پنج‌شنبه
  { day: 5, isCurrentMonth: false, isToday: false, isHoliday: true }, // جمعه
])

// Calendar Methods
const selectDay = day => {
  if (day.isCurrentMonth) {
    console.log('روز انتخاب شده:', day.day)
    alert(`شما روز ${day.day} ${currentMonth.value} را انتخاب کردید`)
  }
}
</script>

<template>
  <SharedCard showDivider class="w-fit">
    <template #header>
      <div class="flex items-center gap-2 justify-between w-full">
        <div class="flex items-center gap-2">
          <ThemifyIcon name="calendar" size="32" class="text-error-500" />
          <h2 class="text-2xl font-bold text-gray-800">تقویم</h2>
        </div>
        <div class="text-left">
          <p class="text-sm font-bold text-gray-800">{{ currentMonth }} {{ currentYear }}</p>
          <p class="text-xs text-gray-500">{{ currentDayName }}</p>
        </div>
      </div>
    </template>
    <template #content>
      <div class="calendar-wrapper min-w-[350px]">
        <!-- Days of Week -->
        <div class="grid grid-cols-7 gap-1 mb-3">
          <div v-for="day in weekDays" :key="day" class="text-center text-xs font-bold text-gray-600 py-2">
            {{ day }}
          </div>
        </div>

        <!-- Calendar Days -->
        <div class="grid grid-cols-7 gap-1">
          <div
            v-for="(day, index) in calendarDays"
            :key="index"
            class="calendar-day aspect-square flex items-center justify-center rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer"
            :class="{
              'text-gray-400': !day.isCurrentMonth,
              'text-gray-800': day.isCurrentMonth && !day.isToday,
              'bg-secondary text-white shadow-md': day.isToday,
              'hover:bg-gray-100': !day.isToday && day.isCurrentMonth,
              'bg-error-100 text-error-700': day.isHoliday && !day.isToday,
            }"
            @click="selectDay(day)"
          >
            {{ day.day }}
          </div>
        </div>
      </div>
    </template>
    <template #footer>
      <div class="flex items-center justify-between text-xs text-gray-600">
        <div class="flex items-center gap-2">
          <div class="w-3 h-3 bg-secondary rounded"></div>
          <span>امروز</span>
        </div>
        <div class="flex items-center gap-2">
          <div class="w-3 h-3 bg-error-100 rounded"></div>
          <span>تعطیل</span>
        </div>
      </div>
    </template>
  </SharedCard>
</template>

<style scoped>
/* Calendar Styles */
.calendar-wrapper {
  user-select: none;
}

.calendar-day {
  position: relative;
  min-height: 40px;
  font-weight: 500;
}

.calendar-day:hover {
  transform: scale(1.05);
}

.calendar-day.bg-secondary:hover {
  transform: scale(1);
}

/* Calendar Day Animation */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: scale(0.8);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.calendar-day {
  animation: fadeIn 0.3s ease-out;
}

/* Friday Style */
.calendar-day.bg-error-100 {
  font-weight: 600;
}
</style>

