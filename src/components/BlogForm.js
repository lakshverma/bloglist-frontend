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
    <form onSubmit={addBlog} className="text-neutral-700 blogForm">
      <div>
        <h2 className="font-bold text-2xl mt-4 mb-4"> Create New </h2>
        <div>
          <div>
            title
          </div>
          <input
            id="title"
            type="text"
            value={title}
            name="title"
            onChange={controlTitle}
            className="bg-gray-50 mb-2 rounded outline outline-2 outline-gray-300 focus:outline-lime-700"
          />
          {' '}
        </div>
        <div>
          <div>
            author
          </div>
          <input
            id="author"
            type="text"
            value={author}
            name="author"
            onChange={controlAuthor}
            className="bg-gray-50 mb-2 rounded outline outline-2 outline-gray-300 focus:outline-lime-700"
          />
          {' '}
        </div>
        <div>
          <div>
            url
          </div>
          <input
            id="url"
            type="text"
            value={url}
            name="url"
            onChange={controlUrl}
            className="bg-gray-50 rounded outline outline-2 outline-gray-300 focus:outline-lime-700"
          />
          {' '}
        </div>
      </div>
      <button
        id="create-blog-button"
        type="submit"
        className="bg-lime-800 hover:bg-lime-700 rounded text-lime-50 font-bold p-2 pl-4 pr-4 mt-4 mb-4"
      >
        create
      </button>
    </form>
  );
};

export default BlogForm;
