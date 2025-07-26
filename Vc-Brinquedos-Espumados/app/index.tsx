import { apiVcEspumados } from "@/api/apiVcEspumados";
import { Card } from '../components/card';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { FlatList, Image, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, ImageBackground } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import InfoCell from '../components/cellphoneInfo';
import Nav from '../components/nav-bar';
import InfoModal from "./modal";
import { useCart } from '../components/contexts/CartContext';

type CartItem = Produto & {
  quantity: number;
  id: number;
  name: string;
  description: string;
  image: string;
  price: number;
  section?: string;
};

export default function HomeScreen() {
  const [isModalVisible, setModalVisible] = useState(false);
  const [data, setData] = useState<Produto[]>([]);
  const [showToast, setShowToast] = useState(false);
  const [messageToast, setMessageToast] = useState('');
  const [barContent, setBarContent] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');

  // ✅ Aqui você obtém a função do contexto
  const { addToCart } = useCart();

  useEffect(() => {
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
      try {
        const response = await apiVcEspumados.get<Produto[]>('/products');
        setData(response.data);
      } catch (error) {
        console.error('Erro ao buscar produtos:', error);
      }
    };

    checkModalStatus();
    fetchData();
  }, []);

  const handleProduct = (item: Produto) => {
    router.push({
      pathname: '/product/[id]',
      params: { id: item.id.toString() },
    });
  };

  const produtosFiltrados = data.filter((produto) => {
    const secao = produto.section?.toLowerCase() || '';
    const nome = produto.name.toLowerCase();
    const busca = searchQuery.toLowerCase();

    const filtroCategoria = barContent === 1
      || (barContent === 2 && secao === 'kits')
     || (barContent === 3 && secao === 'promocoes');

    const filtroBusca = nome.includes(busca);

    return filtroCategoria && filtroBusca;
  });

  const showCustomToast = (jaExiste: boolean) => {
    setMessageToast(jaExiste ? 'Este item já está favoritado!' : 'Item favoritado!');
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  };

  const showCartToast = () => {
  setMessageToast('Item adicionado ao carrinho!');
  setShowToast(true);
  setTimeout(() => setShowToast(false), 2000);
  };

  return (
    <>
      <InfoModal visible={isModalVisible} onClose={() => setModalVisible(false)} />
      <InfoCell />

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
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
            <Image source={require('../assets/image/icon-search.png')} style={styles.searchIcon} />
          </View>
        </ImageBackground>
      </View>

      <Text style={styles.Text}>Nova Coleção</Text>

      <View style={styles.Bar}>
        <TouchableOpacity style={[styles.filterButton, barContent === 1 && styles.activeFilter]} onPress={() => setBarContent(1)}>
          <Text style={[styles.filterText, barContent === 1 && styles.activeFilterText]}>Todos</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.filterButton, barContent === 2 && styles.activeFilter]} onPress={() => setBarContent(2)}>
          <Text style={[styles.filterText, barContent === 2 && styles.activeFilterText]}>Kits</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.filterButton, barContent === 3 && styles.activeFilter]} onPress={() => setBarContent(3)}>
          <Text style={[styles.filterText, barContent === 3 && styles.activeFilterText]}>Promoções</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={produtosFiltrados}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: 'center', gap: 16, marginBottom: 16 }}
        contentContainerStyle={{ paddingBottom: 100 }} // pode ajustar como quiser
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={{ width: 180, marginHorizontal: 8 }}>
            <Card
              key={item.id}
              name={item.name}
              description={item.description}
              image={item.image}
              price={item.price}
              id={item.id}
              toast={showCustomToast}
              onCartPress={() =>
                addToCart({
                  id: item.id.toString(),
                  name: item.name,
                  image: item.image,
                  price: item.price,
                  section: item.section,
                })
              }
              onPress={() => handleProduct(item)}
              toastCart={showCartToast}
            />
          </View>
        )}
      />
      <Nav />
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
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  gap: 30,
  marginBottom: 20,
  paddingHorizontal: 16, // opcional
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
    height: 350,
    marginLeft: 2,
  },
 wrapCards: {
  paddingLeft: 10,
  flexWrap: "wrap",
  flexDirection: "column"
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
  width: 42, // mantém o fundo branco discreto
  height: 42,
  backgroundColor: '',
  borderRadius: 21,
  justifyContent: 'center',
  alignItems: 'center',
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.1,
  shadowRadius: 3,
  elevation: 3,
},

userImage: {
  width: 50, // agora ocupa mais espaço dentro do círculo
  height: 40,
  borderRadius: 19,
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
  marginBottom: 59,
  marginTop: -1,
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
  paddingHorizontal: 24,
  backgroundColor: '#fff',
  borderRadius: 999,
  borderWidth: 2,
  borderColor: '#7DACFF',
},
  filterText: {
    color: '#003366',
    fontWeight: '600',
    fontSize: 15,
    fontFamily: 'Baloo-SemiBold',

  },
  activeFilter: {
    backgroundColor: '#7DACFF',
  },
  activeFilterText: {
    color: '#fff',
    },
});