<script setup>
import AuthBrand from '@/components/AuthBrand.vue'
import SignupForm from '@/components/SignupForm.vue'
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

<template>
  <div class="flex flex-row h-screen w-screen bg-gray-900 p-4">
    <!-- Left logo area -->
    <div class="w-1/2">
      <AuthBrand />
    </div>

    <!-- Right signup form -->
    <div class="w-1/2 flex items-center justify-center">
      <SignupForm />
    </div>
  </div>
</template>