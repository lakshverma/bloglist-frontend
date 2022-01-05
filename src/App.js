/* eslint-disable no-shadow */
/* eslint-disable react/button-has-type */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/function-component-definition */
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  // eslint-disable-next-line no-unused-vars
  Switch, Route, Link,
} from 'react-router-dom';
// components
import Notification from './components/Notification';
import LoggedUser from './components/LoggedUser';
import Login from './components/Login';
import Blog from './components/Blog';
import BlogForm from './components/BlogForm';
import Togglable from './components/Togglable';
import User from './components/User';
import UsersTable from './components/UsersTable';
import BlogDetails from './components/BlogDetails';
// services
import blogService from './services/blogs';
import loginService from './services/login';
import usersService from './services/users';
// reducers and action creators
import { setNotification } from './reducer/notificationReducer';
import {
  initializeBlogs, createBlogAction, addLikes, deleteBlog,
} from './reducer/blogReducer';
import { loginAction } from './reducer/userReducer';
import { initializeUsers } from './reducer/usersReducer';

const App = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const blogsStore = useSelector((state) => state.blogs);
  const user = useSelector((state) => state.user);

  const dispatch = useDispatch();

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser');
    if (loggedUserJSON) {
      const parsedUser = JSON.parse(loggedUserJSON);
      dispatch(loginAction(parsedUser));
      blogService.setToken(parsedUser.token);
    }
  }, []);

  useEffect(() => {
    if (user) {
      dispatch(initializeBlogs());
      dispatch(initializeUsers());
    }
  }, [user, dispatch]);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const loggedBlogappUser = await loginService.login({
        username,
        password,
      });

      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(loggedBlogappUser));

      blogService.setToken(loggedBlogappUser.token);
      usersService.setToken(loggedBlogappUser.token);
      dispatch(loginAction(loggedBlogappUser));
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

  return (
    <div>
      <Switch>
        <Route path="/blogs/:id">
          <Notification />
          <LoggedUser />
          <BlogDetails handleUpdateBlog={handleUpdateBlog} />
        </Route>
        <Route path="/users/:id">
          <Notification />
          <LoggedUser />
          <User />
        </Route>
        <Route path="/users">
          <Notification />
          <h2>blogs</h2>
          <LoggedUser />
          <h2>Users</h2>
          <UsersTable />
        </Route>
        <Route path="/">
          <Notification />
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
              <LoggedUser />
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

        </Route>
      </Switch>
    </div>
  );
};

export default App;
