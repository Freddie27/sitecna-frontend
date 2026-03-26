<script setup lang="ts">
import { ref, computed } from 'vue';

interface Sensor {
  id: string;
  nombre: string;
  tipo: string;
  estado: string;
  fechaUltimoMantenimiento: string;
  fechaProximoMantenimiento: string;
}

const sensoresData = ref<Sensor[]>([
  {
    id: 'S001',
    nombre: 'Sensor de Temperatura - A1',
    tipo: 'Temperatura',
    estado: 'Operativo',
    fechaUltimoMantenimiento: '2024-04-01',
    fechaProximoMantenimiento: '2024-06-01',
  },
  {
    id: 'S002',
    nombre: 'Sensor de Humedad - B2',
    tipo: 'Humedad',
    estado: 'En Mantenimiento',
    fechaUltimoMantenimiento: '2024-03-20',
    fechaProximoMantenimiento: '2024-05-20',
  },
  {
    id: 'S003',
    nombre: 'Sensor de Presión - C3',
    tipo: 'Presión',
    estado: 'Operativo',
    fechaUltimoMantenimiento: '2024-02-15',
    fechaProximoMantenimiento: '2024-04-15',
  },
  {
    id: 'S004',
    nombre: 'Sensor de Temperatura - D4',
    tipo: 'Temperatura',
    estado: 'Operativo',
    fechaUltimoMantenimiento: '2024-01-10',
    fechaProximoMantenimiento: '2024-03-10',
  },
]);

const filtroEstado = ref('');
const filtroTipo = ref('');

const filteredSensores = computed(() =>
  sensoresData.value.filter((sensor) => {
    const matchEstado = !filtroEstado.value || sensor.estado === filtroEstado.value;
    const matchTipo = !filtroTipo.value || sensor.tipo === filtroTipo.value;
    return matchEstado && matchTipo;
  })
);

const realizarMantenimiento = (id: string) => {
  // Lógica para realizar mantenimiento al sensor
};

const verHistorial = (id: string) => {
  // Lógica para ver historial de mantenimiento
};
</script>

<template>
  <div class="p-6 space-y-6">
    <h1 class="text-3xl font-bold text-center text-gray-800 dark:text-white">Mantenimiento y Control de Equipos</h1>

    <!-- Filtros -->
    <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <select
        v-model="filtroEstado"
        class="px-4 py-2 border rounded bg-white dark:bg-gray-800 text-gray-800 dark:text-white"
      >
        <option value="">Todos los Estados</option>
        <option>Operativo</option>
        <option>En Mantenimiento</option>
      </select>

      <select
        v-model="filtroTipo"
        class="px-4 py-2 border rounded bg-white dark:bg-gray-800 text-gray-800 dark:text-white"
      >
        <option value="">Todos los Tipos</option>
        <option>Temperatura</option>
        <option>Humedad</option>
        <option>Presión</option>
      </select>
    </div>

    <!-- Tarjetas de Sensores -->
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      <div
        v-for="sensor in filteredSensores"
        :key="sensor.id"
        class="flex flex-col items-center p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md"
      >
        <h2 class="text-xl font-semibold text-gray-800 dark:text-white">{{ sensor.nombre }}</h2>
        <p class="text-gray-500 dark:text-gray-300">{{ sensor.tipo }}</p>
        <p
          :class="[
            sensor.estado === 'Operativo' ? 'text-green-500' : 'text-red-500',
            'font-medium'
          ]"
        >
          {{ sensor.estado }}
        </p>
        <p class="text-gray-600 dark:text-gray-300">
          Último Mantenimiento: {{ sensor.fechaUltimoMantenimiento }}
        </p>
        <p class="text-gray-600 dark:text-gray-300">
          Próximo Mantenimiento: {{ sensor.fechaProximoMantenimiento }}
        </p>
        <div class="mt-4 flex gap-4">
          <button
            @click="realizarMantenimiento(sensor.id)"
            class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
          >
            Realizar Mantenimiento
          </button>
          <button
            @click="verHistorial(sensor.id)"
            class="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition"
          >
            Ver Historial
          </button>
        </div>
      </div>
    </div>

    <div v-if="filteredSensores.length === 0" class="text-center text-gray-500">
      No se encontraron sensores con los filtros aplicados.
    </div>
  </div>
</template>
