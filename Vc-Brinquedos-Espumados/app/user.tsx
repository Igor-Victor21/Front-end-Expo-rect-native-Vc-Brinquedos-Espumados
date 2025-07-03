import { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Nav from '../components/nav-bar';
import { router } from 'expo-router';

export default function User() {
  //as variaveis  user, setUser começa com null, para não entrar ja direto com uma conta de usuário 
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');  // Buscar o usuário do localStorage
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      console.log("Usuário não encontrado no localStorage");
    }
  }, []);

  // Função para lidar com o logout
  const handleLogout = () => {
    localStorage.removeItem('user');  // Limpa o usuário do localStorage
    setUser(null);  // Limpa o estado local do usuário
    router.push('/login');  // Redireciona para a página de login
  };

  if (!user) {
    return (
      <View style={styles.wrapPage}>
        <Text style={styles.titleName}>Nenhum usuário encontrado</Text>
      </View>
    );
  }

  return (
    <>
      <View style={styles.wrapPage}>
        <Text style={styles.titleName}>Detalhes do Usuário</Text>
        {/* Renderizando os dados do usuário */}
        <View style={styles.itemList}>
          <Text>Nome Completo: {user.fullName}</Text>
          <Text>E-mail: {user.email}</Text>
          <Text>Senha: {user.password}</Text>
          <Text>CPF: {user.cpf}</Text>
          <Text>Razão Social: {user.socialReason}</Text>
          <Text>Registro Estadual: {user.stateRegistration}</Text>
          <Text>CNPJ: {user.cnpj}</Text>
          <Text>CEP: {user.cep}</Text>
          <Text>Estado: {user.uf}</Text>
          <Text>Cidade: {user.city}</Text>
          <Text>Bairro: {user.neighborhood}</Text>
          <Text>Rua: {user.road}</Text>
          <Text>Número da Residência: {user.numberHouse}</Text>
          <Text>Complemento: {user.complement}</Text>
          <Text>Telefone: {user.numberPhone}</Text>
          <Text>Data de nascimento: {user.dateOfBirth}</Text>
        </View>
        
        {/* Botão de Sair */}
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutText}>Sair</Text>
        </TouchableOpacity>
      </View>

      <Nav />
    </>
  );
}

const styles = StyleSheet.create({
  wrapPage: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 10,
  },
  titleName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  itemList: {
    backgroundColor: '#A7C7E7',
    borderRadius: 10,
    padding: 15,
    marginVertical: 8,
  },
  logoutButton: {
    backgroundColor: '#A7C7E7',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 999,
    marginTop: 20,
  },
  logoutText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
