<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useTheme } from '~/composables/useTheme'
import { Sun, Moon } from '~/composables/useIcons'

const { isDarkMode, toggleTheme } = useTheme()
const mounted = ref(false)

onMounted(() => {
  mounted.value = true
})

// Elegimos el icono actual (Sol o Luna)
const icon = computed(() => isDarkMode.value ? Moon : Sun)

// Definimos dinámicamente el color del icono
const iconColorClass = computed(() => isDarkMode.value ? 'text-white' : 'text-black')
</script>

<template>
  <button
    @click="toggleTheme"
    aria-label="Cambiar tema"
    class="p-3 bg-gradient-to-r from-[#4CAF50] to-[#388E3C] text-white rounded-full shadow-lg hover:scale-105 transition-all duration-300 ease-in-out focus:outline-none transition-opacity duration-500"
    :class="mounted ? 'opacity-100' : 'opacity-0'"
  >
    <component
      v-if="mounted"
      :is="icon"
      class="w-5 h-5 transition-all duration-500"
      :class="iconColorClass"
    />
  </button>
</template>
