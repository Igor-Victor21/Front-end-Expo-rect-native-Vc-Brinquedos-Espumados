import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';
import { useState } from 'react';
import { StyleSheet, Text, Image, View, TouchableOpacity } from 'react-native';

export const Card = ({ name, image, description, price, id  } : {name: string, image: string, description: string, price : number, id: number})=> {
  
  const [productFavorite, setProductFavorite] = useState(false);

  const handleFavoriteProduct = async () => {
  try {
    // Pega os favoritos existentes
    const stored = await AsyncStorage.getItem('favoritos');
    const favoritos: { id: number, name: string }[] = stored ? JSON.parse(stored) : [];

    // Verifica se já está favoritado
    const jaExiste = favoritos.some(produto => produto.id === id);

    if (!jaExiste) {
      const novosFavoritos = [...favoritos, { id, name }];
      await AsyncStorage.setItem('favoritos', JSON.stringify(novosFavoritos));
      setProductFavorite(true);
    }
  } catch (error) {
    console.error('Erro ao favoritar produto:', error);
  }
};

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

        <TouchableOpacity style={styles.conteinerIcon} onPress={handleFavoriteProduct}>
          <Image style={styles.favIcon} source={require('../assets/image/favorite-test-sem-figma.png')} />
        </TouchableOpacity>
      </View>
    </LinearGradient>
           
            
        )
}

const styles = StyleSheet.create({
    container:{
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center',
    borderRadius: 15,
    width: 220,
    height: 290,
    
    },
    containerTxt: {
    display: 'flex',
    alignItems: 'flex-start',
    alignSelf: 'flex-start',
    width: 100,
    height: 'auto',
    marginLeft: 20,
    marginBottom: '9%',
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
    width: 180,
    height: 145,
    alignSelf: 'center',
    marginVertical: "3%",

    },
    imgstyle: {
    width: 180, 
    height: 160, 
    borderRadius: 10,
    },
    title: {

    },
    conteinerIcon:{
    position: 'absolute',
    width: 20,
    height: 20,
    left: '162%',
    top: "15%",
    // filter: 'invert(1)',
    },
    favIcon:{

    width: 25,
    height: 25,
    }
})