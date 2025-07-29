import { Stack, useRouter } from 'expo-router';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CartProvider } from '../components/contexts/CartContext';

SplashScreen.preventAutoHideAsync();

export default function Layout() {
  const router = useRouter();
  const [fontsLoaded] = useFonts({
    'Baloo-SemiBold': require('../assets/fonts/Baloo2-SemiBold.ttf'),
    'Baloo2-Bold': require('../assets/fonts/Baloo2-Bold.ttf'),
    'Montserrat': require('../assets/fonts/BalooBhaijaan2-Bold.ttf'),
    'Inter': require('../assets/fonts/BalooBhaijaan2-SemiBold.ttf'),
    'Poppins': require('../assets/fonts/Poppins-SemiBold.ttf'),
  });

  const [initialCheckDone, setInitialCheckDone] = useState(false);

  useEffect(() => {
    const checkFirstLaunch = async () => {
      const hasLaunched = await AsyncStorage.getItem('hasLaunched');
      if (!hasLaunched) {
        await AsyncStorage.setItem('hasLaunched', 'true');
        router.replace('/intro'); // Vai para a intro se for o primeiro acesso
      }
      setInitialCheckDone(true);
    };

    if (fontsLoaded) {
      SplashScreen.hideAsync();
      checkFirstLaunch();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded || !initialCheckDone) {
    return null;
  }

  return (
    <CartProvider>
      <Stack>
        <Stack.Screen name="intro" options={{ headerShown: false }} />
        <Stack.Screen name="_index" options={{ headerShown: false }} />
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
