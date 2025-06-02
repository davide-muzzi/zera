<template>
  <div class="sidebar">
    <!-- Sidebar -->
    <div
      class="flex flex-col justify-between rounded-2xl border-2 border-purple-600 bg-gray-800 p-4"
    >
      <div class="flex flex-col gap-4">
        <button class="rounded-xl bg-black p-2">🔔</button>
        <button class="rounded-xl bg-purple-600 p-2" @click="sendToLogin">
          🏠
        </button>
        <button class="rounded-xl bg-black p-2">📅</button>
        <button class="rounded-xl bg-black p-2">📂</button>
        <button class="rounded-xl bg-black p-2">⚙️</button>
      </div>
      <button class="rounded-xl bg-black p-2">⏏️</button>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
const router = useRouter();

async function sendToLogin() {
  router.push("/logins");
}
</script>
