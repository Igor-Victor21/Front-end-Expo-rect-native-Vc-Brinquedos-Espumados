import { StyleSheet, Text, Image, View, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';





export const CardFav = ({ name, image, description, price } : {name: string, image: string, description: string, price : number})=> {
    
  
  return (
        <LinearGradient
      colors={['rgba(231, 167, 199, 1)', 'rgba(167, 167, 231, 1)']}
      start={{ x: 0.5, y: 0 }}
      end={{ x: 0.5, y: 1 }}
      style={styles.container} // Gradiente aplicado no container inteiro
    >
      <View style={styles.containerImg}>
        <Image 
          style={styles.imgstyle}
          source={{ uri: image }}
          accessibilityLabel="a"
        />
      </View>

      <View style={styles.containerTxt}>
        <Text style={styles.titleName}>{name}</Text>
        <Text style={styles.titleDesc}>{description}</Text>

        <View>
          <Text style={styles.titlePrice}>Preço</Text>
          <Text style={styles.showPrice}>R$ {price.toFixed(2)}</Text>
        </View>

        <TouchableOpacity style={styles.conteinerIcon}>
          <Image style={styles.favIcon} source={require('../assets/image/favorite-test-sem-figma.png')} />
        </TouchableOpacity>
      </View>
    </LinearGradient>
           
            
        )
}

const styles = StyleSheet.create({
    container:{
    flexDirection: 'row',
    justifyContent: 'flex-start',
    borderWidth: 0,
    borderRadius: 30,
    width: 350,
    height: 150,
    marginBottom: 20,
    overflow: 'hidden',
    // iOS shadow
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    // Android
    elevation: 15
    
    },
    containerTxt: {
    display: 'flex',
    alignItems: 'flex-start',
    alignSelf: 'center',
    width: 100,
    height: 'auto',
    marginLeft: 20,
    marginTop: '3%',
    },
    titleName:{
    textAlign: 'left',
    fontWeight: '500',
    fontSize: 21,
    width: 130,
    },
    titleDesc:{
    fontWeight: '300',
    fontSize: 18,
    width: 150
    
    },
    titlePrice:{
    fontWeight: '300',
    fontSize: 12,
    },
    showPrice:{
    fontWeight: '700',
    fontSize: 21,
    width: 200
    },
    containerImg:{
    borderWidth: 0,
    borderRadius: 25,
    width: 130,
    height: 'auto',
    marginLeft: 15,
    marginVertical: "3%",

    },
    imgstyle: {
    width: 130, 
    height: 130, 
    borderRadius: 10,
    backgroundColor: '#D9D9D94D' 
    },
    title: {

    },
    conteinerIcon:{
    position: 'absolute',
    width: 20,
    height: 20,
    left: '140%',
    top: "5%",
    
    },
    favIcon:{
    width: 20,
    height: 20,
    }
})