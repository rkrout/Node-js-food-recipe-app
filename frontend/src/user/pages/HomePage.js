import RecipeList from "../components/RecipeList"
import CategoryList from "../components/CategoryList"
import { useEffect, useState } from "react"
import Loader from "../components/Loader"
import axios from "axios"
import Error from "../components/Error"

export default function HomePage() {
    const [categories, setCategories] = useState(null)
    const [recipes, setRecipes] = useState(null)
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(true)

    const fetchInitialData = async () => {
        try {
            const categories = await axios.get("/categories")
            const recipes = await axios.get("/recipes")
            setRecipes(recipes.data)
            setCategories(categories.data)
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
        fetchInitialData()
    }, [])

    if (loading) {
        return <Loader />
    }

    if (error) {
        return <Error error={error} className="mt-4"/>
    }

    return <>
        <CategoryList categories={categories} />
        <RecipeList recipes={recipes} title="Latest Recipes" />
    </>
}