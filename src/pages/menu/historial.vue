<script setup lang="ts">
import { ref, computed } from 'vue';

interface Historial {
  id: string;
  sensor: string;
  fecha: string; // ISO
  temperatura: number;
  humedad: number;
}

const historialData = ref<Historial[]>([
  {
    id: 'H001',
    sensor: 'Sensor Frío A1',
    fecha: '2025-05-11T14:32:00Z',
    temperatura: -5,
    humedad: 75,
  },
  {
    id: 'H002',
    sensor: 'Sensor Frío A1',
    fecha: '2025-05-10T18:45:00Z',
    temperatura: -4.5,
    humedad: 80,
  },
  {
    id: 'H003',
    sensor: 'Sensor Térmico B2',
    fecha: '2025-05-09T21:15:00Z',
    temperatura: 22,
    humedad: 50,
  },
  {
    id: 'H004',
    sensor: 'Sensor Térmico B2',
    fecha: '2025-05-08T06:12:00Z',
    temperatura: 20,
    humedad: 55,
  },
]);

const sensorFiltro = ref('');
const fechaInicio = ref('');
const fechaFin = ref('');

const filteredHistorial = computed(() =>
  historialData.value.filter((data) => {
    const matchSensor = !sensorFiltro.value || data.sensor === sensorFiltro.value;
    const matchFechaInicio = !fechaInicio.value || new Date(data.fecha) >= new Date(fechaInicio.value);
    const matchFechaFin = !fechaFin.value || new Date(data.fecha) <= new Date(fechaFin.value);
    return matchSensor && matchFechaInicio && matchFechaFin;
  })
);
</script>

<template>
  <div class="p-6 space-y-6">
    <h1 class="text-3xl font-bold text-center text-gray-800 dark:text-white">Historial de Datos</h1>

    <!-- Filtros -->
    <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <select
        v-model="sensorFiltro"
        class="px-4 py-2 border rounded bg-white dark:bg-gray-800 text-gray-800 dark:text-white"
      >
        <option value="">Todos los sensores</option>
        <option>Sensor Frío A1</option>
        <option>Sensor Térmico B2</option>
      </select>

      <input
        type="date"
        v-model="fechaInicio"
        class="px-4 py-2 border rounded bg-white dark:bg-gray-800 text-gray-800 dark:text-white"
      />

      <input
        type="date"
        v-model="fechaFin"
        class="px-4 py-2 border rounded bg-white dark:bg-gray-800 text-gray-800 dark:text-white"
      />
    </div>

    <!-- Tabla de historial -->
    <div class="overflow-x-auto bg-white dark:bg-gray-800 shadow-md rounded-lg">
      <table class="min-w-full table-auto">
        <thead>
          <tr class="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white">
            <th class="px-4 py-2 text-left">Sensor</th>
            <th class="px-4 py-2 text-left">Fecha</th>
            <th class="px-4 py-2 text-left">Temperatura (°C)</th>
            <th class="px-4 py-2 text-left">Humedad (%)</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="data in filteredHistorial"
            :key="data.id"
            class="border-b dark:border-gray-600"
          >
            <td class="px-4 py-2 text-left">{{ data.sensor }}</td>
            <td class="px-4 py-2 text-left">{{ new Date(data.fecha).toLocaleString() }}</td>
            <td class="px-4 py-2 text-left">{{ data.temperatura }}</td>
            <td class="px-4 py-2 text-left">{{ data.humedad }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div v-if="filteredHistorial.length === 0" class="text-center text-gray-500">
      No se encontraron registros con los filtros aplicados.
    </div>
  </div>
</template>
