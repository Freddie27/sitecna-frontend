<script setup lang="ts">
import { useSocket } from '~/composables/useSocket'
import { useAuthStore } from '~/stores/auth'
import { useUserStore } from '~/stores/user'
import { watch, onMounted } from 'vue'

const auth = useAuthStore()
const userStore = useUserStore()
const { connect, disconnect } = useSocket()

// Cargar usuario si hay token
onMounted(async () => {
  if (auth.token && !userStore.user) {
    await userStore.fetchUser()
  }
})

// Observar token y usuario, conectar o desconectar socket según corresponda
watch(
  () => ({ token: auth.token, plantaId: userStore.user?.plantaId }),
  ({ token, plantaId }) => {
    if (token && plantaId) {
      connect(token)
    } else {
      disconnect()
    }
  },
  { immediate: true }
)
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>