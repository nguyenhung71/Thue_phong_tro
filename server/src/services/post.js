import db from '../models'
import { v4 } from 'uuid'
import { paginationHelper, paginationResponse } from '../utils/pagination'

const includeOptions = [
  { model: db.User, as: 'user', attributes: ['id', 'name', 'phone', 'email'] },
  { model: db.Label, as: 'label', attributes: ['id', 'code', 'value'] },
  { model: db.Category, as: 'category', attributes: ['id', 'code', 'value', 'subtitle'] },
  { model: db.Attribute, as: 'attribute', attributes: ['id', 'price', 'acreage', 'published', 'hashtag'] },
  { model: db.Overview, as: 'overview', attributes: ['id', 'code', 'area', 'type', 'target', 'created', 'expire', 'bonus'] },
  { model: db.Images, as: 'images', attributes: ['id', 'image'] }
]

export const getPosts = ({ page, limit, order, title, ...query }) =>
  new Promise(async (resolve, reject) => {
    try {
      const { limit: flimit, offset, page: fpage } = paginationHelper({ page, limit })
      if (title) query.title = { [db.Sequelize.Op.substring]: title }

      const data = await db.Post.findAndCountAll({
        where: query,
        offset,
        limit: flimit,
        order: order ? [order] : [['createdAt', 'DESC']],
        raw: false,
        nest: true,
        include: includeOptions
      })

      resolve({
        err: 0,
        msg: 'OK',
        response: paginationResponse(data, { page: fpage, limit: flimit })
      })
    } catch (error) {
      reject(error)
    }
  })

export const getPostsByUser = ({ page, limit, order, title, userId }) =>
  new Promise(async (resolve, reject) => {
    try {
      const { limit: flimit, offset, page: fpage } = paginationHelper({ page, limit })
      const where = { userId }
      if (title) where.title = { [db.Sequelize.Op.substring]: title }

      const data = await db.Post.findAndCountAll({
        where,
        offset,
        limit: flimit,
        order: order ? [order] : [['createdAt', 'DESC']],
        raw: false,
        nest: true,
        include: includeOptions
      })

      resolve({
        err: 0,
        msg: 'OK',
        response: paginationResponse(data, { page: fpage, limit: flimit })
      })
    } catch (error) {
      reject(error)
    }
  })

export const filterPosts = ({ page, limit, order, title, province, district, ward, priceMin, priceMax, acreageMin, acreageMax }) =>
  new Promise(async (resolve, reject) => {
    try {
      const { limit: flimit, offset, page: fpage } = paginationHelper({ page, limit })
      const where = {}

      if (title) where.title = { [db.Sequelize.Op.substring]: title }

      const addressParts = []
      if (province && province !== 'Toàn quốc') addressParts.push(province)
      if (district && district !== 'Tất cả') addressParts.push(district)
      if (ward && ward !== 'Tất cả') addressParts.push(ward)
      if (addressParts.length > 0) {
        where.address = {
          [db.Sequelize.Op.and]: addressParts.map(part => ({
            [db.Sequelize.Op.substring]: part
          }))
        }
      }

      const attributeWhere = {}
      if (priceMin !== undefined && priceMax !== undefined) {
        attributeWhere.price = { [db.Sequelize.Op.between]: [+priceMin, +priceMax] }
      } else if (priceMin !== undefined) {
        attributeWhere.price = { [db.Sequelize.Op.gte]: +priceMin }
      } else if (priceMax !== undefined) {
        attributeWhere.price = { [db.Sequelize.Op.lte]: +priceMax }
      }

      if (acreageMin !== undefined && acreageMax !== undefined) {
        attributeWhere.acreage = { [db.Sequelize.Op.between]: [+acreageMin, +acreageMax] }
      } else if (acreageMin !== undefined) {
        attributeWhere.acreage = { [db.Sequelize.Op.gte]: +acreageMin }
      } else if (acreageMax !== undefined) {
        attributeWhere.acreage = { [db.Sequelize.Op.lte]: +acreageMax }
      }

      const hasAttributeFilter = Object.keys(attributeWhere).length > 0

      const data = await db.Post.findAndCountAll({
        where,
        offset,
        limit: flimit,
        order: order ? [order] : [['createdAt', 'DESC']],
        raw: false,
        nest: true,
        include: [
          ...includeOptions.filter(i => i.as !== 'attribute'),
          {
            model: db.Attribute,
            as: 'attribute',
            attributes: ['id', 'price', 'acreage', 'published', 'hashtag'],
            where: hasAttributeFilter ? attributeWhere : undefined,
            required: hasAttributeFilter
          }
        ]
      })

      resolve({
        err: 0,
        msg: 'OK',
        response: paginationResponse(data, { page: fpage, limit: flimit })
      })
    } catch (error) {
      reject(error)
    }
  })

export const getPostById = (id) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await db.Post.findOne({
        where: { id },
        raw: false,
        nest: true,
        include: includeOptions
      })

      resolve({
        err: response ? 0 : 1,
        msg: response ? 'OK' : 'Không tìm thấy bài đăng.',
        response
      })
    } catch (error) {
      reject(error)
    }
  })

export const createPost = (payload) =>
  new Promise(async (resolve, reject) => {
    const transaction = await db.sequelize.transaction()
    try {
      const {
        title, address, province, district,
        categoryCode, description, price, acreage,
        userId, files
      } = payload

      // 1. Tạo Attribute (giá, diện tích)
      const attribute = await db.Attribute.create({
        id: v4(),
        price,
        acreage,
        published: new Date().toLocaleDateString('vi-VN'),
        hashtag: `#${Math.floor(Math.random() * 99999)}`
      }, { transaction })

      // 2. Tạo Overview
      const overview = await db.Overview.create({
        id: v4(),
        code: `OV${Math.floor(Math.random() * 99999)}`,
        area: acreage,
        type: categoryCode,
        target: 'Tất cả',
        created: new Date(),
        expire: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 ngày
        bonus: 'Tin thường'
      }, { transaction })

      // 3. Upload và lưu ảnh
      let imagesId = null
      if (files && files.length > 0) {
        const imageUrls = files.map(f => f.path).join(',')
        const image = await db.Images.create({
          id: v4(),
          image: imageUrls
        }, { transaction })
        imagesId = image.id
      }

      // 4. Tạo Post
      const fullAddress = [address, district, province].filter(Boolean).join(', ')
      const post = await db.Post.create({
        id: v4(),
        title,
        star: '0',
        address: fullAddress,
        categoryCode,
        description,
        userId,
        attributeId: attribute.id,
        overviewId: overview.id,
        imagesId
      }, { transaction })

      await transaction.commit()

      resolve({
        err: 0,
        msg: 'Tạo bài đăng thành công.',
        response: post
      })
    } catch (error) {
      await transaction.rollback()
      reject(error)
    }
  })

export const updatePost = (payload, id, userId, roleId) =>
  new Promise(async (resolve, reject) => {
    try {
      const post = await db.Post.findOne({ where: { id }, raw: true })
      if (!post) return resolve({ err: 1, msg: 'Không tìm thấy bài đăng.' })

      if (roleId !== 'ADMIN' && post.userId !== userId) {
        return resolve({ err: 1, msg: 'Bạn không có quyền sửa bài đăng này.' })
      }

      const response = await db.Post.update(payload, { where: { id } })
      resolve({
        err: response[0] > 0 ? 0 : 1,
        msg: response[0] > 0 ? 'Cập nhật thành công.' : 'Cập nhật thất bại.',
      })
    } catch (error) {
      reject(error)
    }
  })

export const deletePost = (id, userId, roleId) =>
  new Promise(async (resolve, reject) => {
    try {
      const post = await db.Post.findOne({ where: { id }, raw: true })
      if (!post) return resolve({ err: 1, msg: 'Không tìm thấy bài đăng.' })

      if (roleId !== 'ADMIN' && post.userId !== userId) {
        return resolve({ err: 1, msg: 'Bạn không có quyền xóa bài đăng này.' })
      }

      const response = await db.Post.destroy({ where: { id } })
      resolve({
        err: response > 0 ? 0 : 1,
        msg: response > 0 ? 'Xóa bài đăng thành công.' : 'Xóa bài đăng thất bại.',
      })
    } catch (error) {
      reject(error)
    }
  })