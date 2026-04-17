import actionTypes from './actionTypes'
import { apiFilterPosts, apiGetNewPosts, apiGetPosts, apiGetPostsLimit } from '../../services/post'

const allowedQueryKeys = ['page', 'limit', 'order', 'sort', 'title', 'categoryId', 'categoryCode', 'province', 'district', 'ward', 'priceMin', 'priceMax', 'acreageMin', 'acreageMax']

const sanitizeQuery = (query = {}) => {
    return Object.entries(query).reduce((acc, [key, value]) => {
        if (!allowedQueryKeys.includes(key)) return acc
        if (value === undefined || value === null || value === '') return acc
        acc[key] = value
        return acc
    }, {})
}

const shouldUseFilterApi = (query = {}) => {
    const filterKeys = ['province', 'district', 'ward', 'priceMin', 'priceMax', 'acreageMin', 'acreageMax']
    return filterKeys.some((key) => query[key] !== undefined && query[key] !== null && query[key] !== '')
}

export const getPosts = () => async (dispatch) => {
    try {
        const response = await apiGetPosts()
        if (response?.data.err === 0) {
            dispatch({ type: actionTypes.GET_POSTS, posts: response.data.response })
        } else {
            dispatch({ type: actionTypes.GET_POSTS, msg: response.data.msg })
        }
    } catch (error) {
        dispatch({ type: actionTypes.GET_POSTS, posts: null })
    }
}

export const getPostsLimit = (query = {}) => async (dispatch) => {
    try {
        const sanitizedQuery = sanitizeQuery(query)
        const response = shouldUseFilterApi(sanitizedQuery) ? await apiFilterPosts(sanitizedQuery) : await apiGetPostsLimit(sanitizedQuery)
        if (response?.data.err === 0) {
            dispatch({
                type: actionTypes.GET_POSTS_LIMIT,
                posts: response.data.response?.rows,
                count: response.data.response?.count,
                msg: ''
            })
        } else {
            dispatch({ type: actionTypes.GET_POSTS_LIMIT, msg: response.data.msg, posts: [] })
        }
    } catch (error) {
        dispatch({ type: actionTypes.GET_POSTS_LIMIT, posts: [], count: 0, msg: error?.message || '' })
    }
}

export const getNewPosts = () => async (dispatch) => {
    try {
        const response = await apiGetNewPosts()
        if (response?.data.err === 0) {
            dispatch({ type: actionTypes.GET_NEW_POST, newPosts: response.data.response })
        } else {
            dispatch({ type: actionTypes.GET_NEW_POST, msg: response.data.msg, newPosts: null })
        }
    } catch (error) {
        dispatch({ type: actionTypes.GET_NEW_POST, newPosts: null })
    }
}
