<script setup lang="ts">
import Footer from '~/components/Footer.vue';

</script>

<template>
  <div class="flex flex-col justify-between w-screen h-screen bg-[#f2f2f2] dark:bg-gray-900">
    <!-- Contenido principal (login form o similar) -->
    <slot />

    <!-- Footer -->
    <Footer />
  </div>
</template>
