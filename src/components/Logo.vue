<template>
  <h3 :class="`text-lg font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent ${className}`">
    TicketFlow
  </h3>
</template>

<script setup lang="ts">
defineProps<{
  className?: string
}>()
</script>
