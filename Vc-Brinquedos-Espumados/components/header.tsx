import { View, Image, StyleSheet, ImageSourcePropType } from "react-native";
import { Dimensions } from "react-native";

const screenWidth = Dimensions.get("window").width;

export const Header = ({image} : {image: ImageSourcePropType}) => {
    return(
        <View style={styles.container}>
            <Image style={styles.img} source={image} resizeMode="cover"/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: screenWidth,
        height: 220,    
        backgroundColor: '#2A2A2A',       
    },
    img: {
        position: 'absolute',
        flex: 1,
        width: '100%',
        height: 200, 
        borderBottomRightRadius: 25,
        borderBottomLeftRadius: 25,
    }
})