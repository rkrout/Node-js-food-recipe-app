import { Router } from "express"
import * as accountValidator from "../validators/accountValidator"
import * as accountController from "../controllers/accountController"
import * as authMiddleware from "../middlewares/authMiddleware"

const router = Router()

router.post(
    "/login",
    accountValidator.signIn,
    accountController.signIn
)

router.patch(
    "/change_password",
    authMiddleware.authenticateAdmin,
    accountValidator.changePassword,
    accountController.changePassword
)

router.patch(
    "/",
    authMiddleware.authenticateAdmin,
    accountValidator.editAccount,
    accountController.editAccount
)

router.get(
    "/",
    authMiddleware.authenticateAdmin,
    accountController.getAccount
)


router.patch(
    "/refresh_token",
    accountController.refreshToken
)

export default router