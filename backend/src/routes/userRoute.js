import { Router } from "express"
import * as recipeController from "../controllers/user/recipeController"

const router = Router()

router.get(
    "/categories",
    recipeController.getCategories
)

router.get(
    "/recipes",
    recipeController.getRecipes
)

router.get(
    "/recipes/:id",
    recipeController.getRecipe
)

export default router