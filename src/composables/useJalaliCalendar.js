// Jalali calendar utilities and Vue state/computed for monthly calendar
import { ref, computed } from 'vue'

// Helpers
export function toPersianDigits(input) {
  return String(input).replace(/\d/g, d => '۰۱۲۳۴۵۶۷۸۹'[Number(d)])
}

// Constants
export const persianMonthNames = [
  'فروردین',
  'اردیبهشت',
  'خرداد',
  'تیر',
  'مرداد',
  'شهریور',
  'مهر',
  'آبان',
  'آذر',
  'دی',
  'بهمن',
  'اسفند',
]

// Saturday -> Friday short names
export const weekDayShort = ['ش', 'ی', 'د', 'س', 'چ', 'پ', 'ج']

// Jalali <-> Gregorian conversion (no libraries)
const gMonthCumulative = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334]
const gDaysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]

export function isGregorianLeap(gy) {
  return (gy % 4 === 0 && gy % 100 !== 0) || gy % 400 === 0
}

export function gregorianToJalali(gy, gm, gd) {
  let gy2 = gy - 1600
  let gm2 = gm - 1
  let gd2 = gd - 1

  let gDayNo =
    365 * gy2 +
    Math.floor((gy2 + 3) / 4) -
    Math.floor((gy2 + 99) / 100) +
    Math.floor((gy2 + 399) / 400)

  gDayNo += gMonthCumulative[gm2] + gd2
  if (gm2 > 1 && isGregorianLeap(gy)) gDayNo += 1

  let jDayNo = gDayNo - 79

  const jNp = Math.floor(jDayNo / 12053) // 33-year cycles
  jDayNo %= 12053

  let jy = 979 + 33 * jNp + 4 * Math.floor(jDayNo / 1461)
  jDayNo %= 1461

  if (jDayNo >= 366) {
    jy += Math.floor((jDayNo - 1) / 365)
    jDayNo = (jDayNo - 1) % 365
  }

  let jm, jd
  if (jDayNo < 186) {
    jm = 1 + Math.floor(jDayNo / 31)
    jd = 1 + (jDayNo % 31)
  } else {
    jDayNo -= 186
    jm = 7 + Math.floor(jDayNo / 30)
    jd = 1 + (jDayNo % 30)
  }

  return { jy, jm, jd }
}

export function jalaliToGregorian(jy, jm, jd) {
  let jy2 = jy - 979
  let jm2 = jm - 1
  let jd2 = jd - 1

  let jDayNo = 365 * jy2 + Math.floor(jy2 / 33) * 8 + Math.floor(((jy2 % 33) + 3) / 4)

  jDayNo += (jm2 < 6 ? jm2 * 31 : (jm2 - 6) * 30 + 186) + jd2

  let gDayNo = jDayNo + 79

  let gy = 1600 + 400 * Math.floor(gDayNo / 146097)
  gDayNo %= 146097

  if (gDayNo >= 36525) {
    gDayNo--
    gy += 100 * Math.floor(gDayNo / 36524)
    gDayNo %= 36524
    if (gDayNo >= 365) gDayNo++
  }

  gy += 4 * Math.floor(gDayNo / 1461)
  gDayNo %= 1461

  if (gDayNo >= 366) {
    gy += Math.floor((gDayNo - 1) / 365)
    gDayNo = (gDayNo - 1) % 365
  }

  let gm = 0
  const leap = isGregorianLeap(gy)
  while (gm < 12) {
    const dm = gDaysInMonth[gm] + (gm === 1 && leap ? 1 : 0)
    if (gDayNo < dm) break
    gDayNo -= dm
    gm++
  }

  const gd = gDayNo + 1
  return { gy, gm: gm + 1, gd }
}

export function daysInJalaliMonth(jy, jm) {
  const gStart = jalaliToGregorian(jy, jm, 1)
  const gNext = jm === 12 ? jalaliToGregorian(jy + 1, 1, 1) : jalaliToGregorian(jy, jm + 1, 1)
  const d1 = new Date(gStart.gy, gStart.gm - 1, gStart.gd)
  const d2 = new Date(gNext.gy, gNext.gm - 1, gNext.gd)
  return Math.round((d2 - d1) / 86400000)
}

// Composable to manage state and derived values for monthly Jalali calendar
export default function useJalaliCalendar() {
  const today = new Date()
  const todayJ = gregorianToJalali(today.getFullYear(), today.getMonth() + 1, today.getDate())

  const currentJYear = ref(todayJ.jy)
  const currentJMonth = ref(todayJ.jm)

  const headerTitle = computed(() => {
    const name = persianMonthNames[currentJMonth.value - 1]
    return `${name} ${toPersianDigits(currentJYear.value)}`
  })

  const monthCells = computed(() => {
    const gStart = jalaliToGregorian(currentJYear.value, currentJMonth.value, 1)
    const startDate = new Date(gStart.gy, gStart.gm - 1, gStart.gd)

    const startOffset = (startDate.getDay() + 1) % 7 // Saturday=0 ... Friday=6
    const daysCurrent = daysInJalaliMonth(currentJYear.value, currentJMonth.value)

    const prevYear = currentJMonth.value === 1 ? currentJYear.value - 1 : currentJYear.value
    const prevMonth = currentJMonth.value === 1 ? 12 : currentJMonth.value - 1
    const daysPrev = daysInJalaliMonth(prevYear, prevMonth)

    const cells = []

    for (let i = startOffset - 1; i >= 0; i--) {
      const day = daysPrev - i
      cells.push({
        jYear: prevYear,
        jMonth: prevMonth,
        jDay: day,
        inCurrent: false,
      })
    }

    for (let d = 1; d <= daysCurrent; d++) {
      const isToday =
        currentJYear.value === todayJ.jy && currentJMonth.value === todayJ.jm && d === todayJ.jd
      cells.push({
        jYear: currentJYear.value,
        jMonth: currentJMonth.value,
        jDay: d,
        inCurrent: true,
        isToday,
      })
    }

    const total = cells.length
    const tail = 42 - total
    const nextYear = currentJMonth.value === 12 ? currentJYear.value + 1 : currentJYear.value
    const nextMonth = currentJMonth.value === 12 ? 1 : currentJMonth.value + 1
    for (let d = 1; d <= tail; d++) {
      cells.push({
        jYear: nextYear,
        jMonth: nextMonth,
        jDay: d,
        inCurrent: false,
      })
    }

    return cells
  })

  function prevMonth() {
    if (currentJMonth.value === 1) {
      currentJMonth.value = 12
      currentJYear.value -= 1
    } else {
      currentJMonth.value -= 1
    }
  }

  function nextMonth() {
    if (currentJMonth.value === 12) {
      currentJMonth.value = 1
      currentJYear.value += 1
    } else {
      currentJMonth.value += 1
    }
  }

  function goToToday() {
    currentJYear.value = todayJ.jy
    currentJMonth.value = todayJ.jm
  }

  return {
    // state
    currentJYear,
    currentJMonth,
    // derived
    headerTitle,
    monthCells,
    // actions
    prevMonth,
    nextMonth,
    goToToday,
    // helpers/consts for UI
    toPersianDigits,
    weekDayShort,
  }
}


