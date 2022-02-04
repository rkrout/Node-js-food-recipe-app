import { DataTypes } from "sequelize"
import { database } from "../connections/database"

export const Recipe = database.define("recipes", {
    name: {
        type: DataTypes.BIGINT(20),
        allowNull: false,
    },
    image: {
        type: DataTypes.STRING,
        allowNull: false
    },
    process: {
        type: DataTypes.TEXT,
        allowNull: false
    }
})

