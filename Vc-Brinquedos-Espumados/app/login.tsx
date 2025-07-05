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

    //Função para realizar login 
    const handleLogin = async () => {
        //tentando buscar por todos os usuários com o mesmo email e senha
        try {
            //variavel response espera a resposta da Api apiVcEspumados dos dados dos usuários
            const response = await apiVcEspumados.get('/users');
            //variavel users recebe os dados dos usuários
            const users = response.data;
            //variavel foundUser recebe os dados dos usuários
            //e tenta encontrar dentro da api um email e uma senha igual, a que o usuário informou 
            const foundUser = users.find(
                (u) => u.email === email && u.password === password
            );
            //condiconal para quando o usuário errar o email ou senha, aparece mensagem de erro
            //deixa a mensagem de erro aparecer durante 3 segundos
            if (!foundUser) {//(!foundUser) se o usuário não for encontrado
                setMessage("Email ou senha incorretos");//exiba esta mensagem 
                setTimeout(() => setMessage(""), 3000);  //remove mensagem após 3 segundos
                return;
            }
            //caso ele passe pela condicional de email ou senha incorretos 
            //o usuário tem a permissão para acessar a rota user onde fica os dados do usuário
            await AsyncStorage.setItem('user', JSON.stringify(foundUser));
            setUser(foundUser);

            if (foundUser.email === 'igor.victorcontato@gmail.com') {
                router.push('/userAdmin');
            } else {
                router.push('/user');
            }


        } catch (error) {
            setMessage('Erro ao tentar logar: ' + (error.message || 'Erro desconhecido'));
            setTimeout(() => setMessage(""), 3000);  // Remove mensagem após 3 segundos
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
                <View style={styles.containerLogin}>
                    <TextInput style={styles.input} value={email} onChangeText={setEmail} placeholder="Nome de usuário ou E-mail" keyboardType="email-address" placeholderTextColor="#ccc" />
                    <View>
                        <TextInput style={styles.input} value={password} onChangeText={setPassword} placeholder="Senha" keyboardType="default" secureTextEntry={!showPassword} placeholderTextColor="#ccc" />
                        <TouchableOpacity onPress={() => setShowPassword(prev => !prev)}style={{position: "absolute", right: 10, top: 15,}}
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
