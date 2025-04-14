<template>
    <div class="calendar">
      <h2>{{ currentMonthName }} {{ currentYear }}</h2>
      <div class="calendar-grid">
        <div class="day" v-for="day in daysInMonth" :key="day.date" :class="{ workday: isWorkday(day.dateStr) }">
          <div class="date">{{ day.day }}</div>
          <div class="shift" v-if="isWorkday(day.dateStr)">
            {{ getWorkHours(day.dateStr) }}
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed } from 'vue'
  
  const today = new Date()
  const currentYear = today.getFullYear()
  const currentMonth = today.getMonth() // 0 = Jan
  
  const workSchedule = {
    // Format: YYYY-MM-DD : "from - to"
    '2025-04-14': '9–12:00',
    '2025-04-16': '8–17:00',
    '2025-04-19': '8–20:00',
    '2025-04-20': '9–17:00',
  }
  
  const getDaysInMonth = (year, month) => {
    const date = new Date(year, month, 1)
    const days = []
  
    while (date.getMonth() === month) {
      const day = date.getDate()
      const dateStr = date.toISOString().split('T')[0]
      days.push({ day, dateStr, date: new Date(date) })
      date.setDate(day + 1)
    }
  
    return days
  }
  
  const daysInMonth = ref(getDaysInMonth(currentYear, currentMonth))
  
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 
                      'July', 'August', 'September', 'October', 'November', 'December']
  const currentMonthName = computed(() => monthNames[currentMonth])
  
  const isWorkday = (dateStr) => dateStr in workSchedule
  const getWorkHours = (dateStr) => workSchedule[dateStr]
  </script>
  
  <style scoped>
  .calendar {
    width: 100%;
    max-width: 600px;
    margin: auto;
  }
  
  .calendar-grid {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    gap: 8px;
    margin-top: 10px;
  }
  
  .day {
    border: 1px solid #8884;
    padding: 10px;
    text-align: center;
    border-radius: 10px;
    min-height: 70px;
    position: relative;
  }
  
  .workday {
    background-color: #b0d0ff;
    border: 2px solid #448;
  }
  
  .date {
    font-weight: bold;
  }
  
  .shift {
    font-size: 0.8em;
    margin-top: 5px;
  }
  </style>
  