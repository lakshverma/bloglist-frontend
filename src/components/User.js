/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/function-component-definition */
import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

const User = () => {
  const users = useSelector((state) => state.users);
  const blogs = useSelector((state) => state.blogs);
  const { id } = useParams();
  const user = users.find((n) => n.id === id);

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

  //   console.log(userBlogs);
  if (userBlogs.length === 0) {
    return (
      <div className="mx-24">
        <h2 className="text-6xl text-neutral-700 font-bold mt-8 mb-8">{user.name}</h2>
        <p>No blogs added yet.</p>
      </div>
    );
  }

  return (
    <div className="mx-24">
      <h2 className="text-6xl text-neutral-700 font-bold mt-8 mb-8">{user.name}</h2>
      <h3 className="text-3xl text-neutral-700">added blogs</h3>
      <ol>
        {userBlogs.map((blog) => <li key={blog.id} className="list-decimal py-2 pl-4">{blog.title}</li>)}
      </ol>
    </div>
  );
};

export default User;
