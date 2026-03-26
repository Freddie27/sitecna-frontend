<script setup lang="ts">
import { ref } from 'vue';

// Variables para las configuraciones
const generalConfig = ref({
  idioma: 'Español',
  zonaHoraria: 'UTC-4',
  tema: 'Claro',
});

const usuarioConfig = ref({
  nombre: 'Freddie',
  correo: 'freddie@empresa.com',
  rol: 'Administrador',
  notificaciones: true,
});

// Funciones para actualizar configuraciones
const actualizarConfiguracionGeneral = () => {
  // Aquí se puede hacer la lógica para actualizar la configuración general.
  // console.log('Configuración General Actualizada', generalConfig.value);
};

const actualizarConfiguracionUsuario = () => {
  // Aquí se puede hacer la lógica para actualizar la configuración de usuario.
  // console.log('Configuración de Usuario Actualizada', usuarioConfig.value);
};
</script>

<template>
  <div class="p-6 space-y-8">
    <!-- Título de la página -->
    <h1 class="text-3xl font-bold text-center text-gray-800 dark:text-white">Configuración del Sistema</h1>

    <!-- Configuración General -->
    <div class="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
      <h2 class="text-2xl font-semibold text-gray-800 dark:text-white">Configuración General</h2>
      <form @submit.prevent="actualizarConfiguracionGeneral" class="space-y-4 mt-4">
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label for="idioma" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Idioma</label>
            <select
              id="idioma"
              v-model="generalConfig.idioma"
              class="mt-2 block w-full px-4 py-2 bg-white dark:bg-gray-800 text-gray-700 dark:text-white border rounded"
            >
              <option>Español</option>
              <option>Inglés</option>
              <option>Portugués</option>
            </select>
          </div>

          <div>
            <label for="zonaHoraria" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Zona Horaria</label>
            <select
              id="zonaHoraria"
              v-model="generalConfig.zonaHoraria"
              class="mt-2 block w-full px-4 py-2 bg-white dark:bg-gray-800 text-gray-700 dark:text-white border rounded"
            >
              <option>UTC-4</option>
              <option>UTC-3</option>
              <option>UTC</option>
              <option>UTC+1</option>
            </select>
          </div>

          <div>
            <label for="tema" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Tema</label>
            <select
              id="tema"
              v-model="generalConfig.tema"
              class="mt-2 block w-full px-4 py-2 bg-white dark:bg-gray-800 text-gray-700 dark:text-white border rounded"
            >
              <option>Claro</option>
              <option>Oscuro</option>
            </select>
          </div>
        </div>

        <div class="text-center mt-4">
          <button
            type="submit"
            class="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
          >
            Guardar Configuración General
          </button>
        </div>
      </form>
    </div>

    <!-- Configuración del Usuario -->
    <div class="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
      <h2 class="text-2xl font-semibold text-gray-800 dark:text-white">Configuración de Usuario</h2>
      <form @submit.prevent="actualizarConfiguracionUsuario" class="space-y-4 mt-4">
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label for="nombre" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Nombre</label>
            <input
              id="nombre"
              v-model="usuarioConfig.nombre"
              type="text"
              class="mt-2 block w-full px-4 py-2 bg-white dark:bg-gray-800 text-gray-700 dark:text-white border rounded"
              placeholder="Nombre Completo"
            />
          </div>

          <div>
            <label for="correo" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Correo Electrónico</label>
            <input
              id="correo"
              v-model="usuarioConfig.correo"
              type="email"
              class="mt-2 block w-full px-4 py-2 bg-white dark:bg-gray-800 text-gray-700 dark:text-white border rounded"
              placeholder="correo@ejemplo.com"
            />
          </div>

          <div>
            <label for="rol" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Rol</label>
            <input
              id="rol"
              v-model="usuarioConfig.rol"
              type="text"
              class="mt-2 block w-full px-4 py-2 bg-white dark:bg-gray-800 text-gray-700 dark:text-white border rounded"
              placeholder="Rol de Usuario"
            />
          </div>

          <div class="col-span-2">
            <label class="inline-flex items-center text-sm font-medium text-gray-700 dark:text-gray-300">
              <input
                type="checkbox"
                v-model="usuarioConfig.notificaciones"
                class="form-checkbox text-blue-500"
              />
              <span class="ml-2">Recibir Notificaciones</span>
            </label>
          </div>
        </div>

        <div class="text-center mt-4">
          <button
            type="submit"
            class="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
          >
            Guardar Configuración de Usuario
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
