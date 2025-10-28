<template>
  <div v-if="isOpen" class="fixed inset-0 bg-gray-950/80 flex items-center justify-center p-4 z-50 text-sm">
    <div class="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-hidden">
      <!-- Header -->
      <div class="flex items-center justify-between p-6 border-b border-gray-200">
        <h2 class="text-xl font-semibold text-gray-900">
          {{ mode === 'create' ? 'Create New Ticket' : 'Edit Ticket' }}
        </h2>
        <button
          @click="$emit('close')"
          class="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <X :size="20" />
        </button>
      </div>

      <!-- Form -->
      <form @submit="handleSubmit" class="p-6 space-y-6">
        <!-- Title -->
        <div>
          <label class="block font-medium text-gray-700 mb-2">Title *</label>
          <input
            type="text"
            v-model="formData.title"
            :class="[
              'w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors',
              errors.title ? 'border-red-500' : 'border-gray-300'
            ]"
            placeholder="Enter ticket title..."
          />
          <p v-if="errors.title" class="text-red-600 mt-1">{{ errors.title }}</p>
        </div>

        <!-- Description -->
        <div>
          <label class="block font-medium text-gray-700 mb-2">Description</label>
          <textarea
            v-model="formData.description"
            rows="4"
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none"
            placeholder="Describe the issue or task..."
          />
        </div>

        <!-- Status and Priority -->
        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="block font-medium text-gray-700 mb-2">Status *</label>
            <select
              v-model="formData.status"
              :class="[
                'w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors',
                errors.status ? 'border-red-500' : 'border-gray-300'
              ]"
            >
              <option value="open">🟢 Open</option>
              <option value="in_progress">🟡 In Progress</option>
              <option value="closed">⚫ Closed</option>
            </select>
            <p v-if="errors.status" class="text-red-600 text-sm mt-1">{{ errors.status }}</p>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Priority</label>
            <select
              v-model="formData.priority"
              class="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
        </div>

        <!-- Actions -->
        <div class="flex gap-3 pt-4">
          <button
            type="button"
            @click="$emit('close')"
            class="flex-1 px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors font-medium"
          >
            Cancel
          </button>
          <button
            type="submit"
            :disabled="isLoading"
            class="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            <Loader v-if="isLoading" :size="16" class="animate-spin" />
            {{ mode === 'create' ? 'Create Ticket' : 'Save Changes' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { X, Loader } from 'lucide-vue-next'
import { useTickets } from '../composables/useTickets'

const props = defineProps<{
  isOpen: boolean
  mode?: 'create' | 'edit'
  ticket?: any
}>()

const emit = defineEmits(['close', 'success'])

const { addTicket, editTicket } = useTickets()
const isLoading = ref(false)
const formData = ref({
  title: '',
  description: '',
  status: 'open',
  priority: 'medium',
})
const errors = ref<any>({})

watch(() => props.isOpen, (newVal) => {
  if (newVal) {
    if (props.mode === 'edit' && props.ticket) {
      formData.value = {
        title: props.ticket.title || '',
        description: props.ticket.description || '',
        status: props.ticket.status || 'open',
        priority: props.ticket.priority || 'medium',
      }
    } else {
      formData.value = {
        title: '',
        description: '',
        status: 'open',
        priority: 'medium',
      }
    }
    errors.value = {}
  }
})

const validateForm = () => {
  const newErrors: any = {}

  if (!formData.value.title.trim()) {
    newErrors.title = 'Title is required'
  } else if (formData.value.title.length < 3) {
    newErrors.title = 'Title must be at least 3 characters'
  }

  if (!['open', 'in_progress', 'closed'].includes(formData.value.status)) {
    newErrors.status = 'Invalid status value'
  }

  errors.value = newErrors
  return Object.keys(newErrors).length === 0
}

const handleSubmit = async (e: Event) => {
  e.preventDefault()

  if (!validateForm()) return

  try {
    if (props.mode === 'create') {
      await addTicket(formData.value)
    } else {
      await editTicket(props.ticket.id, formData.value)
    }
    emit('success')
  } catch (error) {
    console.error('Error saving ticket:', error)
  }
}
</script>
