<script setup lang="ts">
import { ref } from 'vue';

// Variables para la información del perfil
const user = ref({
  nombre: 'Juan Pérez',
  email: 'juan.perez@empresa.com',
  telefono: '+1 234 567 890',
  fotoPerfil: '/public/favicon.ico', // Ruta de la foto de perfil por defecto
});

// Variables para editar el perfil
const editar = ref({
  nombre: user.value.nombre,
  email: user.value.email,
  telefono: user.value.telefono,
  fotoPerfil: user.value.fotoPerfil,
});

// Función para guardar cambios en el perfil
const guardarCambios = () => {
  user.value = { ...editar.value };
  alert('Perfil actualizado exitosamente');
};

// Función para manejar la carga de la imagen de perfil
const handleFileChange = (e: Event) => {
  const fileInput = e.target as HTMLInputElement;  // Especificamos que 'target' es un input de tipo file
  if (fileInput.files && fileInput.files[0]) {
    const file = fileInput.files[0];
    editar.value.fotoPerfil = URL.createObjectURL(file);  // Generamos la URL de la imagen seleccionada
  }
};
</script>

<template>
  <div class="p-6 space-y-8">
    <!-- Título de la página -->
    <h1 class="text-3xl font-bold text-center text-gray-800 dark:text-white">Mi Perfil</h1>

    <!-- Foto de perfil -->
    <div class="flex justify-center">
      <img
        :src="editar.fotoPerfil"
        alt="Foto de Perfil"
        class="w-32 h-32 rounded-full object-cover border-4 border-gray-300 dark:border-gray-700"
      />
    </div>

    <!-- Formulario de edición del perfil -->
    <div class="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
      <h2 class="text-2xl font-semibold text-gray-800 dark:text-white">Información Personal</h2>
      
      <!-- Formulario para editar perfil -->
      <form @submit.prevent="guardarCambios" class="space-y-4 mt-4">
        <!-- Nombre -->
        <div>
          <label for="nombre" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Nombre</label>
          <input
            id="nombre"
            v-model="editar.nombre"
            type="text"
            class="mt-2 block w-full px-4 py-2 bg-white dark:bg-gray-800 text-gray-700 dark:text-white border rounded"
            placeholder="Ingresa tu nombre"
            required
          />
        </div>

        <!-- Correo Electrónico -->
        <div>
          <label for="email" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Correo Electrónico</label>
          <input
            id="email"
            v-model="editar.email"
            type="email"
            class="mt-2 block w-full px-4 py-2 bg-white dark:bg-gray-800 text-gray-700 dark:text-white border rounded"
            placeholder="Ingresa tu correo electrónico"
            required
          />
        </div>

        <!-- Teléfono -->
        <div>
          <label for="telefono" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Teléfono</label>
          <input
            id="telefono"
            v-model="editar.telefono"
            type="text"
            class="mt-2 block w-full px-4 py-2 bg-white dark:bg-gray-800 text-gray-700 dark:text-white border rounded"
            placeholder="Ingresa tu número de teléfono"
            required
          />
        </div>

        <!-- Foto de Perfil -->
        <div>
          <label for="fotoPerfil" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Foto de Perfil</label>
          <input
            id="fotoPerfil"
            type="file"
            @change="handleFileChange"  <!-- Cambiamos la función aquí -->
            class="mt-2 block w-full px-4 py-2 bg-white dark:bg-gray-800 text-gray-700 dark:text-white border rounded"
          />
        </div>

        <!-- Botón para guardar cambios -->
        <div class="text-center mt-4">
          <button
            type="submit"
            class="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
          >
            Guardar Cambios
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
