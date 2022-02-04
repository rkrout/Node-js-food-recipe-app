import axios from "axios"

axios.interceptors.request.use((request) => {
    if (localStorage.getItem("accessToken")) {
        request.headers.Authorization = `Bearer ${localStorage.getItem("accessToken")}`
    }
    return request
})

const interceptor = axios.interceptors.response.use(response => response, async (error) => {
    if (error.response.status !== 401) {
        return Promise.reject(error)
    }

    axios.interceptors.response.eject(interceptor)
    localStorage.removeItem("accessToken")

    const options = {
        headers: { Authorization: `Bearer ${localStorage.getItem("refreshToken")}` }
    }

    try {
        const { data } = await axios.patch("/account/refresh_token", null, options)
        localStorage.setItem("accessToken", data.accessToken)
        return axios(error.response.config)
    } catch (error) {
        localStorage.removeItem("accessToken")
        localStorage.removeItem("refreshToken")
        return error
    }
})

export { axios } 