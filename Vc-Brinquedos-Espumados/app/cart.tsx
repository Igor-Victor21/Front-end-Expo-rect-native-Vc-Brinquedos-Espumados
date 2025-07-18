import { router } from 'expo-router';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Info from '../components/cellphoneInfo';
import { useCart } from '../components/contexts/CartContext';

export default function CartScreen() {
  const { cartItems, incrementQuantity, decrementQuantity } = useCart();

  const whatsappNumber = "5541987446352"

  const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  const total = subtotal;

  const handleZap = () => {
    const itemList = cartItems.map((item) => ` • ${item.name} x${item.quantity} = R$${(item.price * item.quantity).toFixed(2)}`).join('/n')
    const message = `Olá, gostaria de comprar o(s) seguinte(s) item(ns):
                    ${itemList}
                    \n
                    pelo valor de: R$${total.toFixed(2)}`
    const cleanMessage = encodeURIComponent(message)
    const URLzap = `https://api.whatsapp.com/send?phone=${whatsappNumber}&text=${cleanMessage}`
    window.open(URLzap, "_blank")
  }

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
          cartItems.map((item) => (
            <View key={item.id} style={styles.ItemBox}>
              <Image source={{ uri: item.image }} style={styles.ItemImage} />
              <View style={styles.ItemInfo}>
                <Text style={styles.ItemName}>{item.name}</Text>
                <Text style={styles.ItemPrice}>R$ {item.price.toFixed(2)} x {item.quantity}</Text>
                <Text style={styles.ItemPrice}>Total: R$ {(item.price * item.quantity).toFixed(2)}</Text>

                <View style={styles.QuantityControls}>
                  <TouchableOpacity onPress={() => decrementQuantity(item.id)} style={styles.QtyBtn}>
                    <Text style={styles.QtyText}>−</Text>
                  </TouchableOpacity>
                  <Text style={styles.QuantityText}>{item.quantity}</Text>
                  <TouchableOpacity onPress={() => incrementQuantity(item.id)} style={styles.QtyBtn}>
                    <Text style={styles.QtyText}>+</Text>
                  </TouchableOpacity>
                </View>
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
          <TouchableOpacity onPress={handleZap}>
            Finalizar Compra
          </TouchableOpacity>
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
  QuantityControls: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    gap: 10
  },
  QtyBtn: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center'
  },
  QtyText: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  QuantityText: {
    fontSize: 16,
    fontWeight: '600'
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

