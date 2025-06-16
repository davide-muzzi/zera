<script setup>
import { ref, computed } from 'vue'
import { loginUser } from '../api/request'
import { RouterLink, useRouter } from 'vue-router'
import AuthBrand from '../components/AuthBrand.vue'
import { onMounted } from 'vue'

const email = ref('bepis')
const password = ref('1234567890')

const hasLogin = computed(() => email.value.length > 0 && password.value.length > 0)

const errors = ref({
  email: '',
  password: '',
})

const router = useRouter()

async function login() {
  try {
    await loginUser(email.value, password.value)
    await router.push('/')
  } catch (exception) {
    console.error('login error', exception)
    errors.value = exception.errors
  }
}

defineProps({
  msg: String,
})
</script>

<template>
  <div class="flex min-h-screen bg-gray-900 text-white">
    <!-- Left Brand Panel -->
    <div class="w-1/2">
      <AuthBrand />
    </div>

    <!-- Right Form Panel -->
    <div class="w-1/2 flex flex-col justify-center items-center px-10 space-y-6">
      <h2 class="text-3xl font-bold">{{ $t('log_in') }}</h2>
      
      <div class="w-full max-w-md space-y-4">
        <input
          v-model="email"
          type="email"
          placeholder="Email"
          class="w-full px-4 py-2 rounded bg-gray-800 text-white border border-gray-700"
        />
        <p v-if="errors.email" class="text-red-400 text-sm">{{ errors.email }}</p>

        <input
          v-model="password"
          type="password"
          placeholder="Password"
          class="w-full px-4 py-2 rounded bg-gray-800 text-white border border-gray-700"
        />
        <p v-if="errors.password" class="text-red-400 text-sm">{{ errors.password }}</p>

        <button
          :disabled="!hasLogin"
          @click="login"
          class="w-full bg-white text-black font-semibold py-2 rounded disabled:opacity-50"
        >
          Log in
        </button>
      </div>

      <p class="text-sm mt-4">{{ $t('auth_no_account_yet') }}</p>
      <RouterLink to="/signup">
        <button class="bg-purple-600 hover:bg-purple-700 px-6 py-2 rounded-full text-white font-medium">
          {{ $t('sign_up') }}
        </button>
      </RouterLink>
    </div>
  </div>
</template>
