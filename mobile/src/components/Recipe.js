import { Text, View, Image, StyleSheet, Pressable } from "react-native"
import { imageUrl } from "../utils/urls"
import { useNavigation } from '@react-navigation/native'

export default function Recipe({ recipe }) {
    const navigation = useNavigation()

    const navigateToDetails = () => {
        navigation.navigate("details", { recipeId: recipe.id })
    }

    return <>
        <Pressable style={styles.container} onPress={navigateToDetails}>
            <Image source={{ uri: imageUrl(recipe.image) }} style={styles.image} />
            <View>
                <Text style={styles.name}>{recipe.name}</Text>
                <Text style={styles.createdAt}>{recipe.createdAt}</Text>
            </View>
        </Pressable>
    </>
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        marginVertical: 5
    },
    image: {
        width: 170,
        height: 100,
        borderRadius: 5,
        marginRight: 10
    },
    name: {
        fontWeight: "bold",
        fontSize: 18,
        marginBottom: 10
    },
    createdAt: {
        fontSize: 18
    }
})