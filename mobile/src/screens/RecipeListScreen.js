import { Text, View, StyleSheet, FlatList } from "react-native"
import Recipe from "../components/Recipe"
import { useEffect, useState } from "react"
import axios from "axios"
import EmptyListComponent from "../components/EmptyListComponent"
import { recipesByCategoryUrl } from "../utils/urls"

export default function RecipeListScreen({ route }) {
    const { category } = route.params
    const [recipes, setRecipes] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    const fetchRecipes = async () => {
        try {
            const { data } = await axios.get(recipesByCategoryUrl(category.id))
            setRecipes(data)
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
        fetchRecipes()
    }, [])

    return <>
        <View style={styles.container}>
            <FlatList
                data={recipes}
                ListHeaderComponent={
                    <Text style={styles.title}>All {category.name}</Text>
                }
                ListEmptyComponent={
                    <EmptyListComponent error={error} loading={loading} />
                }
                renderItem={({ item }) => <Recipe recipe={item} />}
                keyExtractor={recipe => recipe.id}
            />
        </View>
    </>
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20
    },
    title: {
        fontWeight: 800,
        fontSize: 22,
        marginBottom: 20
    }
})