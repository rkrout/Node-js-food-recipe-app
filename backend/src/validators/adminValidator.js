import { body } from "express-validator"
import { singleImage, checkError } from "../utils/validator"

export const createCategory = [
    body("name").trim().notEmpty().isLength({ min: 2, max: 255 }),
    checkError(),
    singleImage({ name: "image" })
]

export const editCategory = [
    body("name").trim().notEmpty().isLength({ min: 2, max: 255 }),
    singleImage({ name: "image", nullable: true }),
    checkError()
]

export const createRecipe = [
    body("name").trim().notEmpty(),
    body("process").trim().notEmpty(),
    body("categoryId").notEmpty().isInt(),
    checkError(),
    singleImage({ name: "image" })
]

export const editRecipe = [
    body("name").trim().notEmpty(),
    body("process").trim().notEmpty(),
    body("categoryId").notEmpty().isInt(),
    checkError(),
    singleImage({ name: "image", nullable: true })
]
