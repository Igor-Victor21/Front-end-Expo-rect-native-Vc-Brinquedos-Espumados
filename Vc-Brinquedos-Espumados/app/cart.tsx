import { router } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Info from '../components/cellphoneInfo';

export default function CartScreen() {

  return (
      <>
      <Info/>
      <View style={styles.Header}>
        <TouchableOpacity style={styles.Button} onPress={() => router.push("/")}>⬅</TouchableOpacity>
        <Text style={styles.NameRoute}>Carrinho</Text>
        <Text style={styles.NumberItem}>0</Text>
        <Text>item(s)</Text>
      </View>

      <View style={styles.ItemsWrapCard}>
        atumalaca
      </View>

      <View style={styles.BuyPhase}>
        <View style={styles.SubTotal}>
          <Text style={styles.SubTotalText}>Sub Total</Text>
          <Text>0</Text>
        </View>
        <View style={styles.Total}>
          <Text style={styles.TextTotal}>TOTAL</Text>
          <Text style={styles.BuyValue}>R$ 0</Text>
        </View>
      </View>
      </>
  );
}

const styles = StyleSheet.create({
  Header: {
    display: 'flex',
    flexDirection: 'row',
    paddingVertical: 20,
    paddingHorizontal: 10,
    marginVertical: 20,
    marginHorizontal: 10
  },
  Button: {
    paddingRight: 15,
    top: -5
  },
  NameRoute: {
    paddingRight: '50%',
    fontWeight: 'bold',
    fontSize: 18
  },
  NumberItem: {
    fontWeight: 'bold',
    paddingRight: 5
  },
  ItemsWrapCard: {
    borderWidth: 2,
    width: '80%',
    height: 600,
    paddingVertical: 20,
    paddingHorizontal: 20,
    marginHorizontal: 10,
    alignSelf: 'center'
  },
  BuyPhase: {
    display: 'flex',
    paddingVertical: 20,
    paddingLeft: 45,
    paddingRight: 20,
    marginVertical: 20,
    marginHorizontal: 10
  },
  SubTotal: {
    flexDirection: 'row',
    marginBottom: 10
  },
  SubTotalText: {
    paddingRight: '70%',
  },
  Total: {
    flexDirection: 'row'
  },
  TextTotal: {
    paddingRight: '68%',
    fontWeight: 'bold'
  },
  BuyValue: {
    fontWeight: 'bold'
  }
})