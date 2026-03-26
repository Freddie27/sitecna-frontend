<script setup lang="ts">
import {
  Chart as ChartJS,
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  CategoryScale,
  Tooltip,
  Legend,
  Filler,
  TimeScale,
} from 'chart.js'
import { Line } from 'vue-chartjs'
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import 'chartjs-adapter-date-fns'
import { formatInTimeZone } from 'date-fns-tz'

import type { Variable } from '~/interfaces/variable'
import type { Dato } from '~/interfaces/dato'
import type { ChartOptions, TimeScaleOptions, LinearScaleOptions } from 'chart.js'
import { useSocket } from '~/composables/useSocket'

ChartJS.register(
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  TimeScale,
  Title,
  Tooltip,
  Legend,
  Filler
)

interface Props {
  widget: {
    plantaId: string | { $oid: string }
    tipoWidget: string
  }
  variables: Variable[]
  datos: Dato[]
}

const props = defineProps<Props>()

const colors = [
  '#4caf50', '#f44336', '#2196f3', '#ff9800',
  '#9c27b0', '#009688', '#e91e63', '#3f51b5'
]

const localDatos = ref<Dato[]>([])

function getPlantaCodigo(plantaId: string | { $oid: string }): string {
  return typeof plantaId === 'string' ? plantaId : plantaId.$oid
}

const { onNewData, offNewData } = useSocket()

function handleNewData(newData: Dato) {
  // console.log(newData.creado)
  const codigos = props.variables.map(v => v.codigo)
  const plantaCodigo = getPlantaCodigo(props.widget.plantaId)

  if (newData.plantaCodigo === plantaCodigo && codigos.includes(newData.variableCodigo)) {
    const exists = localDatos.value.some(
      d =>
        d.variableCodigo === newData.variableCodigo &&
        new Date(d.creado).getTime() === new Date(newData.creado).getTime()
    )
    if (!exists) {
      localDatos.value = [...localDatos.value, newData].sort(
        (a, b) => new Date(a.creado).getTime() - new Date(b.creado).getTime()
      )
      // console.log('Dato agregado a localDatos:', newData)
    }
  } else {
    // console.log('Dato descartado por filtro:', newData)
  }
}

onMounted(() => {
  localDatos.value = [...props.datos].sort(
    (a, b) => new Date(a.creado).getTime() - new Date(b.creado).getTime()
  )
  onNewData(handleNewData)
})

onBeforeUnmount(() => {
  offNewData(handleNewData)
})

const ZONE = 'America/Santiago'

const datasets = computed(() => {
  const todosLosDatos = localDatos.value
  const maxTimestamp = Math.max(...todosLosDatos.map(d => new Date(d.creado).getTime()))
  const unaHoraAntes = maxTimestamp - 60 * 60 * 1000

  return props.variables.map((variable, i) => {
    const datosVar = todosLosDatos.filter(d => {
      const t = new Date(d.creado).getTime()
      return (
        d.variableCodigo === variable.codigo &&
        t >= unaHoraAntes && t <= maxTimestamp
      )
    })

    return {
      label: variable.nombre,
      data: datosVar.map(d => ({
        // IMPORTANTE: Pasar timestamp UTC numérico a Chart.js
        x: new Date(d.creado).getTime(),
        y: Number(d.value)
      })),
      borderColor: colors[i % colors.length],
      backgroundColor: colors[i % colors.length] + '88',
      fill: false,
      tension: 0.3,
      pointRadius: 2,
      borderWidth: 2,
      spanGaps: true
    }
  })
})

const chartData = computed(() => ({ datasets: datasets.value }))

const chartOptions: ChartOptions<'line'> = {
  responsive: true,
  interaction: { mode: 'nearest', intersect: false },
  plugins: {
    legend: { position: 'top' },
    tooltip: {
      callbacks: {
        label(context) {
          return `${context.dataset.label}: ${context.parsed.y} ºC`
        },
        title(tooltipItems) {
          const item = tooltipItems[0]
          // formatear fecha en zona Chile en tooltip
          return formatInTimeZone(new Date(item.parsed.x), ZONE, 'yyyy-MM-dd HH:mm')
        }
      }
    },
    title: {
      display: true,
      text: props.widget.tipoWidget === 'graficoLinea' ? 'Gráfico de Temperaturas' : '',
      font: { size: 18 }
    }
  },
  scales: {
    x: {
      type: 'time',
      time: {
        unit: 'hour',
        tooltipFormat: 'HH:mm',
        displayFormats: {
          hour: 'HH:mm',
          day: 'dd/MM'
        },
        zone: ZONE // clave para que muestre horas en America/Santiago
      },
      title: { display: true, text: 'Hora (Chile)' },
      ticks: {
        // no hace falta callback, Chart.js adapta con zone
        maxRotation: 45,
        autoSkip: true,
        maxTicksLimit: 12
      },
      grid: { display: false }
    } as unknown as TimeScaleOptions,
    y: {
      title: { display: true, text: 'Temperatura (ºC)' },
      min: -30,
      max: 20,
      grid: { color: '#ddd' }
    } as unknown as LinearScaleOptions
  }
}
</script>

<template>
  <div v-if="chartData.datasets.length && chartData.datasets.some(ds => ds.data.length)">
    <Line :data="chartData" :options="chartOptions" />
  </div>
  <div v-else class="text-center text-gray-500">Sin datos para mostrar</div>
</template>
