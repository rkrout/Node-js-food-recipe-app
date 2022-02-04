import { Image, Text, StyleSheet, Pressable } from "react-native"
import { useNavigation } from '@react-navigation/native'
import { imageUrl } from "../utils/urls"

export default function RecipeHeader({ recipe }) {
    const navigation = useNavigation()

    const navigateToDetails = () => {
        navigation.navigate("details", { recipeId: recipe.id })
    }

    return <>
        <Pressable style={styles.container} onPress={navigateToDetails}>
            <Image source={{ uri: imageUrl(recipe.image) }} style={styles.image} />
            <Text style={styles.name}>{recipe.name}</Text>
        </Pressable>
    </>
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: 300,
        position: "relative",
        borderRadius: 5,
        overflow: "hidden"
    },
    image: {
        height: "100%",
        width: "100%"
    },
    name: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        paddingVertical: 20,
        paddingHorizontal: 10,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        textAlign: "center",
        fontSize: 20,
        color: "white",
        fontWeight: "bold"
    }
})