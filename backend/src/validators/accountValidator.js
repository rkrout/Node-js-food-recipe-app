import { body } from "express-validator"
import { checkError } from "../utils/validator"

export const signIn = [
    body("email").notEmpty().isEmail().normalizeEmail(),
    body("password").notEmpty(),
    checkError()
]

export const signUp = [
    body("name").trim().notEmpty().isLength({ min: 2, max: 255 }),
    body("email").trim().isEmail().normalizeEmail(),
    body("password").notEmpty().isStrongPassword(),
    checkError()
]

export const changePassword = [
    body("oldPassword").notEmpty(),
    body("newPassword").notEmpty().isStrongPassword(),
    checkError()
]

export const editAccount = [
    body("name").trim().notEmpty().isLength({ min: 2, max: 255 }),
    body("email").trim().notEmpty().normalizeEmail(),
    checkError()
]
