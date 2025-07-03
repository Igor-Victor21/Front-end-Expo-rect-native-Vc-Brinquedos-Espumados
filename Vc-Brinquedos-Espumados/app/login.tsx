import Nav from "@/components/nav-bar";
import { Header } from "../components/header";
import { router } from "expo-router";
import { useState } from "react";
import { SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function Login() {
    const [email, setEmail] = useState("")
    const [pass, setPass] = useState("")

    const onPress = () => {
        router.push("/user")
    }

    

    return (
        <>
            <Header image={require("../assets/image/test-img-header.png")} />
        <View style={styles.body}>
            <View style={styles.containerButton}>
                <View style={styles.btnLogin}>
                    <TouchableOpacity style={styles.buttonLogin}>
                        <Text style={styles.btnTextLogin}>Entrar</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.btnSingUp}>
                    <TouchableOpacity style={styles.buttonSingUp}>
                        <Text style={styles.btnTextSingUp}>Cadastrar</Text>

                    </TouchableOpacity>
                </View>
            </View>
        </View>
            <View style={styles.wrapLogin}>
                <View style={styles.containerLogin}>
                    <TextInput style={styles.input} onChangeText={setEmail} value={email} placeholder="Nome de usuário ou E-mail" keyboardType="email-address" />
                    <TextInput style={styles.input} onChangeText={setPass} value={pass} placeholder="Senha" keyboardType="default" />
                    <View style={styles.wrapButton}>
                        <TouchableOpacity style={styles.button} onPress={onPress}>
                            <Text style={styles.btnText}>ENTRAR</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <Nav />
            </View>

        </>

    )
}


const styles = StyleSheet.create({
    body:{
        backgroundColor: '#2A2A2A',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    
    containerButton: {
        borderWidth: 2,
        borderColor: '#ffffff',
        color: "#ffffff",
        borderRadius: 999,
        opacity: 0.8,
        width: 250,
        marginTop: 100,
    },

    btnLogin: {

    },

    btnSingUp: {

    },

    buttonLogin: {

    },

    buttonSingUp: {

    },

    btnTextLogin: {

    },

    btnTextSingUp: {

    },
    
    wrapLogin: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2A2A2A',
        flex: 2,
        width: '100%',
        overflow: 'hidden', //impede que qualquer coisa que vaze para fora da tela 
    },

    containerLogin: {
        width: 300,
        gap: 10,
    },

    input: {
        paddingHorizontal: 10,
        paddingVertical: 15,
        backgroundColor: "#none",
        borderWidth: 2,
        borderColor: '#ffffff',
        color: "#ffffff",
        borderRadius: 999,
        opacity: 0.8,
        marginBottom: 15,
    },

    wrapButton: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },

    button: {
        alignItems: 'center',
        width: 150,
        backgroundColor: "#A7C7E7",
        paddingVertical: 15,
        borderRadius: 999,
        marginBottom: 200,
    },

    btnText: {
        color: "#ffffff",
        opacity: 0.8,
    },
})