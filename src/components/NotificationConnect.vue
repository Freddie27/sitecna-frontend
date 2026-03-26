<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useSocket } from '~/composables/useSocket'

const { socket, userId } = useSocket()
const visible = ref(false)
const NOTIF_SHOWN_KEY = 'notif-shown-user-logged-in'

const showNotification = () => {
  if (localStorage.getItem(NOTIF_SHOWN_KEY)) return

  visible.value = true
  localStorage.setItem(NOTIF_SHOWN_KEY, 'true')

  setTimeout(() => {
    visible.value = false
  }, 4000)
}

const addListener = () => {
  if (socket.value) {
    socket.value.on('userLoggedIn', showNotification)
  }
}

const removeListener = () => {
  if (socket.value) {
    socket.value.off('userLoggedIn', showNotification)
  }
}

onMounted(() => {
  if (socket.value && socket.value.connected) {
    addListener()
  } else {
    socket.value?.once('connect', () => {
      addListener()
    })
  }

  // Aquí escucha el evento reconnect desde el manager
  socket.value?.io.on('reconnect', () => {
    addListener()
  })
})

onUnmounted(() => {
  removeListener()
  socket.value?.off('connect')
  socket.value?.io.off('reconnect')
})
</script>

<template>
  <Transition
    enter-active-class="transition-all duration-300 ease-out"
    enter-from-class="-translate-y-4 opacity-0 scale-95"
    enter-to-class="translate-y-0 opacity-100 scale-100"
    leave-active-class="transition-all duration-200 ease-in"
    leave-from-class="translate-y-0 opacity-100 scale-100"
    leave-to-class="-translate-y-4 opacity-0 scale-95"
  >
    <div
      v-if="visible"
      class="fixed top-20 left-1/2 transform -translate-x-1/2 px-6 py-4 rounded-xl shadow-2xl z-50 
             bg-gradient-to-r from-green-50 to-emerald-50 
             dark:from-green-900/20 dark:to-emerald-900/20 
             border border-green-200 dark:border-green-700
             backdrop-blur-sm max-w-sm mx-4"
    >
      <div class="flex items-center space-x-3">
        <div class="flex-shrink-0">
          <svg class="w-5 h-5 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
          </svg>
        </div>

        <p class="text-green-800 dark:text-green-200 font-medium text-sm leading-5">
          Has iniciado sesión correctamente. ¡Bienvenido, {{ userId }}!
        </p>
      </div>

      <div class="absolute bottom-0 left-0 right-0 h-1 bg-green-200/30 dark:bg-green-700/20 rounded-b-xl overflow-hidden">
        <div class="h-full bg-green-500 dark:bg-green-400 rounded-b-xl notification-progress-bar"></div>
      </div>
    </div>
  </Transition>
</template>