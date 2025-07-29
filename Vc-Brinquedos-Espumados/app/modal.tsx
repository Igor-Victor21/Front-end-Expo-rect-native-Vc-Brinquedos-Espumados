import { Image, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';


export default function InfoModal({ visible, onClose }: { visible: boolean, onClose: () => void }) {
  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
        <View style={styles.modalCloseBtn}>
            <TouchableOpacity onPress={onClose}>
                <Image style={styles.btnImg} source={require('../assets/image/arrow.png')} />
            </TouchableOpacity>
        </View>
        <View style={styles.modalContent}>  
            <Text style={styles.infoTitle}>Quem Somos?</Text>
            <Text style={styles.infoText}>
             Somos uma loja especializada na produção e venda de brinquedos 
                espumados, ideais para escolas, creches, brinquedotecas, espaços 
                recreativos e ambientes que priorizam o bem-estar das crianças. 
            </Text>
            <Text style={styles.infoTitle}>Onde Estamos?</Text>
            <Text style={styles.infoText}>
            A loja está localizada em Curitiba, Paraná, no bairro Boqueirão, mas entregamos para todo território nacional.
            </Text>
          {/* <Button title="Fechar" onPress={onClose} /> */}
        </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
    modalCloseBtn: {
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#A7C7E7',
  },
  btnImg: {
    objectFit: 'fill',
    width: 50,
    height: 32
  },
  modalContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
  },
  infoTitle: {
    fontSize: 21,
    fontWeight: '700',  
  },
  infoText: {
    textAlign: 'center',
    fontSize: 21,
    paddingTop: 20,
    marginBottom: 100,
  }
})