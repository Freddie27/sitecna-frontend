<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import {
  Home,
  LayoutDashboard,
  FileBarChart2,
  Server,
  AlarmClock,
  History,
  Users,
  Wrench,
  Settings,
  HelpCircle,
} from 'lucide-vue-next';

// definePageMeta({
//   layout: 'menu',
// });

const router = useRouter();

// Íconos y paths corregidos
const hexItems = ref([
  { title: 'RESUMEN', icon: Home, path: '/menu/resumen' },
  { title: 'DASHBOARDS', icon: LayoutDashboard, path: '/menu/dashboards' },
  { title: 'REPORTES', icon: FileBarChart2, path: '/menu/reportes' },
  { title: 'DISPOSITIVOS', icon: Server, path: '/menu/dispositivos' },
  { title: 'ALERTAS\nY EVENTOS', icon: AlarmClock, path: '/menu/alertas' },
  { title: 'HISTORIAL\nDE DATOS', icon: History, path: '/menu/historial' },
  { title: 'USUARIOS\nY PERMISOS', icon: Users, path: '/menu/users' },
  { title: 'MANTENIMIENTO Y\nCONTROL EQUIPOS', icon: Wrench, path: '/menu/mantenimiento' },
  { title: 'CONFIGURACIÓN', icon: Settings, path: '/menu/configuracion' },
  { title: 'SOPORTE', icon: HelpCircle, path: '/menu/soporte' }
]);

const navigate = (path: string) => {
  router.push(path);
};
</script>

<template>
  <div class="flex-1 flex flex-col items-center justify-center p-6 space-y-8">
    <div class="grid grid-cols-2 sm:grid-cols-5 gap-4 sm:gap-6">
      <div
        v-for="(item, index) in hexItems"
        :key="'item-' + index"
        @click="navigate(item.path)"
        class="cursor-pointer relative aspect-[1/1] w-24 sm:w-28 md:w-32 lg:w-36 xl:w-40 flex flex-col items-center justify-center rounded-md font-medium shadow-md
               transition-all duration-300 transform hover:scale-105
               bg-gradient-to-r dark:bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-800 dark:to-gray-700 
               hover:from-[#4CAF50] hover:to-[#388E3C] hover:bg-opacity-50 dark:hover:from-[#4CAF50] dark:hover:to-[#388E3C] dark:hover:bg-opacity-50"
        style="clip-path: polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%);"
      >
        <component
          :is="item.icon"
          class="text-black dark:text-white mb-1"
          :class="[
            'w-[clamp(1.25rem,2.5vw,1.75rem)]',
            'h-[clamp(1.25rem,2.5vw,1.75rem)]'
          ]"
        />
        <span
          class="text-neutral-900 dark:text-neutral-100 font-sans text-center px-2 break-words leading-tight"
          :class="[
            'text-[clamp(0.625rem,1.25vw,0.875rem)]',
            'whitespace-pre-line'
          ]"
        >
          {{ item.title }}
        </span>
      </div>
    </div>
  </div>
</template>
