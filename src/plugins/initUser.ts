import { useAuthStore } from '~/stores/auth'
import { useUserStore } from '~/stores/user'

export default defineNuxtPlugin(async () => {
    const auth = useAuthStore()
    const userStore = useUserStore()

    const token = auth.getToken()
    if (token && !userStore.user) {
        await userStore.fetchUser()
    }
})