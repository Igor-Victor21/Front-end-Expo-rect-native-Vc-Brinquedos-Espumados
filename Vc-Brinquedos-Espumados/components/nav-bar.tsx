import { StyleSheet, Image, Text, TouchableOpacity } from 'react-native';
import { router, usePathname } from 'expo-router';
import Animated, { FadeIn, FadeOut, LinearTransition } from 'react-native-reanimated';

const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);
const AnimatedView = Animated.View;

const PRIMARY_COLOR = '#7DACFF';
const SECONDARY_COLOR = '#fff';

type RoutePath = '/' | '/cart' | '/favorite' | '/login';

const icons: { image: any; label: string; route: RoutePath }[] = [
  {
    image: require('../assets/image/home-teste-sem-figma.png'),
    label: 'Home',
    route: '/',
  },
  {
    image: require('../assets/image/cart-test-sem-figma.png'),
    label: 'Carrinho',
    route: '/cart',
  },
  {
    image: require('../assets/image/favorite-test-sem-figma.png'),
    label: 'Favoritos',
    route: '/favorite',
  },
  {
    image: require('../assets/image/Person.png'),
    label: 'Perfil',
    route: '/login',
  },
];

export default function NavBar() {
  const pathname = usePathname();

  return (
    <AnimatedView
      entering={FadeIn.duration(300)}
      exiting={FadeOut.duration(300)}
      style={styles.container}
    >
      {icons.map((item, index) => {
        const isFocused =
          item.route === '/' ? pathname === '/' : pathname.startsWith(item.route);


        return (
          <AnimatedTouchableOpacity
            key={index}
            onPress={() => router.push(item.route)}
            layout={LinearTransition.springify().mass(0.5)}
            style={[
              styles.tabItem,
              { backgroundColor: isFocused ? SECONDARY_COLOR : 'transparent' },
            ]}
          >
            <Image
              source={item.image}
              style={[
                styles.icon,
                { tintColor: isFocused ? PRIMARY_COLOR : SECONDARY_COLOR },
              ]}
            />
            {isFocused && (
              <Animated.Text
                entering={FadeIn.duration(200)}
                exiting={FadeOut.duration(200)}
                style={styles.text}
              >
                {item.label}
              </Animated.Text>
            )}
          </AnimatedTouchableOpacity>
        );
      })}
    </AnimatedView>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: PRIMARY_COLOR,
    width: '80%',
    alignSelf: 'center',
    bottom: 40,
    borderRadius: 40,
    paddingHorizontal: 200,
    paddingVertical: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    zIndex: 999,
  },
  tabItem: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 36,
    paddingHorizontal: 13,
    borderRadius: 30,
  },
  icon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
  text: {
    color: PRIMARY_COLOR,
    marginLeft: 8,
    fontWeight: '500',
  },
});
