import { apiVcEspumados } from '@/api/apiVcEspumados'; // Supondo que sua API seja configurada assim
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Nav from '../components/nav-bar';

export default function User() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user'); // Buscar o usuário do localStorage
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      console.log("Usuário não encontrado no localStorage");
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    router.push('/login');
  };

  const handleDeleteAccount = async () => {
    if (!user || !user.id) return;

    try {
      // Chamada para API DELETE para excluir o usuário do banco de dados
      await apiVcEspumados.delete(`/users/${user.id}`);
      
      // Depois de deletar o usuário, remove do localStorage e faz o logout
      localStorage.removeItem('user');
      setUser(null);
      router.push('/login');
    } catch (err) {
      console.error('Erro ao deletar conta:', err);
    }
  };

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

        {/* Botão de Deletar Conta */}
        <TouchableOpacity style={styles.deleteButton} onPress={handleDeleteAccount}>
          <Text style={styles.deleteText}>Deletar Conta</Text>
        </TouchableOpacity>
      </View>

      <Nav image={0} onPress={function (): void {
        throw new Error('Function not implemented.');
      }} />
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
