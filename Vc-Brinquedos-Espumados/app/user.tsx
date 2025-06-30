import { apiVcEspumados } from '@/api/apiVcEspumados';
import { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import Nav from '../components/nav-bar';

export default function User() {
  const [users, setUsers] = useState([]);

  //fazendo a requisição get para mostrar todos os usuários
  useEffect(() => {
    apiVcEspumados.get('/users')
      .then(response => {
        setUsers(response.data);
      })
      .catch(error => {
        console.error('Erro ao buscar usuários:', error);
      })
  }, []);

  //Renderizando os usuarios 
  const renderItem = ({ item: user }) => (
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
  );

  return (
    <>
    
      {/* Envelopando os dadados dos usuários*/}
      <View style={styles.wrapPage}>
        <Text style={styles.titleName}>Usuários Cadastrados</Text>
        {/* listando os usuários e renderizando todos os dados dos usuários */}
        <FlatList
          data={users}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
	{/* Chamando a Nav-bar */}
      <Nav />
    </>
  );
}

// css
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
  flatList: {
    paddingHorizontal: 10,
    paddingBottom: 20,
  },
  itemList: {
    backgroundColor: '#A7C7E7',
    borderRadius: 10,
    padding: 15,
    marginVertical: 8,
    alignSelf: 'stretch',
  },
});