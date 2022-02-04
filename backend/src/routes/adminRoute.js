import { Router } from "express"
import * as adminValidator from "../validators/adminValidator"
import * as categoryController from "../controllers/admin/categoryController"
import * as recipeController from "../controllers/admin/recipeController"

const router = Router()

router.get(
    "/statistic",
    recipeController.getStatisticalData
)

router.get(
    "/categories",
    categoryController.getCategories
)

router.get(
    "/categories/:id",
    categoryController.getCategory
)

router.post(
    "/categories",
    adminValidator.createCategory,
    categoryController.createCategory
)

router.patch(
    "/categories/:id",
    adminValidator.editCategory,
    categoryController.editCategory
)

router.delete(
    "/categories/:id",
    categoryController.deleteCategory
)

router.get(
    "/recipes",
    recipeController.getRecipes
)

router.get(
    "/recipes/:id",
    recipeController.getRecipe
)

router.post(
    "/recipes",
    adminValidator.createRecipe,
    recipeController.createRecipe
)

router.patch(
    "/recipes/:id",
    adminValidator.editRecipe,
    recipeController.editRecipe
)

router.delete(
    "/recipes/:id",
    recipeController.deleteRecipe
)

export default router