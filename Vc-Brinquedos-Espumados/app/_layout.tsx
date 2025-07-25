import { Stack } from 'expo-router';
import { CartProvider } from '../components/contexts/CartContext';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';

// Impede que a tela principal apareça antes de carregar as fontes
SplashScreen.preventAutoHideAsync();

export default function Layout() {
  const [fontsLoaded] = useFonts({
    'Baloo-SemiBold': require('../assets/fonts/Baloo2-SemiBold.ttf'),
    'Baloo2-Bold': require('../assets/fonts/Baloo2-Bold.ttf'),
    'Montserrat': require('../assets/fonts/BalooBhaijaan2-Bold.ttf'),
    'Inter': require('../assets/fonts/BalooBhaijaan2-SemiBold.ttf'),
    'Poppins': require('../assets/fonts/Poppins-SemiBold.ttf'),
  });

  // Libera a SplashScreen assim que as fontes carregarem
  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  // Enquanto carrega as fontes, não renderiza as telas
  if (!fontsLoaded) {
    return null;
  }

  return (
    <CartProvider>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name='cart' options={{ headerShown: false }} />
        <Stack.Screen name='favorite' options={{ headerShown: false }} />
        <Stack.Screen name='user' options={{ headerShown: false }} />
        <Stack.Screen name='login' options={{ headerShown: false }} />
        <Stack.Screen name="modal" options={{ presentation: 'modal' }} />
        <Stack.Screen name="product/[id]" options={{ headerShown: false }} />
        <Stack.Screen name="userAdmin" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" options={{ headerShown: false }} />
      </Stack>
    </CartProvider>
  );
}
