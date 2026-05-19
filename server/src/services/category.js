import db from '../models'

export const getCategories = () => new Promise(async (resolve, reject) => {
  try {
    const response = await db.Category.findAll({
      raw: true,
      order: [['id', 'ASC']]
    })

    resolve({
      err: response ? 0 : 1,
      msg: response ? 'OK' : 'Failed to get categories.',
      response
    })
  } catch (error) {
    reject(error)
  }
})
