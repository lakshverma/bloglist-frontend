import React, { useState, useEffect } from "react";
import Login from "./components/Login";
import Blog from "./components/Blog";
import BlogForm from "./components/BlogForm";
import Togglable from "./components/Togglable";
import blogService from "./services/blogs";
import loginService from "./services/login";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null)
  const [errorType, setErrorType] = useState(null)
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  useEffect(() => {
    // Seems like something is wrong here
    blogService.getAll().then((blogs) => setBlogs(blogs));
    console.log("get all effect hook run successfully")
  }, [user]);

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      ) 

      blogService.setToken(user.token)
      setUser(user)
      console.log("localStorage: ", window.localStorage)
      setUsername('')
      setPassword('')
      console.log("Login successful!")
    } catch (exception) {
      setErrorMessage('Wrong credentials')
      setErrorType("error")
      setTimeout(() => {
        setErrorMessage(null)
        setErrorType(null)
      }, 5000)
    }
  };

  const createBlog = async (blogObject) => {

    try {
      const newBlog = await blogService.create(blogObject)
      setBlogs(blogs.concat(newBlog))
      setErrorMessage("New Blog added successfully!")
      setErrorType("success")
      setTimeout(() => {
        setErrorMessage(null)
        setErrorType(null)
      }, 5000)
    } catch (exception) {
      setErrorMessage(exception.message)
      setErrorType("error")
      setTimeout(() => {
        setErrorMessage(null)
        setErrorType(null)
      }, 5000)
    }
  }

  const updateBlog = async(id, updateObject) => {
    try {
      const updatedBlog = await blogService.update(id, updateObject)
      // console.log(`id is ${id} and updatedBlog.id is ${updatedBlog.id}`)
      console.log(updatedBlog)
      setBlogs(blogs.map((blog) => blog.id !== updatedBlog.id ? blog : updatedBlog))
      setErrorMessage("Blog updated successfully")
      setErrorType("success")
      setTimeout(() => {
        setErrorMessage(null)
        setErrorType(null)
      }, 5000)
    } catch (exception) {
      setErrorMessage(exception.message)
      setErrorType("error")
      setTimeout(() => {
        setErrorMessage(null)
        setErrorType(null)
      }, 5000)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    console.log("User successfully logged out")
  }

  return (
    <div>
      {/* A basic way to show notifications instead of creating a separate module */}
      <div className={errorType} > {errorMessage} </div>

      {user === null ? 
        <div> 
          <h2>Blogs - Login</h2> 
          <Login
          handleLogin={handleLogin}
          username={username}
          password={password}
          controlUsername={({ target }) => setUsername(target.value)}
          controlPassword={({ target }) => setPassword(target.value)}
          />
        </div> :
        <div>
          <h2>Blogs - Homepage</h2>
          <p>{user.name} is logged in </p>
          <button onClick={handleLogout}> Logout </button>
          <Togglable buttonLabel='Create new blog'>
            <BlogForm 
            createBlog={createBlog}
            />
          </Togglable>
          {blogs.map((blog) => (
            <Blog key={blog.id} blog={blog} updateBlog={updateBlog} />
          ))}
        </div>
        }
    </div>
  );
};

export default App;
