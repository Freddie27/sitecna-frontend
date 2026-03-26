<script setup lang="ts">
</script>

<template>
  <div class="w-screen bg-[#f2f2f2] dark:bg-gray-900">
    <footer class="mt-auto">
      <!-- Línea verde con el efecto de transparencia y desenfoque -->
      <div class="h-2 mt-0 bg-gradient-to-r from-[#66BB6A] via-[#4CAF50] to-[#2C6B2F] 
                  [background:linear-gradient(to_right,rgba(56,142,60,0.2),rgba(27,94,32,0.2))] backdrop-blur-lg" />
      
      <!-- Segunda línea delgada en verde (borde superior) con ajuste según el tema -->
      <section class="border-t-2 py-4 px-6 text-center text-grayColor 
                     dark:text-white border-[#66BB6A] dark:border-[#4CAF50]">
        <h4>Copyright © 2025 Telesens Chile Spa.</h4>
      </section>
    </footer>
  </div>
</template>
