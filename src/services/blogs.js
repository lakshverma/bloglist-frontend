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

const getComments = async (blogId) => {
  const config = {
    headers: { Authorization: token },
  };
  const request = await axios.get(`${baseUrl}/${blogId}/comments`, config);
  return request.data;
};

const createComment = async (blogId, comment) => {
  const config = {
    headers: { Authorization: token },
  };

  const request = await axios.post(`${baseUrl}/${blogId}/comments`, comment, config);
  return request.data;
};

const blogService = {
  getAll, create, update, deleteBlog, getComments, createComment, setToken,
};

export default blogService;
