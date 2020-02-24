import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = async () => {
  const result = await axios.get(baseUrl)
  return result.data
}

const create = async newObject => {
  const config = {
    headers: { Authorization: token },
  }
  const result = await axios.post(baseUrl, newObject, config)
  return result.data
}

const update = async (id, newObject) => {
  const config = {
    headers: { Authorization: token },
  }
  const result = await axios.put(`${baseUrl} /${id}`, newObject, config)
  return result.data
}

export default { getAll, create, update, setToken }