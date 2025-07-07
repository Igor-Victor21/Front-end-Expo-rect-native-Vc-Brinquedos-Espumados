import { Link, Stack } from 'expo-router';
import { useState } from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';

export default function NotFoundScreen() {
  const [hover, setHover] = useState(false);

  //fazer o hover do botão
  //colocar background, imagem final e style final

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={styles.container}>
        <Image style={styles.img} source={require('../assets/image/test-img-header.png')}/>
        <Text>Página não encontrada</Text>
        <Pressable
          onHoverIn={() => setHover(true)}
          onHoverOut={() => setHover(false)}
          style={[styles.btn, hover && styles.btnHover]}
        >
        <Link href={"/"} style={styles.link}>
            <Text>Clique para voltar</Text>
        </Link>
        </Pressable>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  img: {
    top: '-20%'
  },
  btn: {
    
  },
  btnHover: {

  },
  link: {
    marginTop: 25,
    paddingVertical: 10,
    borderWidth: 2,
    borderRadius: 20
  }
});