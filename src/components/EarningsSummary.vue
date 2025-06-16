<script setup>
import { ref } from 'vue';

const props = defineProps({
  workedTime: Number
})

const hourly = ref(20)
let earnings = hourly.value * props.workedTime


</script>

<template>
  <!-- Earnings -->
  <div class="grid grid-cols-2 gap-6">
    <div class="from-black-50 col-span-2 flex items-end justify-between rounded-xl gradient-bg-2 p-6">
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
  

  
  