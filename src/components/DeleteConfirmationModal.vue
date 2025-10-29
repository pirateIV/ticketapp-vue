<template>
  <div v-if="isOpen" class="fixed inset-0 bg-gray-950/50 flex items-center text-sm justify-center p-4 z-50">
    <div class="bg-white rounded-2xl shadow-2xl max-w-sm w-full">
      <div class="p-6">
        <!-- Icon -->
        <div class="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Trash2 :size="24" class="text-red-600" />
        </div>

        <!-- Content -->
        <h3 class="text-lg font-semibold text-gray-900 text-center mb-2">
          Delete Ticket
        </h3>
        <p class="text-gray-600 text-center mb-6">
          Are you sure you want to delete <strong>"{{ title }}"</strong>? This action cannot be undone.
        </p>

        <!-- Actions -->
        <div class="flex gap-3">
          <button
            @click="$emit('close')"
            class="flex-1 px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors font-medium"
          >
            Cancel
          </button>
          <button
            @click="$emit('confirm')"
            class="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Trash2 } from 'lucide-vue-next'

defineProps<{
  isOpen: boolean
  title?: string
}>()

defineEmits(['close', 'confirm'])
</script>
  