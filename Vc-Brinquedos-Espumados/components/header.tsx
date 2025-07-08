import { Image, ImageSourcePropType, StyleSheet, View } from "react-native";

export const Header = ({image} : {image: ImageSourcePropType}) => {
    return(
        <View style={styles.container}>
            <Image style={styles.img} source={image} resizeMode="cover"/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 270,    
        backgroundColor: '#2A2A2A',       
    },
    img: {
        position: 'absolute',
        flex: 1,
        width: '100%',
        maxWidth: '100%',
        height: 270, 
        borderBottomRightRadius: 25,
        borderBottomLeftRadius: 25,
    }
})