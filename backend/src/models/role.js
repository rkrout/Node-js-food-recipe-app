import { DataTypes } from "sequelize"
import { database } from "../connections/database"

export const Role = database.define("roles", {
    id: {
        type: DataTypes.BIGINT(20),
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    }
})

