export const checkImageSize = ({ target }) => {
    if (target.files[0].size > 1000000) {
        target.setCustomValidity("Image is too big")
    } else {
        target.setCustomValidity("")
    }
}