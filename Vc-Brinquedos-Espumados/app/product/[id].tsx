import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { apiVcEspumados } from '@/api/apiVcEspumados';
import AsyncStorage from '@react-native-async-storage/async-storage';

//Criar Função de cores para aplicar no styles da pagina [x]
//Seguir um padrao de id? [ex: a cada id par tiver um padrao de cores, e impar tiver outro] 


type Produto = {
  id: number;
  name: string;
  description: string;
  image: string;
  price: number;
};


export default function ProductDetail() {
  const { id } = useLocalSearchParams();
  console.log('ID recebido:', id)
  const router = useRouter();
  const [product, setProduct] = useState<Produto>();
  const [selected, setSelected] = useState(1);
  


  useEffect(() => {
    if (id) {
      const idNumber = Number(id);
      apiVcEspumados
        .get(`/products/${idNumber}`)
        .then(res => setProduct(res.data))
        .catch(err => console.error('Erro ao buscar produto:', err));
    }
  }, [id]);

  if (!product) return <Text>Carregando...</Text>;

 const handleFavoriteProduct = async () => {
  try {
    // Pega os favoritos existentes
    const stored = await AsyncStorage.getItem('favoritos');
    const favoritos: Produto[] = stored ? JSON.parse(stored) : [];

    // Verifica se já está favoritado
    const idNumber = Number(id);
    const jaExiste = favoritos.some(produto => produto.id === idNumber);

    if (!jaExiste && product) {
      const novosFavoritos = [...favoritos, product];
      await AsyncStorage.setItem('favoritos', JSON.stringify(novosFavoritos));
      // setProductFavorite(true);
    }
  } catch (error) {
    console.error('Erro ao favoritar produto:', error);
  }
};

  return (
    <ScrollView  style={styles.conteiner}>
      <View style={styles.topButtons}>
        <TouchableOpacity
          style={styles.returnBtnConteiner}
          onPress={() => router.back()}
        >
          <Text style={styles.returnBtn}>⬅</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.favIconConteiner} onPress={handleFavoriteProduct}>
          <Image
            style={styles.favIcon}
            source={require('@/assets/image/heart.png')}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.productTitle}>
        <Text style={styles.name}>{product.name}</Text>
        <Text style={styles.description}>{product.description}</Text>
      </View>

      <View>
        <Image source={{ uri: product.image }} style={styles.productImage} />
      </View>

      <View style={styles.detailsBox}>
        <View style={styles.priceConteiner}>
          <Text style={styles.labelPrice}>PREÇO</Text>
          <Text style={styles.price}>R$ {product.price.toFixed(2)}</Text>
        </View>
        <View style={styles.colorOptionsConteiner}>
          <Text style={styles.labelColors}>CORES</Text>
          <View style={styles.optionsRow}>
            <TouchableOpacity
              onPress={() => setSelected(1)}
              style={[
                styles.colorOption,
                styles.option1,
                selected === 1 && styles.selectedOption
              ]}
            />
            <TouchableOpacity
              onPress={() => setSelected(2)}
              style={[
                styles.colorOption,
                styles.option2,
                selected === 2 && styles.selectedOption
              ]}
            />
            <TouchableOpacity
              onPress={() => setSelected(3)}
              style={[
                styles.colorOption,
                styles.option3,
                selected === 3 && styles.selectedOption
              ]}
            />
          </View>
        </View>
      </View>

      <View style={styles.addCartBtn}>
        <TouchableOpacity style={styles.cartButton}>
          <Text style={styles.cartText}>Adicionar ao Carrinho </Text>
          <View style={styles.cartIconConteiner}>
            <Image style={styles.cartIcon} source={require('../../assets/image/carrinho.png')}/>         {/* <Text style={styles.cartIcon}>🛒</Text> */}
        </View>
          </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  conteiner: {
   marginTop: 50
  },
  topButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: "70%"
  },
  returnBtnConteiner: {
    borderWidth: 2,
    borderRadius: 10,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  returnBtn: {
    fontSize: 18,
  },
  favIconConteiner: {
    borderWidth: 2,
    borderRadius: 10,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  favIcon: {
    width: 15,
    height: 15,
  },
  productTitle:{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 10,
  },
  description: {
    fontSize: 12,
    color: '#000',
    letterSpacing: 2 ,
    marginBottom: 20,
    marginTop: 5
  },
  productImage: {
    alignSelf: 'center',
    width: 350,
    height: 350,
    borderRadius: 10,
    marginBottom: 20,
    // iOS shadow
    shadowColor: '#000',
    shadowOffset: { width: 8, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,

    // Android shadow
    elevation: 8,
  },
  detailsBox: {
    borderWidth: 0,
    display: 'flex',
    flexDirection: 'row',
    justifyContent:  'center',
    alignItems:  'center',
    marginTop: 30,
    // marginBottom: 20,
    gap: 15
  },

  priceConteiner:{
    padding: 0,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    borderWidth: 2,
    borderRadius: 45,
    width: 173,
    height: 77,
    paddingLeft: 30,
    // paddingTop: 5  
  },
  labelPrice: {
    paddingTop: 2,
    fontSize: 20,
    fontWeight: '500',
  },
  price: {
    fontSize: 24,
    fontWeight: '600',
    
  },

  //Botão das  cores ***********************************************************************
  colorOptionsConteiner:{
    display: 'flex',
    justifyContent:  'center',
    alignItems: 'center',
    borderWidth: 2,
    borderRadius: 45,
    width: 173,
    height: 77,
    paddingBottom: 15
  },
  labelColors:{
    fontSize: 20,
    marginBottom: 15,
    fontWeight: '500',
  },
  optionsRow: {
    flexDirection: 'row',
    gap: 10,
  },
  option1: {
    width: 20,
    height: 20,
    backgroundColor: '#285B4A',
    borderRadius: 15,
  },
  option2: {
    width: 20,
    height: 20,
    backgroundColor: '#1C3045',
    borderRadius: 15,
  },
  option3: {
    width: 20,
    height: 20,
    backgroundColor: '#B07C7B',
    borderRadius: 15,
  },

colorOption: {
  width: 20,
  height: 20,
  borderRadius: 15,
  borderWidth: 2,
  borderColor: 'transparent',
},

selectedOption: {
  borderColor: '#333',
  borderWidth: 2,
  transform: [{ scale: 1.2 }],
},


  // Botão De Adicionar ao carrinho ***********************************************************************
  addCartBtn: {
    alignItems: 'center',
    marginTop: 70,
    width: 340,
    alignSelf: 'center'
  },
  cartButton: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: '#2A2A2A',
    padding: 0,
    width: 350,
    height: 50,
    borderRadius: 40,
  },
  cartText: {
    color: 'white',
    fontSize: 16,
    width: 280,
    marginTop:4,
    padding: 9
  },
  cartIconConteiner:{
    alignSelf: 'center',
    justifyContent: 'center',
    backgroundColor: "#62d15e",
    borderRadius: 50,
    width: 37,
    height: 37,
    marginTop:0,
    marginLeft: 20,
    padding: 5,
    // iOS shadow
    shadowColor: '#D9D9D9',
    shadowOffset: {
      width: 0,
      height: -5,
    },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    // Android
    elevation: 15
  },
  cartIcon:{
    borderRadius: 52,
    width: 25,
    height: 25,
  },
  
});