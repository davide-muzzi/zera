<script setup>
import AuthBrand from '../components/AuthBrand.vue'
import SignupForm from '../components/SignupForm.vue'

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