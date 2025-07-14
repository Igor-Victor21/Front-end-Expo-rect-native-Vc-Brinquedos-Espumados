import { Stack } from 'expo-router';
import { CartProvider } from '../components/contexts/CartContext';

export default function Layout() {
  return (
    <CartProvider>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        {/* <Stack.Screen name='products' options={{headerShown: false}}/> */}
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
