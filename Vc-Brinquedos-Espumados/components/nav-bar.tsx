import { router } from 'expo-router';
import { Image, ImageSourcePropType, StyleSheet, TouchableOpacity, View } from 'react-native';

type NavItemsProps = {
  image: ImageSourcePropType;
  onPress: () => void;
}

const icons = [{image: require('../assets/image/home-teste-sem-figma.png'),
                onPress: () => router.push("/")
              },
               {image: require('../assets/image/cart-test-sem-figma.png'),
                onPress: () => router.push("/cart")
               },
               {image: require('../assets/image/favorite-test-sem-figma.png'),
                onPress: () => router.push("/favorite")
               },
               {image: require('../assets/image/user-test-sem-figma.png'),
                onPress: () => router.push("/login")
               }
]

//Fazer o handlepress pra animação do navbar
//Melhorar o css pra animação

export default function Nav({}: NavItemsProps) {

  return (
    //primeira página a ser aberta showroom provavelmente fica aki
    <>
      <View style={styles.container}>
        <View style={styles.nav}>
          {icons.map((item, index) => (
            <TouchableOpacity key={index} onPress={item.onPress} style={styles.options}>
              <Image source={item.image} style={styles.icons} />
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // backgroundColor: '#fff', // ou qualquer cor que ajude a ver a nav
    // justifyContent: 'flex-start',
  },
  nav: {
    position: 'fixed',
    bottom: 0,
    left: 0,
    right: 0,
    height: 70,
    paddingHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#A7C7E7',
    zIndex: 999,
    elevation: 10,
  },
  options: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icons: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },
});