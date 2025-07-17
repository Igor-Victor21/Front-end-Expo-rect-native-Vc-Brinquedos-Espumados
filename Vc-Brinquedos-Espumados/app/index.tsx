import { apiVcEspumados } from "@/api/apiVcEspumados";
import { Card } from '../components/card';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { FlatList, Image, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import InfoCell from '../components/cellphoneInfo';
import Nav from '../components/nav-bar';
import InfoModal from "./modal";
import { ImageBackground } from 'react-native';
import { useFonts } from 'expo-font';


type Produto = {
  id: number;
  name: string;
  description: string;
  image: string;
  price: number;
};


export default function HomeScreen() {

const [fontsLoaded] = useFonts({
  'Baloo-SemiBold': require('../assets/fonts/Baloo2-SemiBold.ttf'),
});

if (!fontsLoaded) {
  return null;
}
  const [isModalVisible, setModalVisible] = useState(false);
  const [data, setData] = useState<Produto[]>([]);
  const [showToast, setShowToast] = useState(false)
  const [messageToast, setMessageToast] = useState('')
  const [barContent, setBarContent] = useState(1)
  
  

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
    // const separateData = async () => {}
    //   separateData();
  }, []);

  // Função do touchable(cards dos produtos) para levar o usuario para pagina do produto.
  const handleProduct = (item: Produto) => {

    console.log(item.id)
    router.push({
      pathname: '/product/[id]',
      params: { id: item.id.toString() },
    });
  };


const produtosFiltrados = data.filter((e) => {
  if (barContent === 1) {
    return e.description.trim() === "";
  } else if (barContent === 2) {
    return e.description.includes("|");
  } else {
    return e.description.trim() !== "" && !e.description.includes("|");
  }
});

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
      <View style={styles.headerContainer}>
  <ImageBackground
    source={require('../assets/image/header-bg.png')}
    style={styles.headerBackground}
    imageStyle={{ borderRadius: 20 }}
  >
    <TouchableOpacity style={styles.userIcon}>
      <Image style={styles.userImage} source={require('../assets/image/user-test-sem-figma.png')} />
    </TouchableOpacity>

    <Text style={styles.headerGreeting}>Bom dia Michely!</Text>
    <Text style={styles.headerSubtitle}>Brinquedos Espumados & Acessórios VC Store</Text>

    <View style={styles.searchBar}>
      <TextInput
        placeholder="Procurar"
        style={styles.searchInput}
        placeholderTextColor="#999"
      />
      <Image source={require('../assets/image/icon-search.png')} style={styles.searchIcon} />
    </View>
  </ImageBackground>
</View>
      <Text style={styles.Text}>Nova Coleção</Text>

      <View style={styles.Bar}>
        {/* <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}> */}
          <TouchableOpacity
  style={[styles.filterButton, barContent === 1 && styles.activeFilter]}
  onPress={() => setBarContent(1)}
>
  <Text style={[styles.filterText, barContent === 1 && styles.activeFilterText]}>Todos</Text>
</TouchableOpacity>
<TouchableOpacity
  style={[styles.filterButton, barContent === 2 && styles.activeFilter]}
  onPress={() => setBarContent(2)}
>
  <Text style={[styles.filterText, barContent === 2 && styles.activeFilterText]}>Kits</Text>
</TouchableOpacity>
<TouchableOpacity
  style={[styles.filterButton, barContent === 3 && styles.activeFilter]}
  onPress={() => setBarContent(3)}
>
  <Text style={[styles.filterText, barContent === 3 && styles.activeFilterText]}>Promoções</Text>
</TouchableOpacity>

        {/* </ScrollView> */}
      </View>

      <View>
                <ScrollView style={styles.conteinerCards} alwaysBounceHorizontal={true} horizontal={true}>
                <SafeAreaView style={styles.wrapCards}>
                        <FlatList
                        data={produtosFiltrados}
                        horizontal={true}
                        style={styles.flatCards}
                        renderItem={({ item }) => (
                          <TouchableOpacity onPress={() => handleProduct(item)}  style={{ marginRight: 16 }}>
                            <Card
                            key={item.id}
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
    marginHorizontal: 15,
    color: '#7DACFF',
    fontSize: 30,
    fontFamily: 'Baloo-SemiBold'
    
  },
  Bar: {
  marginHorizontal: 10,
  paddingTop: 10,
  paddingBottom: 15,
  flexDirection: 'row',
  justifyContent: 'center', //  centraliza horizontalmente
  gap: 11, // opcional (se versão do React Native suporte)
},
  Baritem: {
    backgroundColor: '#7DACFF',
    borderRadius: 999,
    margin: 15,
    width: '25%',
    padding: 10,
    marginBottom: 5
  },
  textBtn:{
    color: 'white',
    alignSelf: 'center',
    
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
  },
   headerContainer: {
    paddingHorizontal: 10,
    marginTop: 10,
  },
  headerBackground: {
    width: '100%',
    borderRadius: 24,
    padding: 60,
    //shadowColor: '#000',
    //shadowOpacity: 0.15,
    //shadowRadius: 10,
    position: 'relative',
    backgroundColor: 'transparent',
  },
  userIcon: {
    position: 'absolute',
    top: 15,
    right: 15,
    backgroundColor: '#fff',
    padding: 8,
    borderRadius: 40,
  },
  userImage: {
    width: 30,
    height: 30,
  },
  headerGreeting: {
  fontSize: 38,
  color: '#332623',
  marginTop: 3,
  fontFamily: 'Baloo-SemiBold',
  textAlign: 'center',
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#332623',
    marginBottom: 57,
    fontFamily: 'Baloo-SemiBold',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#DAE8FF',
    borderRadius: 200,
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderWidth: 2,
    borderColor: '#332623',
  },
  searchInput: {
    flex: 1,
    paddingVertical: 6,
    fontSize: 14,
  },
  searchIcon: {
    width: 20,
    height: 20,
    marginLeft: 10,
  },
 filterButton: {
  borderWidth: 2, // borda mais grossa
  borderColor: '#7DACFF',
  borderRadius: 20,
  paddingVertical: 8,
  paddingHorizontal: 20,
  marginHorizontal: 6,
  minWidth: 100, //  largura mínima
  alignItems: 'center',
},
  filterText: {
    color: '#7DACFF',
    fontFamily: 'Baloo-SemiBold',
    fontSize: 14,
    letterSpacing: 1.5, // aumenta o espaço entre letras
  },
  activeFilter: {
    backgroundColor: '#7DACFF',
  },
  activeFilterText: {
    color: '#fff',
  },
});