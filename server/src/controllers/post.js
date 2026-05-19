import fs from 'fs'
import path from 'path'
import * as services from '../services/post'
import { priceRanges, acreageRanges } from '../utils/filterData'

const dataDirectory = path.resolve(process.cwd(), 'data')

const categoryFiles = {
  'nha-nguyen-can': 'nhanguyencan.json',
  'can-ho-dich-vu': 'canhodichvu.json',
  'can-ho-chung-cu': 'canhochungcu.json',
  'can-ho-mini': 'canhomini.json',
}

export const getPostsByCategory = async (req, res) => {
  const category = req.params.category
  const fileName = categoryFiles[category]

  if (!fileName) {
    return res.status(404).json({ err: 1, msg: 'Danh mục không tồn tại' })
  }

  try {
    const filePath = path.join(dataDirectory, fileName)
    const rawData = await fs.promises.readFile(filePath, 'utf8')
    const parsedData = JSON.parse(rawData)
    return res.status(200).json({ err: 0, msg: 'OK', data: parsedData })
  } catch (error) {
    return res.status(500).json({ err: -1, msg: 'Không thể đọc dữ liệu bài đăng', detail: error.message })
  }
}

export const getPosts = async (req, res) => {
  try {
    const response = await services.getPosts(req.query)
    return res.status(200).json(response)
  } catch (error) {
    return res.status(500).json({ err: -1, msg: 'Failed at post controller: ' + error })
  }
}

export const getPostsLimit = async (req, res) => {
  try {
    const response = await services.getPosts(req.query)
    return res.status(200).json(response)
  } catch (error) {
    return res.status(500).json({ err: -1, msg: 'Failed at post controller: ' + error })
  }
}

export const getNewPosts = async (req, res) => {
  try {
    const response = await services.getNewPosts(req.query)
    return res.status(200).json(response)
  } catch (error) {
    return res.status(500).json({ err: -1, msg: 'Failed at post controller: ' + error })
  }
}

export const getPostById = async (req, res) => {
  const { id } = req.params
  try {
    const response = await services.getPostById(id)
    return res.status(200).json(response)
  } catch (error) {
    return res.status(500).json({ err: -1, msg: 'Failed at post controller: ' + error })
  }
}

export const getPostsByUser = async (req, res) => {
  const { id } = req.user
  try {
    const response = await services.getPostsByUser({ ...req.query, userId: id })
    return res.status(200).json(response)
  } catch (error) {
    return res.status(500).json({ err: -1, msg: 'Failed at post controller: ' + error })
  }
}

export const createPost = async (req, res) => {
  const { id: userId } = req.user
  try {
    const { title, address, province, district, categoryCode, description, price, acreage, target } = req.body
    if (!title || !address || !categoryCode || !description || !price || !acreage) {
      return res.status(400).json({ err: 1, msg: 'Thiếu dữ liệu đầu vào.' })
    }

    const response = await services.createPost({ title, address, province, district, categoryCode, description, price, acreage, target, userId, files: req.files })
    return res.status(200).json(response)
  } catch (error) {
    return res.status(500).json({ err: -1, msg: 'Failed at post controller: ' + error })
  }
}

export const updatePost = async (req, res) => {
  const { id } = req.params
  const { id: userId, roleId } = req.user
  try {
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({ err: 1, msg: 'Thiếu dữ liệu cập nhật.' })
    }

    const response = await services.updatePost({ ...req.body, files: req.files }, id, userId, roleId)
    return res.status(200).json(response)
  } catch (error) {
    return res.status(500).json({ err: -1, msg: 'Failed at post controller: ' + error })
  }
}

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

export const getFilterData = async (req, res) => {
  try {
    return res.status(200).json({ err: 0, msg: 'OK', priceRanges, acreageRanges })
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
