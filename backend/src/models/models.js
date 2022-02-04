import { User } from "./user"
import { Category } from "./category"
import { Role } from "./role"
import { Recipe } from "./recipe"

Category.hasMany(Recipe, {
    foreignKey: {
        name: "categoryId",
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
    }
})
Recipe.belongsTo(Category)

Role.hasMany(User, {
    foreignKey: {
        name: "roleId",
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
    }
})
User.belongsTo(Role)

export {
    Category,
    Recipe,
    Role,
    User
}