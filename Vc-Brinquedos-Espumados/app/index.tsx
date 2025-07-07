import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Nav from '../components/nav-bar';
import InfoModal from "./modal";


export default function HomeScreen() {

  const [isModalVisible, setModalVisible] = useState(false);

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

    checkModalStatus();
  }, []);

  return (
      <>
      <InfoModal visible={isModalVisible} onClose={() => setModalVisible(false)} />
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
        <Text>place holder dos cards dos items</Text>
      </View>
      <Nav/>
      </>

  );
}

const styles = StyleSheet.create({
   Card: {
    display: 'flex',
    paddingVertical: 20,
    paddingHorizontal: 10,
    marginVertical: 20,
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
    paddingBottom: 40,
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
  }
});