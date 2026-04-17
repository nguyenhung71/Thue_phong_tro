import actionTypes from './actionTypes'
import * as apis from '../../services'
import { formatVietnameseToString } from '../../ultils/Common/formatVietnameseToString'

const provinceFallback = [
    'Hà Nội', 'Hồ Chí Minh', 'Đà Nẵng', 'Hải Phòng', 'Cần Thơ', 'An Giang', 'Bà Rịa - Vũng Tàu', 'Bắc Giang', 'Bắc Kạn', 'Bạc Liêu',
    'Bắc Ninh', 'Bến Tre', 'Bình Định', 'Bình Dương', 'Bình Phước', 'Bình Thuận', 'Cà Mau', 'Cao Bằng', 'Đắk Lắk', 'Đắk Nông',
    'Điện Biên', 'Đồng Nai', 'Đồng Tháp', 'Gia Lai', 'Hà Giang', 'Hà Nam', 'Hà Tĩnh', 'Hải Dương', 'Hậu Giang', 'Hòa Bình',
    'Hưng Yên', 'Khánh Hòa', 'Kiên Giang', 'Kon Tum', 'Lai Châu', 'Lâm Đồng', 'Lạng Sơn', 'Lào Cai', 'Long An', 'Nam Định',
    'Nghệ An', 'Ninh Bình', 'Ninh Thuận', 'Phú Thọ', 'Phú Yên', 'Quảng Bình', 'Quảng Nam', 'Quảng Ngãi', 'Quảng Ninh', 'Quảng Trị',
    'Sóc Trăng', 'Sơn La', 'Tây Ninh', 'Thái Bình', 'Thái Nguyên', 'Thanh Hóa', 'Thừa Thiên Huế', 'Tiền Giang', 'Trà Vinh', 'Tuyên Quang',
    'Vĩnh Long', 'Vĩnh Phúc', 'Yên Bái'
].map((province, index) => ({ province_id: String(index + 1), province_name: province }))

const createPriceLabel = (min, max) => {
    if ((min === 0 || min === null) && max !== null) return `Dưới ${max} triệu`
    if (min !== null && max === null) return `Trên ${min} triệu`
    return `${min} triệu - ${max} triệu`
}

const createAreaLabel = (min, max) => {
    if ((min === 0 || min === null) && max !== null) return `Dưới ${max}m2`
    if (min !== null && max === null) return `Trên ${min}m2`
    return `${min}m2 - ${max}m2`
}

const fallbackPrices = [
    { code: 'p1', value: 'Dưới 1 triệu', min: 0, max: 1, order: 1 },
    { code: 'p2', value: '1 triệu - 3 triệu', min: 1, max: 3, order: 2 },
    { code: 'p3', value: '3 triệu - 5 triệu', min: 3, max: 5, order: 3 },
    { code: 'p4', value: '5 triệu - 7 triệu', min: 5, max: 7, order: 4 },
    { code: 'p5', value: '7 triệu - 10 triệu', min: 7, max: 10, order: 5 },
    { code: 'p6', value: '10 triệu - 15 triệu', min: 10, max: 15, order: 6 },
    { code: 'p7', value: 'Trên 15 triệu', min: 15, max: null, order: 7 },
]

const fallbackAreas = [
    { code: 'a1', value: 'Dưới 15m2', min: 0, max: 15, order: 1 },
    { code: 'a2', value: '15m2 - 20m2', min: 15, max: 20, order: 2 },
    { code: 'a3', value: '20m2 - 30m2', min: 20, max: 30, order: 3 },
    { code: 'a4', value: '30m2 - 50m2', min: 30, max: 50, order: 4 },
    { code: 'a5', value: '50m2 - 70m2', min: 50, max: 70, order: 5 },
    { code: 'a6', value: '70m2 - 90m2', min: 70, max: 90, order: 6 },
    { code: 'a7', value: 'Trên 90m2', min: 90, max: null, order: 7 },
]

const normalizeCategory = (item) => ({
    ...item,
    id: String(item.id),
    code: String(item.id),
    categoryId: String(item.id),
    legacyCode: item.code,
    routePath: item.code || formatVietnameseToString(item.value),
})

export const getCategories = () => async (dispatch) => {
    try {
        const response = await apis.apiGetCategories()
        if (response?.data.err === 0) {
            dispatch({ type: actionTypes.GET_CATEGORIES, categories: (response.data.response || []).map(normalizeCategory) })
        } else {
            dispatch({ type: actionTypes.GET_CATEGORIES, msg: response.data.msg, categories: [] })
        }
    } catch (error) {
        dispatch({ type: actionTypes.GET_CATEGORIES, categories: [] })
    }
}

export const getPrices = () => async (dispatch) => {
    try {
        const response = await apis.apiGetFilterData()
        if (response?.data.err === 0) {
            const prices = response.data.priceRanges?.slice(1).map((item, index) => {
                const min = item.min === null ? 0 : item.min / 1000000
                const max = item.max === null ? null : item.max / 1000000
                return {
                    code: `p${index + 1}`,
                    value: createPriceLabel(min, max),
                    min,
                    max,
                    order: index + 1,
                }
            }) || fallbackPrices
            dispatch({ type: actionTypes.GET_PRICES, prices, msg: '' })
        } else {
            dispatch({ type: actionTypes.GET_PRICES, msg: response.data.msg, prices: fallbackPrices })
        }
    } catch (error) {
        dispatch({ type: actionTypes.GET_PRICES, prices: fallbackPrices, msg: error?.message || '' })
    }
}

export const getAreas = () => async (dispatch) => {
    try {
        const response = await apis.apiGetFilterData()
        if (response?.data.err === 0) {
            const areas = response.data.acreageRanges?.slice(1).map((item, index) => {
                const min = item.min === null ? 0 : item.min
                const max = item.max === null ? null : item.max
                return {
                    code: `a${index + 1}`,
                    value: createAreaLabel(min, max),
                    min,
                    max,
                    order: index + 1,
                }
            }) || fallbackAreas
            dispatch({ type: actionTypes.GET_AREAS, areas, msg: '' })
        } else {
            dispatch({ type: actionTypes.GET_AREAS, msg: response.data.msg, areas: fallbackAreas })
        }
    } catch (error) {
        dispatch({ type: actionTypes.GET_AREAS, areas: fallbackAreas, msg: error?.message || '' })
    }
}

export const getProvinces = () => async (dispatch) => {
    try {
        const response = await apis.apiGetPublicProvinces()
        const provinces = response?.data?.results?.length ? response.data.results : provinceFallback
        dispatch({ type: actionTypes.GET_PROVINCES, provinces, msg: '' })
    } catch (error) {
        dispatch({ type: actionTypes.GET_PROVINCES, provinces: provinceFallback, msg: '' })
    }
}
