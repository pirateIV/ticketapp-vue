<template>
  <div v-if="isLoading" class="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center">
    <div class="text-center">
      <div class="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
      <p class="text-gray-600 text-lg">Loading tickets...</p>
    </div>
  </div>

  <div v-else class="min-h-screen relative bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900 py-8 px-4 sm:px-6 lg:px-8">
    <!-- Background Elements -->
    <div class="absolute top-10 right-10 w-16 h-16 bg-purple-200/30 rounded-full blur-xl"></div>
    <div class="absolute bottom-10 left-10 w-20 h-20 bg-blue-200/30 rounded-full blur-xl"></div>

    <div class="max-w-7xl mx-auto relative z-10">
      <!-- Header -->
      <div class="text-center mb-12 pt-16">
        <h1 class="text-4xl font-bold text-gray-50 mb-4">Ticket Management</h1>
        <p class="text-xl text-blue-100 max-w-2xl mx-auto">
          Streamline your support process with efficient ticket tracking
        </p>
      </div>

      <!-- Stats Overview -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div class="bg-white rounded-2xl p-6 shadow-xs border border-gray-100 hover:shadow-xl transition-shadow duration-300">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-gray-600">Total Tickets</p>
              <p class="text-3xl font-bold text-gray-900 mt-2">{{ tickets.length }}</p>
            </div>
            <div class="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <TicketIcon :size="24" class="text-blue-600" />
            </div>
          </div>
        </div>

        <div class="bg-white rounded-2xl p-6 shadow-xs border border-gray-100 hover:shadow-xl transition-shadow duration-300">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-gray-600">Open</p>
              <p class="text-3xl font-bold text-green-600 mt-2">
                {{ tickets.filter((t: any) => t.status === 'open').length }}
              </p>
            </div>
            <div class="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <div class="w-3 h-3 bg-green-500 rounded-full"></div>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-2xl p-6 shadow-xs border border-gray-100 hover:shadow-xl transition-shadow duration-300">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-gray-600">In Progress</p>
              <p class="text-3xl font-bold text-amber-600 mt-2">
                {{ tickets.filter((t: any) => t.status === 'in_progress').length }}
              </p>
            </div>
            <div class="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center">
              <div class="w-3 h-3 bg-amber-500 rounded-full"></div>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-2xl p-6 shadow-xs border border-gray-100 hover:shadow-xl transition-shadow duration-300">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-gray-600">Closed</p>
              <p class="text-3xl font-bold text-gray-600 mt-2">
                {{ tickets.filter((t: any) => t.status === 'closed').length }}
              </p>
            </div>
            <div class="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center">
              <div class="w-3 h-3 bg-gray-500 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>

      <!-- Controls Section -->
      <div class="bg-white rounded-2xl p-6 shadow-xs border border-gray-100 mb-8">
        <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <!-- Search and Filters -->
          <div class="flex flex-col sm:flex-row gap-4 flex-1">
            <div class="relative flex-1 max-w-md">
              <Search class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search tickets..."
                v-model="searchTerm"
                class="w-full pl-10 pr-4 py-3 text-sm border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
              />
            </div>

            <!-- Status Filters -->
            <div class="flex bg-gray-100 p-1 rounded-xl">
              <button
                v-for="filter in filters"
                :key="filter.id"
                @click="activeFilter = filter.id"
                :class="[
                  'px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300 flex items-center gap-2',
                  activeFilter === filter.id
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                ]"
              >
                <span>{{ filter.label }}</span>
                <span class="bg-gray-200 text-gray-700 px-2 py-1 rounded-full text-xs">
                  {{ filter.count }}
                </span>
              </button>
            </div>
          </div>

          <!-- Create Ticket Button -->
          <button
            @click="isCreateModalOpen = true"
            class="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold shadow-xs hover:shadow-xl transform transition-all duration-300 hover:scale-105 flex items-center gap-2"
          >
            <Plus :size="20" />
            Create Ticket
          </button>
        </div>
      </div>

      <!-- Tickets Grid -->
      <div v-if="filteredTickets.length === 0" class="bg-white rounded-2xl p-12 text-center border border-gray-100 shadow-xs">
        <div class="max-w-md mx-auto">
          <TicketIcon :size="64" class="text-gray-400 mx-auto mb-4" />
          <h3 class="text-2xl font-bold text-gray-900 mb-2">
            {{ tickets.length === 0 ? 'No tickets yet' : 'No tickets found' }}
          </h3>
          <p class="text-gray-600 mb-6">
            {{ tickets.length === 0
              ? 'Get started by creating your first support ticket.'
              : 'Try adjusting your search or filter criteria.' }}
          </p>
          <button
            @click="isCreateModalOpen = true"
            class="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold shadow-xs hover:shadow-xl transform transition-all duration-300 hover:scale-105 flex items-center gap-2 mx-auto"
          >
            <Plus :size="20" />
            Create Your First Ticket
          </button>
        </div>
      </div>

      <div v-else class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        <div
          v-for="ticket in filteredTickets"
          :key="ticket.id"
          class="bg-white rounded-2xl p-6 shadow-xs outline-4 outline-white/50 hover:shadow-xl transition-all duration-300 group"
        >
          <!-- Header -->
          <div class="flex items-start justify-between mb-4">
            <div class="flex items-center gap-2">
              <span :class="`px-3 py-1 text-xs font-semibold rounded-full border ${getStatusInfo(ticket.status).color}`">
                {{ getStatusInfo(ticket.status).icon }} {{ getStatusInfo(ticket.status).label }}
              </span>
              <span :class="`px-3 py-1 text-xs font-semibold rounded-full border ${getPriorityInfo(ticket.priority).color}`">
                {{ getPriorityInfo(ticket.priority).label }}
              </span>
            </div>
            <div class="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex gap-1">
              <button
                @click="handleEditTicket(ticket)"
                class="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
              >
                <Edit :size="16" />
              </button>
              <button
                @click="handleDeleteClick(ticket)"
                class="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              >
                <Trash2 :size="16" />
              </button>
            </div>
          </div>

          <!-- Content -->
          <div class="mb-4">
            <h3 class="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
              {{ ticket.title }}
            </h3>
            <p v-if="ticket.description" class="text-gray-600 w-full text-sm text-wrap whitespace-pre-wrap text-ellipsis line-clamp-3">
              {{ ticket.description }}
            </p>
          </div>

          <!-- Footer -->
          <div class="flex items-center justify-between text-sm text-gray-500 pt-2 border-t border-gray-100">
            <span>{{ new Date(ticket.createdAt).toLocaleDateString() }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Create Ticket Modal -->
    <TicketModal
      :isOpen="isCreateModalOpen"
      @close="isCreateModalOpen = false"
      @success="handleCreateSuccess"
      mode="create"
    />

    <!-- Edit Ticket Modal -->
    <TicketModal
      :isOpen="!!editingTicket"
      @close="editingTicket = null"
      @success="handleEditSuccess"
      mode="edit"
      :ticket="editingTicket"
    />

    <!-- Delete Confirmation Modal -->
    <DeleteConfirmationModal
      :isOpen="!!deleteTicket"
      @close="deleteTicket = null"
      @confirm="confirmDelete"
      :title="deleteTicket?.title"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useTickets } from '../composables/useTickets'
import { Ticket as TicketIcon, Search, Plus, Edit, Trash2 } from 'lucide-vue-next'
import TicketModal from '../components/TicketModal.vue'
import DeleteConfirmationModal from '../components/DeleteConfirmationModal.vue'

const route = useRoute()
const router = useRouter()
const { getUserTickets, isLoading, deleteTicket: deleteTicketAction } = useTickets()

const activeFilter = ref('all')
const searchTerm = ref('')
const isCreateModalOpen = ref(false)
const editingTicket = ref<any>(null)
const deleteTicket = ref<any>(null)

const tickets = computed(() => getUserTickets())

const statusConfig: any = {
  open: { color: 'bg-green-100 text-green-800 border-green-200', label: 'Open', icon: '🟢' },
  in_progress: { color: 'bg-amber-100 text-amber-800 border-amber-200', label: 'In Progress', icon: '🟡' },
  closed: { color: 'bg-gray-100 text-gray-800 border-gray-200', label: 'Closed', icon: '⚫' },
}

const priorityConfig: any = {
  high: { color: 'bg-red-100 text-red-800 border-red-200', label: 'High' },
  medium: { color: 'bg-yellow-100 text-yellow-800 border-yellow-200', label: 'Medium' },
  low: { color: 'bg-gray-100 text-gray-800 border-gray-200', label: 'Low' },
}

const filters = computed(() => [
  { id: 'all', label: 'All Tickets', count: tickets.value.length },
  { id: 'open', label: 'Open', count: tickets.value.filter((t: any) => t.status === 'open').length },
  { id: 'in_progress', label: 'In Progress', count: tickets.value.filter((t: any) => t.status === 'in_progress').length },
  { id: 'closed', label: 'Closed', count: tickets.value.filter((t: any) => t.status === 'closed').length },
])

const filteredTickets = computed(() => {
  return tickets.value.filter((ticket: any) => {
    const matchesFilter = activeFilter.value === 'all' || ticket.status === activeFilter.value
    const matchesSearch =
      ticket.title.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
      (ticket.description && ticket.description.toLowerCase().includes(searchTerm.value.toLowerCase()))
    return matchesFilter && matchesSearch
  })
})

const handleEditTicket = (ticket: any) => {
  editingTicket.value = ticket
}

const handleDeleteClick = (ticket: any) => {
  deleteTicket.value = ticket
}

const confirmDelete = () => {
  if (deleteTicket.value) {
    deleteTicketAction(deleteTicket.value.id)
    deleteTicket.value = null
  }
}

const handleCreateSuccess = () => {
  isCreateModalOpen.value = false
}

const handleEditSuccess = () => {
  editingTicket.value = null
}

const getStatusInfo = (status: string) => statusConfig[status] || statusConfig.open
const getPriorityInfo = (priority: string) => priorityConfig[priority] || priorityConfig.medium

onMounted(() => {
  const createParam = route.query.create
  if (createParam === 'new') {
    isCreateModalOpen.value = true
    router.replace({ query: {} })
  }
})
</script>
