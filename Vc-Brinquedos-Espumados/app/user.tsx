import { apiVcEspumados } from '@/api/apiVcEspumados'; // Supondo que sua API seja configurada assim
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Nav from '../components/nav-bar';

export default function User() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    //buscar o usuário do localStorage
    const storedUser = localStorage.getItem('user'); 
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      console.log("Usuário não encontrado no localStorage");
    }
  }, []);

  // função de sair e limpa o localStorage
  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    router.push('/login');
  };

  //função de deletar a conta do usuário
  const handleDeleteAccount = async () => {
    if (!user || !user.id) return;

    try {
      //chamando a Api para deletar o usuário utilizando o Id do usuário
      await apiVcEspumados.delete(`/users/${user.id}`);
      
      //depois de deletar o usuário, remove do localStorage e faz o logout
      localStorage.removeItem('user');
      setUser(null);
      router.push('/login');
      //caso não funcione, vai exibir uma mensagem para o usuário no console
    } catch (err) {
      console.error('Erro ao deletar conta:', err);
    }
  };

  //condicional se não estiver logado e tentar entrar na rota /user
  //exibe um mensagem e logo em seguida mostra um botão para voltar de  volta para o login
  if (!user) {
    return (
      <View style={styles.wrapPage}>
        <Text style={styles.titleName}>Nenhum usuário encontrado</Text>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutText}>Voltar ao Login</Text>
        </TouchableOpacity>
      </View>
    );
  }

  //informações do usuário
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
        
        {/* botão de sair */}
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutText}>Sair</Text>
        </TouchableOpacity>

        {/* botão de deletar conta */}
        <TouchableOpacity style={styles.deleteButton} onPress={handleDeleteAccount}>
          <Text style={styles.deleteText}>Deletar Conta</Text>
        </TouchableOpacity>
      </View>

      {/* nav-bar */}
      <Nav image={0} onPress={function (): void {
        throw new Error('Function not implemented.');
      }} />
    </>
  );
}

// CSS
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
  deleteButton: {
    backgroundColor: '#FF3B30',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 999,
    marginTop: 20,
  },
  deleteText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
