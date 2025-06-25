import { View, StyleSheet, Text } from "react-native";

export const Users = ({fullName, email, password, CPF, socialReason, StateRegistration, CNPJ, CEP, UF, city, neighborhood, road, numberHouse, complement, numberPhone, dateOfBirth} : 
    {fullName: string, email: string, password: string, CPF: string, socialReason: string, StateRegistration: string, CNPJ: string, CEP: string, UF: string, city: string, neighborhood: string, 
        road: string, numberHouse: number, complement: string, numberPhone: string, dateOfBirth: string}) => {
    return(
        <View style={styles.itemList}>
            <Text>{fullName}</Text>
            <Text>{email}</Text>
            <Text>{password}</Text>
            <Text>{CPF}</Text>
            <Text>{socialReason}</Text>
            <Text>{StateRegistration}</Text>
            <Text>{CNPJ}</Text>
            <Text>{CEP}</Text>
            <Text>{UF}</Text>
            <Text>{city}</Text>
            <Text>{neighborhood}</Text>
            <Text>{road}</Text>
            <Text>{numberHouse}</Text>
            <Text>{complement}</Text>
            <Text>{numberPhone}</Text>
            <Text>{dateOfBirth}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    itemList: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#4168a4d4',
        margin: 10,
        height: 80,
        paddingHorizontal: 10
    },

    imageStyle: {
        width: 50,
        height: 50,
        zIndex: 999
    }
})