<script setup>
import { ref,computed } from 'vue'
import {loginUser} from "../api/request"
import { RouterLink, useRouter } from 'vue-router'

const password = ref('1234567890')
const email = ref('bepis')

const hasLogin = computed(() => { return (email.value.length > 0) && (password.value.length > 0) })

defineProps({
  msg: String,
})

const errors = ref({
    email: '',
    password: '',
})

const router = useRouter()

async function login () {
  try {
    await loginUser(email.value, password.value)
    await router.push('/')                        
  } catch (exception) {

    console.error('login error', exception)

    errors.value = exception.errors
  }
}
</script>

<template>
    <h1>{{ msg }}</h1>
  
    <div class="card">
        <button type="button" @click="login">Click to attempt a login</button>
        <RouterLink to="/registration">Register</RouterLink>
    </div>
    <p>This is the login</p>
  </template>
  
  <style scoped>
  .read-the-docs {
    color: #888;
  }
  </style>