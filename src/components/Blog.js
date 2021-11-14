import React, { useState } from "react";
const Blog = ({ blog, handleUpdateBlog }) => {
  // const [blogObject, setBlogObject] = useState(blog)
  const [visible, setVisible] = useState(false);

  const hideWhenVisible = { display: visible ? "none" : "" };
  const showWhenVisible = { display: visible ? "" : "none" };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  if (visible) {
    // Although there are checks on backend, this is to ensure the app doesn't crash if there is no user.
    blog.user = blog.user ? blog.user : "none";

<<<<<<< HEAD
=======
    const handleUpdates = async (updates) => {
      // let updatedLikes = blog.likes + 1;
      updateBlog({...blog, ...updates});
    };

>>>>>>> 0f731474173c03e1d93c180dbf46c2771f76049b
    return (
      <div style={(showWhenVisible, blogStyle)}>
        <div>
          {blog.title} {blog.author}{" "}
          <button onClick={toggleVisibility}>hide</button>
        </div>
        <div>{blog.url}</div>
        <div>
<<<<<<< HEAD
          {/* Pass the single blog object to handleUpdateBlog to update likes  */}
          likes {blog.likes} <button onClick={ () => (handleUpdateBlog(blog)) }>like</button>
=======
          likes {blog.likes} <button onClick={() => handleUpdates({ likes: blog.likes + 1 }) }>like</button>
>>>>>>> 0f731474173c03e1d93c180dbf46c2771f76049b
        </div>
        {/* Make sure to remove any test data from the db without user data or else this would break  */}
        <div>{blog.user.name}</div>
      </div>
    );
  } else {
    return (
      <div style={(hideWhenVisible, blogStyle)}>
        {blog.title} {blog.author}{" "}
        <button onClick={toggleVisibility}>view</button>
      </div>
    );
  }
};

export default Blog;
