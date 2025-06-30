import { StyleSheet, Text, Image, View } from 'react-native';




export const CardFav = ({ name, image, description, price } : {name: string, image: string, description: string, price : number})=> {
    return (
            <View style={styles.container}>
                <Image 
                style={styles.imgstyle}
                source={{uri: image}}
                />
                <Text style={styles.title}>{name}</Text>
                <Text style={styles.title}>{description}</Text>
                <Text style={styles.title}>R$ {price.toFixed(2)}</Text>
    
            </View>
        )
}

const styles = StyleSheet.create({
    container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems:   'center',
    borderWidth: 2,
    width: 300,
    height: 100
    },
    imgstyle: {

    },
    title: {

    }
})