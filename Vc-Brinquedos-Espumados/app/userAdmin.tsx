import { apiVcEspumados } from '@/api/apiVcEspumados';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import Nav from '../components/nav-bar';

export default function UserAdmin() {
  // Variáveis utilizadas

  // Verificar admin
  const [adminUser, setAdminUser] = useState(null);
  // Variável que armazena a lista de usuários
  const [users, setUsers] = useState([]);
  // Variável para setar os usuários no crud
  const [selectedUser, setSelectedUser] = useState(null);
  // Variável usada para modificar os dados dos usuários
  const [editData, setEditData] = useState({
    fullName: '', email: '', password: '', cpf: '', socialReason: '', stateRegistration: '', cnpj: '', cep: '', uf: '', city: '', neighborhood: '', road: '', numberHouse: 0, complement: '', numberPhone: '', dateOfBirth: ''
  });
  // Variável para criar um novo usuário
  const [newUserData, setNewUserData] = useState({
    fullName: '', email: '', password: '', cpf: '', socialReason: '', stateRegistration: '', cnpj: '', cep: '', uf: '', city: '', neighborhood: '', road: '', numberHouse: 0, complement: '', numberPhone: '', dateOfBirth: ''
  });
  // Variável para exibir os usuários
  const [showUsers, setShowUsers] = useState(false);
  // Variável para exibir as informações do usuário
  const [showInfo, setShowInfo] = useState(false);
  // Variável para exibir as informações de criar um usuário novo
  const [showCreateUser, setShowCreateUser] = useState(false);
  // Variável que armazena os erros
  const [error, setError] = useState('');

  // Variável que armazena a lista de produtos
  const [products, setProducts] = useState([]);
  // Variável para setar o produto selecionado
  const [selectedProduct, setSelectedProduct] = useState(null);
  // Variável usada para modificar os dados dos produtos
  const [editProduct, setEditProduct] = useState({
    name: '', description: '', measures: '', price: 0, image: ''
  });
  // Variável usada para criar um novo produto
  const [newProduct, setNewProduct] = useState({
    name: '', description: '', measures: '', price: 0, image: ''
  });
  // Variável que controla exibição do bloco de produtos
  const [showProducts, setShowProducts] = useState(false);
  const [showCreateProductForm, setShowCreateProductForm] = useState(false);

  // Verificar se o usuário é admin
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

  // CRUD

  // Método para buscar informações dos usuários
  const fetchUsers = async () => {
    try {
      const response = await apiVcEspumados.get('users');
      setUsers(response.data);
    } catch (err) {
      setError('Erro ao carregar usuários');
    }
  };

  // Função que seleciona o usuário para edição
  const handleUserEdit = (user) => {
    setSelectedUser(user);
    setEditData({ ...user });
  };

  // Função para editar as informações do usuário
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

  // Função para deletar o usuário
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

  // Função para sair
  const handleLogout = async () => {
    await AsyncStorage.removeItem('user');
    router.push('/login');
  };

  // Funções para alternar entre as seções (fechando as outras quando uma é aberta)
  const toggleShowInfo = () => {
    setShowInfo(!showInfo);
    setShowUsers(false);
    setShowCreateUser(false);
    setShowProducts(false);
    setShowCreateProductForm(false);
  };

  const toggleShowUsers = () => {
    setShowUsers(!showUsers);
    setShowInfo(false);
    setShowCreateUser(false);
    setShowProducts(false);
    setShowCreateProductForm(false);
    if (!showUsers) {
      fetchUsers();
    }
  };

  const toggleCreateUserForm = () => {
    setShowCreateUser(!showCreateUser);
    setShowInfo(false);
    setShowUsers(false);
    setShowProducts(false);
    setShowCreateProductForm(false);
  };

  // Função de criar usuário
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

  // [PRODUTOS] buscar todos os produtos
  const fetchProducts = async () => {
    try {
      const response = await apiVcEspumados.get('products');
      setProducts(response.data);
    } catch (err) {
      setError('Erro ao carregar produtos');
    }
  };

  // [PRODUTOS] selecionar um produto para edição
  const handleProductEdit = (product) => {
    setSelectedProduct(product);
    setEditProduct({ ...product });
  };

  // [PRODUTOS] editar as informações de um produto
  const handleUpdateProduct = async () => {
    try {
      if (!selectedProduct?.id) return;
      await apiVcEspumados.put(`/products/${selectedProduct.id}`, editProduct);
      fetchProducts();
      setSelectedProduct(null);
    } catch (err) {
      setError('Erro ao atualizar produto');
    }
  };

  // [PRODUTOS] deletar um produto
  const handleDeleteProduct = async (id) => {
    try {
      await apiVcEspumados.delete(`/products/${id}`);
      setProducts(products.filter(p => p.id !== id));
      if (selectedProduct?.id === id) setSelectedProduct(null);
    } catch (err) {
      setError('Erro ao deletar produto');
    }
  };

  // [PRODUTOS] criar um novo produto
  const handleCreateProduct = async () => {
    try {
      const body = { ...newProduct, price: Number(newProduct.price) };
      await apiVcEspumados.post('/products', body);
      fetchProducts();
      setShowCreateProductForm(false);
      setNewProduct({ name: '', description: '', measures: '', price: 0, image: '' });
    } catch (err) {
      setError('Erro ao criar produto');
    }
  };

  // [PRODUTOS] alternar exibição dos produtos
  const toggleShowProducts = () => {
    setShowProducts(!showProducts);
    setShowInfo(false);
    setShowUsers(false);
    setShowCreateUser(false);
    setShowCreateProductForm(false);
    if (!showProducts) {
      fetchProducts();
    }
  };

  const toggleShowCreateProductForm = () => {
    setShowCreateProductForm(!showCreateProductForm);
    setShowInfo(false);
    setShowUsers(false);
    setShowProducts(false);
    setShowCreateUser(false);
    if (!showCreateProductForm) {
      fetchProducts();
    }
  };

  // [PRODUTOS] labels para os campos de produto
  const productLabels = {
    name: "Nome do Produto",
    description: "Descrição",
    measures: "Medidas",
    price: "Preço",
    image: "Imagem (URL)"
  };

  return (
    <>
      {/* Botão para ver a informação do usuário */}
      <TouchableOpacity style={styles.button} onPress={toggleShowInfo}>
        <Text style={styles.buttonTxt}>{showInfo ? 'Fechar Informações' : 'Exibir Informações'}</Text>
      </TouchableOpacity>

      {/* Informações do Admin */}
      {showInfo && adminUser && (
        <View style={styles.wrapPage}>
          <Text style={styles.titleName}>Informações do Admin</Text>
          <View style={styles.itemList}>
            {Object.entries(adminUser).map(([key, value]) => {
              if (key === 'id') {
                return null;
              } else {
                return (
                  <Text key={key}>
                    <Text style={{ fontWeight: 'bold' }}>
                      {labels[key] || key}:
                    </Text> {value}
                  </Text>
                );
              }
            })}
          </View>
        </View>
      )}

      {/* Botão para exibir a lista de usuários */}
      <TouchableOpacity style={styles.button} onPress={toggleShowUsers}>
        <Text style={styles.buttonTxt}>{showUsers ? 'Ocultar Lista de Usuários' : 'Exibir Todos os Usuários'}</Text>
      </TouchableOpacity>

      {/* Lista de usuários */}
      {showUsers && (
        <ScrollView contentContainerStyle={{ padding: 20 }}>
          {selectedUser ? (
            <View style={styles.itemList}>
              <Text style={styles.titleName}>Editar Usuário</Text>
              {Object.entries(editData).map(([key, value]) => (
                key !== "id" && (
                  <View key={key} style={{ marginBottom: 8 }}>
                    <Text style={{ fontWeight: 'bold' }}>{labels[key] || key}</Text>
                    <TextInput style={styles.input} placeholder={labels[key] || key} value={String(value)} onChangeText={(text) => setEditData({ ...editData, [key]: key === "numberHouse" ? Number(text) : text })} />
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

      {/* Botão de criar novo usuário */}
      <TouchableOpacity style={styles.button} onPress={toggleCreateUserForm}>
        <Text style={styles.buttonTxt}>{showCreateUser ? 'Fechar Formulário' : 'Criar Novo Usuário'}</Text>
      </TouchableOpacity>

      {/* Formulário de criação de usuário */}
      {showCreateUser && (
        <ScrollView contentContainerStyle={{ padding: 20, flexGrow: 1 }}>
          <View style={styles.itemList}>
            <Text style={styles.titleName}>Criar Novo Usuário</Text>
            {Object.entries(newUserData).map(([key, value]) => (
              key !== "id" && (
                <View key={key} style={{ marginBottom: 8 }}>
                  <Text style={{ fontWeight: 'bold' }}>{labels[key] || key}</Text>
                  <TextInput style={styles.input} placeholder={labels[key] || key} value={String(value)} onChangeText={(text) => setNewUserData({ ...newUserData, [key]: key === "numberHouse" ? Number(text) : text })} />
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

      {/* [PRODUTOS] botão para exibir os produtos */}
      <TouchableOpacity style={styles.button} onPress={toggleShowProducts}>
        <Text style={styles.buttonTxt}>
          {showProducts ? 'Fechar Produtos' : 'Exibir Produtos'}
        </Text>
      </TouchableOpacity>

      {/* [PRODUTOS] botão para exibir formulário de criação */}
      <TouchableOpacity style={styles.button} onPress={toggleShowCreateProductForm}>
        <Text style={styles.buttonTxt}>
          {showCreateProductForm ? 'Fechar Criar Produto' : 'Criar Produto'}
        </Text>
      </TouchableOpacity>

      {/* [PRODUTOS] interface para criar novo produto */}
      {showCreateProductForm && (
        <ScrollView contentContainerStyle={{ padding: 20 }}>
          <Text style={styles.titleName}>Criar Produto</Text>
          {Object.entries(newProduct).map(([key, value]) => (
            <View key={key} style={{ marginBottom: 8 }}>
              <Text style={{ fontWeight: 'bold' }}>{productLabels[key] || key}</Text>
              <TextInput
                style={styles.input}
                placeholder={productLabels[key] || key}
                value={String(value)}
                onChangeText={(text) =>
                  setNewProduct({
                    ...newProduct,
                    [key]: key === 'price' ? Number(text) : text,
                  })
                }
              />
            </View>
          ))}
          <TouchableOpacity style={styles.button} onPress={handleCreateProduct}>
            <Text style={styles.buttonTxt}>Criar Produto</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonLogout} onPress={() => setShowCreateProductForm(false)}>
            <Text style={styles.logoutText}>Cancelar</Text>
          </TouchableOpacity>
        </ScrollView>
      )}

      {/* [PRODUTOS] interface para exibir/editar produtos */}
      {showProducts && (
        <ScrollView contentContainerStyle={{ padding: 20 }}>
          {/* Editar produto */}
          {selectedProduct && (
            <View style={styles.itemList}>
              <Text style={styles.titleName}>Editar Produto</Text>

              {editProduct.image ? (
                <Image
                  source={{ uri: editProduct.image }}
                  style={{ width: 200, height: 200, alignSelf: 'center', marginBottom: 10 }}
                />
              ) : null}

              {Object.entries(editProduct).map(([key, value]) => (
                key !== 'id' && (
                  <View key={key} style={{ marginBottom: 8 }}>
                    <Text style={{ fontWeight: 'bold' }}>{productLabels[key] || key}</Text>
                    <TextInput
                      style={styles.input}
                      placeholder={productLabels[key] || key}
                      value={String(value)}
                      onChangeText={(text) =>
                        setEditProduct({
                          ...editProduct,
                          [key]: key === 'price' ? Number(text) : text,
                        })
                      }
                    />
                  </View>
                )
              ))}
              <View style={{ flexDirection: 'row', justifyContent: 'center', gap: 10, marginTop: 10 }}>
                <TouchableOpacity style={styles.button} onPress={handleUpdateProduct}>
                  <Text style={styles.buttonTxt}>Salvar</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonLogout} onPress={() => setSelectedProduct(null)}>
                  <Text style={styles.logoutText}>Cancelar</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}

          {/* Lista de produtos */}
          {!selectedProduct &&
            products.map((p) => (
              <View key={p.id} style={styles.itemList}>
                <Text style={{ fontWeight: 'bold' }}>Produto: {p.name}</Text>
                <Text>Descrição: {p.description}</Text>
                <Text>Preço: R$ {p.price}</Text>
                <Text>Medidas: {p.measures}</Text>
                {p.image && (
                  <Image
                    source={{ uri: p.image }}
                    style={{ width: 100, height: 100, alignSelf: 'center', marginTop: 10 }}
                  />
                )}
                <View style={{ flexDirection: 'row', justifyContent: 'center', gap: 10, marginTop: 10 }}>
                  <TouchableOpacity style={styles.button} onPress={() => handleProductEdit(p)}>
                    <Text style={styles.buttonTxt}>Editar</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.buttonLogout} onPress={() => handleDeleteProduct(p.id)}>
                    <Text style={styles.logoutText}>Deletar</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
        </ScrollView>
      )}

      {/* Botão de sair */}
      <TouchableOpacity style={styles.buttonLogout} onPress={handleLogout}>
        <Text style={styles.logoutText}>Sair</Text>
      </TouchableOpacity>

      <Nav image={0} onPress={() => { }} />
    </>
  );
}

// Estilos
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