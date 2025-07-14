import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet, Text, TouchableOpacity, View, Image, ScrollView } from 'react-native';
import Info from '../components/cellphoneInfo';
import { useCart } from '../components/contexts/CartContext'; //aq importa o contexto

export default function CartScreen() {
  const { cartItems } = useCart(); // usa os itens do contexto

  const subtotal = cartItems.reduce((total, item) => total + item.price, 0);
  const total = subtotal; // Aqui pode aplicar frete, impostos, etc no futuro

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Info />

      <View style={styles.Header}>
        <TouchableOpacity onPress={() => router.push('/')}>
          <Text style={styles.Button}>⬅</Text>
        </TouchableOpacity>

        <Text style={styles.NameRoute}>Carrinho</Text>

        <View style={styles.ItemsCount}>
          <Text style={styles.NumberItem}>{cartItems.length}</Text>
          <Text> item(s)</Text>
        </View>
      </View>

      <ScrollView style={styles.ItemsWrapCard}>
        {cartItems.length === 0 ? (
          <Text style={{ textAlign: 'center', marginTop: 50 }}>Seu carrinho está vazio.</Text>
        ) : (
          cartItems.map((item, index) => (
            <View key={index} style={styles.ItemBox}>
              <Image source={{ uri: item.image }} style={styles.ItemImage} />
              <View style={styles.ItemInfo}>
                <Text style={styles.ItemName}>{item.name}</Text>
                <Text style={styles.ItemPrice}>R$ {item.price.toFixed(2)}</Text>
              </View>
            </View>
          ))
        )}
      </ScrollView>

      <View style={styles.BuyPhase}>
        <View style={styles.SubTotal}>
          <Text style={styles.SubTotalText}>Sub Total</Text>
          <Text>R$ {subtotal.toFixed(2)}</Text>
        </View>
        <View style={styles.Total}>
          <Text style={styles.TextTotal}>TOTAL</Text>
          <Text style={styles.BuyValue}>R$ {total.toFixed(2)}</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  Header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginVertical: 20
  },
  Button: {
    fontSize: 22,
  },
  NameRoute: {
    fontWeight: 'bold',
    fontSize: 18
  },
  ItemsCount: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  NumberItem: {
    fontWeight: 'bold',
    paddingRight: 5
  },
  ItemsWrapCard: {
    width: '90%',
    alignSelf: 'center',
    paddingVertical: 10,
    paddingHorizontal: 5,
    flexGrow: 1,
  },
  ItemBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    gap: 10
  },
  ItemImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
  },
  ItemInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  ItemName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  ItemPrice: {
    fontSize: 14,
    color: '#333',
  },
  BuyPhase: {
    paddingVertical: 20,
    paddingHorizontal: 20,
    marginVertical: 20
  },
  SubTotal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10
  },
  SubTotalText: {
    fontSize: 16
  },
  Total: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  TextTotal: {
    fontWeight: 'bold',
    fontSize: 16
  },
  BuyValue: {
    fontWeight: 'bold',
    fontSize: 16
  }
});
