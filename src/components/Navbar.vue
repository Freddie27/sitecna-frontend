<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { vAutoAnimate } from '@formkit/auto-animate'
import { User, LogOut, Sun, Moon, AlertTriangle } from '~/composables/useIcons'
import { useAuthStore } from '~/stores/auth'
import { useSocket } from '~/composables/useSocket'
import { useTheme } from '~/composables/useTheme'

// Auth y navegación
const { logout } = useAuthStore()
const { disconnect: disconnectSocket } = useSocket()
const router = useRouter()

const showProfileMenu = ref(false)
const showLogoutModal = ref(false)
const mounted = ref(false)

// Perfil
const toggleProfileMenu = (event: MouseEvent) => {
  event.stopPropagation()
  showProfileMenu.value = !showProfileMenu.value
}

// Logout
const handleLogoutClick = () => {
  showLogoutModal.value = true
}
const handleLogout = async () => {
  try {
    disconnectSocket()
    logout()
    await router.push('/login')
    showLogoutModal.value = false
    showProfileMenu.value = false
  } catch (error) {
    console.error('Error during logout:', error)
  }
}
const cancelLogout = () => {
  showLogoutModal.value = false
}

// Tema
const { isDarkMode, toggleTheme } = useTheme()
const icon = computed(() => isDarkMode.value ? Moon : Sun)
const iconColorClass = computed(() => isDarkMode.value ? 'text-white' : 'text-black')

// Listeners globales
onMounted(() => {
  mounted.value = true
  document.addEventListener('click', () => {
    showProfileMenu.value = false
  })
})
</script>

<template>
  <nav class="w-full h-16 px-6 flex items-center justify-between shadow-sm transition-colors duration-300 
  [background:linear-gradient(to_right,rgba(56,142,60,0.2),rgba(27,94,32,0.2))] backdrop-blur-lg relative z-30 
  border-b-2 border-[#4CAF50] animate-line-fade">

    <!-- Componente de notificación -->
    <NotificationConnect />  <!-- Aquí agregas el componente de notificación -->

    <!-- Logo con enlace a la página de inicio -->
    <div class="flex items-center h-full">
      <router-link to="/" class="flex items-center h-full">
        <img 
          src="https://res.cloudinary.com/dobkjiqyn/image/upload/v1744161514/icono_web_wxpf7m.webp" 
          alt="Logo" 
          class="h-full object-contain drop-shadow-md dark:hidden" />
        <img 
          src="https://res.cloudinary.com/dobkjiqyn/image/upload/v1745279295/WAWAW_Mesa_de_trabajo_1_dg5svu.webp" 
          alt="Logo"
          class="h-full object-contain drop-shadow-md hidden dark:block" />
      </router-link>
    </div>

    <!-- Perfil y cambio de tema -->
    <div class="flex items-center space-x-4 ml-auto">
      
      <!-- Tema -->
      <div class="relative" v-auto-animate>
        <button
          v-if="mounted"
          @click="toggleTheme"
          aria-label="Cambiar tema"
          class="p-2 rounded-full hover:bg-[#388E3C]/20 transition"
        >
          <component :is="icon" class="w-5 h-5" :class="iconColorClass" />
        </button>
      </div>

      <!-- Menú de perfil -->
      <div class="relative" v-auto-animate>
        <button @click="toggleProfileMenu"
                class="p-2 rounded-full hover:bg-[#388E3C]/20 text-black dark:text-white transition"
                title="Perfil">
          <User class="w-5 h-5" />
        </button>
        <div v-if="showProfileMenu"
             class="absolute top-10 right-0 w-48 bg-white text-black dark:bg-gray-800 dark:text-white rounded-lg shadow-lg z-50">
          <ul class="space-y-2 py-2">
            <li>
              <a href="../perfil"
                 class="block px-4 py-2 text-sm hover:bg-[#388E3C] hover:text-white transition">Perfil</a>
            </li>
          </ul>
        </div>
      </div>

      <!-- Logout -->
      <button @click="handleLogoutClick"
              class="p-2 rounded-full hover:bg-[#388E3C]/20 transition">
          <LogOut class="w-5 h-5" />
      </button>
    </div>
  </nav>

  <!-- Modal logout -->
  <Transition
    enter-active-class="transition-opacity duration-300 ease-out"
    enter-from-class="opacity-0"
    enter-to-class="opacity-100"
    leave-active-class="transition-opacity duration-200 ease-in"
    leave-from-class="opacity-100"
    leave-to-class="opacity-0"
  >
    <div
      v-if="showLogoutModal"
      class="fixed inset-0 bg-gray-700 bg-opacity-50 flex justify-center items-center z-50"
      @click.self="cancelLogout"
    >
      <div
        class="bg-white dark:bg-gray-800 text-black dark:text-white p-6 rounded-lg shadow-lg w-96 transition"
        @click.stop
      >
        <div class="flex items-center space-x-2">
          <AlertTriangle class="w-6 h-6 text-yellow-500" />
          <h3 class="text-lg font-semibold">¡Atención! ¿Estás seguro de que deseas cerrar sesión?</h3>
        </div>
        <div class="mt-4 flex justify-between space-x-4">
          <button
            @click="handleLogout"
            class="w-full bg-green-600 text-white rounded-lg py-2 hover:bg-green-700 transition"
          >
            Sí, cerrar sesión
          </button>
          <button
            @click="cancelLogout"
            class="w-full bg-gray-400 text-white rounded-lg py-2 hover:bg-gray-500 transition"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  </Transition>
</template>