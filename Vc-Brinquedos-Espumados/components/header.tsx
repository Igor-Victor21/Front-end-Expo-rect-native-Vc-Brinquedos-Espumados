import { router } from "expo-router";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export const Header = () => {
    const onPress = () => {
        router.push('/')
    }

    return (
        <View style={styles.container}>
            {/* Fundo base cinza escuro */}
            <View style={styles.backgroundColor} />

            {/* Gif de fundo */}
            <Image source={require("../assets/image/gif-criancas-cubo.gif")} style={styles.backgroundGif} resizeMode="cover" />

            {/* Botão de voltar */}
            <TouchableOpacity style={styles.backButton} onPress={onPress}>
                <Image source={require("../assets/image/seta.png")} style={styles.backIcon} />
            </TouchableOpacity>

            {/* Logo central + Texto */}
            <View style={styles.centerBox}>
                <Image source={require("../assets/image/logo2.png")} style={styles.logo} resizeMode="contain" />
                <Text style={styles.subText}>Brinquedos Espumados</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        width: '100%',
        height: 270,
        position: 'relative',
        borderBottomLeftRadius: 25,
        borderBottomRightRadius: 25,
        overflow: 'hidden',
        backgroundColor: '#2A2A2A',
    },
    backgroundColor: {
        backgroundColor: '#2A2A2A',
        zIndex: 0,
    },
    backgroundGif: {
        width: '100%',
        height: '100%',
        position: 'absolute',
        zIndex: 1,
    },
    backButton: {
        position: 'absolute',
        top: 40,
        left: 15,
        zIndex: 2,
    },
    backIcon: {
        width: 24,
        height: 24,
    },
    centerBox: {
        alignItems: 'center',
        position: 'absolute',
        zIndex: 2,
    },
    logo: {
        width: 120,
        height: 120,
        alignSelf: 'center'
    },
    subText: {
        marginTop: 5,
        color: '#ffffff',
        fontSize: 20,
        fontWeight: '400',
        alignSelf: 'center'
    },
});
