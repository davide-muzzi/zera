<template>
  <div class="flex h-screen text-white font-sans bg-gray-800 p-6 gap-6">
    <SidebarMenu class="flex-shrink-0" />

    <div class="flex flex-col flex-grow overflow-hidden rounded-r-2xl bg-gray-800 p-6">
      <div class="flex gap-8 h-full overflow-hidden">
        <!-- Left Panel -->
        <div class="w-56 flex-shrink-0 flex flex-col gap-6">
          <div class="flex flex-col items-start">
            <div class="text-4xl font-bold">{{ currentMonthName }}</div>
            <div class="text-xl text-gray-400 mt-1">{{ currentYear }}</div>
          </div>

          <div>
            <div class="text-lg font-semibold mb-2">{{ nextMonthName }}</div>
            <div class="grid grid-cols-7 gap-1 text-gray-400 text-sm">
              <div v-for="d in ['M', 'T', 'W', 'T', 'F', 'S', 'S']" :key="d" class="text-center">{{ d }}</div>
              <div
                v-for="day in previewDays"
                :key="day.id"
                class="text-center"
              >
                {{ day.day }}
              </div>
            </div>
          </div>
        </div>

        <!-- Right Panel -->
        <div class="flex-grow overflow-auto flex justify-center">
          <div>
            <div class="grid grid-cols-7 gap-1.5 mb-1">
              <div
                v-for="d in ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']"
                :key="d"
                class="font-bold text-gray-400 text-center"
              >
                {{ d }}
              </div>
            </div>

            <div class="grid grid-cols-7 gap-1.5">
              <div
                v-for="day in daysInMonth"
                :key="day.dateStr + day.day"
                :class="[
                  'w-[5rem] aspect-square rounded-lg p-1 flex flex-col justify-start items-start gap-0.5',
                  'bg-gray-700',
                  { 'border-2 border-purple-600': isWorkday(day.dateStr) },
                  { 'bg-purple-600 text-white border-none': day.dateStr === todayStr }
                ]"
              >
                <div class="font-bold text-white text-sm">{{ day.day }}</div>
                <div v-if="isWorkday(day.dateStr)" class="text-blue-400 text-xs mt-auto">
                  {{ getWorkHours(day.dateStr) }}
                </div>
              </div>
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

const getDaysInMonth = (year, month) => {
  const days = []
  const firstDayOfMonth = new Date(year, month, 1)
  let dayOfWeek = firstDayOfMonth.getDay()
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

const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
                    'July', 'August', 'September', 'October', 'November', 'December']
const currentMonthName = computed(() => monthNames[currentMonth])

const nextMonth = (currentMonth + 1) % 12
const nextYear = currentMonth === 11 ? currentYear + 1 : currentYear
const nextMonthName = monthNames[nextMonth]

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

generatePreviewDays()
</script>
