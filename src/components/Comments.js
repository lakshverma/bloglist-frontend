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
      <h3>
        comments
      </h3>
      <form onSubmit={createComment} className="commentForm">
        <input
          id="comment-input"
          type="text"
          value={content}
          name="comment"
          onChange={controlComment}
        />
        <button id="create-comment-button" type="submit">add comment</button>
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
