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

<template>
    <h1>{{ msg }}</h1>
  
    <div class="card">
        <button type="button" @click="register">Click to attempt a registration</button>
    </div>
    <p>This is the registration</p>
  </template>
  
  <style scoped>
  .read-the-docs {
    color: #888;
  }
  </style>
  