import { validationResult } from "express-validator"

export const multipleImage = ({ name, nullable, min, max }) => (req, res, next) => {
    if (nullable && !(req.files && req.files[name] && Array.isArray(req.files[name]))) {
        return next()
    }

    if (!(req.files && req.files[name] && Array.isArray(req.files[name]) &&
        req.files[name].length >= min && request.files[name].length <= max)) {
        return res.status(400).json("Invalid Images")
    }


    for (const key in req.files[name]) {
        const image = req.files[name][key]

        if (!["image/jpeg", "image/jpg", "image/png"].includes(image.mimetype)) {
            return res.status(400).json("Invalid Images")
        }

        if (image.truncated) {
            return res.status(400).json("Invalid Images")
        }
    }

    next()
}

export const singleImage = ({ name, nullable }) => (req, res, next) => {
    if (nullable && !(req.files && req.files[name])) {
        return next()
    }

    if (!(req.files && req.files[name])) {
        return res.status(400).json("Invalid Images")
    }

    if (!["image/jpeg", "image/jpg", "image/png"].includes(req.files[name].mimetype)) {
        return res.status(400).json("Invalid Images")
    }

    if (req.files[name].truncated) {
        return res.status(400).json("Invalid Images")
    }

    next()
}

export const checkError = () => (req, res, next) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        return res.status(400).json(errors.array()[0].msg)
    }

    next()
}
