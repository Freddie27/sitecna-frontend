<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import TemplateRenderer from '~/components/dashboards/TemplateRenderer.vue'
import type { Planta } from '~/interfaces/planta'
import type { Template } from '~/interfaces/template' 
import { usePlanta } from '~/composables/usePlanta'

const { getPlantaByCodigo } = usePlanta()
const { getTemplateById } = useTemplate()

const props = defineProps<{ plantaId: string }>()

const template = ref<Template | null>(null)
const loading = ref(false)
const error = ref<string | null>(null)

watchEffect(async () => {
  if (!props.plantaId) {
    template.value = null
    return
  }

  loading.value = true
  error.value = null
  try {
    const planta: Planta | null = await getPlantaByCodigo(props.plantaId)
    
    if (planta?.templateId) {
      template.value = await getTemplateById(planta.templateId)
    } else {
      template.value = null
    }
  } catch (e) {
    error.value = 'Error al cargar planta o template'
    template.value = null
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <div>
    <TemplateRenderer v-if="template" :template="template" />
    <div v-else-if="loading" class="text-gray-500 dark:text-gray-400 text-center">
      Cargando información de la planta...
    </div>
    <div v-else-if="error" class="text-center text-red-500">{{ error }}</div>
    <div v-else class="text-gray-500 dark:text-gray-400 text-center">
      No hay template disponible para esta planta.
    </div>
  </div>
</template>
