import { Link } from 'expo-router';
import { Image, StyleSheet, Text, View } from 'react-native';

export default function NotFoundScreen() {

  return (
    <>
      <View style={styles.container}>
        <Image style={styles.img} source={require('../assets/image/test-img-header.png')}/>
        <Text style={styles.text}>Página não encontrada</Text>
        <Link href={"/"} style={styles.link}>
            <Text>Clique para voltar</Text>
        </Link>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20
  },
  img: {
    top: '-20%'
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    bottom: 65
  },
  link: {
    marginTop: 25,
    padding: 5,
    borderWidth: 2,
    borderRadius: 20,
    backgroundColor: 'grey'
  }
});