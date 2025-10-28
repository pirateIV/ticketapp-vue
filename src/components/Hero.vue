<template>
  <section class="relative z-1 flex-1 bg-gradient-to-br from-blue-900 via-purple-900 to-blue-900 overflow-hidden">
    <!-- Decorative Circles -->
    <div class="absolute w-80 h-80 -top-40 -right-40 bg-white/10 rounded-full"></div>
    <div class="absolute w-60 h-60 bottom-40 -left-24 bg-white/10 rounded-full"></div>
    <div class="absolute w-40 h-40 top-1/4 left-1/4 bg-white/5 rounded-full"></div>

    <div class="app-container mx-auto px-4 sm:px-6 lg:px-8 pt-20 relative z-10 mt-16 lg:mt-20">
      <div class="grid lg:grid-cols-2 gap-12 items-center">
        <!-- Hero Content -->
        <div class="text-white">
          <h1 class="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tighter leading-tight mb-4">
            Streamline Your Support with{' '}
            <span class="bg-gradient-to-r from-pink-400 to-orange-400 bg-clip-text text-transparent">
              TicketFlow
            </span>
          </h1>

          <p class="text-lg sm:text-xl text-blue-100 leading-relaxed mb-6">
            The ultimate ticket management solution for teams of all sizes.
            Track, prioritize, and resolve issues faster than ever before.
          </p>

          <div class="flex flex-col sm:flex-row gap-4 mb-8">
            <template v-if="!isAuthenticated">
              <router-link
                to="/auth/login"
                class="inline-flex items-center justify-center px-4 py-2 text-sm font-semibold text-blue-600 bg-white rounded-xl hover:bg-gray-50 transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-xl"
              >
                Login to Dashboard
              </router-link>
              <router-link
                to="/auth/signup"
                class="inline-flex items-center justify-center px-4 py-2 text-sm font-semibold text-white border-2 border-white rounded-xl hover:bg-white hover:text-blue-600 transition-all duration-300 transform hover:-translate-y-1"
              >
                Get Started Free
              </router-link>
            </template>
            <template v-else>
              <router-link
                to="/dashboard"
                class="inline-flex items-center justify-center px-4 py-2 text-sm font-semibold text-blue-600 bg-white rounded-xl hover:bg-gray-50 transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-xl"
              >
                Go to Dashboard
              </router-link>
            </template>
          </div>
        </div>

        <!-- Ticket Preview Card -->
        <div class="relative">
          <div class="bg-white rounded-2xl shadow-2xl p-6 max-w-md mx-auto transform rotate-2 hover:rotate-0 transition-transform duration-300">
            <!-- Ticket Header -->
            <div class="flex items-center justify-between mb-4">
              <div class="flex items-center gap-2">
                <span class="px-3 py-1 bg-green-100 text-green-800 text-sm font-semibold rounded-full">
                  Open
                </span>
                <span class="px-3 py-1 bg-red-100 text-red-800 text-sm font-semibold rounded-full">
                  High Priority
                </span>
              </div>
              <div class="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                JD
              </div>
            </div>

            <!-- Ticket Content -->
            <h3 class="text-lg font-semibold text-gray-900 mb-2">
              Implement user authentication system
            </h3>
            <p class="text-gray-600 mb-4">
              Create secure login and registration flow with JWT tokens and
              session management
            </p>

            <!-- Progress Bar -->
            <div class="mb-4">
              <div class="flex justify-between text-sm text-gray-500 mb-1">
                <span>Progress</span>
                <span>60%</span>
              </div>
              <div class="w-full bg-gray-200 rounded-full h-2">
                <div
                  class="bg-blue-500 h-2 rounded-full"
                  style="width: 60%"
                ></div>
              </div>
            </div>

            <!-- Meta Info -->
            <div class="flex items-center justify-between text-sm text-gray-500">
              <div class="flex items-center gap-4">
                <span>Created 2h ago</span>
                <span>•</span>
                <span>Due in 2 days</span>
              </div>
              <div class="flex -space-x-2">
                <div class="w-6 h-6 bg-blue-500 rounded-full border-2 border-white"></div>
                <div class="w-6 h-6 bg-green-500 rounded-full border-2 border-white"></div>
                <div class="w-6 h-6 bg-yellow-500 rounded-full border-2 border-white"></div>
              </div>
            </div>
          </div>

          <!-- Floating Elements -->
          <div class="absolute -top-4 -right-4 w-8 h-8 bg-yellow-400 rounded-full shadow-lg"></div>
          <div class="absolute -bottom-4 -left-4 w-6 h-6 bg-green-400 rounded-full shadow-lg"></div>
        </div>
      </div>
    </div>

    <!-- Wave Background -->
    <WavyLine />
  </section>
</template>

<script setup lang="ts">
import { useSession } from '../composables/useSession'
import WavyLine from './WavyLine.vue'

const isAuthenticated = useSession().isAuthenticated
</script>
