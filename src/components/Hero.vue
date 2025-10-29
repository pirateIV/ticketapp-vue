<template>
  <section class="relative z-1 flex-1 bg-gradient-to-br from-blue-900 via-purple-900 to-blue-900 overflow-hidden">
    <!-- Decorative Circles -->
    <div class="absolute w-80 h-80 -top-40 -right-40 bg-white/10 rounded-full"></div>
    <div class="absolute w-60 h-60 bottom-40 -left-24 bg-white/10 rounded-full"></div>
    <div class="absolute w-40 h-40 top-1/4 left-1/4 bg-white/5 rounded-full"></div>

    <div class="app-container mx-auto px-4 text-center sm:px-6 lg:px-8 pt-20 relative z-10 mt-16 lg:mt-20">
      <div class="text-center max-w-3xl mx-auto">
        <!-- Hero Content -->
        <div class="text-white">
          <h1 class="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tighter leading-tight mb-4">
            Streamline Your Support with
            <span class="bg-gradient-to-r from-pink-400 to-orange-400 bg-clip-text text-transparent">
              TicketFlow
            </span>
          </h1>

          <p class="text-lg sm:text-xl text-blue-100 leading-relaxed mb-6">
            The ultimate ticket management solution for teams of all sizes.
            Track, prioritize, and resolve issues faster than ever before.
          </p>

          <div class="flex flex-col justify-center sm:flex-row gap-4 mb-8">
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
