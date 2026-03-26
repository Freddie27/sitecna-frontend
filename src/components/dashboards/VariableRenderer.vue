<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import LineChartWidget from '~/components/widgets/LineChartWidget.vue'
// Aquí podrías importar más tipos en el futuro
// import IndicadorWidget from '~/components/widgets/IndicadorWidget.vue'

import type { Widget } from '~/interfaces/widget'
import type { Variable } from '~/interfaces/variable'
import type { Dato } from '~/interfaces/dato'

import { useWidget } from '~/composables/useWidget'

const props = defineProps<{ widget: Widget }>()

const { getVariablesByIds, getDatosByVariableCodigos } = useWidget()

const variables = ref<Variable[]>([])
const datos = ref<Dato[]>([])
const loading = ref(false)
const error = ref<string | null>(null)

watchEffect(async () => {
  if (!props.widget) return

  loading.value = true
  error.value = null
  variables.value = []
  datos.value = []

  try {
    // 🧠 Normaliza los IDs de variables
    const variableIds = (props.widget.variableIds || []).map(id =>
      typeof id === 'string' ? id : id?.$oid
    )

    const result = await getVariablesByIds(variableIds)
    variables.value = result

    const plantaCodigo = typeof props.widget.plantaId === 'string'
      ? props.widget.plantaId
      : props.widget.plantaId?.$oid

    if (plantaCodigo && result.length > 0) {
      const codigos = result.map(v => v.codigo)
      datos.value = await getDatosByVariableCodigos(plantaCodigo, codigos)
    }
  } catch (e) {
    console.error(e)
    error.value = 'Error al cargar variables o datos.'
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <div>
    <div v-if="loading" class="text-center text-gray-500 dark:text-gray-400">
      Cargando datos del widget...
    </div>

    <div v-else-if="error" class="text-center text-red-500">
      {{ error }}
    </div>

    <!-- Gráfico de líneas -->
    <LineChartWidget
      v-else-if="widget.tipoWidget === 'graficoLinea'"
      :widget="widget"
      :variables="variables"
      :datos="datos"
    />

    <!-- Aquí puedes añadir otros tipos si los usas -->
    <!--
    <IndicadorWidget
      v-else-if="widget.tipoWidget === 'indicador'"
      :widget="widget"
      :variables="variables"
      :datos="datos"
    />
    -->

    <div v-else class="text-center text-gray-400">
      Tipo de widget no soportado: {{ widget.tipoWidget }}
    </div>
  </div>
</template>