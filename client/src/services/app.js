import axios from '../axiosConfig'
import axiosDefault from 'axios'

export const apiGetCategories = () => new Promise(async (resolve, reject) => {
    try {
        const response = await axios({ method: 'get', url: '/api/v1/category/all' })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})

export const apiGetFilterData = () => new Promise(async (resolve, reject) => {
    try {
        const response = await axios({ method: 'get', url: '/api/v1/post/filter-data' })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})

export const apiGetPublicProvinces = () => new Promise(async (resolve, reject) => {
    try {
        const response = await axiosDefault({ method: 'get', url: 'https://vapi.vnappmob.com/api/province/' })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})

export const apiGetPublicDistrict = (provinceId) => new Promise(async (resolve, reject) => {
    try {
        const response = await axiosDefault({ method: 'get', url: `https://vapi.vnappmob.com/api/province/district/${provinceId}` })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})
