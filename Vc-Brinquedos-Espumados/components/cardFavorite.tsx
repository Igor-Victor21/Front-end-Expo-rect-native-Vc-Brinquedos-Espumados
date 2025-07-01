import { StyleSheet, Text, Image, View, TouchableOpacity } from 'react-native';




export const CardFav = ({ name, image, description, price } : {name: string, image: string, description: string, price : number})=> {
    return (
        <View style={styles.container}>
            <View style={styles.containerImg}>
                <Image 
                style={styles.imgstyle}
                source={{uri: image}}
                accessibilityLabel="a"
                />
            </View>
            <View style={styles.containerTxt}>
                <Text style={styles.titleName}>{name}</Text>
                <Text style={styles.titleDesc}>{description}</Text>
                <View>
                    <Text style={styles.titlePrice}>Preço</Text>
                    <Text style={styles.showPrice}>R$ {price.toFixed(2)}</Text>
                </View>
                <TouchableOpacity style={styles.conteinerIcon}>
                    <Image style={styles.favIcon} source={require('../assets/image/heart.png')} />
                </TouchableOpacity>                
            </View>
        </View>
            
        )
}

const styles = StyleSheet.create({
    container:{
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    borderWidth: 2,
    borderRadius: 20,
    width: 350,
    height: 160,
    backgroundColor: ''
    },
    containerTxt: {
    display: 'flex',
    alignItems: 'flex-start',
    alignSelf: 'center',
    width: 100,
    height: 'auto',
    marginLeft: 20,
    marginTop: '5%',
    gap: 5
    },
    titleName:{
    textAlign: 'left',
    fontWeight: '500',
    fontSize: 21,
    width: 130,
    },
    titleDesc:{
    fontWeight: '300',
    fontSize: 18,
    
    },
    titlePrice:{
    fontWeight: '300',
    fontSize: 12,
    },
    showPrice:{
    fontWeight: '500',
    fontSize: 18,
    },
    containerImg:{
    borderWidth: 2,
    borderRadius: 5,
    width: 130,
    height: 'auto',
    marginLeft: 15,
    marginVertical: "3%"
    },
    imgstyle: {

    },
    title: {

    },
    conteinerIcon:{
    position: 'absolute',
    width: 20,
    height: 20,
    left: '140%',
    top: "15%"
    },
    favIcon:{
    width: 20,
    height: 20
    }
})