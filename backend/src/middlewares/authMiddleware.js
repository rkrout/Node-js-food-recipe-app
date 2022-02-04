import jwt from "jsonwebtoken"
import constants from "../utils/constants"

export const authenticateAdmin = (req, res, next) => {
    const token = req.headers.authorization && req.headers.authorization.startsWith("Bearer ")
        ? req.headers.authorization.substring(7, req.headers.authorization.length) : null

    const { roleId } = jwt.verify(token, constants.ACCESS_TOKEN_SECRECT)
    req.userId = roleId

    if (!req.userId === 1) {
        return res.status(401).json("Unauthenticated")
    }

    next()
}
