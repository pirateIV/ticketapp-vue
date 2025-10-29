<template>
  <header class="px-6 w-full z-50 fixed top-0 left-0">
    <nav class="flex items-center justify-between max-w-4xl mx-auto ps-5 pe-2 py-1.5 border border-gray-400 bg-white outline-4 outline-white/40 rounded-lg mt-3 w-full z-5">
      <router-link to="/" class="max-[450px]:hidden">
        <Logo class="text-gray-900" />
      </router-link>

      <ul class="flex items-center max-[450px]:w-full max-[450px]:justify-between gap-x-5 text-sm font-medium">
        <li v-if="!isAuthenticated">
          <router-link
            class="bg-gray-200 text-gray-900 py-2 px-3 rounded-md"
            to="/auth/login"
          >
            Login
          </router-link>
        </li>
        <li v-if="!isAuthenticated">
          <router-link
            class="bg-gray-900 text-white py-2 px-3 rounded-md"
            to="/auth/signup"
          >
            Signup
          </router-link>
        </li>
        <li v-if="isAuthenticated">
          <router-link to="/tickets">Tickets</router-link>
        </li>
        <li v-if="isAuthenticated">
          <router-link to="/dashboard">Dashboard</router-link>
        </li>
        <li v-if="isAuthenticated">
          <button
            class="bg-gray-900 text-white py-2 px-3 rounded-md"
            @click="logout"
          >
            Logout
          </button>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script setup lang="ts">
import { useSession } from '../composables/useSession'
import Logo from './Logo.vue'

const { isAuthenticated, logout } = useSession()
</script>
