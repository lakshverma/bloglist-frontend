/* eslint-disable react/function-component-definition */
/* eslint-disable react/button-has-type */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-filename-extension */
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Blog = ({ blog, handleUpdateBlog, handleDeleteBlog }) => {
  // const [blogObject, setBlogObject] = useState(blog)
  const [visible, setVisible] = useState(false);

  const hideWhenVisible = { display: visible ? 'none' : '' };
  const showWhenVisible = { display: visible ? '' : 'none' };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  };

  if (visible) {
    // Although there are checks on backend, this is to ensure the app doesn't crash
    // if there is no user.
    // eslint-disable-next-line no-param-reassign
    blog.user = blog.user ? blog.user : 'none';
    return (
      <div style={(showWhenVisible, blogStyle)} className="fullBlog">
        <div>
          {blog.title}
          {' '}
          {blog.author}
          {' '}
          <button onClick={toggleVisibility}>hide</button>
        </div>
        <div>{blog.url}</div>
        <div className="blog-likes">
          {/* Pass the single blog object to handleUpdateBlog to update likes  */}
          likes
          {' '}
          {blog.likes}
          {' '}
          <button className="blog-like-button" onClick={() => handleUpdateBlog(blog)}>like</button>
        </div>
        {/* Make sure to remove any test data from the db without user data
        or else this would break  */}
        {/* {console.log("name of the blog's user is: ", blog.user.name)} */}
        <div>
          username is:
          {' '}
          {blog.user.name}
        </div>
        <div>
          {' '}
          <button className="blog-remove-button" onClick={() => handleDeleteBlog(blog)}> remove </button>
          {' '}
        </div>
      </div>
    );
  }
  return (
    <div style={(hideWhenVisible)} className="flex items-center justify-between bg-lime-100 mt-2 mr-24 mb-2 ml-24 p-2">
      <div className="hover:underline">
        <Link to={`/blogs/${blog.id}`}>
          {blog.title}
          {' | '}
          {blog.author}
          {' '}
        </Link>
      </div>
      {/* This feature has been disabled on the UI since
      it has been made redundant by the blog view. */}
      <button className="hidden bg-lime-700 rounded hover:bg-lime-800 p-1 pr-4 pl-4 ml-4 text-lime-50 left-0 font-bold hover:text-lime-100 view-full-blog" onClick={toggleVisibility}>view</button>
    </div>
  );
};

export default Blog;
