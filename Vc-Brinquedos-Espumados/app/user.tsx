import { apiVcEspumados } from '@/api/apiVcEspumados'; // Supondo que sua API seja configurada assim
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Nav from '../components/nav-bar';

export default function User() {
  const [user, setUser] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [editData, setEditData] = useState({});

  useEffect(() => {
    //buscar o usuário do localStorage
    const storedUser = localStorage.getItem('user'); 
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      setEditData(parsedUser);
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

  //função para atualizar os dados do usuário
  const handleUpdate = async () => {
    try {
      await apiVcEspumados.put(`/users/${user.id}`, editData);
      setUser(editData);
      localStorage.setItem('user', JSON.stringify(editData));
      setEditMode(false);
    } catch (err) {
      console.error('Erro ao atualizar usuário:', err);
    }
  };

  const labels = {
    fullName: 'Nome Completo',
    email: 'E-mail',
    password: 'Senha',
    cpf: 'CPF',
    socialReason: 'Razão Social',
    stateRegistration: 'Inscrição Estadual',
    cnpj: 'CNPJ',
    cep: 'CEP',
    uf: 'Estado',
    city: 'Cidade',
    neighborhood: 'Bairro',
    road: 'Rua',
    numberHouse: 'Número',
    complement: 'Complemento',
    numberPhone: 'Telefone',
    dateOfBirth: 'Data de Nascimento',
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
      <ScrollView contentContainerStyle={styles.wrapPage}>
        <Text style={styles.titleName}>Detalhes do Usuário</Text>

        {/* botão para editar os dados */}
        {!editMode ? (
          <TouchableOpacity style={styles.editButton} onPress={() => setEditMode(true)}>
            <Text style={styles.editText}>Editar</Text>
          </TouchableOpacity>
        ) : (
          <>
            <TouchableOpacity style={styles.saveButton} onPress={handleUpdate}>
              <Text style={styles.saveText}>Salvar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cancelButton} onPress={() => setEditMode(false)}>
              <Text style={styles.cancelText}>Cancelar</Text>
            </TouchableOpacity>
          </>
        )}

        {/* Renderizando os dados do usuário */}
        <View style={styles.itemList}>
          {Object.entries(user).map(([key, value]) => {
            if (key === 'id') return null;

            return (
              <View key={key} style={styles.itemRow}>
                <Text style={styles.label}>{labels[key] || key}:</Text>
                {editMode ? (
                  <TextInput
                    style={styles.input}
                    value={String(editData[key])}
                    onChangeText={(text) =>
                      setEditData({
                        ...editData,
                        [key]: key === 'numberHouse' ? Number(text) : text,
                      })
                    }
                  />
                ) : (
                  <Text style={styles.value}>{value}</Text>
                )}
              </View>
            );
          })}
        </View>

        {/* botões de sair e deletar conta lado a lado */}
        <View style={styles.rowButtons}>
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Text style={styles.logoutText}>Sair</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.deleteButton} onPress={handleDeleteAccount}>
            <Text style={styles.deleteText}>Deletar Conta</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* nav-bar */}
      <Nav image={0} onPress={() => {}} />
    </>
  );
}

// CSS
const styles = StyleSheet.create({
  wrapPage: {
    paddingVertical: 20,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleName: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
    alignSelf: 'center',
  },
  itemList: {
    backgroundColor: '#E0ECF8',
    borderRadius: 12,
    padding: 12,
    width: '100%',
    elevation: 2,
    marginBottom: 10,
  },
  itemRow: {
    marginBottom: 6,
  },
  label: {
    fontWeight: 'bold',
    fontSize: 13,
    color: '#333',
  },
  value: {
    fontSize: 13,
    color: '#444',
  },
  input: {
    backgroundColor: '#fff',
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#ccc',
    fontSize: 13,
    marginTop: 2,
  },
  editButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 999,
    marginBottom: 12,
  },
  editText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: 'bold',
  },
  saveButton: {
    backgroundColor: '#28a745',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 999,
    marginBottom: 8,
  },
  saveText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: 'bold',
  },
  cancelButton: {
    backgroundColor: '#6c757d',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 999,
    marginBottom: 8,
  },
  cancelText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: 'bold',
  },
  logoutButton: {
    backgroundColor: '#4B9CD3',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 999,
    marginTop: 10,
  },
  logoutText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: 'bold',
  },
  deleteButton: {
    backgroundColor: '#FF3B30',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 999,
    marginTop: 10,
  },
  deleteText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: 'bold',
  },
  rowButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 15,
    marginTop: 10,
  },
});
