<template>
  <footer class="bg-gray-900 text-white py-4 relative">
    <div class="app-container mx-auto w-full flex items-center justify-betweeen px-4 sm:px-6 lg:px-8">
      <Logo />

      <div class="flex flex-1 text-right flex-col lg:flex-row justify-between items-center gap-4">
        <div class="text-gray-400 text-sm w-full">
          © {{ new Date().getFullYear() }} TicketFlow.{' '}
          <span class="max-sm:hidden">All rights reserved.</span>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import Logo from './Logo.vue'
</script>
