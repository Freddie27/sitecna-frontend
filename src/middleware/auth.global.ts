import { jwtDecode } from 'jwt-decode';

export default defineNuxtRouteMiddleware((to, from) => {
    const token = useCookie('token');

    // Si estamos en la página de login, no hacemos nada con el token
    if (to.path === '/login') {
        return; // No hace falta realizar validaciones aquí
    }

    // Si no hay token, redirigir inmediatamente al login
    if (!token.value) {
        return navigateTo('/login', { replace: true });
    }

    try {
        // Aquí usamos token.value! para asegurar que no es null o undefined
        const decodedToken: any = jwtDecode(token.value!);
        const currentTime = Math.floor(Date.now() / 1000); // Hora actual en segundos

        if (decodedToken.exp < currentTime) {
            token.value = null; // Eliminar token expirado

            if (to.path !== '/login') {
                return navigateTo('/login', { replace: true });
            }
        }
    } catch (error) {
        console.error('Error al decodificar el token:', error);
        token.value = null; // Eliminar token inválido

        if (to.path !== '/login') {
            return navigateTo('/login', { replace: true });
        }
    }
});
