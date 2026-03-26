import type { Planta } from '~/interfaces/planta'
import { useAuthStore } from '~/stores/auth'

export const usePlanta = () => {
  const { public: { apiBase } } = useRuntimeConfig();
  const API_URL = `${apiBase}/api`;

  const auth = useAuthStore()

  const getPlantaByCodigo = async (codigo: string): Promise<Planta | null> => {
    if (!codigo) return null
    try {
      const planta = await $fetch<Planta>(`${API_URL}/plants/by-codigo/${codigo}`, {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      })
      return planta
    } catch (e) {
      console.error('Error al obtener la planta:', e)
      return null
    }
  }

  return { getPlantaByCodigo }
}
