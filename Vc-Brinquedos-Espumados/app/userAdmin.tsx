import { apiVcEspumados } from '@/api/apiVcEspumados';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import Nav from '../components/nav-bar';

export default function UserAdmin() {
  const [adminUser, setAdminUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [editData, setEditData] = useState({
    fullName: '', email: '', password: '', cpf: '', socialReason: '', stateRegistration: '', cnpj: '', cep: '', uf: '', city: '', neighborhood: '', road: '', numberHouse: 0, complement: '', numberPhone: '', dateOfBirth: ''
  });
  const [newUserData, setNewUserData] = useState({
    fullName: '', email: '', password: '', cpf: '', socialReason: '', stateRegistration: '', cnpj: '', cep: '', uf: '', city: '', neighborhood: '', road: '', numberHouse: 0, complement: '', numberPhone: '', dateOfBirth: ''
  });
  const [showUsers, setShowUsers] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [showCreateUser, setShowCreateUser] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const checkAdmin = async () => {
      const storedUser = await AsyncStorage.getItem("user");
      if (!storedUser) {
        router.push("/login");
        return;
      }
      const user = JSON.parse(storedUser);
      if (user.email !== "igor.victorcontato@gmail.com") {
        router.push("/user");
      } else {
        setAdminUser(user);
        fetchUsers();
      }
    };
    checkAdmin();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await apiVcEspumados.get('users');
      setUsers(response.data);
    } catch (err) {
      setError('Erro ao carregar usuários');
    }
  };

  const handleUserEdit = (user) => {
    setSelectedUser(user);
    setEditData({ ...user });
  };

  const handleUpdate = async () => {
    try {
      if (!selectedUser?.id) return;
      await apiVcEspumados.put(`/users/${selectedUser.id}`, editData);
      fetchUsers();
      setSelectedUser(null);
    } catch (err) {
      setError('Erro ao atualizar o usuário');
    }
  };

  const handleDelete = async (id) => {
    if (!id) return;
    try {
      await apiVcEspumados.delete(`/users/${id}`);
      setUsers(users.filter((u) => u.id !== id));
      if (selectedUser?.id === id) setSelectedUser(null);
    } catch (err) {
      setError('Erro ao deletar o usuário');
    }
  };

  const handleLogout = async () => {
    await AsyncStorage.removeItem('user');
    router.push('/login');
  };

  const toggleShowUsers = () => {
    setShowUsers(!showUsers);
    if (!showUsers) {
      setShowInfo(false);
      setShowCreateUser(false);
    }
  };

  const toggleShowInfo = () => {
    setShowInfo(!showInfo);
    if (!showInfo) {
      setShowUsers(false);
      setShowCreateUser(false);
    }
  };

  const toggleCreateUserForm = () => {
    setShowCreateUser(!showCreateUser);
    if (!showCreateUser) {
      setShowUsers(false);
      setShowInfo(false);
    }
  };

  const handleCreateUser = async () => {
    try {
      const body = { ...newUserData, numberHouse: Number(newUserData.numberHouse) };
      await apiVcEspumados.post('/users', body);
      fetchUsers();
      setShowCreateUser(false);
      setNewUserData({
        fullName: '', email: '', password: '', cpf: '', socialReason: '', stateRegistration: '', cnpj: '', cep: '', uf: '', city: '', neighborhood: '', road: '', numberHouse: 0, complement: '', numberPhone: '', dateOfBirth: ''
      });
    } catch (err) {
      setError('Erro ao criar o usuário');
    }
  };

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

  return (
    <>
      <TouchableOpacity style={styles.button} onPress={toggleShowInfo}>
        <Text style={styles.buttonTxt}>{showInfo ? 'Fechar Informações' : 'Exibir Informações'}</Text>
      </TouchableOpacity>

      {showInfo && adminUser && (
        <View style={styles.wrapPage}>
          <Text style={styles.titleName}>Informações do Admin</Text>
          <View style={styles.itemList}>
            {Object.entries(adminUser).map(([key, value]) => (
              key !== 'id' && (
                <Text key={key}>
                  <Text style={{ fontWeight: 'bold' }}>{labels[key] || key}:</Text> {value}
                </Text>
              )
            ))}
          </View>
        </View>
      )}

      <TouchableOpacity style={styles.button} onPress={toggleShowUsers}>
        <Text style={styles.buttonTxt}>{showUsers ? 'Ocultar Lista de Usuários' : 'Exibir Todos os Usuários'}</Text>
      </TouchableOpacity>

      {showUsers && (
        <ScrollView contentContainerStyle={{ padding: 20 }}>
          {selectedUser ? (
            <View style={styles.itemList}>
              <Text style={styles.titleName}>Editar Usuário</Text>
              {Object.entries(editData).map(([key, value]) => (
                key !== "id" && (
                  <View key={key} style={{ marginBottom: 8 }}>
                    <Text style={{ fontWeight: 'bold' }}>{labels[key] || key}</Text>
                    <TextInput
                      style={styles.input}
                      placeholder={labels[key] || key}
                      value={String(value)}
                      onChangeText={(text) =>
                        setEditData({ ...editData, [key]: key === "numberHouse" ? Number(text) : text })
                      }
                    />
                  </View>
                )
              ))}
              <View style={{ flexDirection: 'row', justifyContent: 'center', gap: 10, marginTop: 10 }}>
                <TouchableOpacity style={styles.button} onPress={handleUpdate}><Text style={styles.buttonTxt}>Salvar</Text></TouchableOpacity>
                <TouchableOpacity style={styles.buttonLogout} onPress={() => setSelectedUser(null)}><Text style={styles.logoutText}>Cancelar</Text></TouchableOpacity>
              </View>
            </View>
          ) : users.map((u) => (
            <View key={u.id} style={styles.itemList}>
              <Text style={{ fontWeight: 'bold' }}>Usuário: {u.fullName}</Text>
              <Text>Email: {u.email}</Text>
              <Text>CPF: {u.cpf}</Text>
              <Text>Cidade: {u.city}</Text>
              <View style={{ flexDirection: 'row', justifyContent: 'center', gap: 10, marginTop: 10 }}>
                <TouchableOpacity style={styles.button} onPress={() => handleUserEdit(u)}><Text style={styles.buttonTxt}>Editar</Text></TouchableOpacity>
                <TouchableOpacity style={styles.buttonLogout} onPress={() => handleDelete(u.id)}><Text style={styles.logoutText}>Deletar</Text></TouchableOpacity>
              </View>
            </View>
          ))}
        </ScrollView>
      )}

      <TouchableOpacity style={styles.button} onPress={toggleCreateUserForm}>
        <Text style={styles.buttonTxt}>{showCreateUser ? 'Fechar Formulário' : 'Criar Novo Usuário'}</Text>
      </TouchableOpacity>

      {showCreateUser && (
        <ScrollView contentContainerStyle={{ padding: 20, flexGrow: 1 }}>
          <View style={styles.itemList}>
            <Text style={styles.titleName}>Criar Novo Usuário</Text>
            {Object.entries(newUserData).map(([key, value]) => (
              key !== "id" && (
                <View key={key} style={{ marginBottom: 8 }}>
                  <Text style={{ fontWeight: 'bold' }}>{labels[key] || key}</Text>
                  <TextInput
                    style={styles.input}
                    placeholder={labels[key] || key}
                    value={String(value)}
                    onChangeText={(text) =>
                      setNewUserData({ ...newUserData, [key]: key === "numberHouse" ? Number(text) : text })
                    }
                  />
                </View>
              )
            ))}
            <View style={{ flexDirection: 'row', justifyContent: 'center', gap: 10, marginTop: 10 }}>
              <TouchableOpacity style={styles.button} onPress={handleCreateUser}><Text style={styles.buttonTxt}>Criar Usuário</Text></TouchableOpacity>
              <TouchableOpacity style={styles.buttonLogout} onPress={toggleCreateUserForm}><Text style={styles.logoutText}>Cancelar</Text></TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      )}

      <TouchableOpacity style={styles.buttonLogout} onPress={handleLogout}>
        <Text style={styles.logoutText}>Sair</Text>
      </TouchableOpacity>

      <Nav image={0} onPress={() => { }} />
    </>
  );
}

const styles = StyleSheet.create({
  wrapPage: {
    display: 'flex',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop: 20,
  },
  titleName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    alignSelf: 'center'
  },
  itemList: {
    backgroundColor: '#A7C7E7',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    backgroundColor: '#fff',
    marginTop: 4
  },
  buttonTxt: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
    alignSelf: 'center',
    marginVertical: 10,
  },
  buttonLogout: {
    backgroundColor: '#FF3B30',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
    alignSelf: 'center',
    marginVertical: 10,
  },
  logoutText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
