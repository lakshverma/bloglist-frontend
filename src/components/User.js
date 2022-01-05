/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/function-component-definition */
import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

const User = () => {
  const users = useSelector((state) => state.users);
  const blogs = useSelector((state) => state.blogs);
  const { id } = useParams();
  //   console.log(id);
  const user = users.find((n) => n.id === id);
  //   console.log(user);
  if (!user) {
    return null;
  }
  const userBlogs = blogs.filter((blog) => {
    // because initially created blogs don't have a user
    if (blog.user) {
      return (blog.user.id === id);
    }
    return [];
  });

  return (
    <div>
      <h2>{user.name}</h2>
      <h3>added blogs</h3>
      {userBlogs.map((blog) => <li key={blog.id}>{blog.title}</li>)}
    </div>
  );
};

export default User;
