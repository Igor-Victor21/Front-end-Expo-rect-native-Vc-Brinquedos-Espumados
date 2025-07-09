import { apiVcEspumados } from '@/api/apiVcEspumados';
import { Card } from '@/components/card';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { FlatList, Image, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import InfoCell from '../components/cellphoneInfo';
import Nav from '../components/nav-bar';
import InfoModal from "./modal";



type Produto = {
  id: number;
  name: string;
  description: string;
  image: string;
  price: number;
};


export default function HomeScreen() {

  const [isModalVisible, setModalVisible] = useState(false);
  const [data, setData] = useState<Produto[]>([]);
  const [showToast, setShowToast] = useState(false)
  const [messageToast, setMessageToast] = useState('')
  
  

  useEffect(() => {
    // Função verifica se o Modal ja foi visto anteriormente, se não foi visto anteriormente, criara uma chave 'hasSeenModal' com o valor 'true'
    // Não mostrando novamente ao abrir o aplicativo.
    const checkModalStatus = async () => {
      try {
        const hasSeenModal = await AsyncStorage.getItem('hasSeenModal');
        if (!hasSeenModal) {
          setModalVisible(true);
          await AsyncStorage.setItem('hasSeenModal', 'true');
        }
      } catch (error) {
        console.error('Erro ao acessar AsyncStorage:', error);
      }
    };

    const fetchData = async () => {
    // Função de fetch dos cards para pegar os dados dos produtos do backend
        try {
          const response = await apiVcEspumados.get<Produto[]>('/products');
          console.log('Dados da API:', response.data); // <--- Aqui
          setData(response.data);
        } catch (error) {
          console.error('Erro ao buscar produtos:', error);
        }
      };    

    checkModalStatus();
    fetchData();
  }, []);

  // Função do touchable(cards dos produtos) para levar o usuario para pagina do produto.
  const handleProduct = (item: Produto) => {

    console.log(item.id)
    router.push({
      pathname: '/product/[id]',
      params: { id: item.id.toString() },
    });
  };

  //Função para mostrar Toast ao clicar to Touchable do card.tsx de favorite
const showCustomToast = (jaExiste: boolean) => {
  if (!jaExiste) {
    setMessageToast('Item favoritado!');
  } else {
    setMessageToast('Este item já está favoritado!');
  }
  setShowToast(true);
  setTimeout(() => setShowToast(false), 2000);
};

  return (
      <>
      
      <InfoModal visible={isModalVisible} onClose={() => setModalVisible(false)} />
      <InfoCell/>
      {showToast && (
      <View style={styles.toastConteiner}>
        <Text style={styles.toastMessage}>{messageToast}</Text>
      </View>
      )}
      <View style={styles.Card}>
        <TouchableOpacity style={styles.UserImagePosition}>
          <Image style={styles.UserImage} source={require('../assets/image/user-test-sem-figma.png')}/>
        </TouchableOpacity>
        <Text style={styles.MessageIntro}>Bom dia Michely!</Text>
        <Text style={styles.Slogan}>Tenha momentos divertidos e únicos com seus filhos com a VC brinquedos Espumados</Text>
        <TextInput style={styles.SearchBar} placeholder='Procurar'/>
      </View>
      <Text style={styles.Text}>Nova Coleção</Text>

      <View style={styles.Bar}>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          <TouchableOpacity style={styles.Baritem}>Todos</TouchableOpacity>
          <TouchableOpacity style={styles.Baritem}>Brinquedos</TouchableOpacity>
          <TouchableOpacity style={styles.Baritem}>Kits</TouchableOpacity>
          <TouchableOpacity style={styles.Baritem}>Promoções</TouchableOpacity>
        </ScrollView>
      </View>

      <View>
                <ScrollView style={styles.conteinerCards} alwaysBounceHorizontal={true} horizontal={true}>
                <SafeAreaView style={styles.wrapCards}>
                        <FlatList
                        data={data}
                        horizontal={true}
                        style={styles.flatCards}
                        renderItem={({ item }) => (
                          <TouchableOpacity onPress={() => handleProduct(item)}  style={{ marginRight: 16 }}>
                            <Card
                            name={item.name}
                            description={item.description}
                            image={item.image}
                            price={item.price}
                            id={item.id}
                            toast={(jaExiste) => showCustomToast(jaExiste)}
                          />
                          </TouchableOpacity>
                        )}
                        keyExtractor={(item) => item.id.toString()}
                        />
                 </SafeAreaView>
              </ScrollView>
              
      </View>
      <Nav/>
      
      </>

  );
}

const styles = StyleSheet.create({
  toastConteiner:{
    position: 'absolute',
    top: 80,
    left: 20,
    right: 20,
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
   Card: {
    display: 'flex',
    paddingVertical: 20,
    paddingHorizontal: 10,
    marginBottom: 20,
    marginHorizontal: 10,
    backgroundColor: '#A7C7E7',
    borderRadius: 10
  },
  UserImagePosition: {
    width: '10%',
    right: '-90%',
  },
  UserImage:{
    width: 25,
    height: 25
  },
  MessageIntro: {
    fontWeight: 'bold',
    fontSize: 36,
    fontFamily: 'Montserrat',
    paddingTop: 45,
    paddingBottom: 5
  },
  Slogan: {
    fontSize: 15,
    fontFamily: 'Inter'
  },
  SearchBar: {
    marginTop: 40,
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 999
  },
  Text: {
    marginHorizontal: 10,
    fontWeight: 'bold',
    fontSize: 24,
    fontFamily: 'Poppins'
  },
  Bar: {
    marginHorizontal: 10,
    paddingTop: 10,
    paddingBottom: 15,
    flexDirection: 'row'
  },
  Baritem: {
    backgroundColor: 'black',
    color: 'white',
    borderRadius: 999,
    margin: 15,
    textAlign: 'center',
    width: '25%',
    padding: 5
  },
  conteinerCards:{
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'nowrap',
    height: 350,
    marginLeft: 0,
   },
   wrapCards: {
    display: 'flex'
   },
   flatCards:{
    marginLeft: 5,
   }
});