import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { apiVcEspumados } from '@/api/apiVcEspumados';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useCart } from '@/components/contexts/CartContext';

type Produto = {
  id: number;
  name: string;
  description: string;
  image: string;
  price: number;
};

export default function ProductDetail() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [product, setProduct] = useState<Produto>();
  const [selected, setSelected] = useState(1);

  const scrollRef = useRef<ScrollView>(null);
  const { addToCart } = useCart();

  useEffect(() => {
    if (id) {
      const idNumber = Number(id);
      apiVcEspumados
        .get(`/products/${idNumber}`)
        .then(res => {
          setProduct(res.data);
          scrollRef.current?.scrollTo({ y: 0, animated: false });
        })
        .catch(err => console.error('Erro ao buscar produto:', err));
    }
  }, [id]);

  if (!product) return <Text>Carregando...</Text>;

  const handleFavoriteProduct = async () => {
    try {
      const stored = await AsyncStorage.getItem('favoritos');
      const favoritos: Produto[] = stored ? JSON.parse(stored) : [];
      const idNumber = Number(id);
      const jaExiste = favoritos.some(produto => produto.id === idNumber);
      if (!jaExiste && product) {
        const novosFavoritos = [...favoritos, product];
        await AsyncStorage.setItem('favoritos', JSON.stringify(novosFavoritos));
      }
    } catch (error) {
      console.error('Erro ao favoritar produto:', error);
    }
  };

  const handleAddToCart = () => {
    addToCart({
      id: String(product.id),
      name: product.name,
      price: product.price,
      image: product.image,
    });
    Alert.alert('Sucesso', 'Produto adicionado ao carrinho!');
  };

  return (
    <ScrollView
      ref={scrollRef}
      style={styles.container}
      contentContainerStyle={{ paddingBottom: 100 }}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.topButtons}>
        <TouchableOpacity style={styles.returnBtnConteiner} onPress={() => router.back()}>
          <Text style={styles.returnBtn}>⬅</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.favIconConteiner} onPress={handleFavoriteProduct}>
          <Image style={styles.favIcon} source={require('@/assets/image/heart.png')} />
        </TouchableOpacity>
      </View>

      <View style={styles.productTitle}>
        <Text style={styles.name}>{product.name}</Text>
        <Text style={styles.description}>{product.description}</Text>
      </View>

      <Image source={{ uri: product.image }} style={styles.productImage} />

      <View style={styles.detailsBox}>
        <View style={styles.priceContainer}>
          <Text style={styles.labelPrice}>PREÇO</Text>
          <Text style={styles.price}>R$ {product.price.toFixed(2)}</Text>
        </View>

        <View style={styles.colorOptionsContainer}>
          <Text style={styles.labelColors}>CORES</Text>
          <View style={styles.optionsRow}>
            <TouchableOpacity onPress={() => setSelected(1)} style={[styles.colorOption, styles.option1, selected === 1 && styles.selectedOption]} />
            <TouchableOpacity onPress={() => setSelected(2)} style={[styles.colorOption, styles.option2, selected === 2 && styles.selectedOption]} />
            <TouchableOpacity onPress={() => setSelected(3)} style={[styles.colorOption, styles.option3, selected === 3 && styles.selectedOption]} />
          </View>
        </View>
      </View>

      <View style={styles.addCartBtn}>
        <TouchableOpacity style={styles.cartButton} onPress={handleAddToCart}>
          <Text style={styles.cartText}>Adicionar ao Carrinho</Text>
          <View style={styles.cartIconContainer}>
            <Image style={styles.cartIcon} source={require('@/assets/image/carrinho.png')} />
          </View>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    flex: 1,
    backgroundColor: '#fff',
  },
  topButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  returnBtnConteiner: {
    borderWidth: 2,
    borderRadius: 10,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  returnBtn: { fontSize: 18 },
  favIconConteiner: {
    borderWidth: 2,
    borderRadius: 10,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  favIcon: { width: 15, height: 15 },
  productTitle: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 10,
    textAlign: 'center',
  },
  description: {
    fontSize: 12,
    color: '#000',
    letterSpacing: 2,
    marginTop: 5,
    textAlign: 'center',
  },
  productImage: {
    width: '100%',
    height: 350,
    borderRadius: 10,
    alignSelf: 'center',
    maxWidth: 350,
    marginBottom: 20,
  },
  detailsBox: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
    columnGap: 15, // substituto para "gap" no Android
    paddingHorizontal: 20,
  },
  priceContainer: {
    alignItems: 'flex-start',
    borderWidth: 2,
    borderRadius: 45,
    flex: 1,
    height: 77,
    paddingLeft: 20,
    justifyContent: 'center',
  },
  labelPrice: { fontSize: 20, fontWeight: '500' },
  price: { fontSize: 24, fontWeight: '600' },
  colorOptionsContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderRadius: 45,
    flex: 1,
    height: 77,
    paddingBottom: 15,
  },
  labelColors: { fontSize: 20, marginBottom: 15, fontWeight: '500' },
  optionsRow: {
    flexDirection: 'row',
    columnGap: 10,
  },
  option1: { backgroundColor: '#285B4A' },
  option2: { backgroundColor: '#1C3045' },
  option3: { backgroundColor: '#B07C7B' },
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
  addCartBtn: {
    alignItems: 'center',
    marginTop: 70,
    width: '100%',
    paddingHorizontal: 20,
  },
  cartButton: {
    flexDirection: 'row',
    backgroundColor: '#2A2A2A',
    width: '100%',
    maxWidth: 350,
    height: 50,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  cartText: {
    color: 'white',
    fontSize: 16,
  },
  cartIconContainer: {
    backgroundColor: "#62d15e",
    borderRadius: 50,
    width: 37,
    height: 37,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cartIcon: {
    borderRadius: 52,
    width: 25,
    height: 25,
  },
});
