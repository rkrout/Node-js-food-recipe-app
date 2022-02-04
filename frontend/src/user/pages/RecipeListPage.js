import { useEffect, useState } from "react"
import RecipeList from "../components/RecipeList"
import Loader from "../components/Loader"
import axios from "axios"
import Error from "../components/Error"
import { useParams } from "react-router-dom"

export default function RecipeListPage() {
    const { categoryId } = useParams()
    const [recipes, setRecipes] = useState(null)
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(true)

    const fetchRecipes = async () => {
        try {
            const { data } = await axios.get(`/recipes?categoryId=${categoryId}`)
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

    useEffect(() => {
        fetchRecipes()
    }, [])

    if (loading) {
        return <Loader />
    }

    if (error) {
        return <Error error={error} className="mt-4"/>
    }

    return <>
        <RecipeList recipes={recipes} />
    </>
}