import { useState } from "react"
import Loader from "../components/Loader"
import RecipeList from "../components/RecipeList"
import axios from "axios"
import Error from "../components/Error"
import SearchNavbar from "../components/SearchNavbar"

export default function SearchRecipePage() {
    const [loading, setLoading] = useState(false)
    const [recipes, setRecipes] = useState(null)
    const [error, setError] = useState(null)
    const [query, setQuery] = useState(null)

    const onSearchClick = async () => {
        setError(null)
        setLoading(true)
        setRecipes(null)

        try {
            const { data } = await axios.get(`/recipes?query=${query}`)
            if (data.length) {
                setRecipes(data)
            } else {
                setError("No Recipe Found")
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false)
        }
    }

    const onQueryChange = ({ target }) => {
        setQuery(target.value)
    }

    return <>
        <SearchNavbar
            onQueryChange={onQueryChange}
            onSearchClick={onSearchClick}
        />

        {error && <Error error={error} />}

        {loading && <Loader />}

        {recipes && <RecipeList recipes={recipes} />}
    </>
}