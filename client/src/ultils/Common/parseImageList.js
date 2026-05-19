const IMAGE_FILE_PATTERN = /\.(jpg|jpeg|png|webp|gif|avif|bmp|svg)(\?|$)/i

const normalizeCandidate = (value) => String(value || '')
  .trim()
  .replace(/^["']+|["']+$/g, '')

const isLikelyImageUrl = (value) => {
  if (!/^https?:\/\//i.test(value)) return false
  if (IMAGE_FILE_PATTERN.test(value)) return true

  try {
    const parsedUrl = new URL(value)
    const normalizedPath = `${parsedUrl.pathname}${parsedUrl.search}`.toLowerCase()
    return normalizedPath.includes('/image/upload') || normalizedPath.includes('/images/')
  } catch {
    return false
  }
}

const extractCandidates = (value) => {
  if (!value) return []

  if (Array.isArray(value)) {
    return value.flatMap((item) => {
      if (typeof item === 'string') return item
      if (item && typeof item === 'object') return item.url || item.image || ''
      return ''
    })
  }

  if (typeof value !== 'string') {
    if (value && typeof value === 'object') return [value.url || value.image || '']
    return []
  }

  try {
    const parsed = JSON.parse(value)
    if (Array.isArray(parsed)) return extractCandidates(parsed)
    if (parsed && typeof parsed === 'object') return extractCandidates([parsed])
  } catch {
  }

  return value.split(',')
}

export const parseImageList = (value) => Array.from(
  new Set(
    extractCandidates(value)
      .map(normalizeCandidate)
      .filter(Boolean)
      .filter(isLikelyImageUrl)
  )
)
