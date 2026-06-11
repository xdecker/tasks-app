import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { PaperProvider } from 'react-native-paper';
import { StatusBar } from 'expo-status-bar';

import { useColorScheme } from '@/hooks/use-color-scheme';
import { LightTheme, DarkTheme as PaperDarkTheme } from '@/theme';

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  return (
    <ThemeProvider value={isDark ? DarkTheme : DefaultTheme}>
      <PaperProvider theme={isDark ? PaperDarkTheme : LightTheme}>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="index" options={{ title: 'Inicio' }} />
          <Stack.Screen name="tasks/index" options={{ headerShown: true, title: 'Tareas' }} />
          <Stack.Screen name="listado/index" options={{ headerShown: true, title: 'Listado' }} />
        </Stack>
        <StatusBar style={isDark ? 'light' : 'dark'} />
      </PaperProvider>
    </ThemeProvider>
  );
}
