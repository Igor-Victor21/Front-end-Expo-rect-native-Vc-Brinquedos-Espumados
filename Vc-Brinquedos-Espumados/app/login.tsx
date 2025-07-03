import Nav from "@/components/nav-bar";
import { Header } from "../components/header";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { apiVcEspumados } from "@/api/apiVcEspumados";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [user, setUser] = useState(null);
    const [message, setMessage] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [selectedTab, setSelectedTab] = useState("login");

    const handleLogin = async () => {
        try {
            const response = await apiVcEspumados.get('/users');
            const users = response.data;
            const foundUser = users.find(
                (u) => u.email === email && u.password === password
            );
            if (!foundUser) {
                setMessage("Email ou senha incorretos");
                setTimeout(() => setMessage(""), 3000);  // Remove mensagem após 3 segundos
                return;
            }
            await AsyncStorage.setItem('user', JSON.stringify(foundUser));
            setUser(foundUser);
            router.push('/user');
        } catch (error) {
            setMessage('Erro ao tentar logar: ' + (error.message || 'Erro desconhecido'));
            setTimeout(() => setMessage(""), 3000);  // Remove mensagem após 3 segundos
        }
    };

    useEffect(() => {
        const loadUser = async () => {
            const storedUser = await AsyncStorage.getItem('user');
            if (storedUser) {
                setUser(JSON.parse(storedUser));
                router.push('/user');
            }
        };
        loadUser();
    }, []);

    return (
        <>
            <Header image={require("../assets/image/gif-criancas-cubo.gif")} />
            <View style={styles.body}>
                <View style={styles.containerButton}>
                    <TouchableOpacity
                        style={[styles.btnContainerLeft, selectedTab === 'login' ? styles.selectedTab : styles.unselectedTab]}
                        onPress={() => setSelectedTab("login")}
                    >
                        <Text style={styles.btnTextContainer}>Entrar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.btnContainerRight, selectedTab === 'register' ? styles.selectedTab : styles.unselectedTab]}
                        onPress={() => setSelectedTab("register")}
                    >
                        <Text style={styles.btnTextContainer}>Cadastrar</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.wrapLogin}>
                <View style={styles.containerLogin}>
                    <TextInput style={styles.input} value={email} onChangeText={setEmail} placeholder="Nome de usuário ou E-mail" keyboardType="email-address" placeholderTextColor="#ccc" />
                    <View>
                        <TextInput style={styles.input} value={password} onChangeText={setPassword} placeholder="Senha" keyboardType="default" secureTextEntry={!showPassword} placeholderTextColor="#ccc" />
                        <TouchableOpacity
                            onPress={() => setShowPassword(prev => !prev)}
                            style={{
                                position: "absolute",
                                right: 10,
                                top: 15,
                            }}
                        >
                            <Text style={{ color: "#fff" }}>👁️</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.wrapButton}>
                        <TouchableOpacity style={styles.button} onPress={handleLogin}>
                            <Text style={styles.btnText}>ENTRAR</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                {message && (
                    <View style={styles.errorMessageContainer}>
                        <Text style={styles.errorMessageText}>{message}</Text>
                    </View>
                )}
                <Nav image={0} onPress={function (): void {
                    throw new Error("Function not implemented.");
                } } />
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    body: {
        backgroundColor: '#2A2A2A',
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: '#2A2A2A',
    },
    containerButton: {
        flexDirection: 'row',
        borderWidth: 2,
        borderColor: '#ffffff',
        borderRadius: 999,
        opacity: 0.8,
        width: 250,
        marginTop: 100,
    },
    btnContainerLeft: {
        flex: 1,
        paddingVertical: 10,
        alignItems: 'center',
        borderTopLeftRadius: 999,
        borderBottomLeftRadius: 999,
    },
    btnContainerRight: {
        flex: 1,
        paddingVertical: 10,
        alignItems: 'center',
        borderTopRightRadius: 999,
        borderBottomRightRadius: 999,
    },
    selectedTab: {
        backgroundColor: '#A7C7E7',
    },
    unselectedTab: {
        backgroundColor: 'transparent',
    },
    btnTextContainer: {
        color: '#ffffff',
        fontWeight: 'bold',
    },
    wrapLogin: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2A2A2A',
        flex: 2,
        width: '100%',
        overflow: 'hidden',
    },
    containerLogin: {
        width: 300,
        gap: 10,
    },
    input: {
        paddingHorizontal: 10,
        paddingVertical: 15,
        borderWidth: 2,
        borderColor: '#ffffff',
        color: "#ffffff",
        borderRadius: 999,
        opacity: 0.8,
        marginBottom: 15,
    },
    wrapButton: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        alignItems: 'center',
        width: 150,
        backgroundColor: "#A7C7E7",
        paddingVertical: 15,
        borderRadius: 999,
        marginBottom: 100,
    },
    btnText: {
        color: "#ffffff",
        opacity: 0.8,
    },
    errorMessageContainer: {
        backgroundColor: 'red',
        padding: 10,
        borderRadius: 999,
        width: 250,
        marginTop: 20,
        marginBottom: 40,
        alignSelf: 'center',
    },
    errorMessageText: {
        color: 'white',
        textAlign: 'center',
    },
});
