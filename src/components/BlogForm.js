import React, {useState} from 'react'

const BlogForm = ({ createBlog }) => {
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [url, setUrl] = useState("");
  
    const controlTitle = (event) => setTitle(event.target.value)
    const controlAuthor= (event) => setAuthor(event.target.value)
    const controlUrl = (event) => setUrl(event.target.value)
  
    const addBlog = (event) => {
      event.preventDefault()
      createBlog({
        title: title,
        author: author,
        url: url
      })
      setTitle("")
      setAuthor("")
      setUrl("")
    }
  
    return (
      <form onSubmit={addBlog}>
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

  export default BlogForm