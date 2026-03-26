import { ref, watchEffect } from 'vue';
import type { User } from '~/interfaces/user.interface';
import { useAuthStore } from '~/stores/auth'; // Importa el store de auth
import { useRuntimeConfig } from '#app';
import { navigateTo } from '#app';

export function useUsers() {
  const users = ref<User[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);

  // Usamos el store de auth
  const authStore = useAuthStore();
  const token = authStore.token; // El token sigue siendo un ref, así que lo dejamos como está
  const isAuthenticated = authStore.isAuthenticated; // isAuthenticated es un computed, no necesitas .value aquí

  const { public: { apiBase } } = useRuntimeConfig();
  const API_URL = `${apiBase}/api`;     // ruta REST

  const fetchUsers = async () => {
    // Comprobar si el token es null y si el usuario está autenticado
    if (!isAuthenticated || !token) {
      console.log('Usuario no autenticado, redirigiendo a login...');
      navigateTo('/login', { replace: true });
      return;
    }

    loading.value = true;
    error.value = null;

    try {
      const response = await $fetch<User[]>(`${API_URL}/users`, {
        headers: { Authorization: `Bearer ${token}` },
        credentials: 'include',
      });
      users.value = response;
    } catch (err: any) {
      console.error('Error fetching users:', err);
      if (err.status === 401) {
        console.log('Token expirado, redirigiendo a login...');
        navigateTo('/login', { replace: true });
      } else {
        error.value = err?.message || 'Error al cargar los usuarios';
      }
    } finally {
      loading.value = false;
    }
  };

  // Ejecutar la verificación y redirección al cargar el composable
  watchEffect(() => {
    // Comprobar si el token es null y si el usuario está autenticado
    if (!isAuthenticated || !token) {
      console.log('No autenticado, redirigiendo inmediatamente...');
      navigateTo('/login', { replace: true });
    }
  });

  return { users, fetchUsers, loading, error };
}