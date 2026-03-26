<script setup lang="ts">
import { ref, computed } from 'vue';

interface Device {
  id: string;
  nombre: string;
  tipo: string;
  ubicacion: string;
  estado: 'Conectado' | 'Desconectado';
}

const devices = ref<Device[]>([
  { id: 'D001', nombre: 'Sensor Frío A1', tipo: 'Temperatura', ubicacion: 'Frigorífico 1', estado: 'Conectado' },
  { id: 'D002', nombre: 'Sensor Hum A2', tipo: 'Humedad', ubicacion: 'Frigorífico 2', estado: 'Desconectado' },
  { id: 'D003', nombre: 'Sensor Gas B1', tipo: 'Gas', ubicacion: 'Planta Alta', estado: 'Conectado' },
  { id: 'D004', nombre: 'Sensor Térmico C3', tipo: 'Temperatura', ubicacion: 'Sala Procesos', estado: 'Desconectado' },
]);

const search = ref('');
const filterEstado = ref('');

const filteredDevices = computed(() =>
  devices.value.filter((d) => {
    const matchSearch = d.nombre.toLowerCase().includes(search.value.toLowerCase());
    const matchEstado = !filterEstado.value || d.estado === filterEstado.value;
    return matchSearch && matchEstado;
  })
);
</script>

<template>
  <div class="p-6 space-y-6">
    <h1 class="text-3xl font-bold text-center text-gray-800 dark:text-white">
      Dispositivos IoT Registrados
    </h1>

    <!-- Filtros -->
    <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <input
        type="text"
        v-model="search"
        placeholder="Buscar por nombre"
        class="px-4 py-2 border rounded shadow-sm bg-white dark:bg-gray-800 text-gray-800 dark:text-white"
      />

      <select
        v-model="filterEstado"
        class="px-4 py-2 border rounded shadow-sm bg-white dark:bg-gray-800 text-gray-800 dark:text-white"
      >
        <option value="">Todos los estados</option>
        <option value="Conectado">Conectado</option>
        <option value="Desconectado">Desconectado</option>
      </select>
    </div>

    <!-- Tabla -->
    <div class="overflow-x-auto mt-4">
      <table class="w-full text-sm text-left text-gray-700 dark:text-gray-200">
        <thead class="text-xs uppercase bg-gray-100 dark:bg-gray-700 dark:text-white">
          <tr>
            <th class="px-4 py-2">ID</th>
            <th class="px-4 py-2">Nombre</th>
            <th class="px-4 py-2">Tipo</th>
            <th class="px-4 py-2">Ubicación</th>
            <th class="px-4 py-2">Estado</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="device in filteredDevices"
            :key="device.id"
            class="bg-white dark:bg-gray-800 border-b dark:border-gray-700"
          >
            <td class="px-4 py-2">{{ device.id }}</td>
            <td class="px-4 py-2">{{ device.nombre }}</td>
            <td class="px-4 py-2">{{ device.tipo }}</td>
            <td class="px-4 py-2">{{ device.ubicacion }}</td>
            <td class="px-4 py-2">
              <span
                :class="{
                  'text-green-600 font-semibold': device.estado === 'Conectado',
                  'text-red-500 font-semibold': device.estado === 'Desconectado',
                }"
              >
                {{ device.estado }}
              </span>
            </td>
          </tr>
          <tr v-if="filteredDevices.length === 0">
            <td colspan="5" class="text-center text-gray-500 py-4">
              No se encontraron dispositivos.
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
