import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import Error from "../components/Error"
import Loader from "../components/Loader"

export default function RecipeDetailsPage() {
    const { recipeId } = useParams()
    const [details, setDetails] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    const fetchRecipeDetails = async () => {
        try {
            const { data } = await axios(`/recipes/${recipeId}`)
            setDetails(data)
        } catch ({ request, response }) {
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
        fetchRecipeDetails()
    }, [])

    if (loading) {
        return <Loader />
    }

    if (error) {
        return <Error error={error} className="mt-4"/>
    }

    return <>
        <div class="my-8 mx-4 lg:mx-56 p-8 rounded-md bg-white">
            <h2 class="text-3xl font-bold mb-3">{details.name}</h2>
            <div class="my-5">
                <i class="far fa-clock mr-2"></i> {details.createdAt}
            </div>
            <img src={`/${details.image}`} class="rounded-md text-center" />
            <div class="mt-5">{details.process}</div>
        </div>
    </>
}