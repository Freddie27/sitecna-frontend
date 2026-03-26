import type { Template } from '~/interfaces/template'
import { useAuthStore } from '~/stores/auth'

export const useTemplate = () => {

  const { public: { apiBase } } = useRuntimeConfig();
  const API_URL = `${apiBase}/api`;
  const auth = useAuthStore()

  const getTemplateById = async (id: string): Promise<Template | null> => {
    if (!id) return null
    try {
      const template = await $fetch<Template>(`${API_URL}/templates/${id}`, {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      })
      return template
    } catch (e) {
      console.error('Error al obtener el template:', e)
      return null
    }
  }

  return { getTemplateById }
}