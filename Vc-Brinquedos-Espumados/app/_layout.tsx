import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import 'react-native-reanimated';


export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }

  return (
    <>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name='products' options={{headerShown: false}}/>
        <Stack.Screen name='cart' options={{headerShown: false}}/>
        <Stack.Screen name='favorite' options={{headerShown: false}}/>
        <Stack.Screen name='user' options={{headerShown: false}}/>
        <Stack.Screen name='login' options={{headerShown: false}}/>
        <Stack.Screen name="modal" options={{presentation: 'modal',}}/>
        <Stack.Screen name="product/[id]" options={{ headerShown: false }} />
        <Stack.Screen name="userAdmin" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" options={{ headerShown: false }}/>
      </Stack>
    </>
      
  );
}