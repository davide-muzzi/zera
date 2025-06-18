<template>
    <div class="flex flex-col items-center justify-center w-full max-w-sm space-y-4">
      <h2 class="text-white text-2xl font-semibold">{{ $t('sign_up') }}</h2>
      <div class="flex space-x-2 w-full">
        <input type="text" placeholder="First Name" class="input" />
        <input type="text" placeholder="Last Name" class="input" />
      </div>
      <input type="email" v-model="email" placeholder="Email" class="input" />
      <input type="password" v-model="password" placeholder="Password" class="input" />
      <button @click="register" class="btn-white">{{ $t('sign_up') }}</button>
      <p class="text-sm text-white">{{ $t('auth_already_have_account') }}</p>
      <router-link to="/login">
        <button class="btn-purple">{{ $t('log_in') }}</button>
      </router-link>
    </div>
</template>
  
<script setup>
import { ref,computed } from 'vue'
import {registerUser} from "../api/request"
import { useRouter } from 'vue-router'

const password = ref('1234567890')
const email = ref('bepis')

defineProps({
  msg: String,
})

const errors = ref({
    email: '',
    password: '',
})

const router = useRouter()

async function register () {
  try {
    await registerUser(email.value, password.value)
    await router.push('/logins')    
  } catch (exception) {

    console.error('login error', exception)

    errors.value = exception.errors
  }
}
</script>
  
<style scoped>
  .input {
    @apply w-full px-4 py-2 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500;
  }
  .btn-white {
    @apply w-full py-2 rounded-md bg-white text-black font-semibold;
  }
  .btn-purple {
    @apply px-6 py-2 mt-2 rounded-md bg-purple-500 text-white font-medium;
  }
</style>