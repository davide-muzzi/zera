<template>
  <div class="flex min-h-screen gap-6 bg-gray-900 p-4 font-sans text-white">
    <SidebarMenu />

    <!-- Main Content -->
    <div class="flex w-full gap-6">
      <!-- Main Section (Calendar, Start Shift, Earnings) -->
      <div class="flex w-full flex-col gap-6">
        <!-- Title -->
        <h1 class="text-4xl font-bold"><HeaderBar /></h1>
        <!-- Upper Section -->
        <div class="grid grid-cols-3 gap-6">
          <Calendar_Small />
          <StartShiftButton />
        </div>
            <EarningsSummary />
      </div>
      <UpcomingShift />
    </div>
  </div>
</template>

<script setup>
import SidebarMenu from "../components/SidebarMenu.vue";
import HeaderBar from "../components/HeaderBar.vue";
import Calendar_Small from "../components/Calendar_Small.vue";
import StartShiftButton from "../components/StartShiftButton.vue";
import EarningsSummary from "../components/EarningsSummary.vue";
import UpcomingShift from "../components/UpcomingShift.vue";

import { useRouter } from 'vue-router'
import { logoutUser, startShift,endShift } from '../api/request'
import { ref } from 'vue';

const startedShift = ref(false);

defineProps({
  msg: String,
})

const router = useRouter()

async function sendToLogin() {
  router.push("/logins")
}

async function logout() {
  logoutUser()
}

async function start() {
  let today = new Date().toISOString()
  let current_day = today.slice(0, 10)
  let current_time = today.slice(11, 19)

  startedShift.value = true;
  startShift(current_day,current_time)
}

async function end() {
  let today = new Date().toISOString()
  let current_day = today.slice(0, 10)
  let current_time = today.slice(11, 19)

  startedShift.value = false;
  endShift(current_day,current_time)
}
</script>
