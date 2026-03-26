<script setup lang="ts">
import { onMounted, computed, watch } from 'vue'
import { useUsers } from '~/composables/useUsers'
import { useAuthStore } from '~/stores/auth'
import { useRouter } from 'vue-router'

const { users, fetchUsers, loading, error } = useUsers()
const { isAuthenticated } = useAuthStore()  // Ahora también extraemos logout
const router = useRouter()

// Computed para mantener la autenticación reactiva
const isUserAuthenticated = computed(() => isAuthenticated)

onMounted(() => {
  //console.log('onMounted called')
  if (isUserAuthenticated.value) {
    //console.log('User is authenticated, fetching users...')
    fetchUsers() // Solo llamamos a la API si el usuario está autenticado
  } else {
    console.log('User is not authenticated, redirecting to login')
    router.push('/login') // Redirigir a login si no está autenticado
  }
})

// Redirigir si hay un error al obtener los usuarios
watch(error, (newError) => {
  if (newError) {
    console.log('Error occurred: ', newError)
    router.push('/login')
  }
})
</script>

<template>
  <!-- Main Content -->
  <div class="flex-1 flex flex-col items-center justify-center p-6 space-y-8">
    <h1 class="text-3xl font-bold text-center mb-6 text-gray-800 dark:text-white">Lista de Usuarios</h1>

    <div v-if="loading" class="text-center text-gray-600 dark:text-gray-400" role="status" aria-live="polite">
      Cargando...
    </div>

    <div v-else>
      <div v-if="error" class="text-center text-red-500 mb-4 dark:text-red-400" role="alert">
        {{ error }}
      </div>

      <div v-else class="overflow-x-auto w-full max-w-full">
        <table class="min-w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
          <thead class="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th class="py-2 px-4 border-b text-left text-sm font-semibold text-gray-700 dark:text-gray-300">Nombre</th>
              <th class="py-2 px-4 border-b text-left text-sm font-semibold text-gray-700 dark:text-gray-300">Correo</th>
              <th class="py-2 px-4 border-b text-left text-sm font-semibold text-gray-700 dark:text-gray-300">Rut</th>
              <th class="py-2 px-4 border-b text-left text-sm font-semibold text-gray-700 dark:text-gray-300">Usuario</th>
              <th class="py-2 px-4 border-b text-left text-sm font-semibold text-gray-700 dark:text-gray-300">Dirección</th>
              <th class="py-2 px-4 border-b text-left text-sm font-semibold text-gray-700 dark:text-gray-300">Teléfono</th>
              <th class="py-2 px-4 border-b text-left text-sm font-semibold text-gray-700 dark:text-gray-300">Roles</th>
              <th class="py-2 px-4 border-b text-left text-sm font-semibold text-gray-700 dark:text-gray-300">Activo</th>
              <th class="py-2 px-4 border-b text-left text-sm font-semibold text-gray-700 dark:text-gray-300">Creado</th>
              <th class="py-2 px-4 border-b text-left text-sm font-semibold text-gray-700 dark:text-gray-300">Actualizado</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="user in users" :key="user._id" class="hover:bg-gray-100 dark:hover:bg-gray-700">
              <td class="py-2 px-4 border-b text-sm text-gray-800 dark:text-gray-100">{{ user.nombre }}</td>
              <td class="py-2 px-4 border-b text-sm text-gray-800 dark:text-gray-100">{{ user.correo }}</td>
              <td class="py-2 px-4 border-b text-sm text-gray-800 dark:text-gray-100">{{ user.rut || 'No disponible' }}</td>
              <td class="py-2 px-4 border-b text-sm text-gray-800 dark:text-gray-100">{{ user.usuario }}</td>
              <td class="py-2 px-4 border-b text-sm text-gray-800 dark:text-gray-100">{{ user.direccion || 'No disponible' }}</td>
              <td class="py-2 px-4 border-b text-sm text-gray-800 dark:text-gray-100">{{ user.telefono || 'No disponible' }}</td>
              <td class="py-2 px-4 border-b text-sm text-gray-800 dark:text-gray-100">
                <span v-for="(role, index) in user.roles" :key="index" class="block">{{ role }}</span>
              </td>
              <td class="py-2 px-4 border-b text-sm text-gray-800 dark:text-gray-100">{{ user.activo ? 'Sí' : 'No' }}</td>
              <td class="py-2 px-4 border-b text-sm text-gray-800 dark:text-gray-100">{{ user.creado }}</td>
              <td class="py-2 px-4 border-b text-sm text-gray-800 dark:text-gray-100">{{ user.actualizado }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>