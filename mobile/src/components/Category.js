import { Image, Text, StyleSheet, Pressable } from "react-native"
import { useNavigation } from '@react-navigation/native'
import { imageUrl } from "../utils/urls"

export default function Category({ category }) {
    const navigation = useNavigation()

    const navigateToList = () => {
        navigation.navigate("list", { category })
    }

    return <>
        <Pressable style={styles.container} onPress={navigateToList}>
            <Image source={{ uri: imageUrl(category.image) }} style={styles.image} />
            <Text style={styles.name}>{category.name}</Text>
        </Pressable>
    </>
}

const styles = StyleSheet.create({
    container: {
        position: "relative",
        width: "48%",
        borderRadius: 5,
        overflow: "hidden"
    },
    name: {
        position: "absolute",
        left: 0,
        right: 0,
        bottom: 0,
        paddingVertical: 10,
        fontWeight: 600,
        fontSize: 18,
        textAlign: "center",
        color: "white",
        backgroundColor: "rgba(0, 0, 0, 0.5)"
    },
    image: {
        marginRight: 10,
        width: "100%",
        height: 120
    }
})