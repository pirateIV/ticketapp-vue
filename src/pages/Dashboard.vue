<template>
  <div v-if="isLoading" class="min-h-screen bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900 flex items-center justify-center">
    <div class="text-center">
      <div class="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
      <p class="text-gray-600 text-lg">Loading dashboard...</p>
    </div>
  </div>

  <div v-else class="min-h-screen bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900 py-8 pt-24 px-4 text-sm sm:px-6 lg:px-8">
    <!-- Background Elements -->
    <div class="absolute top-10 right-10 w-16 h-16 bg-purple-200/30 rounded-full blur-xl"></div>
    <div class="absolute bottom-10 left-10 w-20 h-20 bg-blue-200/30 rounded-full blur-xl"></div>

    <div class="max-w-7xl mx-auto relative z-10">
      <!-- Header -->
      <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
        <div>
          <h1 class="text-4xl font-bold text-white mb-2">
            👋 Hi, {{ currentUser?.username }}
          </h1>
          <p class="text-lg text-blue-100">
            Here's your ticket management overview
          </p>
        </div>

        <div class="flex items-center gap-4 mt-4 lg:mt-0">
          <router-link
            to="/tickets"
            class="bg-white px-6 py-3 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 font-semibold text-gray-700 flex items-center gap-2"
          >
            <Ticket :size="20" />
            View All Tickets
          </router-link>
          <button
            @click="handleLogout"
            class="px-6 py-3 text-gray-100 hover:text-gray-200 font-semibold transition-colors"
          >
            Logout
          </button>
        </div>
      </div>

      <!-- Stats Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <!-- Total Tickets -->
        <div class="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-gray-600">Total Tickets</p>
              <p class="text-3xl font-bold text-gray-900 mt-2">{{ stats.total }}</p>
              <p class="text-sm text-gray-500 mt-1">All time</p>
            </div>
            <div class="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <Ticket :size="24" class="text-blue-600" />
            </div>
          </div>
        </div>

        <!-- Open Tickets -->
        <div class="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-gray-600">Open Tickets</p>
              <p class="text-3xl font-bold text-green-600 mt-2">{{ stats.open }}</p>
              <p class="text-sm text-gray-500 mt-1">Needs attention</p>
            </div>
            <div class="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <AlertCircle :size="24" class="text-green-600" />
            </div>
          </div>
        </div>

        <!-- In Progress -->
        <div class="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-gray-600">In Progress</p>
              <p class="text-3xl font-bold text-amber-600 mt-2">{{ stats.in_progress }}</p>
              <p class="text-sm text-gray-500 mt-1">Being worked on</p>
            </div>
            <div class="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center">
              <Clock :size="24" class="text-amber-600" />
            </div>
          </div>
        </div>

        <!-- Closed Tickets -->
        <div class="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-gray-600">Closed Tickets</p>
              <p class="text-3xl font-bold text-gray-600 mt-2">{{ stats.closed }}</p>
              <p class="text-sm text-gray-500 mt-1">Resolved</p>
            </div>
            <div class="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center">
              <CheckCircle :size="24" class="text-gray-600" />
            </div>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Quick Actions & Recent Tickets -->
        <div class="lg:col-span-2 space-y-8">
          <!-- Quick Actions -->
          <div class="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <h2 class="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Activity :size="20" class="text-blue-600" />
              Quick Actions
            </h2>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <button
                class="p-4 border-2 border-dashed border-gray-300 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-all duration-300 group"
                @click="handleCreateTicket"
              >
                <div class="flex items-center gap-3">
                  <div class="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                    <Plus :size="20" class="text-blue-600" />
                  </div>
                  <div>
                    <p class="font-semibold text-gray-900">Create New Ticket</p>
                    <p class="text-sm text-gray-600">Report a new issue</p>
                  </div>
                </div>
              </button>

              <router-link
                to="/tickets"
                class="p-4 border-2 border-dashed border-gray-300 rounded-xl hover:border-green-500 hover:bg-green-50 transition-all duration-300 group"
              >
                <div class="flex items-center gap-3">
                  <div class="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center group-hover:bg-green-200 transition-colors">
                    <Ticket :size="20" class="text-green-600" />
                  </div>
                  <div>
                    <p class="font-semibold text-gray-900">Manage Tickets</p>
                    <p class="text-sm text-gray-600">View all tickets</p>
                  </div>
                </div>
              </router-link>
            </div>
          </div>

          <!-- Recent Tickets -->
          <div class="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <div class="flex items-center justify-between mb-6">
              <h2 class="text-xl font-semibold text-gray-900 flex items-center gap-2">
                <TrendingUp :size="20" class="text-blue-600" />
                Ticket manager
              </h2>
              <router-link
                to="/tickets"
                class="text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1 text-sm"
              >
                View all
                <ArrowRight :size="16" />
              </router-link>
            </div>

            <div v-if="recentTickets.length === 0" class="text-center py-8">
              <Ticket :size="48" class="text-gray-400 mx-auto mb-3" />
              <button
                class="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                @click="handleCreateTicket"
              >
                <Plus :size="16" />
                Create Your First Ticket
              </button>
            </div>

            <div v-else class="space-y-4">
              <div
                v-for="ticket in recentTickets"
                :key="ticket.id"
                class="flex items-center justify-between p-4 border border-gray-200 rounded-xl hover:border-blue-300 hover:shadow-md transition-all duration-300 group"
              >
                <div class="flex items-center gap-4 flex-1">
                  <component :is="getStatusIcon(ticket.status)" :size="16" />
                  <div class="flex-1 min-w-0">
                    <h3 class="font-semibold text-gray-900 truncate group-hover:text-blue-600 transition-colors">
                      {{ ticket.title }}
                    </h3>
                    <div class="flex items-center gap-3 mt-1">
                      <span :class="`px-2 py-1 text-xs font-medium rounded-full border ${getStatusColor(ticket.status)}`">
                        {{ ticket.status === 'in_progress' ? 'In Progress' : ticket.status }}
                      </span>
                      <span :class="`px-2 py-1 text-xs font-medium rounded-full ${getPriorityColor(ticket.priority)}`">
                        {{ ticket.priority }} priority
                      </span>
                      <span class="text-xs text-gray-500">
                        {{ new Date(ticket.createdAt).toLocaleDateString() }}
                      </span>
                    </div>
                  </div>
                </div>
                <ArrowRight :size="16" class="text-gray-400 group-hover:text-blue-600 transition-colors" />
              </div>
            </div>
          </div>
        </div>

        <!-- Sidebar - Stats & Insights -->
        <div class="space-y-8">
          <!-- Status Distribution -->
          <div class="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <h2 class="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Users :size="20" class="text-purple-600" />
              Status Distribution
            </h2>
            <div class="space-y-4">
              <div
                v-for="item in statusDistribution"
                :key="item.status"
                class="flex items-center justify-between"
              >
                <div class="flex items-center gap-3">
                  <div :class="`w-3 h-3 rounded-full ${item.color}`"></div>
                  <span class="text-sm font-medium text-gray-700">{{ item.label }}</span>
                </div>
                <div class="flex items-center gap-2">
                  <span class="text-sm font-semibold text-gray-900">{{ item.count }}</span>
                  <span class="text-xs text-gray-500">
                    ({{ stats.total > 0 ? Math.round((item.count / stats.total) * 100) : 0 }}%)
                  </span>
                </div>
              </div>
            </div>

            <!-- Progress Bars -->
            <div class="mt-4 space-y-2">
              <div
                v-for="item in statusDistribution"
                :key="item.status"
                class="flex items-center gap-3"
              >
                <div class="w-16 text-xs text-gray-600 text-right">{{ item.count }}</div>
                <div class="flex-1 bg-gray-200 rounded-full h-2">
                  <div
                    :class="`h-2 rounded-full ${item.color} transition-all duration-500`"
                    :style="{ width: stats.total > 0 ? `${(item.count / stats.total) * 100}%` : '0%' }"
                  ></div>
                </div>
              </div>
            </div>
          </div>

          <!-- Quick Stats -->
          <div class="bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl p-6 text-white">
            <h2 class="text-xl font-semibold mb-4">Your Impact</h2>
            <div class="space-y-3">
              <div class="flex justify-between items-center">
                <span class="text-blue-100">Tickets Created</span>
                <span class="text-lg font-bold">{{ stats.total }}</span>
              </div>
              <div class="flex justify-between items-center">
                <span class="text-blue-100">Currently Active</span>
                <span class="text-lg font-bold">{{ stats.open + stats.in_progress }}</span>
              </div>
              <div class="flex justify-between items-center">
                <span class="text-blue-100">Successfully Closed</span>
                <span class="text-lg font-bold">{{ stats.closed }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useSession } from '../composables/useSession'
import { useTickets } from '../composables/useTickets'
import { SessionService } from '../services/session'
import {
  Ticket,
  Plus,
  AlertCircle,
  CheckCircle,
  Clock,
  TrendingUp,
  Users,
  Activity,
  ArrowRight,
} from 'lucide-vue-next'

const router = useRouter()
const { user, logout } = useSession()
const { getUserTickets, getUserTicketStats, isLoading } = useTickets()

const recentTickets = ref<any[]>([])
const currentUser = computed(() => {
  if (user.value?.id) {
    return SessionService.getCurrentUser(user.value.id)
  }
  return null
})

const tickets = computed(() => getUserTickets())
const stats = computed(() => getUserTicketStats())

const statusDistribution = computed(() => [
  { status: 'open', count: stats.value.open, color: 'bg-green-500', label: 'Open' },
  { status: 'in_progress', count: stats.value.in_progress, color: 'bg-amber-500', label: 'In Progress' },
  { status: 'closed', count: stats.value.closed, color: 'bg-gray-500', label: 'Closed' },
])

onMounted(() => {
  if (tickets.value.length > 0) {
    const sortedTickets = [...tickets.value]
      .sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, 5)
    recentTickets.value = sortedTickets
  }
})

const handleCreateTicket = () => {
  router.push('/tickets?create=new')
}

const handleLogout = () => {
  logout()
  router.push('/')
}

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'open':
      return AlertCircle
    case 'in_progress':
      return Clock
    case 'closed':
      return CheckCircle
    default:
      return Ticket
  }
}

const getStatusColor = (status: string) => {
  switch (status) {
    case 'open':
      return 'bg-green-100 text-green-800 border-green-200'
    case 'in_progress':
      return 'bg-amber-100 text-amber-800 border-amber-200'
    case 'closed':
      return 'bg-gray-100 text-gray-800 border-gray-200'
    default:
      return 'bg-blue-100 text-blue-800 border-blue-200'
  }
}

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case 'high':
      return 'bg-red-100 text-red-800'
    case 'medium':
      return 'bg-yellow-100 text-yellow-800'
    case 'low':
      return 'bg-gray-100 text-gray-800'
    default:
      return 'bg-blue-100 text-blue-800'
  }
}
</script>
