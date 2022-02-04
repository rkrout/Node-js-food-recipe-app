import express from "express"
import cors from "cors"
import fileUpload from "express-fileupload"
import { authenticateAdmin } from "./middlewares/authMiddleware"
import adminRoute from "./routes/adminRoute"
import userRoute from "./routes/userRoute"
import accountRoute from "./routes/accountRoute"

import bcrypt from "bcrypt"
import { User, Role } from "./models/models"

const app = express()
app.use(express.json())
app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(fileUpload({ parseNested: true }))
app.use(express.static("uploads"))

app.use(
    "/account",
    accountRoute
)

app.use(
    "/admin",
    authenticateAdmin,
    adminRoute
)

app.use(
    "/",
    userRoute
)

app.listen(3001, console.log("listening to port 3001...."))