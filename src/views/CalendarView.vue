<template>
  <SidebarMenu.vue />

  <div class="calendar-layout">
    <!-- Left Panel -->
    <div class="left-panel">
      <div class="month-heading">
        <div class="month-label">{{ currentMonthName }}</div>
        <div class="year-label">{{ currentYear }}</div>
      </div>

      <div class="next-month-preview">
        <div class="preview-month-label">{{ nextMonthName }}</div>
        <div class="preview-grid">
          <div class="day-name" v-for="d in weekdays_abbreviated" :key="d">{{ d }}</div>
          <div
            class="preview-day"
            v-for="day in previewDays"
            :key="day.id"
          >
            {{ day.day }}
          </div>
        </div>
      </div>
    </div>

    <!-- Right Panel -->
    <div class="calendar-container">
      <div class="calendar">
        <div class="calendar-grid">
          <div class="day-name" v-for="d in weekdays_semi_abbreviated" :key="d">
            {{ d }}
          </div>

          <div
            class="day"
            v-for="day in daysInMonth"
            :key="day.dateStr + day.day"
            :class="{
              workday: isWorkday(day.dateStr),
              today: day.dateStr === todayStr
            }"
          >
            <div class="date">{{ day.day }}</div>
            <div class="shift" v-if="isWorkday(day.dateStr)">
              {{ getWorkHours(day.dateStr) }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import SidebarMenu from '../components/SidebarMenu.vue'
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const today = new Date()
const yyyy = today.getFullYear()
const mm = String(today.getMonth() + 1).padStart(2, '0')
const dd = String(today.getDate()).padStart(2, '0')
const todayStr = `${yyyy}-${mm}-${dd}`

const currentYear = yyyy
const currentMonth = today.getMonth()

const workSchedule = {
  '2025-05-16': '9:00-12:00',
  '2025-05-18': '13:00-17:00',
  '2025-05-22': '8:30-17:00',
  '2025-05-27': '10:00-15:30'
}

// i18n weekday abbreviations
const weekdays_abbreviated = computed(() => [
  t('weekday_monday_abbreviated'),
  t('weekday_tuesday_abbreviated'),
  t('weekday_wednesday_abbreviated'),
  t('weekday_thursday_abbreviated'),
  t('weekday_friday_abbreviated'),
  t('weekday_saturday_abbreviated'),
  t('weekday_sunday_abbreviated')
])

const weekdays_semi_abbreviated = computed(() => [
  t('weekday_monday_semi_abbreviated'),
  t('weekday_tuesday_semi_abbreviated'),
  t('weekday_wednesday_semi_abbreviated'),
  t('weekday_thursday_semi_abbreviated'),
  t('weekday_friday_semi_abbreviated'),
  t('weekday_saturday_semi_abbreviated'),
  t('weekday_sunday_semi_abbreviated')
])

// current and next month names
const monthNames = computed(() => [
  t('month_january'),
  t('month_february'),
  t('month_march'),
  t('month_april'),
  t('month_may'),
  t('month_june'),
  t('month_july'),
  t('month_august'),
  t('month_september'),
  t('month_october'),
  t('month_november'),
  t('month_december')
])

const currentMonthName = computed(() => monthNames.value[currentMonth])
const nextMonthName = computed(() => monthNames.value[nextMonth])

// calendar grid logic
const getDaysInMonth = (year, month) => {
  const days = []
  const firstDayOfMonth = new Date(year, month, 1)
  let dayOfWeek = firstDayOfMonth.getDay() // 0 = Sunday
  dayOfWeek = dayOfWeek === 0 ? 6 : dayOfWeek - 1

  for (let i = 0; i < dayOfWeek; i++) {
    days.push({ day: '', dateStr: '', date: null })
  }

  const daysInCurrentMonth = new Date(year, month + 1, 0).getDate()
  for (let day = 1; day <= daysInCurrentMonth; day++) {
    const date = new Date(year, month, day)
    const dateStr = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
    days.push({ day, dateStr, date })
  }

  return days
}

const daysInMonth = ref(getDaysInMonth(currentYear, currentMonth))
const isWorkday = (dateStr) => dateStr in workSchedule
const getWorkHours = (dateStr) => workSchedule[dateStr]

// next month preview
const previewDays = ref([])
const generatePreviewDays = () => {
  const firstDay = new Date(nextYear, nextMonth, 1)
  let startDay = firstDay.getDay()
  startDay = startDay === 0 ? 6 : startDay - 1

  const dayCount = new Date(nextYear, nextMonth + 1, 0).getDate()
  const days = []

  for (let i = 0; i < startDay; i++) {
    days.push({ day: '', id: `pad-${i}` })
  }

  for (let d = 1; d <= dayCount; d++) {
    days.push({ day: d, id: `next-${d}` })
  }

  previewDays.value = days
}

const nextMonth = (currentMonth + 1) % 12
const nextYear = currentMonth === 11 ? currentYear + 1 : currentYear

generatePreviewDays()
</script>


<style scoped>
  .calendar-layout {
    display: flex;
    flex-direction: row;
    max-width: 1100px;
    margin: auto;
    color: white;
    font-family: sans-serif;
  }

  .left-panel {
    width: 220px;
    padding: 16px;
    background-color: #1c1c1c;
    border-radius: 16px 0 0 16px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    gap: 24px;
  }

  .month-heading {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }

  .month-label {
    font-size: 2.4em;
    font-weight: bold;
  }

  .year-label {
    font-size: 1.4em;
    color: #ccc;
    margin-top: 4px;
  }

  .preview-month-label {
    font-size: 1.2em;
    font-weight: bold;
    margin-bottom: 4px;
  }

  .preview-grid {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    gap: 4px;
    font-size: 0.9em;
    color: #ccc;
  }

  .preview-day {
    text-align: center;
  }

  .calendar-container {
    background-color: #1c1c1c;
    border-radius: 0 16px 16px 0;
    padding: 16px;
    flex-grow: 1;
    width: 100%;
  }

  .calendar-grid {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    gap: 6px;
  }

  .day-name {
    font-weight: bold;
    text-align: center;
    padding-bottom: 4px;
    color: #ccc;
  }

  .day {
    aspect-ratio: 1 / 1;
    background-color: #2a2a2a;
    border-radius: 10px;
    padding: 6px 6px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    position: relative;
    gap: 4px;
  }

  .date {
    font-size: 1em;
    font-weight: bold;
    color: white;
  }

  .shift {
    font-size: 0.75em;
    margin-top: auto;
    color: #80c0ff;
  }

  .workday {
    border: 2px solid #805fff;
  }

  .today {
    background-color: #805fff;
    color: white;
    border: none;
  }
</style>
