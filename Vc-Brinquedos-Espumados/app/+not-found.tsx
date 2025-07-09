import { Link } from 'expo-router';
import { Image, ImageBackground, StyleSheet, Text, View } from 'react-native';
import Info from '../components/cellphoneInfo';

export default function NotFoundScreen() {

  return (
    <>
    <Info/>
    <View style={styles.containerImg}>
      <ImageBackground
        style={styles.img}
        source={require('../assets/image/Erro404.png')}
        resizeMode='cover'>
      </ImageBackground>
    </View>
    <View style={styles.container}>
      <Text style={styles.h1}>ERROR</Text>
      <Text style={styles.h3}>Oops!</Text>
      <Text style={styles.p}>A página que você está tentando acessar não foi encontrada.</Text>
      <Image source={require('../assets/image/AnimationCat.gif')} style={styles.gif}/>
      <Link href={"/"} style={styles.link}>
        <Text>Voltar para a tela inicial</Text>
      </Link>
    </View>
    </>
  );
}

const styles = StyleSheet.create({
  containerImg: {
    flex: 1,
  },
  img: {
    width: "100%",
    height: 354,
    top: "25%",
    left: -3,
  },
  container: {
    alignItems: 'center',
  },
  h1: {
    fontSize: 77,
    fontWeight: '900',
    color: '#252525'
  },
  h3: {
    fontSize: 32,
    fontWeight: '500',
    paddingVertical: 15
  },
  p: {
    textAlign: 'center',
    fontSize: 15,
    maxWidth: "80%"
  },
  gif: {
    width: 116,
    height: 85,
    bottom: "-12%"
  },
  link: {
    marginVertical: 50,
    paddingHorizontal: 50,
    paddingVertical: 20,
    borderRadius: 999,
    backgroundColor: '#252525',
    color: '#f6f6f6',
  }
});