import { apiVcEspumados } from '@/api/apiVcEspumados';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Info from '../components/cellphoneInfo';
import { useCart } from '../components/contexts/CartContext';
import NavBar from '../components/nav-bar'; 
import { LinearGradient } from 'expo-linear-gradient';

export default function CartScreen() {
  const [user, setUser] = useState(null);
  const { cartItems, incrementQuantity, decrementQuantity } = useCart();

  const whatsappNumber = "5541987446352";
  const calcularPrecoComDesconto = (item: CartItem) => {
    const isPromocao = item.section?.toLowerCase() === 'promocoes';
    const preco = isPromocao ? item.price * 0.9 : item.price;
    return preco * item.quantity;
};

const subtotal = cartItems.reduce((total, item) => total + calcularPrecoComDesconto(item), 0);
const total = subtotal;
  const fullName = "";

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await apiVcEspumados.get(`/users/${encodeURIComponent(fullName)}`);
        setUser(res.data);
      } catch (err) {
        console.error("Erro na busca de usuário: ", err);
      }
    };
    fetchUser();
  }, [fullName]);

  const handleZap = () => {
    if (!user) {
      console.log("Carregando dados do usuário...");
      return;
    }

    const itemList = cartItems.map((item) => {
      const isPromocao = item.section?.toLowerCase() === 'promocoes';
      const precoComDesconto = isPromocao ? item.price * 0.9 : item.price;
      const totalItem = precoComDesconto * item.quantity;
      const precoOriginal = item.price * item.quantity;

      return isPromocao
        ? ` • ${item.name} x${item.quantity} = R$${totalItem.toFixed(2)} (de: R$${precoOriginal.toFixed(2)})`
        : ` • ${item.name} x${item.quantity} = R$${totalItem.toFixed(2)}`;
    }).join('\n');

    const userInfo = `Endereço: ${user.road}, ${user.numberHouse} - ${user.neighborhood}\nCidade: ${user.city} - ${user.uf}\nCEP: ${user.cep}\nComplemento: ${user.complement}`;

    const message = `Olá, sou ${user.fullname} e gostaria de comprar o(s) seguinte(s) item(ns):\n\n${itemList}\n\nque fica no valor de: R$${total.toFixed(2)}\n\nLocalização para entrega:\n${userInfo}`;
    const cleanMessage = encodeURIComponent(message);
    const URLzap = `https://api.whatsapp.com/send?phone=${whatsappNumber}&text=${cleanMessage}`;

    window.open(URLzap, "_blank");
  };

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

      {/*  PaddingBottom esta aqui para não esconder conteúdo atrás da navbar */}
      <ScrollView style={styles.ItemsWrapCard} contentContainerStyle={{ paddingBottom: 140 }}>
  {cartItems.length === 0 ? (
    <View style={styles.EmptyCart}>
      <Image source={require('../assets/image/empty-cart.png.png')} style={styles.EmptyImage} />
    </View>
  ) : (
    cartItems.map((item) => (
      <View key={item.id} style={styles.ItemBox}>
        <Image source={{ uri: item.image }} style={styles.ItemImage} />
        <View style={styles.ItemInfo}>
          <Text style={styles.ItemName}>{item.name}</Text>
          <Text style={styles.ItemPrice}>
            R$ {(item.section?.toLowerCase() === 'promocoes' ? (item.price * 0.9).toFixed(2) : item.price.toFixed(2))} x {item.quantity}
          </Text>

          <Text style={styles.ItemPrice}>
            Total: R$ {(
              (item.section?.toLowerCase() === 'promocoes'
                ? item.price * 0.9
                : item.price) * item.quantity
              ).toFixed(2)}
          </Text>

          {/* Preço original riscado se for promoção */}
          {item.section?.toLowerCase() === 'promocoes' && (
            <Text style={{ textDecorationLine: 'line-through', color: 'gray', fontSize: 12 }}>
              De: R$ {(item.price * item.quantity).toFixed(2)}
            </Text>
          )}

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
        </View>

        <View style={styles.ButtonWrapper}>
          <TouchableOpacity onPress={handleZap}>
            <LinearGradient
              colors={['#D9D9D9', '#969595']}
              start={{ x: 0, y: 0 }}
              end={{ x: 0, y: 1 }}
              style={styles.FinalizarCompraBtn}
            >
              <Text style={styles.FinalizarCompraText}>Finalizar Compra</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>

      {/* NavBar posicionada por cima do restante */}
      <NavBar />
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
  fontSize: 22,
  marginTop: 1,
  marginBottom: -1,
  textAlign: 'left',
  marginLeft: -200,
  },
  ItemsCount: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  NumberItem: {
  marginHorizontal: 4,
  color: 'black',
  fontSize: 16,
  fontFamily: 'Baloo-SemiBold',
  marginBottom: 15,
  marginTop: 20,
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
    paddingHorizontal: 20,
    paddingBottom: 100, // pra não ficar colado na navbar
    marginTop: 0,
  },
  SubTotal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  SubTotalText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  Total: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  TextTotal: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  BuyValue: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  EmptyCart: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 50,
  },
  EmptyImage: {
    width: 200,
    height: 100,
    resizeMode: 'contain',
    marginBottom: 10,
  },
  EmptyText: {
    fontSize: 16,
    color: '#555',
  },
  ButtonWrapper: {
    alignItems: 'flex-end',
  },
  FinalizarCompraBtn: {
    borderRadius: 6,
    paddingVertical: 6,
    paddingHorizontal: 10,
  },
  FinalizarCompraText: {
    color: '#007BFF',
    fontWeight: 'bold',
    fontSize: 13,
    textAlign: 'center',
  },
});