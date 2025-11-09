/**
 * تبدیل تاریخ میلادی به تاریخ شمسی با فرمت کامل
 * @param {Date} date - تاریخ میلادی (اختیاری، پیش‌فرض: امروز)
 * @returns {string} - تاریخ شمسی به فرمت "شنبه 12 مهر 1404"
 */
export function getJalaliDate(date = new Date()) {
  const formatter = new Intl.DateTimeFormat('fa-IR-u-ca-persian-nu-latn', {
    weekday: 'long',
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  })
  const parts = formatter.formatToParts(date)
  const weekday = parts.find(p => p.type === 'weekday')?.value ?? ''
  const day = parts.find(p => p.type === 'day')?.value ?? ''
  const month = parts.find(p => p.type === 'month')?.value ?? ''
  const year = parts.find(p => p.type === 'year')?.value ?? ''
  return `${weekday}  ${day}  ${month}   ${year}`
}
