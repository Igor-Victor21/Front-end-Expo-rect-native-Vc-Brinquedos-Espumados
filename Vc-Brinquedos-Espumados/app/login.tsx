import Nav from "@/components/nav-bar";
import { Header } from "../components/header";
import { Link, router } from "expo-router";
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
            <View style={styles.wrapLogin}>
                <Header image={require("../assets/image/test-img-header.png")} />
                <View style={styles.containerLogin}>
                    <Text>Login</Text>
                    <Text>E-mail</Text>
                    <TextInput style={styles.input} onChangeText={setEmail} value={email} placeholder="Digite seu e-mail" keyboardType="email-address" />
                    <Text>Senha</Text>
                    <TextInput style={styles.input} onChangeText={setPass} value={pass} placeholder="Digite sua senha" keyboardType="default" />
                    <View>
                        <TouchableOpacity style={styles.button} onPress={onPress}>
                            <Text style={styles.btnText}>ENTRAR</Text>
                        </TouchableOpacity>
                        <View>
                            <Link href={"/#"}>Cadastrar novo usuário</Link>
                        </View>
                    </View>
                </View>
            </View>

            <Nav />
        </>

    )
}


const styles = StyleSheet.create({
    containerLogin:{
        display: 'flex',
        alignContent: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        width: 300,
    },
    input: {
        paddingHorizontal: 10,
        paddingVertical: 3,
        backgroundColor: "#090909",
        color: "#ffffff",
        borderRadius: 999,
    },
    button: {
        backgroundColor: "#090909",
    },
    btnText: {
        color: "green",
        width: 100,
    },
    wrapLogin: {
        backgroundColor: '#2A2A2A',
        flex: 2,
    }
})