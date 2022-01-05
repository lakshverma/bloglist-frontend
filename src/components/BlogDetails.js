/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/function-component-definition */
import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

const BlogDetails = ({ handleUpdateBlog }) => {
  const blogs = useSelector((state) => state.blogs);
  const { id } = useParams();
  if (blogs.length === 0) {
    return null;
  }
  const blog = blogs.find((n) => n.id === id);

  // Although there are checks on backend, this is to ensure the app doesn't crash
  // if there is no user associated with a blog.
  // eslint-disable-next-line no-param-reassign
  blog.user = blog.user ? blog.user : 'none';
  return (
    <div>
      <h2>
        {blog.title}
        {' '}
        {blog.author}
      </h2>
      <p>{blog.url}</p>
      <div>
        {blog.likes}
        {' '}
        likes
        {' '}
        <button type="button" className="blog-like-button" onClick={() => handleUpdateBlog(blog)}>
          like
        </button>
      </div>
      <p>
        added by
        {' '}
        {blog.user.name}
        {' '}
      </p>
    </div>
  );
};

export default BlogDetails;
