import { io, Socket } from 'socket.io-client'
import { ref, onMounted } from 'vue'
import { useAuthStore } from '~/stores/auth'
import { useUserStore } from '~/stores/user'
import type { ServerToClientEvents, ClientToServerEvents } from '~/interfaces/socket.user.interface'

// Variables singleton - compartidas entre todas las llamadas a useSocket()
const socket = ref<Socket<ServerToClientEvents, ClientToServerEvents> | null>(null)
const isConnected = ref(false)
const userId = ref<string | null>(null)
let isSocketConnected = false

type NewDataListener = (data: any) => void
const newDataListeners = new Set<NewDataListener>()

export function useSocket() {
  const auth = useAuthStore()
  const userStore = useUserStore()
  const { public: { apiBase } } = useRuntimeConfig()

  function onNewData(listener: NewDataListener) {
    newDataListeners.add(listener)
  }

  function offNewData(listener: NewDataListener) {
    newDataListeners.delete(listener)
  }

  function handleNewData(data: any) {
    const userPlantaId = userStore.user?.plantaId
    if (!userPlantaId) return

    if (data.plantaCodigo === userPlantaId) {
      newDataListeners.forEach((listener) => listener(data))
    }
  }

  function connect(token: string) {
    const userPlantaId = userStore.user?.plantaId
    if (!token || isSocketConnected || !userPlantaId) return

    socket.value = io(`${apiBase}/ws-auth`, {
      transports: ['websocket'],
      auth: { token },
    })

    socket.value.on('new-data', (data) => {
      //console.log('🔁 Evento new-data recibido:', data)
      handleNewData(data)
    })

    socket.value.on('userLoggedIn', (data) => {
      userId.value = data.userId || null
      isConnected.value = true
      console.log(`${data.userId} se ha conectado correctamente.`)
    })

    socket.value.on('userLoggedOut', (data) => {
      userId.value = null
      isConnected.value = false
      //console.log(`🚪 Usuario desconectado vía socket: ${data.userId}`)
    })

    socket.value.on('connect_error', (err) => {
      //console.error('❌ Error de conexión:', err)
      isConnected.value = false
      isSocketConnected = false
    })

    socket.value.on('disconnect', (reason) => {
      isConnected.value = false
      isSocketConnected = false
      //console.warn('⚠️ Socket desconectado:', reason)
    })

    isSocketConnected = true
  }

  function disconnect() {
    if (!socket.value) return
    socket.value.disconnect()
    socket.value = null
    isConnected.value = false
    userId.value = null
    isSocketConnected = false
  }

  onMounted(async () => {
    const token = auth.getToken()
    if (token && typeof token === 'string') {
      if (!userStore.user) {
        await userStore.fetchUser()
      }
      if (userStore.user) {
        connect(token)
      } else {
        console.warn('No se pudo cargar usuario, no conectando socket')
      }
    }

    window.addEventListener('online', async () => {
      const latestToken = auth.getToken()
      if (latestToken && typeof latestToken === 'string' && !isConnected.value) {
        if (!userStore.user) {
          await userStore.fetchUser()
        }
        connect(latestToken)
      }
    })
  })

  return {
    socket,
    isConnected,
    userId,
    connect,
    disconnect,
    onNewData,
    offNewData,
  }
}