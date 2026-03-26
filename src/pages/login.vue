<script setup lang="ts">
import { useLogin } from '~/composables/useLogin';
import ButtonTheme from '~/components/ButtonTheme.vue';
import { Eye, EyeOff, User, Lock, LogIn } from '~/composables/useIcons';
import { vAutoAnimate } from '@formkit/auto-animate';
import { watch } from 'vue';

definePageMeta({
  layout: 'auth',
});

const {
  usuario,
  contraseña,
  showPassword,
  isLoading,
  errorMessage,
  handleLogin
} = useLogin({ redirectTo: '/' });

watch([usuario, contraseña], () => {
  if (errorMessage.value) {
    errorMessage.value = '';
  }
});
</script>

<template>
  <div class="bg-[#f2f2f2] dark:bg-gray-900 flex flex-1 items-center justify-center relative w-full overflow-hidden">
    <ButtonTheme class="absolute top-4 right-4 z-10" />

    <div ref="formRef" v-auto-animate
      class="w-full max-w-xs sm:max-w-sm md:max-w-sm p-3 sm:p-4 space-y-6 bg-white dark:bg-gray-800 text-black dark:text-white rounded-xl shadow-xl border-2"
      :style="{ 'border-color': '#2563EB' }">

      <div class="flex justify-center mb-4">
        <img
          src="https://res.cloudinary.com/dqiayyqfp/image/upload/v1774562025/logo-sitecna_htw1gz.webp"
          alt="Logo Claro" class="h-36 w-auto block dark:hidden" />
        <img
          src="https://res.cloudinary.com/dqiayyqfp/image/upload/v1774562025/logo-sitecna_htw1gz.webp"
          alt="Logo Oscuro" class="h-36 w-auto hidden dark:block" />
      </div>

      <div class="border-t border-[#2563EB] opacity-50 mx-4" style="height: 1px; margin: 12px 0;"></div>

      <div class="space-y-6">
        <div class="relative">
          <label for="usuario" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Usuario o correo
          </label>
          <div class="relative">
            <div class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-300">
              <User class="w-5 h-5" />
            </div>
            <input
              id="usuario"
              v-model="usuario"
              type="text"
              placeholder="Ingrese su usuario o correo"
              aria-label="Usuario"
              :aria-invalid="errorMessage ? 'true' : 'false'"
              :class="[
                'w-full px-4 py-2 pl-10 bg-gray-50 dark:bg-gray-700 border text-black dark:text-white rounded-lg placeholder-gray-400 transition-all duration-200 ease-in-out focus:outline-none focus:ring-2',
                errorMessage && !usuario ? 'border-red-500 focus:ring-red-500' : 'border-[#2563EB] focus:ring-[#2563EB]'
              ]"
            />
          </div>
        </div>

        <div class="relative">
          <label for="contraseña" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Contraseña
          </label>
          <div class="relative">
            <div class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-300">
              <Lock class="w-5 h-5" />
            </div>
            <input
              :type="showPassword ? 'text' : 'password'"
              id="contraseña"
              v-model="contraseña"
              placeholder="Ingrese su contraseña"
              aria-label="Contraseña"
              :aria-invalid="errorMessage ? 'true' : 'false'"
              :class="[
                'w-full px-4 py-2 pl-10 pr-10 bg-gray-50 dark:bg-gray-700 border text-black dark:text-white rounded-lg placeholder-gray-400 transition-all duration-200 ease-in-out focus:outline-none focus:ring-2',
                errorMessage && !contraseña ? 'border-red-500 focus:ring-red-500' : 'border-[#2563EB] focus:ring-[#2563EB]'
              ]"
            />
            <button type="button" @click="showPassword = !showPassword"
              class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 dark:text-gray-300 hover:text-[#2563EB] focus:outline-none">
              <span v-if="showPassword">
                <EyeOff class="w-6 h-6" />
              </span>
              <span v-else>
                <Eye class="w-6 h-6" />
              </span>
            </button>
          </div>
        </div>
      </div>

      <div class="relative">
        <button @click="handleLogin" :disabled="isLoading"
          class="w-full py-2 text-white font-semibold rounded-lg bg-gradient-to-r from-[#2563EB] via-[#1D4ED8] to-[#1E40AF] hover:from-[#1D4ED8] hover:to-[#2563EB] focus:outline-none disabled:opacity-50 transition-all duration-300 ease-in-out flex items-center justify-center space-x-2 relative overflow-hidden">
          <LogIn class="w-5 h-5" />
          <span>{{ isLoading ? 'Cargando...' : 'Acceder' }}</span>
          
          <div 
            v-if="isLoading" 
            class="absolute bottom-0 left-0 w-full h-1 bg-black/10 rounded-b-lg overflow-hidden"
          >
            <div class="h-full bg-gradient-to-r from-[#60A5FA] to-[#2563EB] rounded-b-lg loading-line shadow-sm"></div>
          </div>
        </button>
      </div>

      <div
        v-if="errorMessage"
          class="relative overflow-hidden rounded-lg bg-red-50 dark:bg-red-950/20 p-4 shadow-sm"
          role="alert"
          v-auto-animate
        >
        <p class="text-center text-sm font-medium text-red-800 dark:text-red-200">
          {{ errorMessage }}
        </p>
      </div>
    </div>
  </div>
</template>