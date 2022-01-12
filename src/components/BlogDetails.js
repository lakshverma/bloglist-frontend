/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/function-component-definition */
import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Comments from './Comments';

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
    <div className="mx-24 space-y-4">
      <h2 className="text-6xl text-neutral-700 font-bold mt-8 mb-8">
        {blog.title}
        {' | '}
        {blog.author}
      </h2>
      <p className="underline">{blog.url}</p>
      <div>
        {blog.likes}
        {' '}
        likes
        {' '}
        <button
          type="button"
          className="bg-lime-800 hover:bg-lime-700 rounded text-lime-50 font-bold p-1 pl-4 pr-4 blog-like-button"
          onClick={() => handleUpdateBlog(blog)}
        >
          like
        </button>
      </div>
      <p>
        added by
        {' '}
        <span className="text-green-900 font-bold italic">
          {blog.user.name}
        </span>
      </p>
      <Comments blogId={id} />
    </div>
  );
};

export default BlogDetails;
