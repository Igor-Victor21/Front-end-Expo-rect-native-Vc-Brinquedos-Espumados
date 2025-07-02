import { router } from 'expo-router';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';

export default function Nav() {

  const handleHome = () => {
        router.push("/")
  }

  const handleCart = () => {
        router.push("/cart")

  }

  const handleFavorite = () => {
        router.push("/favorite")

  }

  const handleLogin = () => {
        router.push("/login")

  }
  return (
    //primeira página a ser aberta showroom provavelmente fica aki
    <>
      <View style={styles.nav}>
        <View style={styles.options}>
          {/* O componente TouchableOpacity é responsavel por tornar uma imagem clicável com uma animação suave de click nela  */}
          <TouchableOpacity onPress={handleHome}>
            <Image style={styles.icons} source={require('../assets/image/home-teste-sem-figma.png')} />
          </TouchableOpacity>

        </View>
        <View style={styles.options}>
          <TouchableOpacity onPress={handleCart}>
            <Image style={styles.icons} source={require('../assets/image/cart-test-sem-figma.png')} />
          </TouchableOpacity>

        </View>
        <View style={styles.options}>
          <TouchableOpacity onPress={handleFavorite}>
            <Image style={styles.icons} source={require('../assets/image/favorite-test-sem-figma.png')} />
          </TouchableOpacity>

        </View>
        <View style={styles.options}>
          <TouchableOpacity onPress={handleLogin}>
            <Image style={styles.icons} source={require('../assets/image/user-test-sem-figma.png')} />
          </TouchableOpacity>

        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  nav: {
    position: 'fixed',
    bottom: 0,
    left: 0,
    right: 0,
    paddingVertical: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    backgroundColor: '#A7C7E7',

  },
  options: {
    flex: 1,// ocupa todo espaço disponivel 
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    width: 100,
    height: 50,
  },
  icons: {
    width: 30,
    height: 30,
  }
});