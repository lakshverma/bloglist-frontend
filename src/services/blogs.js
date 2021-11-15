import axios from 'axios';

const baseUrl = '/api/blogs';

let token = null;

const setToken = (newToken) => {
  token = `bearer ${newToken}`;
};
const getAll = async () => {
  const config = {
    headers: { Authorization: token },
  };
  // console.log('config: ', config);
  const request = await axios.get(baseUrl, config);
  return request.data;
};

const create = async (newBlog) => {
  const config = {
    headers: { Authorization: token },
  };

  const request = await axios.post(baseUrl, newBlog, config);
  return request.data;
};

const update = async (updatedBlog) => {
  const config = {
    headers: { Authorization: token },
  };
  // console.log({updatedBlog})
  const request = await axios.put(`${baseUrl}/${updatedBlog.id}`, updatedBlog, config);
  return request.data;
};

const deleteBlog = async (blogToDelete) => {
  const config = {
    headers: { Authorization: token },
  };
  const request = await axios.delete(`${baseUrl}/${blogToDelete.id}`, config);
  return request.data;
};

const blogService = {
  getAll, create, update, deleteBlog, setToken,
};

export default blogService;
