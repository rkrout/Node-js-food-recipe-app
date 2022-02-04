import { Text, Image, View, StyleSheet } from "react-native"
import { MaterialIcons } from '@expo/vector-icons'
import { useEffect, useState } from "react"
import PageLoader from "../components/PageLoader"
import PageError from "../components/PageError"
import axios from "axios"
import { imageUrl, recipeUrl } from "../utils/urls"

export default function RecipeDetailsScreen({ route }) {
    const { recipeId } = route.params
    const [recipe, setRecipe] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    const fetch = async () => {
        try {
            const { data } = await axios.get(recipeUrl(recipeId))
            setRecipe(data)
        } catch ({ response, request }) {
            if (response) {
                setError("Server Error")
            } else if (request) {
                setError("Network Error")
            } else {
                setError("Unknown Error")
            }
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetch()
    }, [])

    if (loading) {
        return <PageLoader />
    }

    if (error) {
        return <PageError error={error} />
    }

    return <>
        <View style={styles.container}>
            <Text style={styles.name}>{recipe.name}</Text>

            <View style={styles.timeContainer}>
                <MaterialIcons name="schedule" size={18} />
                <Text style={styles.time}>{recipe.createdAt}</Text>
            </View>

            <Image source={{ uri: imageUrl(recipe.image) }} style={styles.image} />

            <Text>{recipe.process}</Text>
        </View>
    </>
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20
    },
    name: {
        fontSize: 22,
        fontWeight: 800,
        marginBottom: 20
    },
    timeContainer: {
        marginBottom: 20,
        flexDirection: "row",
        alignItems: "center"
    },
    time: {
        marginLeft: 10,
        fontSize: 18
    },
    image: {
        width: "100%",
        height: "30%",
        marginBottom: 20,
        borderRadius: 5
    }
})