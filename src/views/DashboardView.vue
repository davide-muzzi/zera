<script setup>
import SidebarMenu from "../components/SidebarMenu.vue";
import HeaderBar from "../components/HeaderBar.vue";
import Calendar_Small from "../components/Calendar_Small.vue";
import StartShiftButton from "../components/StartShiftButton.vue";
import EndShiftButton from "../components/EndShiftButton.vue";
import EarningsSummary from "../components/EarningsSummary.vue";
import UpcomingShift from "../components/UpcomingShift.vue";

import { useRouter } from 'vue-router'
import { logoutUser, startShift, endShift, getWorkedTime } from '../api/request'
import { onMounted, ref } from 'vue';

const loadingEarnings = ref(true);
const workedTime = ref(1);
const startedShift = ref(false);

defineProps({
  msg: String,
});

const router = useRouter();

async function sendToLogin() {
  router.push("/logins");
}

async function logout() {
  logoutUser();
}

async function start() {
  let today = new Date().toISOString();
  let current_day = today.slice(0, 10);
  let current_time = today.slice(11, 19);

  startedShift.value = true;
  startShift(current_day, current_time);
}

async function end() {
  let today = new Date().toISOString();
  let current_day = today.slice(0, 10);
  let current_time = today.slice(11, 19);

  startedShift.value = false;
  endShift(current_day, current_time);
}

async function mountProcedure() {
  loadingEarnings.value = true;
  try {
    const time = await getWorkedTime();
    console.log('Worked Time geladen', time);
    workedTime.value = time;
  } catch (error) {
    console.error(error);
  } finally {
    loadingEarnings.value = false;
  }
}

onMounted(async () => {
  mountProcedure();
});
</script>

<template>
  <div class="flex min-h-screen gap-6 bg-gray-900 p-4 font-sans text-white">
    <SidebarMenu />

    <!-- Main Content -->
    <div class="flex w-full gap-6">
      <!-- Main Section (Calendar, Start Shift, Earnings) -->
      <div class="flex w-full flex-col">
        <!-- Title -->
        <h1 class="text-4xl font-bold mt-5 mb-6"><HeaderBar /></h1>

        <!-- Spacer to push main content down -->
        <div class="flex-grow"></div>

        <!-- Lower Section: Calendar + Start/End Shift -->
        <div class="grid grid-cols-4 gap-6 items-stretch">
          <!-- Calendar spans 3 columns -->
          <div class="col-span-3">
            <Calendar_Small />
          </div>

          <!-- Start/End Shift fills full height and centers button inside -->
          <div class="col-span-1 flex items-center justify-center">
            <div class="h-full w-full flex items-center justify-center">
              <StartShiftButton v-if="!startedShift" class="w-full h-full" />
              <EndShiftButton v-if="startedShift" class="w-full h-full" />
            </div>
          </div>
        </div>

       <div class="mt-6 mb-3 h-[120px] w-full">
  <Suspense>
    <template v-if="!loadingEarnings">
      <EarningsSummary :workedTime="workedTime" />
    </template>
    <template v-else>
      <div class="flex items-center justify-center h-full">
        <div class="animate-spin rounded-full h-8 w-8 border-4 border-white border-t-transparent"></div>
      </div>
    </template>
  </Suspense>
</div>

      </div>

      <!-- Upcoming Shift Section -->
      <UpcomingShift />
    </div>
  </div>
</template>

<style scoped></style>
