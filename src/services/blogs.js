import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null;

const setToken = newToken => {
  token = `bearer ${newToken}`
}
const getAll = async () => {
  const config = {
    headers: { Authorization: token },
  }
  console.log("config: ", config);
  const request = await axios.get(baseUrl, config)
  return request.data
}

const create = async newObject => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const blogService = { getAll, create, setToken }

export default blogService