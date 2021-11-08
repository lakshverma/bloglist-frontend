import React, { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";

const Login = ({
  handleLogin,
  username,
  password,
  controlUsername,
  controlPassword,
}) => {
  return (
    <div>
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            type="text"
            value={username}
            name="Username"
            onChange={controlUsername}
          />
        </div>
        <div>
          password
          <input
            type="password"
            value={password}
            name="Password"
            onChange={controlPassword}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  );
};

const BlogForm = ({handleBlogSubmit, title, author, url, controlTitle, controlAuthor, controlUrl}) => {

  return (
    <form onSubmit={handleBlogSubmit}>
      <div>
        <h2> create new </h2>
        <div> title <input type="text" value={title} name="title" onChange={controlTitle} /> </div>
        <div> author <input type="text" value={author} name="author" onChange={controlAuthor} /> </div>
        <div> url <input type="text" value={url} name="url" onChange={controlUrl} /> </div>
      </div>
      <button type="submit">create</button>
    </form>
  )
}

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null)
  const [errorType, setErrorType] = useState(null)
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

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
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  };

  const handleBlogSubmit = async (event) => {
    event.preventDefault()
    const blogObject = {
      title: title,
      author: author,
      url: url
    }
    try {
      const newBlog = await blogService.create(blogObject)
      setBlogs(blogs.concat(newBlog))
      setTitle("")
      setAuthor("")
      setUrl("")
      setErrorMessage("New Blog added successfully!")
      setErrorType("success")
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    } catch (exception) {
      // console.log("the exception is: ", exception.message)
      setErrorMessage(exception.message)
      setErrorType("error")
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
      
    
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
          <BlogForm 
          handleBlogSubmit={handleBlogSubmit}
          title={title}
          author={author}
          url={url}
          controlTitle={({ target }) => setTitle(target.value)}
          controlAuthor={({ target }) => setAuthor(target.value)}
          controlUrl={({ target }) => setUrl(target.value)}
          />
          {blogs.map((blog) => (
            <Blog key={blog.id} blog={blog} />
          ))}
        </div>
        }
    </div>
  );
};

export default App;
