import { View, StyleSheet, Text } from "react-native";

export const Products = ({name, description, measures, price, image} : 
    {name: string, description: string, measures: string, price: string, image: string}) => {
        return(
            <View style={styles.itemList}>
                <Text>{name}</Text>
                <Text>{description}</Text>
                <Text>{measures}</Text>
                <Text>{price}</Text>
                <Text>{image}</Text>
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