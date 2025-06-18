<template>
    <div class="flex flex-col items-center justify-center w-full max-w-sm space-y-4">
      <h2 class="text-white text-2xl font-semibold">{{ $t('log_in') }}</h2>
      <input type="email" placeholder="Email" class="input" />
      <input type="password" placeholder="Password" class="input" />
      <button class="btn-white">{{ $t('log_in') }}</button>
      <p class="text-sm text-white">{{ $t('auth_no_account_yet') }}</p>
      <router-link to="/signup">
        <button class="btn-purple">{{ $t('sign_up') }}</button>
      </router-link>
    </div>
</template>

<script setup>
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