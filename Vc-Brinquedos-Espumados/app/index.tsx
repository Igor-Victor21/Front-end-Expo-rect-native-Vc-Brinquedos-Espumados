import { StyleSheet, Text, TextInput, View, TouchableOpacity, Image } from 'react-native';
import Nav from '../components/nav-bar';
import InfoModal from "./modal";
import { useState } from 'react';

export default function HomeScreen() {

  const [isModalVisible, setModalVisible] = useState(true);
  return (
      <>
      <InfoModal visible={isModalVisible} onClose={() => setModalVisible(false)} />
      <View style={styles.Card}>
        <TouchableOpacity style={styles.UserImage}>
          {/* <Image source={require('../assets/image/user-test-sem-figma.png')}/> */}
          🙋‍♂️
        </TouchableOpacity>
        <Text style={styles.MessageIntro}>Bom dia Michely!</Text>
        <Text style={styles.Slogan}>Tenha momentos divertidos e únicos com seus filhos com a VC brinquedos Espumados</Text>
        <TextInput style={styles.SearchBar} placeholder='Procurar'/>
      </View>

      <Text style={styles.Text}>Nova Coleção</Text>

      <View style={styles.Bar}>
        <TouchableOpacity style={styles.Baritem}>Todos</TouchableOpacity>
        <TouchableOpacity style={styles.Baritem}>Brinquedos</TouchableOpacity>
        <TouchableOpacity style={styles.Baritem}>Kits</TouchableOpacity>
        <TouchableOpacity style={styles.Baritem}>Promoções</TouchableOpacity>
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
  UserImage: {
    position: 'absolute',
    right: 25,
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
    marginHorizontal: 10
  },
  Baritem: {
    backgroundColor: 'black',
    color: 'white',
    borderRadius: 999,
    margin: 10,
    textAlign: 'center',
    width: '25%',
    padding: 5
  }
});