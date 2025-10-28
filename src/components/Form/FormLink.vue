<template>
  <div class="text-center">
    <p class="text-gray-600 text-sm">
      {{ linkItem.prompt }}
      <router-link
        :to="linkItem.to"
        class="font-semibold text-blue-600 hover:text-blue-500 hover:underline transition-colors"
      >
        {{ linkItem.text }}
      </router-link>
    </p>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  type: 'login' | 'signup'
}>()

const linkItem = computed(() => {
  return props.type === 'login'
    ? {
        to: '/auth/login',
        text: 'Log in',
        prompt: 'Already have an account? ',
      }
    : {
        to: '/auth/signup',
        text: 'Sign up',
        prompt: "Don't have an account? ",
      }
})
</script>
