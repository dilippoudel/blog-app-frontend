import axios from 'axios'
const baseUrl = 'http://localhost:5000/api/blogs'
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
const updateLike = async (blogId, like) => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.put(`${baseUrl}/${blogId}`, like, config)
  return response.data
}
const deleteBlogById = async (id) => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.delete(`${baseUrl}/${id}`, config)
  return response.data
}
export default {
  getAll,
  create,
  updateLike,
  deleteBlogById,
  setToken,
}
