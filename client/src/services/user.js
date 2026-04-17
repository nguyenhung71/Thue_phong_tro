import axios from '../axiosConfig'

export const apiGetCurrent = () => new Promise(async (resolve, reject) => {
    try {
        const response = await axios({
            method: 'get',
            url: '/api/v1/user/get-current',
        })
        resolve(response)

    } catch (error) {
        reject(error)
    }
})

export const apiUpdateCurrentUser = (payload) => new Promise(async (resolve, reject) => {
    try {
        const isFormData = typeof FormData !== 'undefined' && payload instanceof FormData
        const response = await axios({
            method: 'put',
            url: '/api/v1/user/',
            data: payload,
            headers: isFormData ? { 'Content-Type': 'multipart/form-data' } : undefined,
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})
