import type { Widget } from '~/interfaces/widget'
import type { Variable } from '~/interfaces/variable'
import type { Dato } from '~/interfaces/dato'
import { useAuthStore } from '~/stores/auth'

export const useWidget = () => {
  const { public: { apiBase } } = useRuntimeConfig()
  const API_URL = `${apiBase}/api`
  const auth = useAuthStore()

  const getWidgetsByIds = async (ids: string[]): Promise<Widget[]> => {
    if (!ids.length) return []
    return await $fetch<Widget[]>(`${API_URL}/widgets?ids=${ids.join(',')}`, {
      headers: {
        Authorization: `Bearer ${auth.token}`,
      },
    })
  }

  const getVariablesByIds = async (ids: string[]): Promise<Variable[]> => {
    if (!ids.length) return []

    const result = await $fetch<Variable[]>(`${API_URL}/variables?ids=${ids.join(',')}`, {
      headers: {
        Authorization: `Bearer ${auth.token}`,
      },
    })

    return result
  }

  const getDatosByVariableCodigos = async (
    plantaCodigo: string,
    variableCodigos: string[],
    since?: string
  ): Promise<Dato[]> => {
    if (!plantaCodigo || !variableCodigos.length) return []

    const params = new URLSearchParams()
    params.append('plantaCodigo', plantaCodigo)
    params.append('variableCodigo', variableCodigos.join(','))
    if (since) params.append('since', since)

    return await $fetch<Dato[]>(`${API_URL}/datas/filtered?${params.toString()}`, {
      headers: {
        Authorization: `Bearer ${auth.token}`,
      },
    })
  }

  return {
    getWidgetsByIds,
    getVariablesByIds,
    getDatosByVariableCodigos,
  }
}