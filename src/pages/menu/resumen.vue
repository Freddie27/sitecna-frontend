<script setup lang="ts">
import { ref, onMounted } from 'vue';

const averageTemp = ref<number | null>(null);
const activeAlerts = ref<number>(0);
const lastUpdate = ref<string>('');
const activeSensors = ref<number>(0);

// Simulación: reemplazá esto por tu API real
onMounted(() => {
  averageTemp.value = 4.2;
  activeAlerts.value = 3;
  lastUpdate.value = new Date().toLocaleString();
  activeSensors.value = 12;
});
</script>

<template>
  <div class="flex flex-col gap-8 p-6">
    <h1 class="text-2xl font-bold text-gray-800 dark:text-gray-100">Resumen de sensores</h1>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <!-- Temperatura promedio -->
      <div class="bg-gradient-to-r from-blue-100 to-blue-200 dark:from-blue-800 dark:to-blue-700 rounded-2xl shadow-md p-4 hover:scale-105 transition-all">
        <h2 class="text-lg font-semibold text-gray-700 dark:text-gray-200">Temp. Promedio</h2>
        <p class="text-3xl font-bold text-blue-700 dark:text-blue-300">
          {{ averageTemp !== null ? averageTemp.toFixed(1) + '°C' : 'Cargando...' }}
        </p>
      </div>

      <!-- Alertas activas -->
      <div class="bg-gradient-to-r from-red-100 to-red-200 dark:from-red-800 dark:to-red-700 rounded-2xl shadow-md p-4 hover:scale-105 transition-all">
        <h2 class="text-lg font-semibold text-gray-700 dark:text-gray-200">Alertas Activas</h2>
        <p class="text-3xl font-bold text-red-700 dark:text-red-300">{{ activeAlerts }}</p>
      </div>

      <!-- Última actualización -->
      <div class="bg-gradient-to-r from-green-100 to-green-200 dark:from-green-800 dark:to-green-700 rounded-2xl shadow-md p-4 hover:scale-105 transition-all">
        <h2 class="text-lg font-semibold text-gray-700 dark:text-gray-200">Última Actualización</h2>
        <p class="text-base font-medium text-green-700 dark:text-green-300">{{ lastUpdate }}</p>
      </div>

      <!-- Sensores activos -->
      <div class="bg-gradient-to-r from-purple-100 to-purple-200 dark:from-purple-800 dark:to-purple-700 rounded-2xl shadow-md p-4 hover:scale-105 transition-all">
        <h2 class="text-lg font-semibold text-gray-700 dark:text-gray-200">Sensores Activos</h2>
        <p class="text-3xl font-bold text-purple-700 dark:text-purple-300">{{ activeSensors }}</p>
      </div>
    </div>
  </div>
</template>
