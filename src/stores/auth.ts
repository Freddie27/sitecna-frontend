import { computed } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  const config = useRuntimeConfig();

  const cookie = useCookie<string | null>('token', {
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
  });

  // Token siempre refleja el valor actual de la cookie
  const token = computed(() => cookie.value);

  // isAuthenticated se basa en token computed
  const isAuthenticated = computed(() => !!token.value);

  async function login(creds: { usuario: string; contraseña: string }) {
    const API_URL = `${config.public.apiBase}/api`;

    try {
      const response = await $fetch<{ accessToken: string }>(
        `${API_URL}/auth/login`,
        {
          method: 'POST',
          body: creds,
          credentials: 'include',
        }
      );

      if (!response || !response.accessToken) {
        throw new Error('No se recibió el token del servidor.');
      }

      cookie.value = response.accessToken; // Solo aquí escribimos el token en la cookie
    } catch (error: any) {
      if (error?.message?.includes('NetworkError') || error?.status === 0) {
        throw new Error('No se pudo conectar al servidor.');
      }
      if (error?.status === 401) {
        throw new Error('Usuario o contraseña incorrectos.');
      } else if (error?.status === 400) {
        throw new Error('Solicitud inválida. Revise los campos ingresados.');
      } else if (error?.status === 500) {
        throw new Error('Error interno del servidor. Intente más tarde.');
      } else if (error?.message) {
        throw new Error(error.message);
      }

      throw new Error('Ocurrió un error inesperado al iniciar sesión.');
    }
  }

  function validarCredenciales(usuario: string, contraseña: string) {
    if (!usuario && !contraseña) {
      throw new Error('Ingrese su usuario y contraseña.');
    }
    if (!usuario) {
      throw new Error('Ingrese su usuario o correo.');
    }
    if (!contraseña) {
      throw new Error('Ingrese su contraseña.');
    }
  }

  function logout() {
    cookie.value = null;  // Borramos solo la cookie, token se actualiza automáticamente
    if (process.client) {
      localStorage.removeItem('notif-shown-user-logged-in'); // <-- limpia el flag
      navigateTo('/login');
    }
  }

  function getToken() {
    return token.value;
  }

  return {
    token,
    isAuthenticated,
    login,
    logout,
    getToken,
    validarCredenciales,
  };
});