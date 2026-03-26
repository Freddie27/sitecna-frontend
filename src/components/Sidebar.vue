<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { vAutoAnimate } from '@formkit/auto-animate'
import { 
  Home, 
  Users, 
  Settings, 
  ChevronLeft, 
  ChevronRight,
  FileText,
  BarChart3,
  Calendar,
  MessageSquare,
  Bell
} from '~/composables/useIcons'
import { useTheme } from '~/composables/useTheme'

// Props
interface Props {
  defaultCollapsed?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  defaultCollapsed: false
})

// Emits
const emit = defineEmits<{
  toggle: [collapsed: boolean]
}>()

// Composables
const route = useRoute()
const router = useRouter()
const { isDarkMode } = useTheme()

// Estado del sidebar
const isCollapsed = ref(props.defaultCollapsed)
const mounted = ref(false)

// Manejo responsive
const isMobile = ref(false)

// Elementos del menú
const menuItems = [
  {
    name: 'Inicio',
    icon: Home,
    path: '/',
    badge: null
  },
  {
    name: 'Usuarios',
    icon: Users,
    path: '/usuarios',
    badge: null
  },
  {
    name: 'Reportes',
    icon: BarChart3,
    path: '/reportes',
    badge: null
  },
  {
    name: 'Documentos',
    icon: FileText,
    path: '/documentos',
    badge: null
  },
  {
    name: 'Calendario',
    icon: Calendar,
    path: '/calendario',
    badge: null
  },
  {
    name: 'Mensajes',
    icon: MessageSquare,
    path: '/mensajes',
    badge: null
  },
  {
    name: 'Notificaciones',
    icon: Bell,
    path: '/notificaciones',
    badge: null
  },
  {
    name: 'Configuración',
    icon: Settings,
    path: '/configuracion',
    badge: null
  }
]

// Computadas
const sidebarWidth = computed(() => isCollapsed.value ? 'w-16' : 'w-64')
const currentPath = computed(() => route.path)

// Función para detectar dispositivo móvil
const checkMobile = () => {
  isMobile.value = window.innerWidth < 1024
 
  // Auto-colapsar en dispositivos móviles
  if (isMobile.value) {
    isCollapsed.value = true
  }
}

// Métodos
const toggleSidebar = () => {
  isCollapsed.value = !isCollapsed.value
  emit('toggle', isCollapsed.value)
}

const navigateTo = (path: string) => {
  router.push(path)
  // Cerrar sidebar en móvil después de navegar
  if (isMobile.value && !isCollapsed.value) {
    isCollapsed.value = true
  }
}

const isActive = (path: string) => {
  return currentPath.value === path
}

// Función para cerrar sidebar en móvil
const closeSidebarOnMobile = () => {
  if (isMobile.value && !isCollapsed.value) {
    isCollapsed.value = true
  }
}

// Watchers
watch(() => props.defaultCollapsed, (newValue) => {
  isCollapsed.value = newValue
})

// Lifecycle
onMounted(() => {
  mounted.value = true
  checkMobile()
  window.addEventListener('resize', checkMobile)
})

onUnmounted(() => {
  window.removeEventListener('resize', checkMobile)
})
</script>

<template>
  <div class="relative">
    <!-- Contenedor principal del sidebar -->
    <div class="flex h-full p-2 sm:p-3">
      <aside 
        :class="[
          'flex flex-col transition-all duration-300 ease-in-out z-20',
          'bg-white/95 dark:bg-gray-900/95 backdrop-blur-lg border border-gray-200 dark:border-gray-700',
          'shadow-lg rounded-xl sm:rounded-2xl overflow-hidden',
          'h-full',
          sidebarWidth,
          // Posicionamiento para móvil
          isMobile && !isCollapsed ? 'fixed left-2 top-2 bottom-2 z-50' : 'relative'
        ]"
        v-auto-animate
      >
        <!-- Header del sidebar -->
        <div class="flex items-center justify-between p-3 sm:p-4 border-b border-gray-200 dark:border-gray-700 bg-white/95 dark:bg-gray-900/95 backdrop-blur-lg h-14 sm:h-16 flex-shrink-0">
          <div v-if="!isCollapsed" class="flex items-center space-x-2">
            <div class="w-7 h-7 sm:w-8 sm:h-8 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center">
              <span class="text-white font-bold text-xs sm:text-sm">M</span>
            </div>
            <span class="font-semibold text-gray-800 dark:text-gray-200 text-sm sm:text-base">Menú</span>
          </div>
          
          <button
            @click="toggleSidebar"
            class="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200 active:scale-95"
            :class="isCollapsed ? 'w-full justify-center' : ''"
          >
            <ChevronLeft 
              v-if="!isCollapsed" 
              class="w-5 h-5 text-gray-600 dark:text-gray-400" 
            />
            <ChevronRight 
              v-else 
              class="w-5 h-5 text-gray-600 dark:text-gray-400" 
            />
          </button>
        </div>

        <!-- Menú de navegación -->
        <nav class="flex-1 overflow-hidden p-3 sm:p-4 min-h-0 flex flex-col justify-center">
          <ul class="space-y-2 sm:space-y-3" v-auto-animate>
            <li v-for="item in menuItems" :key="item.path" class="relative group">
              <button
                @click="navigateTo(item.path)"
                :class="[
                  'w-full flex items-center rounded-xl transition-all duration-200 group relative',
                  'hover:bg-gray-100 dark:hover:bg-gray-700 hover:scale-[1.02] active:scale-[0.98]',
                  isActive(item.path) 
                    ? 'bg-gradient-to-r from-green-500 to-green-600 text-white shadow-md shadow-green-500/25' 
                    : 'text-gray-700 dark:text-gray-300',
                  isCollapsed ? 'p-3 justify-center' : 'p-2 sm:p-3'
                ]"
              >
                <!-- Icono -->
                <component 
                  :is="item.icon" 
                  :class="[
                    'transition-transform duration-200 flex-shrink-0',
                    isActive(item.path) ? 'text-white' : 'text-gray-600 dark:text-gray-400',
                    'group-hover:scale-110',
                    isCollapsed ? 'w-6 h-6' : 'w-5 h-5'
                  ]"
                />
                
                <!-- Texto y badge -->
                <div 
                  v-if="!isCollapsed" 
                  class="flex items-center justify-between w-full ml-2 sm:ml-3"
                >
                  <span 
                    :class="[
                      'font-medium transition-colors duration-200 text-sm sm:text-base',
                      isActive(item.path) ? 'text-white' : 'text-gray-700 dark:text-gray-300'
                    ]"
                  >
                    {{ item.name }}
                  </span>
                  
                  <!-- Badge -->
                  <span 
                    v-if="item.badge" 
                    :class="[
                      'px-2 py-1 text-xs rounded-full font-semibold min-w-[1.5rem] text-center',
                      isActive(item.path) 
                        ? 'bg-white/20 text-white' 
                        : 'bg-green-500 text-white'
                    ]"
                  >
                    {{ item.badge }}
                  </span>
                </div>
              </button>
              
              <!-- Tooltip para modo colapsado -->
              <div 
                v-if="isCollapsed && mounted"
                class="absolute left-full ml-2 bg-gray-900 dark:bg-gray-800 text-white px-3 py-2 rounded-xl text-sm opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 pointer-events-none whitespace-nowrap shadow-lg"
              >
                {{ item.name }}
                <span v-if="item.badge" class="ml-2 px-2 py-1 bg-green-500 rounded-full text-xs">
                  {{ item.badge }}
                </span>
                <!-- Flecha del tooltip -->
                <div class="absolute right-full top-1/2 transform -translate-y-1/2 w-0 h-0 border-y-4 border-y-transparent border-r-4 border-r-gray-900 dark:border-r-gray-800"></div>
              </div>
            </li>
          </ul>
        </nav>

        <!-- Footer del sidebar -->
        <div class="p-3 sm:p-4 border-t border-gray-200 dark:border-gray-700 bg-white/95 dark:bg-gray-900/95 backdrop-blur-lg h-16 sm:h-20 flex-shrink-0">
          <div 
            v-if="!isCollapsed" 
            class="flex items-center space-x-2 sm:space-x-3 p-2 sm:p-3 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
          >
            <div class="w-7 h-7 sm:w-8 sm:h-8 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center flex-shrink-0">
              <span class="text-white font-bold text-xs">U</span>
            </div>
            <div class="flex-1 min-w-0">
              <p class="text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 truncate">
                Usuario
              </p>
              <p class="text-xs text-gray-500 dark:text-gray-400 truncate">
                usuario@ejemplo.com
              </p>
            </div>
          </div>
          
          <div 
            v-else 
            class="flex justify-center items-center h-full"
          >
            <div class="w-8 h-8 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center hover:scale-110 transition-transform duration-200 cursor-pointer">
              <span class="text-white font-bold text-sm">U</span>
            </div>
          </div>
        </div>
      </aside>
    </div>

    <!-- Overlay para móviles -->
    <Transition
      enter-active-class="transition-opacity duration-300"
      leave-active-class="transition-opacity duration-300"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="!isCollapsed && isMobile && mounted"
        class="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 lg:hidden"
        @click="closeSidebarOnMobile"
      />
    </Transition>
  </div>
</template>

<style scoped>
/* Mejorar la nitidez en pantallas de alta densidad */
@media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 2dppx) {
  svg {
    image-rendering: -webkit-optimize-contrast;
    image-rendering: crisp-edges;
  }
}
</style>