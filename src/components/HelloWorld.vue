<script setup>
import { useRouter } from 'vue-router'
import { logoutUser, startShift } from '../api/request'

let today = new Date().toISOString().slice(0, 10)
let current_time = 

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
  startShift(today,)
}

</script>

<template>
  <h1>{{ msg }}</h1>

  <div class="card">
    <button type="button" @click="sendToLogin">Click to attempt login</button>
    <button type="button" @click="logoutUser">Click to attempt logout</button>
    <button type="button" @click="start">Start Shift</button>
    <p>
      Edit
      <code>components/HelloWorld.vue</code> to test HMR
    </p>
  </div>

  <p>
    Check out
    <a href="https://vuejs.org/guide/quick-start.html#local" target="_blank"
      >create-vue</a
    >, the official Vue + Vite starter
  </p>
  <p>
    Learn more about IDE Support for Vue in the
    <a
      href="https://vuejs.org/guide/scaling-up/tooling.html#ide-support"
      target="_blank"
      >Vue Docs Scaling up Guide</a
    >.
  </p>
  <p class="read-the-docs">Click on the Vite and Vue logos to learn more</p>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
