<script setup lang="ts">
import Sidebar from '~/components/Sidebar.vue'
import Navbar from '~/components/Navbar.vue'
import Footer from '~/components/Footer.vue'
</script>

<template>
  <div class="h-screen flex flex-col bg-gray-50 text-gray-900 dark:bg-gray-900 dark:text-white">
   
    <!-- Navbar que ocupa todo el ancho -->
    <Navbar />
    
    <!-- Contenedor principal con sidebar y contenido -->
    <div class="flex flex-1 min-h-0">
     
      <!-- Sidebar autocontenido -->
      <Sidebar class="flex-shrink-0" />
     
      <!-- Contenido principal -->
      <div class="flex-1 flex flex-col min-h-0">
        <main class="flex-1 overflow-auto flex items-center justify-center">
          <div class="w-full max-w-sm mx-auto px-3 py-4 sm:max-w-md sm:px-4 sm:py-6 md:max-w-2xl md:px-6 lg:max-w-4xl lg:px-8 xl:max-w-6xl xl:px-10 2xl:max-w-7xl">
            <slot />  <!-- Aquí se inserta el contenido de las páginas -->
          </div>
        </main>
      </div>
     
    </div>
   
    <!-- Footer que ocupa todo el ancho -->
    <Footer />
   
  </div>
</template>

<style scoped>
/* Solo estilos para scrollbar que no se pueden hacer con Tailwind */
main::-webkit-scrollbar {
  width: 6px;
}

main::-webkit-scrollbar-track {
  background: transparent;
}

main::-webkit-scrollbar-thumb {
  @apply bg-slate-300 dark:bg-gray-600;
  border-radius: 3px;
}

main::-webkit-scrollbar-thumb:hover {
  @apply bg-slate-400 dark:bg-gray-500;
}
</style>