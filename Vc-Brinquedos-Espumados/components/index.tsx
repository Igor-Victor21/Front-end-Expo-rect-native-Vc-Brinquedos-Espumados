import { useEffect, useState } from "react";
import { apiVcEspumados } from "../api/apiVcEspumados"
import { Card } from "./card"
import { View, Text, TextInput, StyleSheet, FlatList } from 'react-native'
import { Users } from "./users"
import { Products } from "./products"

export default function Req() {
    const [data, setData] = useState([])
    const [page, setPage] = useState("")
    const [error, setError] = useState(false)

    // segunda index a ser acessada
    return(
        <>
        <View style={styles.wrapPage}>
            <Text style={styles.titleName}>Api Vc Espumados usuários</Text>
            <FlatList
                style={styles.flatList}
                data={data}
                renderItem={({users}) => (
                    <Users 
                    fullName={users.fullName} 
                    email={users.email}
                    password={users.password}
                    CPF={users.CPF}
                    socialReason={users.socialReason}
                    StateRegistration={users.StateRegistration}
                    CNPJ={users.CNPJ}
                    CEP={users.CEP}
                    UF={users.UF}
                    city={users.city}
                    neighborhood={users.neighborhood}
                    road={users.road}
                    numberHouse={users.numberHouse}
                    complement={users.complement}
                    numberPhone={users.numberPhone}
                    dateOfBirth={users.dateOfBirth}
                    />
                )}
                
                keyExtractor={(item, index) => index.toString()}
              
            />
        </View>
        <View>
            <Text>Api Vc Espumados Produtos</Text>
        <FlatList
             style={styles.flatList}
             data={data}
             renderItem={({products}) => (
                 <Products 
                 name={products.name} 
                 description={products.description}
                 measures={products.measures}
                 price={products.price}
                 image={products.image}
                 />
             )}
             
             keyExtractor={(item, index) => index.toString()}
            />
        </View>
        </>
    )

}

const styles = StyleSheet.create({
    wrapPage: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        flex: 1, 
      },
      flatList: {
        flex: 1,  
        width: 200,
      },
      titleName: {
        textAlign: 'center',
      },
})
