<script setup lang="ts">
</script>
<template>
  <div class="w-screen bg-[#f2f2f2] dark:bg-gray-900">
    <footer class="mt-auto">
      <!-- Línea azul con el efecto de transparencia y desenfoque -->
      <div class="h-2 mt-0 bg-gradient-to-r from-[#60A5FA] via-[#2563EB] to-[#1E40AF] 
                  [background:linear-gradient(to_right,rgba(37,99,235,0.2),rgba(30,64,175,0.2))] backdrop-blur-lg" />
      
      <!-- Segunda línea delgada en azul (borde superior) con ajuste según el tema -->
      <section class="border-t-2 py-4 px-6 text-center text-grayColor 
                     dark:text-white border-[#60A5FA] dark:border-[#2563EB]">
        <h4>Copyright © 2026 Sitecna.</h4>
      </section>
    </footer>
  </div>
</template>