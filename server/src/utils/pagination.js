export const paginationHelper = ({ page, limit }) => {
  const flimit = +limit || 10
  const fpage = !page || +page <= 1 ? 1 : +page
  const offset = (fpage - 1) * flimit

  return { limit: flimit, offset, page: fpage }
}

export const paginationResponse = ({ count, rows }, { page, limit }) => {
  const flimit = +limit || 10
  const fpage = +page || 1
  return {
    totalItems: count,
    totalPages: Math.ceil(count / flimit),
    currentPage: fpage,
    itemsPerPage: flimit,
    rows
  }
}