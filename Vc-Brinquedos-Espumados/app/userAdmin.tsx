import { apiVcEspumados } from '@/api/apiVcEspumados';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, Alert } from "react-native";
import Nav from '../components/nav-bar';

type Produto = {
  id: number;
  name: string;
  description: string;
  image: string;
  price: number;
  section: string; // 👈 adiciona isso
};

export default function UserAdmin() {
  //variáveis utilizadas

  //verificar admin
  const [adminUser, setAdminUser] = useState(null);
  //variável que armazena a lista de usuários
  const [users, setUsers] = useState([]);
  //variável para setar os usuários no crud
  const [selectedUser, setSelectedUser] = useState(null);
  //variável usada para modificar os dados dos usuários
  const [editData, setEditData] = useState({
    fullName: '', email: '', password: '', cpf: '', socialReason: '', stateRegistration: '', cnpj: '', cep: '', uf: '', city: '', neighborhood: '', road: '', numberHouse: 0, complement: '', numberPhone: '', dateOfBirth: ''
  });
  //variável para criar um novo usuário
  const [newUserData, setNewUserData] = useState({
    fullName: '', email: '', password: '', cpf: '', socialReason: '', stateRegistration: '', cnpj: '', cep: '', uf: '', city: '', neighborhood: '', road: '', numberHouse: 0, complement: '', numberPhone: '', dateOfBirth: ''
  });
  //variável para exibir os usuários
  const [showUsers, setShowUsers] = useState(false);
  //variável para exibir as informações do usuário
  const [showInfo, setShowInfo] = useState(false);
  //variável para exibir as informações de criar um usuário novo
  const [showCreateUser, setShowCreateUser] = useState(false);
  //variável que armazena os erros
  const [error, setError] = useState('');

  //variável que armazena a lista de produtos
  const [products, setProducts] = useState([]);
  //variável para setar o produto selecionado
  const [selectedProduct, setSelectedProduct] = useState(null);
  //variável usada para criar um novo produto
  const [newProduct, setNewProduct] = useState<Product>({
    name: '',
    description: '',
    measures: '',
    price: 0,
    image: '',
    section: '',
  });
    //variável usada para modificar os dados dos produtos
  const [editProduct, setEditProduct] = useState<Product | null>(null);

  //variável que controla exibição do bloco de produtos
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

  //método para buscar informações dos usuários
  const fetchUsers = async () => {
    try {
      const response = await apiVcEspumados.get('users');
      setUsers(response.data);
    } catch (err) {
      setError('Erro ao carregar usuários');
    }
  };

  //função que seleciona o usuário para edição
  const handleUserEdit = (user) => {
    setSelectedUser(user);
    setEditData({ ...user });
  };

  //função para editar as informações do usuário
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

  //função para sair
  const handleLogout = async () => {
    await AsyncStorage.removeItem('user');
    router.push('/login');
  };

  //funções para alternar entre as seções (fechando as outras quando uma é aberta)
  const toggleShowInfo = () => {
    setShowInfo(!showInfo);
    setShowUsers(false);
    setShowCreateUser(false);
    setShowProducts(false);
    setShowCreateProductForm(false);
  };
  //fução de quando aperta para ver os usuários os outros botões iram fechar 
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

  //função de quando aperta no botão de criar usuário fecha todos os outros botões
  const toggleCreateUserForm = () => {
    setShowCreateUser(!showCreateUser);
    setShowInfo(false);
    setShowUsers(false);
    setShowProducts(false);
    setShowCreateProductForm(false);
  };

  //função de criar usuário
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

  //labels para os campos do usuário
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

  // buscar todos os produtos
  const fetchProducts = async () => {
    try {
      const response = await apiVcEspumados.get('products');
      setProducts(response.data);
    } catch (err) {
      setError('Erro ao carregar produtos');
    }
  };

  // selecionar um produto para edição
  const handleProductEdit = (product) => {
    setSelectedProduct(product);
    setEditProduct({ ...product });
  };

  // editar as informações de um produto
  const handleUpdateProduct = async () => {
  if (!editProduct || !editProduct.id) return;

  try {
    await apiVcEspumados.put(`/products/${editProduct.id}`, editProduct);
    Alert.alert('Sucesso', 'Produto atualizado com sucesso!');
      setEditProduct(null);
      fetchProducts();
    } catch (error) {
      console.error('Erro ao atualizar produto:', error);
      Alert.alert('Erro', 'Não foi possível atualizar o produto');
    }
  };

  const handleCancelEdit = () => {
    setEditProduct(null);
  };

  // deletar um produto
  const handleDeleteProduct = async (id) => {
    try {
      await apiVcEspumados.delete(`/products/${id}`);
      setProducts(products.filter(p => p.id !== id));
      if (selectedProduct?.id === id) setSelectedProduct(null);
    } catch (err) {
      setError('Erro ao deletar produto');
    }
  };

  // criar um novo produto
const handleCreateProduct = async () => {
  try {
    await apiVcEspumados.post('/products', newProduct);
    Alert.alert('Sucesso', 'Produto criado com sucesso!');
    setNewProduct({
      name: '',
      description: '',
      measures: '',
      price: 0,
      image: '',
      section: 'Todos',
    });
    fetchProducts();
  } catch (error) {
    console.error('Erro ao criar produto:', error);
    Alert.alert('Erro', 'Não foi possível criar o produto');
  }
};

  // alternar exibição dos produtos
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

  //botão de exibir informações de quando aperta no botão do create fecha todos os botões que estão abertos
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

  //labels para os campos de produto
  const productLabels: Record<string, string> = {
    name: 'Nome',
    description: 'Descrição',
    measures: 'Medidas',
    price: 'Preço',
    image: 'URL da imagem',
    section: 'Todos',
};

  return (
    <>
      <View style={styles.body}>
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
                    <Text key={key} style={{ color: '#ffffff' }}>
                      <Text style={{ fontWeight: 'bold', color: '#ffffff' }}>
                        {labels[key] || key}:
                      </Text> {value}
                    </Text>
                  );
                }
              })}
            </View>
          </View>
        )}

        {/* botão para exibir a lista de usuários */}
        <TouchableOpacity style={styles.button} onPress={toggleShowUsers}>
          <Text style={styles.buttonTxt}>{showUsers ? 'Ocultar Lista de Usuários' : 'Exibir Todos os Usuários'}</Text>
        </TouchableOpacity>

        {/* lista de usuários */}
        {showUsers && (
          <ScrollView contentContainerStyle={{ padding: 20 }}>
            {selectedUser ? (
              <View style={styles.itemList}>
                <Text style={styles.titleName}>Editar Usuário</Text>
                {Object.entries(editData).map(([key, value]) => (
                  key !== "id" && (
                    <View key={key} style={{ marginBottom: 8, }}>
                      <Text style={{ fontWeight: 'bold', color: '#ffffff' }}>{labels[key] || key}</Text>
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
                <Text style={{ fontWeight: 'bold', color: '#ffffff' }}>Usuário: {u.fullName}</Text>
                <Text style={{ fontWeight: 'bold', color: '#ffffff' }}>Email: {u.email}</Text>
                <Text style={{ fontWeight: 'bold', color: '#ffffff' }}>CPF: {u.cpf}</Text>
                <Text style={{ fontWeight: 'bold', color: '#ffffff' }}>Cidade: {u.city}</Text>
                <View style={{ flexDirection: 'row', justifyContent: 'center', gap: 10, marginTop: 10 }}>
                  <TouchableOpacity style={styles.button} onPress={() => handleUserEdit(u)}><Text style={styles.buttonTxt}>Editar</Text></TouchableOpacity>
                  <TouchableOpacity style={styles.buttonLogout} onPress={() => handleDelete(u.id)}><Text style={styles.logoutText}>Deletar</Text></TouchableOpacity>
                </View>
              </View>
            ))}
          </ScrollView>
        )}

        {/* botão de criar novo usuário */}
        <TouchableOpacity style={styles.button} onPress={toggleCreateUserForm}>
          <Text style={styles.buttonTxt}>{showCreateUser ? 'Fechar Formulário' : 'Criar Novo Usuário'}</Text>
        </TouchableOpacity>

        {/* formulário de criação de usuário */}
        {showCreateUser && (
          <ScrollView contentContainerStyle={{ padding: 20, flexGrow: 1 }}>
            <View style={styles.itemList}>
              <Text style={styles.titleName}>Criar Novo Usuário</Text>
              {Object.entries(newUserData).map(([key, value]) => (
                key !== "id" && (
                  <View key={key} style={{ marginBottom: 8 }}>
                    <Text style={{ fontWeight: 'bold', color: '#ffffff' }}>{labels[key] || key}</Text>
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

        {/* botão para exibir os produtos */}
        <TouchableOpacity style={styles.button} onPress={toggleShowProducts}>
          <Text style={styles.buttonTxt}>
            {showProducts ? 'Fechar Produtos' : 'Exibir Produtos'}
          </Text>
        </TouchableOpacity>

        {/* botão para exibir formulário de criação */}
        <TouchableOpacity style={styles.button} onPress={toggleShowCreateProductForm}>
          <Text style={styles.buttonTxt}>
            {showCreateProductForm ? 'Fechar Criar Produto' : 'Criar Produto'}
          </Text>
        </TouchableOpacity>

        {/* interface para criar novo produto */}
        {showCreateProductForm && (
          <ScrollView contentContainerStyle={{ padding: 20 }}>
            <Text style={styles.titleName}>Criar Produto</Text>
            {Object.entries(newProduct).map(([key, value]) => (
              <View key={key} style={{ marginBottom: 8 }}>
                <Text style={{ fontWeight: 'bold', color: '#ffffff' }}>{productLabels[key] || key}</Text>
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

        {/* interface para exibir/editar produtos */}
        {showProducts && (
          <ScrollView contentContainerStyle={{ padding: 20 }}>
            {/* Editar produto */}
            {selectedProduct && editProduct && (
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
                      <Text style={{ fontWeight: 'bold', color: '#ffffff' }}>{productLabels[key] || key}</Text>
                      <TextInput style={styles.input} placeholder={productLabels[key] || key} value={String(value)} onChangeText={(text) => setEditProduct({ ...editProduct, [key]: key === 'price' ? Number(text) : text, })} />
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
                  <Text style={{ fontWeight: 'bold', color: '#ffffff' }}>Produto: {p.name}</Text>
                  <Text style={{ fontWeight: 'bold', color: '#ffffff' }}>Descrição: {p.description}</Text>
                  <Text style={{ fontWeight: 'bold', color: '#ffffff' }}>Preço: R$ {p.price}</Text>
                  <Text style={{ fontWeight: 'bold', color: '#ffffff' }}>Medidas: {p.measures}</Text>
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
      </View>

      {/* Seção dos produtos */}
      <View style={{ flexDirection: 'row', gap: 10, marginBottom: 10 }}>
        {['Todos', 'Kits', 'Promoções'].map((sec) => (
          <TouchableOpacity
            key={sec}
            onPress={() => setNewProduct({ ...newProduct, section: sec })}
            style={{
              backgroundColor:
              newProduct.section === sec ? '#4F8EF7' : '#E0E0E0',
              paddingVertical: 6,
              paddingHorizontal: 12,
              borderRadius: 20,
            }}
            >
            <Text
          style={{
            color: newProduct.section === sec ? 'white' : 'black',
            fontWeight: 'bold',
          }}
            >
          {sec}
            </Text>
            </TouchableOpacity>
          ))}
      </View>


    </>
  );
}

// Estilos
const styles = StyleSheet.create({
  body: {
    width: '100%',
    height: '100%',
    backgroundColor: '#2A2A2A',
    paddingTop: 20,
  },
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
    alignSelf: 'center',
    color: '#ffffff',
  },
  itemList: {
    backgroundColor: 'none',
    borderWidth: 1,
    borderColor: '#ffffff',
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
    backgroundColor: 'none',
    borderWidth: 1,
    borderColor: '#ffffff',
    padding: 15,
    borderRadius: 999,
    alignSelf: 'center',
    marginVertical: 10,
  },
  buttonLogout: {
    width: 100,
    alignItems: 'center',
    backgroundColor: 'red',
    borderWidth: 2,
    borderColor: 'red',
    padding: 10,
    borderRadius: 999,
    alignSelf: 'center',
    marginVertical: 10,
  },
  logoutText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});