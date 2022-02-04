import Layout from "../admin/components/Layout"
import CreateCategoryPage from "../admin/pages/CreateCategoryPage"
import CategoryListPage from "../admin/pages/CategoryListPage"
import CreateRecipePage from "../admin/pages/CreateRecipePage"
import DeleteCategoryPage from "../admin/pages/DeleteCategoryPage"
import DeleteRecipePage from "../admin/pages/DeleteRecipePage"
import EditCategoryPage from "../admin/pages/EditCategoryPage"
import EditRecipePage from "../admin/pages/EditRecipePage"
import RecipeListPage from "../admin/pages/RecipeListPage"
import DashboardPage from "../admin/pages/DashboardPage"
import Protected from "../admin/components/Protected"
import ChangePasswordPage from "../admin/pages/ChangePasswordPage"
import LogoutPage from "../admin/pages/LogoutPage"
import LoginPage from "../admin/pages/LoginPage"
import EditAccountPage from "../admin/pages/EditAccountPage"
import IsAuthenticated from "../admin/components/IsAuthenticated"

export const adminRoutes = [
    {
        path: "/admin/login",
        element: <IsAuthenticated element={<LoginPage/>}/>
    },
    {
        path: "admin",
        element: <Protected element={<Layout/>}/>,
        children: [
            {
                path: "dashboard",
                element: <DashboardPage />
            },
            {
                path: "account/change-password",
                element: <ChangePasswordPage/>
            },
            {
                path: "account/edit",
                element: <EditAccountPage/>
            },
            {
                path: "logout",
                element: <LogoutPage />
            },
            {
                path: "categories",
                children: [
                    {
                        index: true,
                        element: <CategoryListPage />
                    },
                    {
                        path: "create",
                        element: <CreateCategoryPage />
                    },
                    {
                        path: "edit/:categoryId",
                        element: <EditCategoryPage />
                    },
                    {
                        path: "delete/:categoryId",
                        element: <DeleteCategoryPage />
                    }
                ]
            },
            {
                path: "recipes",
                children: [
                    {
                        index: true,
                        element: <RecipeListPage />
                    },
                    {
                        path: "create",
                        element: <CreateRecipePage />
                    },
                    {
                        path: "edit/:recipeId",
                        element: <EditRecipePage />
                    },
                    {
                        path: "delete/:recipeId",
                        element: <DeleteRecipePage />
                    }
                ]
            }
        ]
    } 
]