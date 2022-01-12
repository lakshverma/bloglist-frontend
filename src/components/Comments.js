/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/function-component-definition */
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import blogService from '../services/blogs';
import { setNotification } from '../reducer/notificationReducer';

const Comments = ({ blogId }) => {
  const [comments, setComments] = useState([]);
  const [content, setContent] = useState('');
  useEffect(() => {
    blogService.getComments(blogId).then((fetchedComments) => setComments(fetchedComments));
  }, []);
  const dispatch = useDispatch();

  const controlComment = (event) => setContent(event.target.value);

  const createComment = async (event) => {
    event.preventDefault();
    const commentObject = { content };
    setContent('');
    try {
      const newComment = await blogService.createComment(blogId, commentObject);
      setComments(comments.concat(newComment));
      dispatch(setNotification('New comment added successfully!', 'success', 5));
    } catch (exception) {
      dispatch(setNotification(exception.message, 'error', 5));
    }
  };

  return (
    <div>
      <h3 className="text-2xl text-neutral-700 font-bold mt-8 mb-4">
        comments
      </h3>
      <form onSubmit={createComment} className="commentForm">
        <input
          id="comment-input"
          placeholder="share your thoughts"
          type="text"
          value={content}
          name="comment"
          onChange={controlComment}
          className="box-border w-1/6 min-w-fit px-1 bg-gray-50 mb-2 rounded outline outline-2 outline-gray-300 focus:outline-lime-700"
        />
        <button
        //   id="create-comment-button"
          className="block bg-lime-800 hover:bg-lime-700 rounded text-lime-50 font-bold p-2 pl-4 pr-4 my-4"
          type="submit"
        >
          add comment

        </button>
      </form>
      {comments.map((comment) => (
        <li key={comment.id}>
          {comment.content}
        </li>
      ))}
    </div>
  );
};

export default Comments;
