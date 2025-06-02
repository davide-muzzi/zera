<template>
    <div class="flex flex-col items-center justify-center w-full max-w-sm space-y-4">
      <h2 class="text-white text-2xl font-semibold">Log in</h2>
      <input type="email" placeholder="Email" class="input" />
      <input type="password" placeholder="Password" class="input" />
      <button class="btn-white">Log in</button>
      <p class="text-sm text-white">Dont have an Account yet?</p>
      <router-link to="/signup">
        <button class="btn-purple">Sign up</button>
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