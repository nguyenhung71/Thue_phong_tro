import axiosConfig from '../axiosConfig'

export const apiGetPosts = () => new Promise(async (resolve, reject) => {
    try {
        const response = await axiosConfig({ method: 'get', url: '/api/v1/post/all' })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})

export const apiGetPostsLimit = (query) => new Promise(async (resolve, reject) => {
    try {
        const response = await axiosConfig({ method: 'get', url: '/api/v1/post/limit', params: query })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})

export const apiFilterPosts = (query) => new Promise(async (resolve, reject) => {
    try {
        const response = await axiosConfig({ method: 'get', url: '/api/v1/post/filter', params: query })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})

export const apiGetNewPosts = () => new Promise(async (resolve, reject) => {
    try {
        const response = await axiosConfig({ method: 'get', url: '/api/v1/post/new-post' })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})

export const apiGetPostById = (postId) => new Promise(async (resolve, reject) => {
    try {
        const response = await axiosConfig({ method: 'get', url: `/api/v1/post/detail/${postId}` })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})

export const apiCreatePost = (formData) => new Promise(async (resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'post',
            url: '/api/v1/post/create',
            data: formData,
            headers: { 'Content-Type': 'multipart/form-data' }
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})

export const apiUpdatePost = (postId, formData) => new Promise(async (resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'put',
            url: `/api/v1/post/update/${postId}`,
            data: formData,
            headers: { 'Content-Type': 'multipart/form-data' }
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})

export const apiGetMyPosts = (query) => new Promise(async (resolve, reject) => {
    try {
        const response = await axiosConfig({ method: 'get', url: '/api/v1/post/my-posts', params: query })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})

export const apiDeletePost = (postId) => new Promise(async (resolve, reject) => {
    try {
        const response = await axiosConfig({ method: 'delete', url: `/api/v1/post/delete/${postId}` })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})
