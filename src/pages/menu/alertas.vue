<script setup lang="ts">
import { ref, computed } from 'vue';

interface Evento {
  id: string;
  tipo: 'Temperatura Alta' | 'Desconexión' | 'Gas Detectado' | 'Puerta Abierta';
  sensor: string;
  fecha: string; // ISO
  estado: 'Activo' | 'Resuelto';
  gravedad: 'Alta' | 'Media' | 'Baja';
}

const eventos = ref<Evento[]>([
  {
    id: 'E001',
    tipo: 'Temperatura Alta',
    sensor: 'Sensor Frío A1',
    fecha: '2025-05-11T14:32:00Z',
    estado: 'Activo',
    gravedad: 'Alta',
  },
  {
    id: 'E002',
    tipo: 'Desconexión',
    sensor: 'Sensor Gas B1',
    fecha: '2025-05-10T18:45:00Z',
    estado: 'Resuelto',
    gravedad: 'Media',
  },
  {
    id: 'E003',
    tipo: 'Gas Detectado',
    sensor: 'Sensor Gas C2',
    fecha: '2025-05-09T21:15:00Z',
    estado: 'Activo',
    gravedad: 'Alta',
  },
  {
    id: 'E004',
    tipo: 'Puerta Abierta',
    sensor: 'Sensor Puerta D1',
    fecha: '2025-05-08T06:12:00Z',
    estado: 'Resuelto',
    gravedad: 'Baja',
  },
]);

const tipoFiltro = ref('');
const estadoFiltro = ref('');
const fechaInicio = ref('');
const fechaFin = ref('');

const filteredEventos = computed(() =>
  eventos.value.filter((e) => {
    const matchTipo = !tipoFiltro.value || e.tipo === tipoFiltro.value;
    const matchEstado = !estadoFiltro.value || e.estado === estadoFiltro.value;
    const matchFechaInicio = !fechaInicio.value || new Date(e.fecha) >= new Date(fechaInicio.value);
    const matchFechaFin = !fechaFin.value || new Date(e.fecha) <= new Date(fechaFin.value);
    return matchTipo && matchEstado && matchFechaInicio && matchFechaFin;
  })
);
</script>

<template>
  <div class="p-6 space-y-6">
    <h1 class="text-3xl font-bold text-center text-gray-800 dark:text-white">Alertas y Eventos</h1>

    <!-- Filtros -->
    <div class="grid grid-cols-1 sm:grid-cols-4 gap-4">
      <select
        v-model="tipoFiltro"
        class="px-4 py-2 border rounded bg-white dark:bg-gray-800 text-gray-800 dark:text-white"
      >
        <option value="">Todos los tipos</option>
        <option>Temperatura Alta</option>
        <option>Desconexión</option>
        <option>Gas Detectado</option>
        <option>Puerta Abierta</option>
      </select>

      <select
        v-model="estadoFiltro"
        class="px-4 py-2 border rounded bg-white dark:bg-gray-800 text-gray-800 dark:text-white"
      >
        <option value="">Todos los estados</option>
        <option>Activo</option>
        <option>Resuelto</option>
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

    <!-- Lista de eventos -->
    <div class="space-y-4">
      <div
        v-for="evento in filteredEventos"
        :key="evento.id"
        class="p-4 rounded shadow-md border dark:border-gray-700"
        :class="{
          'bg-red-100 dark:bg-red-900': evento.gravedad === 'Alta',
          'bg-yellow-100 dark:bg-yellow-900': evento.gravedad === 'Media',
          'bg-green-100 dark:bg-green-900': evento.gravedad === 'Baja',
        }"
      >
        <div class="flex justify-between items-center">
          <div>
            <h2 class="text-lg font-bold">{{ evento.tipo }}</h2>
            <p class="text-sm text-gray-600 dark:text-gray-300">
              Sensor: <strong>{{ evento.sensor }}</strong>
            </p>
            <p class="text-sm text-gray-600 dark:text-gray-300">
              Fecha: {{ new Date(evento.fecha).toLocaleString() }}
            </p>
          </div>
          <div class="text-right">
            <span
              class="inline-block px-2 py-1 text-xs rounded font-semibold"
              :class="{
                'bg-red-500 text-white': evento.estado === 'Activo',
                'bg-green-500 text-white': evento.estado === 'Resuelto',
              }"
            >
              {{ evento.estado }}
            </span>
          </div>
        </div>
      </div>
      <div v-if="filteredEventos.length === 0" class="text-center text-gray-500">
        No se encontraron eventos con los filtros aplicados.
      </div>
    </div>
  </div>
</template>
