<script setup lang="ts">
import { ref } from 'vue';

// Variables para contacto y FAQ
const contacto = ref({
  email: 'soporte@empresa.com',
  telefono: '+1 234 567 890',
  direccion: 'Av. Siempre Viva 123, Ciudad, País',
});

const faqs = ref([
  {
    pregunta: '¿Cómo puedo cambiar mi contraseña?',
    respuesta: 'Puedes cambiar tu contraseña desde la sección "Mi Cuenta" en la configuración.',
  },
  {
    pregunta: '¿Cómo agregar un nuevo sensor?',
    respuesta: 'Para agregar un nuevo sensor, dirígete a la sección "Dispositivos" y haz clic en "Agregar Sensor".',
  },
  {
    pregunta: '¿Dónde puedo ver los informes generados?',
    respuesta: 'Los informes generados se encuentran en la sección "Reportes".',
  },
]);

// Variables para el formulario de ticket
const ticket = ref({
  asunto: '',
  descripcion: '',
});

// Función para enviar un ticket de soporte
const enviarTicket = () => {
  // console.log('Ticket Enviado', ticket.value);
  // Lógica para enviar ticket al servidor o API
};
</script>

<template>
  <div class="p-6 space-y-8">
    <!-- Título de la página -->
    <h1 class="text-3xl font-bold text-center text-gray-800 dark:text-white">Soporte Técnico</h1>

    <!-- Información de contacto -->
    <div class="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
      <h2 class="text-2xl font-semibold text-gray-800 dark:text-white">Contáctanos</h2>
      <p class="text-gray-700 dark:text-gray-300 mt-2">Si tienes alguna pregunta o necesitas ayuda, contáctanos a través de los siguientes canales:</p>
      <div class="mt-4 space-y-2">
        <p class="text-sm text-gray-600 dark:text-gray-400"><strong>Email:</strong> <a :href="'mailto:' + contacto.email" class="text-blue-500 hover:underline">{{ contacto.email }}</a></p>
        <p class="text-sm text-gray-600 dark:text-gray-400"><strong>Teléfono:</strong> {{ contacto.telefono }}</p>
        <p class="text-sm text-gray-600 dark:text-gray-400"><strong>Dirección:</strong> {{ contacto.direccion }}</p>
      </div>
    </div>

    <!-- Preguntas Frecuentes (FAQ) -->
    <div class="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
      <h2 class="text-2xl font-semibold text-gray-800 dark:text-white">Preguntas Frecuentes</h2>
      <div class="mt-4 space-y-4">
        <div v-for="(faq, index) in faqs" :key="index">
          <h3 class="text-lg font-semibold text-gray-800 dark:text-white">{{ faq.pregunta }}</h3>
          <p class="text-gray-700 dark:text-gray-300">{{ faq.respuesta }}</p>
        </div>
      </div>
    </div>

    <!-- Formulario de Ticket de Soporte -->
    <div class="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
      <h2 class="text-2xl font-semibold text-gray-800 dark:text-white">Enviar un Ticket de Soporte</h2>
      <form @submit.prevent="enviarTicket" class="space-y-4 mt-4">
        <div>
          <label for="asunto" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Asunto</label>
          <input
            id="asunto"
            v-model="ticket.asunto"
            type="text"
            class="mt-2 block w-full px-4 py-2 bg-white dark:bg-gray-800 text-gray-700 dark:text-white border rounded"
            placeholder="Ingresa el asunto del ticket"
            required
          />
        </div>

        <div>
          <label for="descripcion" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Descripción</label>
          <textarea
            id="descripcion"
            v-model="ticket.descripcion"
            rows="4"
            class="mt-2 block w-full px-4 py-2 bg-white dark:bg-gray-800 text-gray-700 dark:text-white border rounded"
            placeholder="Describe tu problema o consulta"
            required
          ></textarea>
        </div>

        <div class="text-center mt-4">
          <button
            type="submit"
            class="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
          >
            Enviar Ticket
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
