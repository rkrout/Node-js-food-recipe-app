import { Recipe, Category } from "../../models/models"
import { destroy, upload, replace } from "../../utils/fileSystem"

export const getStatisticalData = async (req, res) => {
    const totalRecipes = await Recipe.count()
    const totalCategories = await Category.count()
    res.json({ totalCategories, totalRecipes })
}

export const getRecipes = async (req, res) => {
    const limit = Number(req.query.limit) || 10
    const offset = Number(req.query.offset) || 0

    const recipes = await Recipe.findAll()
    res.json(recipes)
}

export const getRecipe = async (req, res) => {
    res.json(await Recipe.findByPk(req.params.id))
}

export const createRecipe = async (req, res) => {
    if (!await Category.findByPk(req.body.categoryId)) {
        return res.status(404).json("Category does not exist")
    }

    const recipe = await Recipe.create({
        name: req.body.name,
        image: await upload(req.files.image),
        categoryId: req.body.categoryId,
        process: req.body.process
    })

    res.status(201).json(recipe)
}

export const editRecipe = async (req, res) => {
    if (!await Category.findByPk(req.body.categoryId)) {
        return res.status(404).json("Category does not exist")
    }

    const recipe = await Recipe.findByPk(req.params.id)
    if (!recipe) return res.status(404).json("Category does not exist")

    recipe.name = req.body.name
    recipe.categoryId = req.body.categoryId
    recipe.process = req.body.process
    if (req.files && req.files.image) {
        recipe.image = await replace(recipe.image, req.files.image)
    }
    await recipe.save()

    res.json(recipe)
}

export const deleteRecipe = async (req, res) => {

    const recipe = await Recipe.findByPk(req.params.id)
    if (!recipe) return res.status(404).json("Recipe does not exist")

    await destroy(recipe.image)
    await recipe.destroy()

    res.json("Recipe deleted successfully")
}
