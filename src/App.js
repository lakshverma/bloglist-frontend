/* eslint-disable no-shadow */
/* eslint-disable react/button-has-type */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/function-component-definition */
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Login from './components/Login';
import Blog from './components/Blog';
import BlogForm from './components/BlogForm';
import Togglable from './components/Togglable';
import blogService from './services/blogs';
import loginService from './services/login';
import { setNotification } from './reducer/notificationReducer';
import {
  initializeBlogs, createBlogAction, addLikes, deleteBlog,
} from './reducer/blogReducer';

const App = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);

  const notifications = useSelector((state) => state.notifications);
  const blogsStore = useSelector((state) => state.blogs);
  const dispatch = useDispatch();

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  useEffect(() => {
    if (user) {
      dispatch(initializeBlogs());
    }
    // console.log('get all effect hook run successfully');
  }, [user, dispatch]);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({
        username,
        password,
      });

      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user));

      blogService.setToken(user.token);
      setUser(user);
      setUsername('');
      setPassword('');
      // console.log('Login successful!');
    } catch (exception) {
      dispatch(setNotification('Wrong credentials', 'error', 5));
    }
  };

  const createBlog = async (blogObject) => {
    try {
      dispatch(createBlogAction(blogObject));
      dispatch(setNotification('New Blog added successfully!', 'success', 5));
    } catch (exception) {
      dispatch(setNotification(exception.message, 'error', 5));
    }
  };

  const handleUpdateBlog = async (blogToUpdate) => {
    try {
      dispatch(addLikes(blogToUpdate));
      dispatch(setNotification('Blog updated successfully', 'success', 5));
    } catch (exception) {
      dispatch(setNotification(exception.message, 'error', 5));
    }
  };

  const handleDeleteBlog = async (blogToDelete) => {
    try {
      // using confirm is not a good practice in general, this is just a temporary stop-gap solution
      // eslint-disable-next-line no-alert
      if (window.confirm(`Delete ${blogToDelete.title} ?`)) {
        if (blogToDelete.user.username !== user.username) {
          dispatch(setNotification('Can\'t delete blog created by another user', 'error', 5));
        } else {
          dispatch(deleteBlog(blogToDelete));
          dispatch(setNotification(`${blogToDelete.title} was deleted successfully.`, 'success', 5));
        }
      }
    } catch (exception) {
      dispatch(setNotification(exception.message, 'error', 5));
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser');
    // console.log('User successfully logged out');
  };

  return (
    <div>
      {/* A basic way to show notifications instead of creating a separate module */}
      <div className={notifications.type}>
        {' '}
        {notifications.message}
        {' '}
      </div>

      {user === null ? (
        <div>
          <h2>Blogs - Login</h2>
          <Login
            handleLogin={handleLogin}
            username={username}
            password={password}
            controlUsername={({ target }) => setUsername(target.value)}
            controlPassword={({ target }) => setPassword(target.value)}
          />
        </div>
      ) : (
        <div>
          <h2>Blogs - Homepage</h2>
          <p>
            {user.name}
            {' '}
            is logged in
            {' '}
          </p>
          <button onClick={handleLogout}> Logout </button>
          <Togglable buttonLabel="Create new blog">
            <BlogForm createBlog={createBlog} />
          </Togglable>
          {blogsStore.map((blog) => (
            <Blog
              key={blog.id}
              blog={blog}
              handleUpdateBlog={handleUpdateBlog}
              handleDeleteBlog={handleDeleteBlog}
            />
          ))}
          {/* {blogs.map((blog) => console.log("blog user inside App.js: ", blog.user))} */}
        </div>
      )}
    </div>
  );
};

export default App;
