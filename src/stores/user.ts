import { defineStore } from 'pinia'
import { useAuthStore } from './auth'
import { ref } from 'vue'

export const useUserStore = defineStore('user', () => {
    const auth = useAuthStore()
    const user = ref<{ plantaId?: string } | null>(null)
    const loading = ref(false)
    const error = ref<string | null>(null)
    const { public: { apiBase } } = useRuntimeConfig();
    const API_URL = `${apiBase}/api`;

    async function fetchUser() {
        if (!auth.token) return
        loading.value = true
        error.value = null
        try {
            // Llama a tu API para obtener datos de usuario
            const response = await $fetch(`${API_URL}/users/profile`, {
                headers: {
                    Authorization: `Bearer ${auth.token}`
                }
            })

            user.value = response as { plantaId?: string } | null
        } catch (e) {
            error.value = 'Error al cargar perfil de usuario'
            user.value = null
        } finally {
            loading.value = false
        }
    }

    return { user, fetchUser, loading, error }
})