import { Op } from "sequelize"
import { Recipe, Category } from "../../models/models"

export const getCategories = async (req, res) => {
    res.json(await Category.findAll())
}

export const getRecipes = async (req, res) => {
    const limit = Number(req.query.limit) || 10
    const offset = Number(req.query.offset) || 0

    if (req.query.query) {
        const recipes = await Recipe.findAll({
            where: {
                [Op.or]: {
                    name: {
                        [Op.like]: `%${req.query.query}%`
                    },
                    process: {
                        [Op.like]: `%${req.query.query}%`
                    }
                }
            },
            order: [["id", "DESC"]],
            attributes: ["id", "name", "image", "createdAt"]
        })

        return res.json(recipes)
    }

    if (req.query.categoryId) {
        const recipes = await Recipe.findAll({
            limit: limit,
            offset: offset,
            where: {
                categoryId: req.query.categoryId
            },
            order: [
                ["id", "DESC"]
            ],
            attributes: [
                "id",
                "name",
                "image",
                "createdAt"
            ]
        })

        return res.json(recipes)
    }

    const recipes = await Recipe.findAll({
        limit: limit,
        offset: offset,
        order: [["id", "DESC"]],
        attributes: ["id", "name", "createdAt", "image"]
    })

    res.json(recipes)
}

export const getRecipe = async (req, res) => {
    const recipe = await Recipe.findByPk(req.params.id)
    res.json(recipe)
}
