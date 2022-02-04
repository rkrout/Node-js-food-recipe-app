import Layout from "../user/components/Layout"
import HomePage from "../user/pages/HomePage"
import RecipeListPage from "../user/pages/RecipeListPage"
import SearchRecipePage from "../user/pages/SearchRecipePage"
import RecipeDetailsPage from "../user/pages/RecipeDetailsPage"

export const userRoutes = [
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                index: true,
                element: <HomePage />
            },
            {
                path: "recipe/list/:categoryId",
                element: <RecipeListPage />
            },
            {
                path: "recipe/details/:recipeId",
                element: <RecipeDetailsPage />
            },
            {
                path: "recipe/search",
                element: <SearchRecipePage />
            }
        ]
    }
]