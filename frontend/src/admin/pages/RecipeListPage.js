import { useEffect, useState } from "react";
import { axios } from "../utils/network"
import { Link } from "react-router-dom";
import Loader from "../components/Loader"
import Error from "../components/Error"
import RecipeRow from "../components/RecipeRow";

export default function RecipeListPage() {
    const [loading, setLoading] = useState(true)
    const [recipes, setRecipes] = useState([])
    const [error, setError] = useState(null)

    const fetchRecipes = async () => {
        try {
            const { data } = await axios.get("/admin/recipes")
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

    return <>
        <Link to="create" class="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded mb-4 inline-block">Add New</Link>

        {error && <Error error={error} className="mb-4" />}

        <table class="w-full rounded-md text-center">
            <thead>
                <tr>
                    <th class="border p-4">Name</th>
                    <th class="border p-4">Image</th>
                    <th class="border p-4">Created</th>
                    <th class="border p-4">Action</th>
                </tr>
            </thead>
            <tbody>
                {recipes.map(recipe => <RecipeRow recipe={recipe} />)}
            </tbody>
        </table>
    </>
}