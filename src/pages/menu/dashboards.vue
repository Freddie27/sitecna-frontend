<script setup lang="ts">
import { onMounted, watch, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '~/stores/auth'
import { useUserStore } from '~/stores/user'
import PlantRenderer from '~/components/dashboards/PlantRenderer.vue'

const auth = useAuthStore()
const userStore = useUserStore()
const router = useRouter()

const plantaId = computed(() => userStore.user?.plantaId || null)

onMounted(async () => {
  if (!auth.isAuthenticated) {
    router.push('/login')
    return
  }

  if (!userStore.user) {
    await userStore.fetchUser()
  }
})

watch(() => auth.isAuthenticated, (isAuth) => {
  if (!isAuth) router.push('/login')
})
</script>

<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-6 text-center text-gray-800 dark:text-white">Dashboard</h1>
    <PlantRenderer v-if="plantaId" :plantaId="plantaId" />
    <div v-else class="text-center text-red-500">No se encontró la planta asociada.</div>
  </div>
</template>