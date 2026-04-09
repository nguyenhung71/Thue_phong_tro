import db from '../models'
import { v4 } from 'uuid'

const includeOptions = [
  {
    model: db.User,
    as: 'user',
    attributes: ['id', 'name', 'phone', 'email']
  },
  {
    model: db.Label,
    as: 'label',
    attributes: ['id', 'code', 'value']
  },
  {
    model: db.Category,
    as: 'category',
    attributes: ['id', 'code', 'value', 'subtitle']
  },
  {
    model: db.Attribute,
    as: 'attribute',
    attributes: ['id', 'price', 'acreage', 'published', 'hashtag']
  },
  {
    model: db.Overview,
    as: 'overview',
    attributes: ['id', 'code', 'area', 'type', 'target', 'created', 'expire', 'bonus']
  },
  {
    model: db.Images,
    as: 'images',
    attributes: ['id', 'image']
  }
]

export const getPosts = ({ page, limit, order, title, ...query }) =>
  new Promise(async (resolve, reject) => {
    try {
      const offset = (!page || +page <= 1) ? 0 : (+page - 1) * +limit
      const flimit = +limit || 10
      if (title) query.title = { [db.Sequelize.Op.substring]: title }

      const response = await db.Post.findAndCountAll({
        where: query,
        offset,
        limit: flimit,
        order: order ? [order] : [['createdAt', 'DESC']],
        raw: false,
        nest: true,
        include: includeOptions
      })

      resolve({
        err: response ? 0 : 1,
        msg: response ? 'OK' : 'Failed to get posts.',
        response
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

export const getPostsByUser = ({ page, limit, order, title, userId }) =>
  new Promise(async (resolve, reject) => {
    try {
      const offset = (!page || +page <= 1) ? 0 : (+page - 1) * +limit
      const flimit = +limit || 10
      const where = { userId }
      if (title) where.title = { [db.Sequelize.Op.substring]: title }

      const response = await db.Post.findAndCountAll({
        where,
        offset,
        limit: flimit,
        order: order ? [order] : [['createdAt', 'DESC']],
        raw: false,
        nest: true,
        include: includeOptions
      })

      resolve({
        err: response ? 0 : 1,
        msg: response ? 'OK' : 'Failed to get posts.',
        response
      })
    } catch (error) {
      reject(error)
    }
  })

export const createPost = (payload) =>
  new Promise(async (resolve, reject) => {
    try {
      const {
        title, labelCode, address, attributeId,
        categoryCode, description, userId,
        overviewId, imagesId
      } = payload

      const response = await db.Post.create({
        id: v4(),
        title,
        star: '0',
        labelCode,
        address,
        attributeId,
        categoryCode,
        description,
        userId,
        overviewId,
        imagesId
      })

      resolve({
        err: response ? 0 : 1,
        msg: response ? 'Tạo bài đăng thành công.' : 'Tạo bài đăng thất bại.',
        response
      })
    } catch (error) {
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

  export const filterPosts = ({
  page,
  limit,
  order,
  title,
  province,
  district,
  ward,
  priceMin,
  priceMax,
  acreageMin,
  acreageMax,
}) =>
  new Promise(async (resolve, reject) => {
    try {
      const offset = (!page || +page <= 1) ? 0 : (+page - 1) * +limit
      const flimit = +limit || 10
      const where = {}

      // Tìm kiếm theo tiêu đề
      if (title) where.title = { [db.Sequelize.Op.substring]: title }

      // Lọc theo khu vực
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

      // Lọc theo giá và diện tích qua Attribute
      const attributeWhere = {}
      if (priceMin !== undefined && priceMax !== undefined) {
        attributeWhere.price = {
          [db.Sequelize.Op.between]: [+priceMin, +priceMax]
        }
      } else if (priceMin !== undefined) {
        attributeWhere.price = { [db.Sequelize.Op.gte]: +priceMin }
      } else if (priceMax !== undefined) {
        attributeWhere.price = { [db.Sequelize.Op.lte]: +priceMax }
      }

      if (acreageMin !== undefined && acreageMax !== undefined) {
        attributeWhere.acreage = {
          [db.Sequelize.Op.between]: [+acreageMin, +acreageMax]
        }
      } else if (acreageMin !== undefined) {
        attributeWhere.acreage = { [db.Sequelize.Op.gte]: +acreageMin }
      } else if (acreageMax !== undefined) {
        attributeWhere.acreage = { [db.Sequelize.Op.lte]: +acreageMax }
      }

      const hasAttributeFilter = Object.keys(attributeWhere).length > 0

      const response = await db.Post.findAndCountAll({
        where,
        offset,
        limit: flimit,
        order: order ? [order] : [['createdAt', 'DESC']],
        raw: false,
        nest: true,
        include: [
          {
            model: db.User,
            as: 'user',
            attributes: ['id', 'name', 'phone', 'email']
          },
          {
            model: db.Label,
            as: 'label',
            attributes: ['id', 'code', 'value']
          },
          {
            model: db.Category,
            as: 'category',
            attributes: ['id', 'code', 'value', 'subtitle']
          },
          {
            model: db.Attribute,
            as: 'attribute',
            attributes: ['id', 'price', 'acreage', 'published', 'hashtag'],
            where: hasAttributeFilter ? attributeWhere : undefined,
            required: hasAttributeFilter
          },
          {
            model: db.Overview,
            as: 'overview',
            attributes: ['id', 'code', 'area', 'type', 'target', 'created', 'expire', 'bonus']
          },
          {
            model: db.Images,
            as: 'images',
            attributes: ['id', 'image']
          }
        ]
      })

      resolve({
        err: response ? 0 : 1,
        msg: response ? 'OK' : 'Failed to filter posts.',
        response
      })
    } catch (error) {
      reject(error)
    }
  })