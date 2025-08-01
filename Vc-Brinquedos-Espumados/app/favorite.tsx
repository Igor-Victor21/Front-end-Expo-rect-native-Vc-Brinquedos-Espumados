import { apiVcEspumados } from '@/api/apiVcEspumados';
import { CardFav } from '@/components/cardFavorite';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import { useActionState, useEffect, useState } from 'react';
import { FlatList, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Info from '../components/cellphoneInfo';
import Nav from '../components/nav-bar';


type Produto = {
  id: number;
  name: string;
  description: string;
  image: string;
  price: number;
};


// ************ Fazer  handleRemoverStored ************




export default function CartScreen() {

const [data, setData] = useState<Produto[]>([]);
const [showToast, setShowToast] = useState(false);

useEffect(() => {
  const fetchFavoritedProducts = async () => {
    try {
      // 1. Buscar os favoritos salvos
      const stored = await AsyncStorage.getItem('favoritos');
      const favoritos: { id: number }[] = stored ? JSON.parse(stored) : [];

      if (favoritos.length === 0) {
        setData([]);
        return;
      }

      // 2. Buscar todos os produtos da API
      const response = await apiVcEspumados.get<Produto[]>('/products');

      // 3. Filtrar apenas os produtos favoritos
      const produtosFiltrados = response.data.filter(produto =>
        favoritos.some(fav => fav.id === produto.id)
      );

      setData(produtosFiltrados);
    } catch (error) {
      console.error('Erro ao carregar produtos favoritos:', error);
    }
  };

  fetchFavoritedProducts();
}, []);

const handleRemoveFavoriteProduct = async (id: number) => {
  try {
    const stored = await AsyncStorage.getItem('favoritos');
    const favoritos: { id: number, name: string }[] = stored ? JSON.parse(stored) : [];

    // Remove do array
    const atualizados = favoritos.filter(produto => produto.id !== id);

    // Salva de volta
    await AsyncStorage.setItem('favoritos', JSON.stringify(atualizados));

    // Atualiza o estado local para sumir da tela
    setData(prev => prev.filter(produto => produto.id !== id));
    setShowToast(true)
    setTimeout(() => setShowToast(false), 2000)
  } catch (error) {
    console.error('Erro ao remover favorito:', error);
  }
};

const handleProduct = (item: Produto) => {
  console.log(item.id)
  router.push({
    pathname: '/product/[id]',
    params: { id: item.id.toString() },
  });
};


  return (
      <>
      <Info/>
      {showToast && (
            <View style={styles.toastConteiner}>
              <Text style={styles.toastMessage}>Item Removido!</Text>
            </View>
            )}
      <View style={styles.conteinerTop}>
        <Text style={styles.favoriteTT}>Favoritos</Text>
        <View style={styles.conteinerItems}>
          <Text style={styles.itemsCount}>{data.length}</Text>
          <Text style={styles.itemsTxt}>item(s)</Text>
          </View>        
      </View>
      <ScrollView style={styles.productsList}>
        <View style={styles.conteinerCards}>
        <SafeAreaView style={styles.wrapCards}>
          
                <FlatList
                style={styles.cardFlatlist}
                data={data}
                numColumns={2}
                columnWrapperStyle={styles.cardRow}
                renderItem={({ item }) => (
                  <TouchableOpacity style={styles.cardBtn} onPress={() => handleProduct(item)}>
                    <CardFav
                    name={item.name}
                    description={item.description}
                    image={item.image}
                    price={item.price}
                    id={item.id}
                    onUnfavorite={handleRemoveFavoriteProduct} 
                  />
                  </TouchableOpacity>
                )}
                keyExtractor={(item) => item.id.toString()}
                />
         </SafeAreaView>
      </View>
      </ScrollView>
      <Nav/>
      </>

  );
}

const styles = StyleSheet.create({
  toastConteiner:{
    position: 'absolute',
    display: 'flex',
    alignSelf: 'center',
    top: '50%',
    // left: 20,
    // right: 20,
    backgroundColor: 'black',
    padding: 10,
    borderRadius: 10,
    zIndex: 9999,
    elevation: 9999,
    alignItems: 'center',
  },
  toastMessage:{
    color: '#fefefe'
  },
   conteinerTop: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    gap: 95,
    padding: 35
   },
   favoriteTT: {
    fontWeight: '400',
    fontSize: 21
   },
   conteinerItems:{
    display: 'flex',
    flexDirection: 'row',
    gap: 15
   },
   itemsTxt: {
    fontSize: 21
   },
   itemsCount:{
    fontWeight: 'bold',
    fontSize: 21
   },
   productsList: {
    borderWidth: 0,
    width: '100%',
    height: '70%',
    borderRadius: 10,
    // IOS
    shadowColor: 'rgba(14, 30, 37, 1)',
    shadowOffset: { width: 5, height: 2 },
    shadowOpacity: 0.32, 
    shadowRadius: 12,     
    // Android
    elevation: 6,
    zIndex: -1,
   },
   conteinerCards:{
    display: 'flex',
    alignSelf: 'auto',
    marginTop: 20,
    left: 20,
   },
   wrapCards: {
    display: 'flex',
    alignContent: 'center',
    
   },

   cardFlatlist:{
    flexGrow: 1
   },
   cardRow:{
    right: 10,
    justifyContent: 'space-between',
    paddingHorizontal: 10,

   },
   cardBtn:{
    display: 'flex',
    width: 180,
    height: 230
   }
});