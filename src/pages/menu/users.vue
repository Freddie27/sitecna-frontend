<script setup lang="ts">
import { ref, computed } from 'vue';

interface Usuario {
  id: string;
  nombre: string;
  correo: string;
  rol: string;
  estado: string;
}

const usuariosData = ref<Usuario[]>([
  {
    id: 'U001',
    nombre: 'Juan Pérez',
    correo: 'juan.perez@example.com',
    rol: 'Administrador',
    estado: 'Activo',
  },
  {
    id: 'U002',
    nombre: 'Ana Gómez',
    correo: 'ana.gomez@example.com',
    rol: 'Usuario',
    estado: 'Inactivo',
  },
  {
    id: 'U003',
    nombre: 'Carlos Ruiz',
    correo: 'carlos.ruiz@example.com',
    rol: 'Administrador',
    estado: 'Activo',
  },
  {
    id: 'U004',
    nombre: 'María Sánchez',
    correo: 'maria.sanchez@example.com',
    rol: 'Usuario',
    estado: 'Activo',
  },
]);

const filtroRol = ref('');
const filtroEstado = ref('');

const filteredUsuarios = computed(() =>
  usuariosData.value.filter((usuario) => {
    const matchRol = !filtroRol.value || usuario.rol === filtroRol.value;
    const matchEstado = !filtroEstado.value || usuario.estado === filtroEstado.value;
    return matchRol && matchEstado;
  })
);

const addUser = () => {
  // Lógica para agregar usuario
};

const editUser = (id: string) => {
  // Lógica para editar usuario
};

const deleteUser = (id: string) => {
  // Lógica para eliminar usuario
};
</script>

<template>
  <div class="p-6 space-y-6">
    <h1 class="text-3xl font-bold text-center text-gray-800 dark:text-white">Usuarios y Permisos</h1>

    <!-- Filtros -->
    <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <select
        v-model="filtroRol"
        class="px-4 py-2 border rounded bg-white dark:bg-gray-800 text-gray-800 dark:text-white"
      >
        <option value="">Todos los Roles</option>
        <option>Administrador</option>
        <option>Usuario</option>
      </select>

      <select
        v-model="filtroEstado"
        class="px-4 py-2 border rounded bg-white dark:bg-gray-800 text-gray-800 dark:text-white"
      >
        <option value="">Todos los Estados</option>
        <option>Activo</option>
        <option>Inactivo</option>
      </select>

      <button
        @click="addUser"
        class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
      >
        Agregar Usuario
      </button>
    </div>

    <!-- Tabla de usuarios -->
    <div class="overflow-x-auto bg-white dark:bg-gray-800 shadow-md rounded-lg">
      <table class="min-w-full table-auto">
        <thead>
          <tr class="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white">
            <th class="px-4 py-2 text-left">Nombre</th>
            <th class="px-4 py-2 text-left">Correo</th>
            <th class="px-4 py-2 text-left">Rol</th>
            <th class="px-4 py-2 text-left">Estado</th>
            <th class="px-4 py-2 text-left">Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="usuario in filteredUsuarios"
            :key="usuario.id"
            class="border-b dark:border-gray-600"
          >
            <td class="px-4 py-2 text-left">{{ usuario.nombre }}</td>
            <td class="px-4 py-2 text-left">{{ usuario.correo }}</td>
            <td class="px-4 py-2 text-left">{{ usuario.rol }}</td>
            <td class="px-4 py-2 text-left">{{ usuario.estado }}</td>
            <td class="px-4 py-2 text-left">
              <button
                @click="editUser(usuario.id)"
                class="px-2 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
              >
                Editar
              </button>
              <button
                @click="deleteUser(usuario.id)"
                class="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 ml-2"
              >
                Eliminar
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div v-if="filteredUsuarios.length === 0" class="text-center text-gray-500">
      No se encontraron usuarios con los filtros aplicados.
    </div>
  </div>
</template>
