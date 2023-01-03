/* eslint-disable import/no-anonymous-default-export */
import axios from 'axios'
const baseUrl = 'http://localhost:5000/api/blogs'
// eslint-disable-next-line no-unused-vars
let token = null
const setToken = (newToken) => {
  token = `bearer ${newToken}`
}
const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}
const create = async (newBlog) => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.post(baseUrl, newBlog, config)
  return response.data
}

export default { getAll, setToken, create }
