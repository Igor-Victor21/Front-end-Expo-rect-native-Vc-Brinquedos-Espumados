import { StyleSheet } from 'react-native';
import Nav from '../components/nav-bar';
import InfoModal from "./modal";
import { useState } from 'react';

export default function HomeScreen() {

  const [isModalVisible, setModalVisible] = useState(true);
  return (
      <>
      <Nav/>
      <InfoModal visible={isModalVisible} onClose={() => setModalVisible(false)} />
      </>

  );
}

const styles = StyleSheet.create({
  
});