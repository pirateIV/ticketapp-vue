<template>
  <div class="min-h-screen flex flex-col overflow-hidden">
    <Nav />
    <router-view />
    <Footer />
  </div>
</template>

<script setup>
import Nav from './components/Nav.vue'
import Footer from './components/Footer.vue'
</script>
