import { useEffect, useState } from "react"
import { View, StyleSheet, FlatList } from "react-native"
import Recipe from "../components/Recipe"
import RecipeHeader from "../components/RecipeHeader"
import axios from "axios"
import EmptyListComponent from "../components/EmptyListComponent"
import { recipesUrl } from "../utils/urls"

export default function HomeScreen() {
    const [loading, setLoading] = useState(true)
    const [recipes, setRecipes] = useState([])
    const [error, setError] = useState(null)

    const fetch = async () => {
        try {
            const { data } = await axios.get(recipesUrl())
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

    const renderItem = ({ item, index }) => {
        if (index === 0) {
            return <RecipeHeader recipe={item} />
        } else {
            return <Recipe recipe={item} />
        }
    }

    useEffect(() => {
        fetch()
    }, [])

    return <>
        <View style={styles.container}>
            <FlatList
                data={recipes}
                renderItem={renderItem}
                ListHeaderComponent={
                    <Text style={styles.title}>Latest Recipes</Text>
                }
                ListEmptyComponent={
                    <EmptyListComponent error={error} loading={loading} />
                }
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