<script setup lang="ts">
import Navbar from '~/components/Navbar.vue';
import Footer from '~/components/Footer.vue';
</script>

<template>
  <div class="min-h-screen flex flex-col transition-colors duration-300 bg-[#f2f2f2] text-gray-900 dark:bg-gray-900 dark:text-white">
    <!-- Navbar -->
    <div class="relative z-20">
      <Navbar />
    </div>

    <!-- Contenido principal -->
    <main class="flex-1 flex flex-col">
      <slot />  <!-- Aquí se inserta el contenido de las páginas, como index.vue -->
    </main>

    <!-- Footer -->
    <Footer />
  </div>
</template>
