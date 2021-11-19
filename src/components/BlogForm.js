/* eslint-disable react/function-component-definition */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-filename-extension */
import React, { useState } from 'react';

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  const controlTitle = (event) => setTitle(event.target.value);
  const controlAuthor = (event) => setAuthor(event.target.value);
  const controlUrl = (event) => setUrl(event.target.value);

  const addBlog = (event) => {
    event.preventDefault();
    createBlog({
      title,
      author,
      url,
    });
    setTitle('');
    setAuthor('');
    setUrl('');
  };

  return (
    <form onSubmit={addBlog} className="blogForm">
      <div>
        <h2> create new </h2>
        <div>
          {' '}
          title
          {' '}
          <input
            id="title"
            type="text"
            value={title}
            name="title"
            onChange={controlTitle}
          />
          {' '}
        </div>
        <div>
          {' '}
          author
          {' '}
          <input
            id="author"
            type="text"
            value={author}
            name="author"
            onChange={controlAuthor}
          />
          {' '}
        </div>
        <div>
          {' '}
          url
          {' '}
          <input
            id="url"
            type="text"
            value={url}
            name="url"
            onChange={controlUrl}
          />
          {' '}
        </div>
      </div>
      <button id="create-blog-button" type="submit">create</button>
    </form>
  );
};

export default BlogForm;
