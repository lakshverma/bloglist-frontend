/* eslint-disable default-param-last */

import blogService from '../services/blogs';

/* eslint-disable no-unused-vars */
const blogReducer = (state = [], action) => {
  switch (action.type) {
    case 'NEW_BLOG':
      return [...state, action.data];
    case 'LIKE_BLOG': {
      const { id } = action.data;
      const blogToLike = state.find((n) => n.id === id);
      const likedBlog = { ...blogToLike, likes: blogToLike.likes + 1 };

      return state.map((blog) => (blog.id !== id ? blog : likedBlog));
    }
    case 'DELETE_BLOG': {
      const { id } = action.data;
      const updatedBlogs = state.filter(
        (n) => n.id !== id,
      );
      return updatedBlogs;
    }
    case 'INIT_BLOGS':
      return action.data;
    default:
      return state;
  }
};

export const initializeBlogs = () => async (dispatch) => {
  let blogs = await blogService.getAll();
  blogs = blogs.sort((a, b) => b.likes - a.likes);
  dispatch({
    type: 'INIT_BLOGS',
    data: blogs,
  });
};

export const createBlogAction = (content) => async (dispatch) => {
  const newBlog = await blogService.create(content);
  dispatch({
    type: 'NEW_BLOG',
    data: newBlog,
  });
};

export const addLikes = (blog) => {
  const blogToUpdate = { ...blog, likes: blog.likes + 1 };
  return async (dispatch) => {
    const updatedBlog = await blogService.update(blogToUpdate);
    dispatch({
      type: 'LIKE_BLOG',
      data: { id: updatedBlog.id },
    });
  };
};

export const deleteBlog = (blogToDelete) => async (dispatch) => {
  await blogService.deleteBlog(blogToDelete);
  dispatch({
    type: 'DELETE_BLOG',
    data: { id: blogToDelete.id },
  });
};

export default blogReducer;
