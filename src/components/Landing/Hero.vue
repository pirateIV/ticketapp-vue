<script setup>
import { useRouter } from "vue-router";
import WavyLine from "../WavyLine.vue";
// import { useSession } from "@/context/session"; // adjust path if needed

// const { isAuthenticated, logout } = useSession();
const isAuthenticated = false;
const logout = () => {  }
const router = useRouter();

const handleLogout = () => {
  logout();
  router.push("/");
};
</script>

<template>
  <section
    class="relative z-1 flex-1 bg-gradient-to-br from-blue-900 via-purple-900 to-blue-900 overflow-hidden"
  >
    <div class="absolute w-80 h-80 -top-40 -right-40 bg-white/10 rounded-full"></div>
    <div class="absolute w-60 h-60 bottom-40 -left-24 bg-white/10 rounded-full"></div>
    <div class="absolute w-40 h-40 top-1/4 left-1/4 bg-white/5 rounded-full"></div>

    <div
      class="app-container mx-auto px-4 sm:px-6 lg:px-8 pt-20 relative z-10 mt-16 lg:mt-20"
    >
      <div class="grid lg:grid-cols-2 gap-12 items-center">
        <div class="text-white">
          <h1
            class="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tighter leading-tight mb-4"
          >
            Streamline Your Support with
            <span
              class="bg-gradient-to-r from-pink-400 to-orange-400 bg-clip-text text-transparent"
            >
              TicketFlow
            </span>
          </h1>

          <p class="text-lg sm:text-xl text-blue-100 leading-relaxed mb-6">
            The ultimate ticket management solution for teams of all sizes.
            Track, prioritize, and resolve issues faster than ever before.
          </p>

          <div class="flex flex-col sm:flex-row gap-4 mb-8">
            <template v-if="!isAuthenticated">
              <RouterLink
                to="/auth/login"
                class="inline-flex items-center justify-center px-4 py-2 text-sm font-semibold text-blue-600 bg-white rounded-xl hover:bg-gray-50 transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-xl"
              >
                Login to Dashboard
              </RouterLink>

              <RouterLink
                to="/auth/signup"
                class="inline-flex items-center justify-center px-4 py-2 text-sm font-semibold text-white bg-blue-600 rounded-xl hover:bg-blue-700 transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-xl"
              >
                Get Started
              </RouterLink>
            </template>

            <template v-else>
              <button
                @click="handleLogout"
                class="inline-flex items-center justify-center px-4 py-2 text-sm font-semibold text-white bg-red-600 rounded-xl hover:bg-red-700 transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-xl"
              >
                Logout
              </button>
            </template>
          </div>

          <WavyLine />
        </div>
      </div>
    </div>
  </section>
</template>
