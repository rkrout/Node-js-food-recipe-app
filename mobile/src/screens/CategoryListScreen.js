import { useEffect, useState } from "react"
import { FlatList, View, StyleSheet } from "react-native"
import Category from "../components/Category"
import { categoriesUrl } from "../utils/urls"
import axios from "axios"
import EmptyListComponent from "../components/EmptyListComponent"

export default function CategoryListScreen() {
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [categories, setCategories] = useState(null)

    const fetchCategories = async () => {
        try {
            const { data } = await axios.get(categoriesUrl())
            setCategories(data)
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
        fetchCategories()
    }, [])

    return <>
        <View style={styles.container}>
            <FlatList
                data={categories}
                columnWrapperStyle={styles.column}
                horizontal={false}
                numColumns={2}
                ListHeaderComponent={
                    <Text style={styles.title}>Category</Text>
                }
                ListEmptyComponent={
                    <EmptyListComponent error={error} loading={loading}/>
                }
                renderItem={({ item }) => <Category category={item} />}
            />
        </View>
    </>
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        flex: 1
    },
    title: {
        fontWeight: 800,
        fontSize: 22,
        marginBottom: 20
    },
    column: {
        justifyContent: "space-between",
        marginBottom: 10
    }
})