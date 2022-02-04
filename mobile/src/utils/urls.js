export const baseUrl = "http://localhost:3001/"

export const imageUrl = (image) => {
    return baseUrl + image
}

export const categoriesUrl = () => {
    return baseUrl + "categories"
}

export const recipesUrl = () => {
    return baseUrl + "recipes"
}

export const recipesByCategoryUrl = (categoryId) => {
    return baseUrl + "recipes?categoryId=" + categoryId
}

export const recipesByQueryUrl = (query) => {
    return baseUrl + "recipes?query=" + query
}

export const recipeUrl = (recipeId) => {
    return baseUrl + "recipes/" + recipeId
}
