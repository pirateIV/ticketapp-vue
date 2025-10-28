<template>
  <div class="relative min-h-120 z-3 flex-1 bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    <!-- Decorative Elements -->
    <div class="absolute top-20 right-10 w-20 h-20 bg-purple-200/30 border-4 border-purple-100 rounded-full blur-xl"></div>
    <div class="absolute bottom-20 left-10 w-24 h-24 bg-blue-200/30 border-4 border-purple-100 rounded-full blur-xl"></div>

    <div class="max-w-md w-full space-y-6 bg-white backdrop-blur-sm rounded-3xl shadow-sm p-8 sm:p-10 relative z-10 border border-gray-400 outline-10 outline-white/30">
      <!-- Header -->
      <div class="text-center">
        <h1 class="mt-1 text-3xl font-bold text-gray-900 tracking-tighter">
          {{ title }}
        </h1>
      </div>
      <slot />
    </div>
    <WavyLine />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import WavyLine from '../WavyLine.vue'

const props = defineProps<{
  pageType: 'signup' | 'login'
}>()

const title = computed(() => {
  return props.pageType === 'signup' ? 'Create your account' : 'Welcome back'
})
</script>
