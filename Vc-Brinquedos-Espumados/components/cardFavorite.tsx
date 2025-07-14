import { StyleSheet, Text, Image, View, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState } from 'react';


type Props = {
  name: string;
  image: string;
  description: string;
  price: number;
  id: number;
  onUnfavorite: (id: number) => void;
};

export const CardFav = ({ name, image, description, price, id, onUnfavorite } : Props )=> {
  const [productFavorite, setProductFavorite] = useState(true);

  const handleUnfavoriteProduct = async () => {
  try {
    const stored = await AsyncStorage.getItem('favoritos');
    const favoritos: { id: number, name: string }[] = stored ? JSON.parse(stored) : [];

    const atualizados = favoritos.filter(produto => produto.id !== id);

    await AsyncStorage.setItem('favoritos', JSON.stringify(atualizados));
    setProductFavorite(false);
    onUnfavorite(id);
  } catch (error) {
    console.error('Erro ao remover favorito:', error);
  }
};
  
  return (
        <View style={styles.container}>
      <View style={styles.containerImg}>
        <Image 
          style={styles.imgstyle}
          source={{ uri: image }}
          accessibilityLabel="a"
        />
      </View>

      <View style={styles.containerTxt}>
        <Text style={styles.titleName}>{name}</Text>
        <View>
          <Text style={styles.showPrice}>R$ {price.toFixed(2)}</Text>
        </View>

        <TouchableOpacity style={styles.conteinerIcon} onPress={handleUnfavoriteProduct}>
          <Image style={styles.favIcon} source={require('../assets/image/favorite-test-sem-figma.png')} />
        </TouchableOpacity>
      </View>
    </View>
           
            
        )
}

const styles = StyleSheet.create({
    container:{
    flexDirection: 'column',
    justifyContent: 'flex-start',
    borderWidth: 0,
    borderRadius: 0,
    width: 170,
    height: 230,
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
    alignSelf: 'baseline',
    width: 100,
    height: 'auto',
    top: 30,
    marginLeft: 10,
    // marginTop: '3%',
    },
    titleName:{
    textAlign: 'left',
    fontWeight: '200',
    fontSize: 16,
    width: 130,
    color: "#010F07",
    },
    // titleDesc:{
    // fontWeight: '300',
    // fontSize: 18,
    // width: 150
    
    // },
    // titlePrice:{
    // fontWeight: '300',
    // fontSize: 12,
    // },
    showPrice:{
    fontWeight: '400',
    fontSize: 9,
    width: 200,
    top: 5,
    color: '#010F07'
    },
    containerImg:{
    borderWidth: 0,
    borderRadius: 25,
    width: 130,
    height: 'auto',
    marginLeft: 20,
    marginVertical: "3%",
    top: 25
    },
    imgstyle: {
    width: 130, 
    height: 120, 
    borderRadius: 10,
    backgroundColor: '#D9D9D94D' 
    },
    title: {

    },
    conteinerIcon:{
    position: 'absolute',
    width: 20,
    height: 20,
    left: '130%',
    top: "5%",
    
    },
    favIcon:{
    width: 20,
    height: 20,
    }
})