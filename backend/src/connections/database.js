import { Sequelize } from "sequelize"

export const database = new Sequelize({
    dialect: "sqlite",
    storage: "./db.sqlite3"
})