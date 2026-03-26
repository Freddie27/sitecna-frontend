<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import ScreenRenderer from '~/components/dashboards/ScreenRenderer.vue'
import type { Template } from '~/interfaces/template'
import { usePantalla } from '~/composables/usePantalla'

const { getPantallasByIds } = usePantalla()

const props = defineProps<{ template: Template | null }>()
const pantallas = ref<any[]>([])
const loading = ref(false)
const error = ref<string | null>(null)

watchEffect(async () => {
  if (!props.template?.pantallaIds?.length) {
    pantallas.value = []
    return
  }

  loading.value = true
  error.value = null
  try {
    // Extraer strings reales
    const ids = props.template.pantallaIds.map((idObj: any) => typeof idObj === 'string' ? idObj : idObj.$oid);

    // Ahora llamas con el array de strings
    pantallas.value = await getPantallasByIds(ids);

  } catch (e) {
    error.value = 'Error al cargar pantallas'
    pantallas.value = []
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <div>
    <ScreenRenderer v-if="pantallas.length" :pantallas="pantallas" />
    <div v-else-if="loading" class="text-center text-gray-500 dark:text-gray-400">
      Cargando pantallas...
    </div>
    <div v-else-if="error" class="text-center text-red-500">
      {{ error }}
    </div>
    <div v-else class="text-center text-gray-500 dark:text-gray-400">
      No se encontraron pantallas.
    </div>
  </div>
</template>
