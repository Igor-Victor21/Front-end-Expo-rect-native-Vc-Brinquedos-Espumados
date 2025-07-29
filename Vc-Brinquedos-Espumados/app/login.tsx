import { apiVcEspumados } from "@/api/apiVcEspumados";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { Header } from "../components/header";

export default function Login() {
    //as variaveis  user, setUser começa com null, para não entrar ja direto com uma conta de usuário
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [user, setUser] = useState(null);
    const [message, setMessage] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [selectedTab, setSelectedTab] = useState("login");

    //campos visíveis na criação de conta
    const [fullName, setFullName] = useState("");
    const [registerEmail, setRegisterEmail] = useState("");
    const [registerPassword, setRegisterPassword] = useState("");

    //função para criar o usuário com os campos obrigatórios visíveis e o restante vazio
    const handleCreateUser = async () => {
        try {
            const body = {
                fullName,
                email: registerEmail,
                password: registerPassword,
                cpf: '',
                socialReason: '',
                stateRegistration: '',
                cnpj: '',
                cep: '',
                uf: '',
                city: '',
                neighborhood: '',
                road: '',
                numberHouse: 0,
                complement: '',
                numberPhone: '',
                dateOfBirth: ''
            };

            await apiVcEspumados.post('/users', body);
            setMessage("Usuário criado com sucesso!");
            setTimeout(() => setMessage(""), 3000);
            setSelectedTab("login");

            //limpa os campos após criar conta
            setFullName("");
            setRegisterEmail("");
            setRegisterPassword("");

        } catch (err) {
            console.error("Erro ao criar usuário:", err?.response?.data || err.message || err);
            setMessage('Erro ao criar o usuário');
            setTimeout(() => setMessage(""), 3000);
        }
    };

    //função para logar
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

            //verifica se é admin
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

    //verifica se já tem usuário logado e redireciona
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
    }, []);

    return (
        <>
            <View style={{ backgroundColor: '#e9e9e9ff' }}>
                <Header />
            </View>
            <View style={styles.btnLoginCadastrar}>
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
                {/* Tela de login */}
                {selectedTab === 'login' && (
                    <View style={styles.containerLogin}>
                        <View style={styles.inputWrapper}>
                            <Image source={require('../assets/image/Person.png')} style={styles.icon} />
                            <TextInput style={[styles.inputWithIcon, { outlineStyle: 'none' }]} value={email} onChangeText={setEmail} placeholder="Nome de usuário ou E-mail" keyboardType="email-address" placeholderTextColor="#aaaaaaff" />
                        </View>
                        <View style={styles.inputWrapper}>
                            <Image source={require('../assets/image/cadeado.png')} />
                            <TextInput style={[styles.inputWithIcon, { outlineStyle: 'none' }]} value={password} onChangeText={setPassword} placeholder="Senha" keyboardType="default" secureTextEntry={!showPassword} placeholderTextColor="#aaaaaaff" />
                            <TouchableOpacity onPress={() => setShowPassword(prev => !prev)} style={styles.eyeButton}>
                                <Image source={require("../assets/image/Eye.png")} style={{ width: 20, height: 20 }} />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.wrapButton}>
                            <TouchableOpacity style={styles.button} onPress={handleLogin}>
                                <Text style={styles.btnText}>ENTRAR</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}

                {/* Tela de cadastro */}
                {selectedTab === 'register' && (
                    <ScrollView contentContainerStyle={styles.containerLogin}>
                        <Text style={{ color: '#00000', marginLeft: 10, fontFamily: "bold", fontSize: 16 }}>Nome Completo</Text>
                        <View style={styles.inputWrapper}>
                            <TextInput style={[styles.inputWithIcon, { outlineStyle: 'none' }]} placeholder="Nome Completo" placeholderTextColor="#aaaaaaff" value={fullName} onChangeText={setFullName} />
                        </View>

                        <Text style={{ color: '#00000', marginLeft: 10, fontFamily: "bold", fontSize: 16 }}>E-mail</Text>
                        <View style={styles.inputWrapper}>
                            <Image source={require('../assets/image/Person.png')} style={styles.icon} />
                            <TextInput style={[styles.inputWithIcon, { outlineStyle: 'none' }]} placeholder="E-mail" placeholderTextColor="#aaaaaaff" value={registerEmail} onChangeText={setRegisterEmail} keyboardType="email-address" />
                        </View>

                        <Text style={{ color: '#fff', marginLeft: 10, fontFamily: "bold", fontSize: 16 }}>Senha</Text>
                        <View style={styles.inputWrapper}>
                            <Image source={require('../assets/image/cadeado.png')} />
                            <TextInput style={[styles.inputWithIcon, { outlineStyle: 'none' }]} placeholder="Senha" placeholderTextColor="#aaaaaaff" value={registerPassword} onChangeText={setRegisterPassword} secureTextEntry />
                        </View>

                        <TouchableOpacity style={styles.button} onPress={handleCreateUser}>
                            <Text style={styles.btnText}>CRIAR CONTA</Text>
                        </TouchableOpacity>
                    </ScrollView>
                )}

                {/* Mensagem de erro ou sucesso */}
                {message && (
                    <View style={styles.errorMessageContainer}>
                        <Text style={styles.errorMessageText}>{message}</Text> {/* Corrigido aqui: envolvimento com <Text> */}
                    </View>
                )}
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    btnLoginCadastrar: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#eeeeeeff',
        borderColor: '#fafafaff'
    },
    containerButton: {
        flexDirection: 'row',
        borderWidth: 2,
        borderColor: '#000000ff',
        borderRadius: 999,
        opacity: 0.8,
        width: 250,
        margin: 20,
    },
    btnContainerLeft: {
        flex: 1,
        paddingVertical: 10,
        alignItems: 'center',
        borderRadius: 999,
    },
    btnContainerRight: {
        flex: 1,
        paddingVertical: 10,
        alignItems: 'center',
        borderRadius: 999,
    },
    selectedTab: {
        backgroundColor: '#A7C7E7',
    },
    unselectedTab: {
        backgroundColor: 'transparent',
    },
    btnTextContainer: {
        color: '#000000ff',
        fontWeight: 'bold',
    },
    wrapLogin: {
        alignItems: 'center',
        backgroundColor: '#ecececff',
        flex: 2,
        width: '100%',
        overflow: 'hidden',
    },
    containerLogin: {
        paddingTop: 30,
        width: 300,
        gap: 10,
        paddingBottom: 20
    },
    inputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#000000ff',
        borderRadius: 999,
        marginBottom: 15,
        paddingHorizontal: 15,
        backgroundColor: 'transparent',
        minHeight: 50,
    },
    icon: {
        width: 22,
        height: 22,
        marginRight: 10,
    },
    inputWithIcon: {
        flex: 1,
        color: '#000000ff',
        paddingVertical: 15,
        paddingLeft: 10,
        paddingRight: 10,
    },
    eyeButton: {
        position: 'absolute',
        right: 10,
    },
    wrapButton: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        alignSelf: 'center',
        width: 150,
        backgroundColor: "#A7C7E7",
        paddingVertical: 15,
        borderRadius: 999,
        marginBottom: 100,
    },
    btnText: {
        color: "#000000ff",
        opacity: 0.8,
        alignSelf: 'center'
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
