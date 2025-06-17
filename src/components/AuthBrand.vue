<template>
    <div class="flex flex-col justify-center items-start px-8 py-12 rounded-2xl bg-gradient-to-b from-gray-800 to-[#8759f2] w-full h-full text-white">
      <h2 class="text-lg font-medium mb-4">{{ $t('get_started_with') }}</h2>
      <div class="flex items-center space-x-4">
        <img :src="ZeraLogo" alt="Zera Logo" class="w-12 h-12" />
        <h1 class="text-5xl font-bold tracking-wide">ERA</h1>
      </div>
    </div>
  </template>
  
  <script setup>
  import ZeraLogo from '../assets/AuthBrand_Logo.svg'
  </script>
  
  <style scoped>
  </style>
  