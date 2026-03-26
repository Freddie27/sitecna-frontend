import type { Pantalla } from '~/interfaces/pantalla'
import { useAuthStore } from '~/stores/auth'

export const usePantalla = () => {
    const { public: { apiBase } } = useRuntimeConfig()
    const API_URL = `${apiBase}/api`
    const auth = useAuthStore()

    const getPantallasByIds = async (ids: string[]): Promise<Pantalla[]> => {
        if (!ids.length) return []
        try {
            return await $fetch<Pantalla[]>(`${API_URL}/screens/list/by-ids?ids=${ids.join(',')}`, {
                headers: {
                    Authorization: `Bearer ${auth.token}`,
                },
            })
        } catch (error) {
            console.error('Error al cargar pantallas:', error)
            throw error
        }
    }

    return { getPantallasByIds }
}