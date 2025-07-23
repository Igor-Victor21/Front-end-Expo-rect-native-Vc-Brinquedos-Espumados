import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState } from 'react';
import { StyleSheet, Text, Image, View, TouchableOpacity } from 'react-native';

interface Props {
  name: string;
  image: string;
  description: string;
  price: number;
  id: number;
  toast: (jaExiste: boolean) => void;
  onCartPress: () => void;
  onPress: () => void;
  toastCart: () => void;
}

export const Card = ({
  name,
  image,
  description,
  price,
  id,
  toast,
  onCartPress,
  onPress,
  toastCart,
}: Props) => {
  const [productFavorite, setProductFavorite] = useState(false);

  const handleFavoriteProduct = async () => {
    try {
      const stored = await AsyncStorage.getItem('favoritos');
      const favoritos: { id: number; name: string }[] = stored ? JSON.parse(stored) : [];

      const jaExiste = favoritos.some(produto => produto.id === id);

      if (!jaExiste) {
        const novosFavoritos = [...favoritos, { id, name }];
        await AsyncStorage.setItem('favoritos', JSON.stringify(novosFavoritos));
        setProductFavorite(true);
      }

      toast(jaExiste);
    } catch (error) {
      console.error('Erro ao favoritar produto:', error);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity activeOpacity={0.8} onPress={onPress}>
        <View>
          <View style={styles.containerImg}>
            <Image
              style={styles.imgstyle}
              source={{ uri: image }}
              resizeMode='cover'
            />
          </View>

          <View style={styles.containerTxt}>
            <View style={styles.titleRow}>
              <Text
                style={styles.titleName}
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                {name}
              </Text>
              <TouchableOpacity style={styles.iconButton} onPress={handleFavoriteProduct}>
                <Image style={styles.favIcon} source={require('../assets/image/favorite-test-sem-figma.png')} />
              </TouchableOpacity>
            </View>

            <Text style={styles.titleDesc}>{description}</Text>
            <Text style={styles.titlePrice}>Preço</Text>
            <Text style={styles.showPrice}>R$ {price.toFixed(2)}</Text>
          </View>
        </View>
      </TouchableOpacity>

      {/* Botão do carrinho */}
      <TouchableOpacity
          style={styles.conteinerIconcart}
          onPress={() => {
            onCartPress();
            toastCart(); // 👈 mostra o toast!
          }}
        >
          <Image style={styles.CartIcon} source={require('../assets/image/CarrinhoCards.jpg')} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 15,
    width: '100%',
    maxWidth: 180,
    height: 290,
    backgroundColor: '#fff',
    shadowColor: 'rgba(14, 30, 37, 1)',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.32,
    shadowRadius: 12,
    elevation: 6,
    marginBottom: 20,
  },
  containerImg: {
    width: '100%',
    height: 140,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    overflow: 'hidden',
  },
  imgstyle: {
    width: '100%',
    height: '100%',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  containerTxt: {
    padding: 10,
    flex: 1,
    justifyContent: 'space-between',
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  titleName: {
    fontWeight: '500',
    fontSize: 18,
    flex: 1,
    marginRight: 5,
  },
  iconButton: {
    padding: 4,
  },
  titleDesc: {
    fontFamily: 'Baloo-SemiBold',
    fontSize: 14,
    marginTop: 4,
  },
  titlePrice: {
    fontWeight: '300',
    fontSize: 12,
    marginTop: 6,
  },
  showPrice: {
    fontFamily: 'Baloo-SemiBold',
    fontSize: 18,
  },
  favIcon: {
    width: 22,
    height: 22,
  },
  conteinerIconcart: {
    position: 'absolute',
    bottom: 70,
    right: 10,
  },
  CartIcon: {
    width: 28,
    height: 28,
  },
});
