import db from '../models'
import { v4 } from 'uuid'
import cloudinary from '../config/cloudinary'
import { paginationHelper, paginationResponse } from '../utils/pagination'

const includeOptions = [
  { model: db.User, as: 'user', attributes: ['id', 'name', 'phone', 'email', 'zalo', 'avatar'] },
  { model: db.Category, as: 'category', attributes: ['id', 'code', 'value', 'subheader', 'header'] },
  { model: db.Attribute, as: 'attribute', attributes: ['id', 'price', 'acreage', 'published'] },
  { model: db.Overview, as: 'overview', attributes: ['id', 'code', 'target', 'created', 'expire', 'bonus'] },
  { model: db.Images, as: 'images', attributes: ['id', 'image'] }
]

const uploadBufferToCloudinary = (file) => new Promise((resolve, reject) => {
  const dataUri = `data:${file.mimetype};base64,${file.buffer.toString('base64')}`
  cloudinary.uploader.upload(dataUri, { folder: 'thue-phong-tro' }, (error, result) => {
    if (error) return reject(error)
    resolve(result?.secure_url)
  })
})

const normalizePost = (post) => {
  if (!post) return post
  const plainPost = post?.toJSON ? post.toJSON() : JSON.parse(JSON.stringify(post))
  if (plainPost.attribute && !plainPost.attributes) plainPost.attributes = plainPost.attribute
  return plainPost
}

const normalizePaginatedResponse = (payload) => {
  if (!payload?.response?.rows) return payload
  return {
    ...payload,
    response: {
      ...payload.response,
      rows: payload.response.rows.map(normalizePost)
    }
  }
}

const getOrderConfig = ({ sort, order }) => {
  if (Array.isArray(order)) return [order]
  if (sort === 'default') return [['updatedAt', 'DESC']]
  if (sort === 'newest') return [['createdAt', 'DESC']]
  return [['createdAt', 'DESC']]
}

const resolveCategoryValue = async (categoryValue) => {
  if (!categoryValue) return null

  const category = await db.Category.findOne({
    where: {
      [db.Sequelize.Op.or]: [
        { id: categoryValue },
        { id: Number(categoryValue) || null },
        { code: categoryValue },
      ]
    },
    raw: true,
  })

  return category ? String(category.id) : String(categoryValue)
}

const buildCategoryWhere = ({ categoryId, categoryCode }) => {
  const categoryValues = [categoryId, categoryCode].filter(Boolean).map((item) => String(item))
  if (!categoryValues.length) return null
  return { [db.Sequelize.Op.in]: categoryValues }
}

export const getPosts = ({ page, limit, order, sort, title, categoryId, categoryCode, ...query }) => new Promise(async (resolve, reject) => {
  try {
    const { limit: flimit, offset, page: fpage } = paginationHelper({ page, limit })
    if (title) query.title = { [db.Sequelize.Op.substring]: title }

    const categoryWhere = buildCategoryWhere({ categoryId, categoryCode })
    if (categoryWhere) query.categoryCode = categoryWhere

    const data = await db.Post.findAndCountAll({
      where: query,
      offset,
      limit: flimit,
      order: getOrderConfig({ sort, order }),
      raw: false,
      nest: true,
      include: includeOptions
    })

    resolve(normalizePaginatedResponse({ err: 0, msg: 'OK', response: paginationResponse(data, { page: fpage, limit: flimit }) }))
  } catch (error) {
    reject(error)
  }
})

export const getNewPosts = ({ limit }) => new Promise(async (resolve, reject) => {
  try {
    const flimit = +limit || 5
    const rows = await db.Post.findAll({ order: [['createdAt', 'DESC']], limit: flimit, raw: false, nest: true, include: includeOptions })
    resolve({ err: 0, msg: 'OK', response: rows.map(normalizePost) })
  } catch (error) {
    reject(error)
  }
})

export const getPostsByUser = ({ page, limit, order, sort, title, userId }) => new Promise(async (resolve, reject) => {
  try {
    const { limit: flimit, offset, page: fpage } = paginationHelper({ page, limit })
    const where = { userId }
    if (title) where.title = { [db.Sequelize.Op.substring]: title }

    const data = await db.Post.findAndCountAll({
      where,
      offset,
      limit: flimit,
      order: getOrderConfig({ sort, order }),
      raw: false,
      nest: true,
      include: includeOptions
    })

    resolve(normalizePaginatedResponse({ err: 0, msg: 'OK', response: paginationResponse(data, { page: fpage, limit: flimit }) }))
  } catch (error) {
    reject(error)
  }
})

export const filterPosts = ({ page, limit, order, sort, title, province, district, ward, categoryId, categoryCode, priceMin, priceMax, acreageMin, acreageMax }) => new Promise(async (resolve, reject) => {
  try {
    const { limit: flimit, offset, page: fpage } = paginationHelper({ page, limit })
    const where = {}
    if (title) where.title = { [db.Sequelize.Op.substring]: title }

    const categoryWhere = buildCategoryWhere({ categoryId, categoryCode })
    if (categoryWhere) where.categoryCode = categoryWhere

    const addressParts = []
    if (province && province !== 'Toàn quốc') addressParts.push(province)
    if (district && district !== 'Tất cả') addressParts.push(district)
    if (ward && ward !== 'Tất cả') addressParts.push(ward)
    if (addressParts.length > 0) {
      where.address = { [db.Sequelize.Op.and]: addressParts.map((part) => ({ [db.Sequelize.Op.substring]: part })) }
    }

    const attributeWhere = {}
    if (priceMin !== undefined && priceMax !== undefined) attributeWhere.price = { [db.Sequelize.Op.between]: [+priceMin, +priceMax] }
    else if (priceMin !== undefined) attributeWhere.price = { [db.Sequelize.Op.gte]: +priceMin }
    else if (priceMax !== undefined) attributeWhere.price = { [db.Sequelize.Op.lte]: +priceMax }

    if (acreageMin !== undefined && acreageMax !== undefined) attributeWhere.acreage = { [db.Sequelize.Op.between]: [+acreageMin, +acreageMax] }
    else if (acreageMin !== undefined) attributeWhere.acreage = { [db.Sequelize.Op.gte]: +acreageMin }
    else if (acreageMax !== undefined) attributeWhere.acreage = { [db.Sequelize.Op.lte]: +acreageMax }

    const hasAttributeFilter = Object.keys(attributeWhere).length > 0
    const data = await db.Post.findAndCountAll({
      where,
      offset,
      limit: flimit,
      order: getOrderConfig({ sort, order }),
      raw: false,
      nest: true,
      include: [
        ...includeOptions.filter((item) => item.as !== 'attribute'),
        { model: db.Attribute, as: 'attribute', attributes: ['id', 'price', 'acreage', 'published'], where: hasAttributeFilter ? attributeWhere : undefined, required: hasAttributeFilter }
      ]
    })

    resolve(normalizePaginatedResponse({ err: 0, msg: 'OK', response: paginationResponse(data, { page: fpage, limit: flimit }) }))
  } catch (error) {
    reject(error)
  }
})

export const getPostById = (id) => new Promise(async (resolve, reject) => {
  try {
    const response = await db.Post.findOne({ where: { id }, raw: false, nest: true, include: includeOptions })
    resolve({ err: response ? 0 : 1, msg: response ? 'OK' : 'Không tìm thấy bài đăng.', response: response ? normalizePost(response) : null })
  } catch (error) {
    reject(error)
  }
})

export const createPost = (payload) => new Promise(async (resolve, reject) => {
  const transaction = await db.sequelize.transaction()
  try {
    const { title, address, province, district, categoryCode, description, price, acreage, userId, files, target } = payload
    const resolvedCategoryId = await resolveCategoryValue(categoryCode)

    const attribute = await db.Attribute.create({ id: v4(), price, acreage, published: new Date().toLocaleDateString('vi-VN') }, { transaction })
    const overview = await db.Overview.create({
      id: v4(),
      code: `OV${Math.floor(Math.random() * 99999)}`,
      target: target || 'Tất cả',
      created: new Date(),
      expire: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      bonus: 'Tin thường'
    }, { transaction })

    let imagesId = null
    if (files && files.length > 0) {
      const imageUrls = await Promise.all(files.map(uploadBufferToCloudinary))
      const image = await db.Images.create({ id: v4(), image: imageUrls.join(',') }, { transaction })
      imagesId = image.id
    }

    const fullAddress = [address, district, province].filter(Boolean).join(', ')
    const post = await db.Post.create({
      id: v4(),
      title,
      address: fullAddress,
      categoryCode: resolvedCategoryId,
      description,
      userId,
      attributeId: attribute.id,
      overviewId: overview.id,
      imagesId
    }, { transaction })
    await transaction.commit()
    resolve({ err: 0, msg: 'Tạo bài đăng thành công.', response: post })
  } catch (error) {
    await transaction.rollback()
    reject(error)
  }
})

export const updatePost = (payload, id, userId, roleId) => new Promise(async (resolve, reject) => {
  const transaction = await db.sequelize.transaction()
  try {
    const post = await db.Post.findOne({
      where: { id },
      raw: false,
      nest: true,
      include: [
        { model: db.Attribute, as: 'attribute', attributes: ['id'] },
        { model: db.Overview, as: 'overview', attributes: ['id'] },
        { model: db.Images, as: 'images', attributes: ['id', 'image'] }
      ]
    })

    if (!post) {
      await transaction.rollback()
      return resolve({ err: 1, msg: 'Không tìm thấy bài đăng.' })
    }

    const plainPost = post.toJSON()
    if (roleId !== 'ADMIN' && plainPost.userId !== userId) {
      await transaction.rollback()
      return resolve({ err: 1, msg: 'Bạn không có quyền sửa bài đăng này.' })
    }

    const { title, address, province, district, categoryCode, description, price, acreage, target, files } = payload
    const resolvedCategoryId = await resolveCategoryValue(categoryCode)
    const fullAddress = [address, district, province].filter(Boolean).join(', ')

    await db.Post.update({ title, address: fullAddress, categoryCode: resolvedCategoryId, description }, { where: { id }, transaction })
    if (plainPost.attribute?.id) {
      await db.Attribute.update({ price, acreage, published: new Date().toLocaleDateString('vi-VN') }, { where: { id: plainPost.attribute.id }, transaction })
    }
    if (plainPost.overview?.id) {
      await db.Overview.update({ target: target || 'Tất cả' }, { where: { id: plainPost.overview.id }, transaction })
    }

    if (files && files.length > 0) {
      const imageUrls = await Promise.all(files.map(uploadBufferToCloudinary))
      if (plainPost.images?.id) {
        await db.Images.update({ image: imageUrls.join(',') }, { where: { id: plainPost.images.id }, transaction })
      } else {
        const image = await db.Images.create({ id: v4(), image: imageUrls.join(',') }, { transaction })
        await db.Post.update({ imagesId: image.id }, { where: { id }, transaction })
      }
    }

    await transaction.commit()
    resolve({ err: 0, msg: 'Cập nhật bài đăng thành công.' })
  } catch (error) {
    await transaction.rollback()
    reject(error)
  }
})

export const deletePost = (id, userId, roleId) => new Promise(async (resolve, reject) => {
  const transaction = await db.sequelize.transaction()
  try {
    const post = await db.Post.findOne({ where: { id }, raw: true, transaction })
    if (!post) {
      await transaction.rollback()
      return resolve({ err: 1, msg: 'Không tìm thấy bài đăng.' })
    }
    if (roleId !== 'ADMIN' && post.userId !== userId) {
      await transaction.rollback()
      return resolve({ err: 1, msg: 'Bạn không có quyền xóa bài đăng này.' })
    }

    const response = await db.Post.destroy({ where: { id }, transaction })
    if (response > 0) {
      if (post.attributeId) await db.Attribute.destroy({ where: { id: post.attributeId }, transaction })
      if (post.overviewId) await db.Overview.destroy({ where: { id: post.overviewId }, transaction })
      if (post.imagesId) await db.Images.destroy({ where: { id: post.imagesId }, transaction })
    }

    await transaction.commit()
    resolve({ err: response > 0 ? 0 : 1, msg: response > 0 ? 'Xóa bài đăng thành công.' : 'Xóa bài đăng thất bại.' })
  } catch (error) {
    await transaction.rollback()
    reject(error)
  }
})
