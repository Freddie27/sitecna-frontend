<script setup lang="ts">
import { ref, computed } from 'vue';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import * as XLSX from 'xlsx';

interface SensorData {
  fecha: string;
  hora: string;
  sensor: string;
  temperatura: number;
  humedad: number;
}

const allData = ref<SensorData[]>([
  { fecha: '2025-05-10', hora: '12:00', sensor: 'Sensor A', temperatura: 18.5, humedad: 65 },
  { fecha: '2025-05-10', hora: '13:00', sensor: 'Sensor B', temperatura: 19.0, humedad: 66 },
  { fecha: '2025-05-11', hora: '12:00', sensor: 'Sensor A', temperatura: 18.2, humedad: 64 },
  { fecha: '2025-05-12', hora: '13:00', sensor: 'Sensor B', temperatura: 20.1, humedad: 63 },
]);

const sensorOptions = ref(['Sensor A', 'Sensor B']);

const filter = ref({
  from: '',
  to: '',
  sensor: '',
});

// Computed para aplicar los filtros
const filteredData = computed(() => {
  return allData.value.filter((item) => {
    const inDateRange =
      (!filter.value.from || item.fecha >= filter.value.from) &&
      (!filter.value.to || item.fecha <= filter.value.to);
    const sensorMatch = !filter.value.sensor || item.sensor === filter.value.sensor;
    return inDateRange && sensorMatch;
  });
});

// PDF
const downloadPDF = () => {
  const doc = new jsPDF();
  doc.text('Reporte de Sensores', 14, 16);
  autoTable(doc, {
    startY: 20,
    head: [['Fecha', 'Hora', 'Sensor', 'Temperatura (°C)', 'Humedad (%)']],
    body: filteredData.value.map((row) => [
      row.fecha,
      row.hora,
      row.sensor,
      row.temperatura.toFixed(1),
      row.humedad.toString(),
    ]),
  });
  doc.save('reporte_sensores.pdf');
};

// Excel
const downloadExcel = () => {
  const worksheet = XLSX.utils.json_to_sheet(filteredData.value);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Reporte');
  XLSX.writeFile(workbook, 'reporte_sensores.xlsx');
};
</script>

<template>
  <div class="p-6 space-y-6">
    <h1 class="text-3xl font-bold text-center text-gray-800 dark:text-white">
      Reportes - Filtros y Exportación
    </h1>

    <!-- Filtros -->
    <div class="grid grid-cols-1 sm:grid-cols-4 gap-4">
      <div>
        <label class="text-sm font-medium text-gray-700 dark:text-gray-200">Desde</label>
        <input
          type="date"
          v-model="filter.from"
          class="w-full mt-1 px-3 py-2 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-white"
        />
      </div>
      <div>
        <label class="text-sm font-medium text-gray-700 dark:text-gray-200">Hasta</label>
        <input
          type="date"
          v-model="filter.to"
          class="w-full mt-1 px-3 py-2 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-white"
        />
      </div>
      <div>
        <label class="text-sm font-medium text-gray-700 dark:text-gray-200">Sensor</label>
        <select
          v-model="filter.sensor"
          class="w-full mt-1 px-3 py-2 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-white"
        >
          <option value="">Todos</option>
          <option v-for="sensor in sensorOptions" :key="sensor" :value="sensor">
            {{ sensor }}
          </option>
        </select>
      </div>
      <div class="flex items-end gap-2">
        <button
          @click="downloadPDF"
          class="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded shadow transition w-full"
        >
          PDF
        </button>
        <button
          @click="downloadExcel"
          class="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded shadow transition w-full"
        >
          Excel
        </button>
      </div>
    </div>

    <!-- Tabla -->
    <div class="overflow-x-auto mt-6">
      <table class="w-full text-sm text-left text-gray-700 dark:text-gray-200">
        <thead class="text-xs uppercase bg-gray-100 dark:bg-gray-700 dark:text-white">
          <tr>
            <th class="px-4 py-2">Fecha</th>
            <th class="px-4 py-2">Hora</th>
            <th class="px-4 py-2">Sensor</th>
            <th class="px-4 py-2">Temperatura (°C)</th>
            <th class="px-4 py-2">Humedad (%)</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(row, index) in filteredData"
            :key="index"
            class="bg-white dark:bg-gray-800 border-b dark:border-gray-700"
          >
            <td class="px-4 py-2">{{ row.fecha }}</td>
            <td class="px-4 py-2">{{ row.hora }}</td>
            <td class="px-4 py-2">{{ row.sensor }}</td>
            <td class="px-4 py-2">{{ row.temperatura }}</td>
            <td class="px-4 py-2">{{ row.humedad }}</td>
          </tr>
          <tr v-if="filteredData.length === 0">
            <td colspan="5" class="text-center text-gray-500 py-4">
              No hay datos para los filtros seleccionados.
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
