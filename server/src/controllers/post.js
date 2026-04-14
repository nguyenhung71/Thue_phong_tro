import * as services from '../services/post'

// ADMIN - lấy tất cả bài đăng
export const getPosts = async (req, res) => {
  try {
    const response = await services.getPosts(req.query)
    return res.status(200).json(response)
  } catch (error) {
    return res.status(500).json({ err: -1, msg: 'Failed at post controller: ' + error })
  }
}

// Lấy bài đăng theo id
export const getPostById = async (req, res) => {
  const { id } = req.params
  try {
    const response = await services.getPostById(id)
    return res.status(200).json(response)
  } catch (error) {
    return res.status(500).json({ err: -1, msg: 'Failed at post controller: ' + error })
  }
}

// LANDLORD - lấy bài đăng của mình
export const getPostsByUser = async (req, res) => {
  const { id, roleId } = req.user
  try {
    const response = await services.getPostsByUser({ ...req.query, userId: id })
    return res.status(200).json(response)
  } catch (error) {
    return res.status(500).json({ err: -1, msg: 'Failed at post controller: ' + error })
  }
}

// LANDLORD - tạo bài đăng
export const createPost = async (req, res) => {
  const { id: userId } = req.user
  try {
    const { title, address, province, district, categoryCode, description, price, acreage } = req.body

    if (!title || !address || !categoryCode || !description || !price || !acreage) {
      return res.status(400).json({ err: 1, msg: 'Thiếu dữ liệu đầu vào.' })
    }

    const response = await services.createPost({
      title, address, province, district,
      categoryCode, description, price, acreage,
      userId,
      files: req.files
    })
    return res.status(200).json(response)
  } catch (error) {
    return res.status(500).json({ err: -1, msg: 'Failed at post controller: ' + error })
  }
}

// Cập nhật bài đăng
export const updatePost = async (req, res) => {
  const { id } = req.params
  const { id: userId, roleId } = req.user
  try {
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({ err: 1, msg: 'Thiếu dữ liệu cập nhật.' })
    }

    const response = await services.updatePost(req.body, id, userId, roleId)
    return res.status(200).json(response)
  } catch (error) {
    return res.status(500).json({ err: -1, msg: 'Failed at post controller: ' + error })
  }
}

// Xóa bài đăng
export const deletePost = async (req, res) => {
  const { id } = req.params
  const { id: userId, roleId } = req.user
  try {
    const response = await services.deletePost(id, userId, roleId)
    return res.status(200).json(response)
  } catch (error) {
    return res.status(500).json({ err: -1, msg: 'Failed at post controller: ' + error })
  }
}

import { priceRanges, acreageRanges } from '../utils/filterData'

export const getFilterData = async (req, res) => {
  try {
    return res.status(200).json({
      err: 0,
      msg: 'OK',
      priceRanges,
      acreageRanges
    })
  } catch (error) {
    return res.status(500).json({ err: -1, msg: 'Failed at post controller: ' + error })
  }
}

export const filterPosts = async (req, res) => {
  try {
    const response = await services.filterPosts(req.query)
    return res.status(200).json(response)
  } catch (error) {
    return res.status(500).json({ err: -1, msg: 'Failed at post controller: ' + error })
  }
}