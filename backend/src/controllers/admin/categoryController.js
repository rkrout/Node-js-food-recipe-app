import { upload, replace, destroy } from "../../utils/fileSystem"
import { Category, Recipe } from "../../models/models"
import { Op } from "sequelize"

export const getCategories = async (req, res) => {
    res.json(await Category.findAll())
}

export const getCategory = async (req, res) => {
    res.json(await Category.findByPk(req.params.id))
}

export const createCategory = async (req, res) => {
    if (await Category.findOne({ where: { name: req.body.name } })) {
        return res.status(409).json("Category already exist")
    }

    const category = await Category.create({
        name: req.body.name,
        image: await upload(req.files.image)
    })

    res.status(201).json(category)
}

export const editCategory = async (req, res) => {
    const category = await Category.findByPk(req.params.id)
    if (!category) return res.status(409).json("Category does not exist")


    const isExist = await Category.findOne({
        where: { name: req.body.name, [Op.not]: { id: req.params.id } }
    })
    if (isExist) return res.status(409).json("Category already exist")


    category.name = req.body.name
    if (req.files && req.files.image) {
        category.image = await replace(category.image, req.files.image)
    }
    await category.save()

    res.status(201).json(category)
}

export const deleteCategory = async (req, res) => {
    const category = await Category.findByPk(req.params.id)
    if (!category) return res.status(409).json("Category does not exist")

    const recipes = await Recipe.findAll({
        where: {
            categoryId: req.params.id
        }
    })
    for (const recipe of recipes) {
        await destroy(recipe.image)
    }

    await category.destroy()
    res.json("Category deleted successfully")
}
