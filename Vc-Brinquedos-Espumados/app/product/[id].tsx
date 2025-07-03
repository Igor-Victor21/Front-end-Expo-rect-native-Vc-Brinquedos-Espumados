import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { apiVcEspumados } from '@/api/apiVcEspumados';

//Criar Função de cores para aplicar no styles da pagina
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

  useEffect(() => {
    if (id) {
      apiVcEspumados
        .get(`/products/${id}`)
        .then(res => setProduct(res.data))
        .catch(err => console.error('Erro ao buscar produto:', err));
    }
  }, [id]);

  if (!product) return <Text>Carregando...</Text>;

  return (
    <ScrollView  style={styles.conteiner}>
      <View style={styles.topButtons}>
        <TouchableOpacity
          style={styles.returnBtnConteiner}
          onPress={() => router.back()}
        >
          <Text style={styles.returnBtn}>⬅</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.favIconConteiner}>
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
            <TouchableOpacity style={styles.option1}></TouchableOpacity>
            <TouchableOpacity style={styles.option2}></TouchableOpacity>
            <TouchableOpacity style={styles.option3}></TouchableOpacity>
          </View>
        </View>
      </View>

      <View style={styles.addCartBtn}>
        <TouchableOpacity style={styles.cartButton}>
          <Text style={styles.cartText}>Adicionar ao Carrinho </Text>
          <Text style={styles.cartIcon}>🛒</Text>
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
    alignItems: 'center',
    borderWidth: 2,
    borderRadius: 45,
    width: 173,
    height: 77,
    // paddingLeft: 30,
    // paddingTop: 5  
  },
  labelPrice: {
    fontSize: 16,
    fontWeight: '500',
  },
  price: {
    fontSize: 24,
    fontWeight: '600',
    
  },
  colorOptionsConteiner:{
    display: 'flex',
    justifyContent:  'center',
    alignItems: 'center',
    borderWidth: 2,
    borderRadius: 45,
    width: 173,
    height: 77,
  },
  labelColors:{
    fontSize: 20,
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
  addCartBtn: {
    alignItems: 'center',
    marginTop: 70,
    width: 340,
    alignSelf: 'center'
  },
  cartButton: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: '#4CAF50',
    padding: 15,
    width: 340,
    borderRadius: 10,
  },
  cartText: {
    color: 'white',
    fontSize: 16,
    width: 280
  },
  cartIcon:{
    borderRadius: 52,
    width: 35,
    height: 35,
    backgroundColor: '#62d15e'
  },
});