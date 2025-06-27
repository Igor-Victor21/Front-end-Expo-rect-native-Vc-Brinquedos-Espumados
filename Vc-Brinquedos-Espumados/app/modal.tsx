import { StyleSheet, Text, View, TouchableOpacity , Modal, Image} from 'react-native';


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
            Lorem ipsum dolor sit amet consectetur adipisicing elit. 
            Pariatur, quia? Commodi ipsam, aliquid sint vitae natus rerum provident 
            in inventore repudiandae atque libero accusantium nihil itaque eaque placeat nostrum veritatis?
            </Text>
            <Text style={styles.infoTitle}>Onde Estamos?</Text>
            <Text style={styles.infoText}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. 
            Pariatur, quia? Commodi ipsam, aliquid sint vitae natus rerum provident 
            in inventore repudiandae atque libero accusantium nihil itaque eaque placeat nostrum veritatis?
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
    backgroundColor: '#73499b',
    opacity: 1
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
    paddingTop: 20,
    marginBottom: 30,
  }
})