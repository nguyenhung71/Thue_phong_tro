export const getNumbersPrice = (string = '') => {
    const numbers = string.match(/\d+(?:\.\d+)?/g)?.map(Number) || []
    return numbers
}

export const getNumbersArea = (string = '') => {
    const numbers = string.match(/\d+(?:\.\d+)?/g)?.map(Number) || []
    return numbers
}
