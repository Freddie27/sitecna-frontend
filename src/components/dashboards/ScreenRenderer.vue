<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import WidgetRenderer from '~/components/dashboards/WidgetRenderer.vue'
import type { Pantalla } from '~/interfaces/pantalla'
import { useWidget } from '~/composables/useWidget'

const { getWidgetsByIds } = useWidget()

const props = defineProps<{ pantallas: Pantalla[] }>()
const pantallasConWidgets = ref<(Pantalla & { widgets: any[] })[]>([])
const loading = ref(false)
const error = ref<string | null>(null)

watchEffect(async () => {
  if (!props.pantallas.length) {
    pantallasConWidgets.value = []
    return
  }

  loading.value = true
  error.value = null
  try {
    pantallasConWidgets.value = await Promise.all(
      props.pantallas.map(async (pantalla) => {
        const widgets = await getWidgetsByIds(pantalla.widgetIds || [])
        return { ...pantalla, widgets }
      })
    )
  } catch (e) {
    error.value = 'Error al cargar widgets'
    pantallasConWidgets.value = []
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <div class="space-y-6">
    <div v-if="loading" class="text-center text-gray-500 dark:text-gray-400">Cargando widgets...</div>
    <div v-else-if="error" class="text-center text-red-500">{{ error }}</div>
    <div v-else>
      <div
        v-for="pantalla in pantallasConWidgets"
        :key="pantalla._id"
        class="border rounded-xl p-4 bg-white dark:bg-gray-800 shadow"
      >
        <h2 class="text-lg font-semibold text-gray-800 dark:text-white mb-4">{{ pantalla.nombre }}</h2>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <WidgetRenderer
            v-for="widget in pantalla.widgets"
            :key="widget._id"
            :widget="widget"
          />
        </div>
      </div>
    </div>
  </div>
</template>
