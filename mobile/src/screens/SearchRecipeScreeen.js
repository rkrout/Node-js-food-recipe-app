import { View, StyleSheet, FlatList, TextInput } from "react-native"
import Recipe from "../components/Recipe"
import { MaterialIcons } from '@expo/vector-icons'
import { useState } from "react"
import axios from "axios"
import EmptyListComponent from "../components/EmptyListComponent"
import { recipesByQueryUrl } from "../utils/urls"

export default function SearchRecipeScreen() {
    const [loading, setLoading] = useState(false)
    const [recipes, setRecipes] = useState([])
    const [error, setError] = useState(null)

    const searchRecipe = async (event) => {
        setLoading(true)
        setError(null)
        setRecipes([])

        try {
            const { data } = await axios.get(recipesByQueryUrl(event.target.value))
            if (data.length) {
                setRecipes(data)
            } else {
                setError("No Recipe Found")
            }
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

    return <>
        <View style={styles.container}>
            <View style={styles.search}>
                <TextInput style={styles.input} keyboardType="search" multiline={false} onSubmitEditing={searchRecipe} placeholder="Search here..." />
                <MaterialIcons name="search" size={24} />
            </View>

            <FlatList
                data={recipes}
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
    search: {
        flexDirection: "row",
        borderColor: "#ccc",
        borderWidth: 1,
        padding: 10,
        marginBottom: 30
    },
    input: {
        flex: 1,
        fontSize: 18,
        fontWeight: 600,
        color: "black",
        outlineWidth: 0
    }
})