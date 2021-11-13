import React, { useState } from "react";
const Blog = ({ blog, updateBlog }) => {
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

    const addLikes = async () => {
      let updatedLikes = blog.likes + 1;
      updateBlog(blog.id, {
        user: blog.user.username,
        likes: updatedLikes,
        author: blog.author,
        title: blog.title,
        url: blog.url,
      });
    };

    return (
      <div style={(showWhenVisible, blogStyle)}>
        <div>
          {blog.title} {blog.author}{" "}
          <button onClick={toggleVisibility}>hide</button>
        </div>
        <div>{blog.url}</div>
        <div>
          likes {blog.likes} <button onClick={addLikes}>like</button>
        </div>
        {/* Make sure to remove any test data from the db without user data or else  */}
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
