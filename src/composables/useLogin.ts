import { ref } from 'vue';
import { useAuthStore } from '~/stores/auth';
import { useRouter } from 'vue-router';

export function useLogin({ redirectTo = '/users' } = {}) {
  const usuario = ref('');
  const contraseña = ref('');
  const showPassword = ref(false);
  const isLoading = ref(false);
  const errorMessage = ref('');

  const authStore = useAuthStore();
  const router = useRouter();

  let timeoutId: NodeJS.Timeout;

  function mostrarError(mensaje: string) {
    errorMessage.value = mensaje;
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => (errorMessage.value = ''), 5000);
  }

  const handleLogin = async () => {
    errorMessage.value = '';

    try {
      authStore.validarCredenciales(usuario.value, contraseña.value);
      isLoading.value = true;

      await authStore.login({
        usuario: usuario.value,
        contraseña: contraseña.value,
      });

      await router.push(redirectTo);
    } catch (error: any) {
      mostrarError(error.message);
    } finally {
      isLoading.value = false;
    }
  };

  return {
    usuario,
    contraseña,
    showPassword,
    isLoading,
    errorMessage,
    handleLogin,
  };
}