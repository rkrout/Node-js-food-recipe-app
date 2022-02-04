import crypto from "crypto"
import fs from "fs/promises"

export const upload = async (file) => {
    const fileName = crypto.randomBytes(16).toString("hex") + file.name
    const destination = process.cwd() + "/uploads/" + fileName
    await file.mv(destination)
    return fileName
}

export const isExist = async (fileName) => {
    try {
        await fs.access(fileName)
        return true
    } catch (error) {
        return false
    }
}

export const destroy = async (fileName) => {
    if (isExist(fileName)) {
        const destination = process.cwd() + "/uploads/" + fileName
        await fs.unlink(destination)
    }
}

export const uploads = async (files) => {
    const fileNames = []
    for (const file of files) {
        fileNames.push(await upload(file))
    }
    return fileNames
}

export const destroyes = async (fileNames) => {
    for (const fileName of fileNames) {
        await destroy(fileName)
    }
}

export const replace = async (oldFileName, newFile) => {
    await destroy(oldFileName)
    return await upload(newFile)
}
