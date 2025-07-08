import { apiVcEspumados } from "@/api/apiVcEspumados";
import Nav from "@/components/nav-bar";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { Header } from "../components/header";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [user, setUser] = useState(null);
    const [message, setMessage] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [selectedTab, setSelectedTab] = useState("login");

    // Variável usada para criar um novo usuário
    const [newUserData, setNewUserData] = useState({
        fullName: '', email: '', password: '', cpf: '', socialReason: '', stateRegistration: '', cnpj: '', cep: '', uf: '', city: '', neighborhood: '', road: '', numberHouse: 0, complement: '', numberPhone: '', dateOfBirth: ''
    });

    // Labels para os campos do usuário
    const labels = {
        fullName: "Nome Completo",
        email: "E-mail",
        password: "Senha",
        cpf: "CPF",
        socialReason: "Razão Social",
        stateRegistration: "Inscrição Estadual",
        cnpj: "CNPJ",
        cep: "CEP",
        uf: "UF",
        city: "Cidade",
        neighborhood: "Bairro",
        road: "Rua",
        numberHouse: "Número",
        complement: "Complemento",
        numberPhone: "Telefone",
        dateOfBirth: "Data de Nascimento"
    };

    // Função para criar usuário
    const handleCreateUser = async () => {
        try {
            const body = { ...newUserData, numberHouse: Number(newUserData.numberHouse) };
            await apiVcEspumados.post('/users', body);
            setMessage("Usuário criado com sucesso!");
            setTimeout(() => setMessage(""), 3000);
            setSelectedTab("login");
            setNewUserData({
                fullName: '', email: '', password: '', cpf: '', socialReason: '', stateRegistration: '', cnpj: '', cep: '', uf: '', city: '', neighborhood: '', road: '', numberHouse: 0, complement: '', numberPhone: '', dateOfBirth: ''
            });
        } catch (err) {
            setMessage('Erro ao criar o usuário');
            setTimeout(() => setMessage(""), 3000);
        }
    };

    const handleLogin = async () => {
        try {
            const response = await apiVcEspumados.get('/users');
            const users = response.data;
            const foundUser = users.find(
                (u) => u.email === email && u.password === password
            );
            if (!foundUser) {
                setMessage("Email ou senha incorretos");
                setTimeout(() => setMessage(""), 3000);
                return;
            }
            await AsyncStorage.setItem('user', JSON.stringify(foundUser));
            setUser(foundUser);

            if (foundUser.email === 'igor.victorcontato@gmail.com') {
                router.push('/userAdmin');
            } else {
                router.push('/user');
            }

        } catch (error) {
            setMessage('Erro ao tentar logar: ' + (error.message || 'Erro desconhecido'));
            setTimeout(() => setMessage(""), 3000);
        }
    };

    useEffect(() => {
        const loadUser = async () => {
            const storedUser = await AsyncStorage.getItem('user');
            if (storedUser) {
                const parsedUser = JSON.parse(storedUser);
                setUser(parsedUser);

                if (parsedUser.email === 'igor.victorcontato@gmail.com') {
                    router.push('/userAdmin');
                } else {
                    router.push('/user');
                }
            }
        };
        loadUser();
    }, [])

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
                {selectedTab === 'login' && (
                    <View style={styles.containerLogin}>
                        <TextInput style={styles.input} value={email} onChangeText={setEmail} placeholder="Nome de usuário ou E-mail" keyboardType="email-address" placeholderTextColor="#ccc" />
                        <View>
                            <TextInput style={styles.input} value={password} onChangeText={setPassword} placeholder="Senha" keyboardType="default" secureTextEntry={!showPassword} placeholderTextColor="#ccc" />
                            <TouchableOpacity onPress={() => setShowPassword(prev => !prev)} style={{ position: "absolute", right: 10, top: 15 }}>
                                <Text style={{ color: "#fff" }}>👁️</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.wrapButton}>
                            <TouchableOpacity style={styles.button} onPress={handleLogin}>
                                <Text style={styles.btnText}>ENTRAR</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}

                {selectedTab === 'register' && (
                    <ScrollView contentContainerStyle={styles.containerLogin}>
                        {Object.entries(newUserData).map(([key, value]) => (
                            <View key={key} style={{ marginBottom: 12 }}>
                                <Text style={{ color: '#fff', marginBottom: 6, fontWeight: 'bold' }}>
                                    {labels[key] || key}
                                </Text>
                                <TextInput
                                    style={styles.input}
                                    placeholder={labels[key] || key}
                                    placeholderTextColor="#ccc"
                                    value={String(value)}
                                    onChangeText={(text) => setNewUserData({ ...newUserData, [key]: key === 'numberHouse' ? Number(text) : text })}
                                />
                            </View>
                        ))}
                        <TouchableOpacity style={styles.button} onPress={handleCreateUser}>
                            <Text style={styles.btnText}>CRIAR CONTA</Text>
                        </TouchableOpacity>
                    </ScrollView>
                )}

                {message && (
                    <View style={styles.errorMessageContainer}>
                        <Text style={styles.errorMessageText}>{message}</Text>
                    </View>
                )}
                <Nav image={0} onPress={function (): void {
                    throw new Error("Function not implemented.");
                }} />
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
        marginTop: 20,
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
        paddingBottom: 20
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
