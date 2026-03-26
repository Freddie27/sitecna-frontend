export const useTheme = () => {
  const colorMode = useColorMode()

  // Reactive flag para saber si estamos en dark mode
  const isDarkMode = computed(() => colorMode.value === 'dark')

  // Cambia la preferencia (y la persiste)
  const toggleTheme = () => {
    colorMode.preference = isDarkMode.value ? 'light' : 'dark'
  }

  return { isDarkMode, toggleTheme }
}