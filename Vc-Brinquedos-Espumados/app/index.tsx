import { StyleSheet, Text, View, Image, ImageSourcePropType } from 'react-native';

export default function HomeScreen() {
  return (
    //primeira página a ser aberta showroom provavelmente fica aki
    
    <>
      <View style={styles.nav}>
        <View style={styles.options}>
          <Image style={styles.icons} source={require ('../assets/image/home-teste-sem-figma.png')}/>
        
        </View>
        <View style={styles.options}>
         <Image style={styles.icons} source={require ('../assets/image/cart-test-sem-figma.png')}/>

        </View>
        <View style={styles.options}>
          <Image style={styles.icons} source={require ('../assets/image/favorite-test-sem-figma.png')}/>

        </View>
        <View style={styles.options}>
          <Image style={styles.icons} source={require ('../assets/image/user-test-sem-figma.png')}/>

        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  nav: {

  },
  options: {
    
  },
  icons: {

  }
});