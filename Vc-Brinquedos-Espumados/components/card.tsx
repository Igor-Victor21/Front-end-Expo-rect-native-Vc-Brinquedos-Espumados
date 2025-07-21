import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';
import { useState } from 'react';
import { StyleSheet, Text, Image, View, TouchableOpacity } from 'react-native';



interface Props{
  name: string,
  image: string,
  description: string,
  price: Number,
  id: Number,
  toast: (jaExiste: boolean) => void; 
}

export const Card = ({ name, image, description, price, id, toast } : Props)=> {
  
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
      console.log('Toast será chamado');
    }

    console.log('Chamando toast com jaExiste:', jaExiste);
    toast(jaExiste); // ← envia status do favorito
  } catch (error) {
    console.error('Erro ao favoritar produto:', error);
  }
};

    return (
        <View
      style={styles.container} // Gradiente aplicado no container inteiro
    >
      <View style={styles.containerImg}>
        <Image 
          style={styles.imgstyle}
          source={{ uri: image }}
          resizeMode='cover'
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

        <TouchableOpacity style={styles.conteinerIconfav} onPress={handleFavoriteProduct}>
          <Image style={styles.favIcon} source={require('../assets/image/favorite-test-sem-figma.png')} />
        </TouchableOpacity>
      </View> 
       <TouchableOpacity style={styles.conteinerIconcart} onPress={handleFavoriteProduct}>
          <Image style={styles.CartIcon} source={require('../assets/image/CarrinhoCards.jpg')} />
        </TouchableOpacity>
    </View> //Continuar aqui --> CarrinhoCards.jpg')}
           
            
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
      // IOS
    shadowColor: 'rgba(14, 30, 37, 1)',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.32, 
    shadowRadius: 12,     
    // Android
    elevation: 6,
    zIndex: -1,
    
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
    titleDesc: {
    fontFamily: 'Baloo-SemiBold',
    fontSize: 18,
    width: 150
},
    titlePrice:{
    fontWeight: '300',
    fontSize: 12,
    },
    showPrice: {
    fontFamily: 'Baloo-SemiBold',
    fontSize: 21,
    width: 200
    },
    containerImg:{
    borderWidth: 0,
    borderRadius: 25,
    width: 176,
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
    conteinerIconfav: {
    position: 'absolute',
    right: -79,
    top: 20,
    },
    favIcon:{

    width: 25,
    height: 25,
    }
})