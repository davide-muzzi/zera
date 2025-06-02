<script setup>
import { ref } from 'vue';
import { getWorkedTime } from '../api/request';

let workedTime = await getWorkedTime()
let hourly = ref(20)
let earnings = hourly.value * parseInt(workedTime)


</script>

<template>
  <!-- Earnings -->
      <div class="grid grid-cols-2 gap-6">
        <div class="from-black-50 col-span-2 flex items-end justify-between rounded-xl bg-gradient-to-r to-purple-600 p-6">
          <div>
            <p class="text-xl font-bold">Estimated Earnings</p>
            <p class="text-sm text-gray-200">for the Month of March</p>
            <p class="mt-2 inline-block rounded bg-gray-700 px-2 py-1 text-sm">Hourly Pay: {{hourly}}</p>
          </div>
          <div class="text-right">
            <p class="text-xl">{{workedTime}}h /</p>
            <p class="text-4xl font-bold">${{ earnings }}</p>
          </div>
        </div>
      </div>
  </template>
  

  
  