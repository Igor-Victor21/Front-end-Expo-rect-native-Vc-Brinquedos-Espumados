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
  const secao = e.section?.toLowerCase() || '';

  if (barContent === 1) return true; // "Todos" mostra tudo
  if (barContent === 2) return secao === 'kits';
  if (barContent === 3) return secao === 'promocoes';

  return false;
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
    source={require('../assets/image/header-bg.png')} // Coloque aqui uma imagem parecida com o Figma
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
  color: '#7DACFF', // Alterado para aparecer melhor
  fontSize: 28,
  fontFamily: 'Baloo-SemiBold',
  marginBottom: 15,
  marginTop: 20,
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
  paddingLeft: 10,
},

flatCards: {
  paddingRight: 16,
},
 headerContainer: {
  paddingHorizontal: 16,
  marginTop: 10,
  marginBottom: 20, 
},

headerBackground: {
  width: '100%',
  borderRadius: 24,
  paddingHorizontal: 20,
  paddingTop: 30,
  paddingBottom: 20, // menor altura
  backgroundColor: 'transparent',
},

userIcon: {
  position: 'absolute',
  top: 12,
  right: 12,
  backgroundColor: '#fff',
  borderRadius: 50,
  padding: 6,
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.1,
  shadowRadius: 3,
  elevation: 3,
},

userImage: {
  width: 36,
  height: 36,
  borderRadius: 18,
},

headerGreeting: {
  fontSize: 43,
  color: '#332623',
  fontFamily: 'Baloo-SemiBold',
  marginBottom: 4,
  marginTop: 40,
},

headerSubtitle: {
  fontSize: 16,
  color: '#332623',
  fontFamily: 'Baloo-SemiBold',
  marginBottom: 70,
  marginTop: -15,
},

searchBar: {
  flexDirection: 'row',
  alignItems: 'center',
  backgroundColor: '#DAE8FF',
  borderRadius: 999,
  paddingHorizontal: 16,
  paddingVertical: 15,
  borderWidth: 1.5,
  borderColor: '#332623',
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 1 },
  shadowOpacity: 0.05,
  shadowRadius: 2,
  elevation: 2,
},

searchInput: {
  flex: 1,
  fontSize: 14,
  fontFamily: 'Baloo-SemiBold',
},

searchIcon: {
  width: 20,
  height: 20,
  marginLeft: 10,
},
filterButton: {
    paddingVertical: 10,
    paddingHorizontal: 29,
    backgroundColor: '#fff',
    borderRadius: 999,
    borderWidth: 2,
    borderColor: '#7DACFF',
    marginRight: 1,
    paddingRight: -15,
    marginHorizontal: 20,
  },
  filterText: {
    color: '#003366',
    fontWeight: '600',
    fontSize: 14,
    fontFamily: 'Baloo-SemiBold',

  },
  activeFilter: {
    backgroundColor: '#7DACFF',
  },
  activeFilterText: {
    color: '#fff',
    },
});