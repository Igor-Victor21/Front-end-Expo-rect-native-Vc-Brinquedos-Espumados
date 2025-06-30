import { StyleSheet, Image, TouchableOpacity, Text, SafeAreaView, FlatList } from 'react-native';
import Nav from '../components/nav-bar';
import { View } from 'react-native';
import { CardFav } from '@/components/cardFavorite';
import { useEffect, useState } from 'react';
import { apiVcEspumados } from '@/api/apiVcEspumados';


type Produto = {
  id: number;
  name: string;
  description: string;
  image: string;
  price: number;
};

// Por hora: O useEffect está pegando todos  os produtos do backend
// Futuras edições: Alterar useEffect para que mostre apenas  os favoritados

export default function CartScreen() {

  const [data, setData] = useState<Produto[]>([]);

 useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await apiVcEspumados.get<Produto[]>('/products');
      console.log('Dados da API:', response.data); // <--- Aqui
      setData(response.data);
    } catch (error) {
      console.error('Erro ao buscar produtos:', error);
    }
  };

  fetchData();
}, []);

  return (
      <>
      <Nav/>
      <View style={styles.conteinerTop}>
        <Text style={styles.favoriteTT}>Favorite</Text>
        <View style={styles.conteinerItems}>
          <Text style={styles.itemsCount}>0</Text>
          <Text style={styles.itemsTxt}>item(s)</Text>
          </View>        
      </View>
      <View style={styles.conteinerCards}>
        <SafeAreaView style={styles.wrapCards}>
                <FlatList
                data={data}
                renderItem={({ item }) => (
                  <CardFav
                    name={item.name}
                    description={item.description}
                    image={item.image}
                    price={item.price}
                  />
                )}
                keyExtractor={(item) => item.id.toString()}
                />
         </SafeAreaView>

      </View>
      </>

  );
}

const styles = StyleSheet.create({
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
    gap: 10
   },
   itemsTxt: {
    fontSize: 21
   },
   itemsCount:{
    fontWeight: 'bold',
    fontSize: 21
   },
   conteinerCards:{
    display: 'flex',
    alignSelf: 'center'
   },
   wrapCards: {
    display: 'flex',
    alignContent: 'center'
   }
});