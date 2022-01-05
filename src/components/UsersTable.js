/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/function-component-definition */
import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const UsersTable = () => {
  const usersList = useSelector((state) => state.users);
  return (
    <table>
      <thead>
        <tr>
          <th>Username</th>
          <th>Blogs created</th>
        </tr>
      </thead>
      <tbody>
        {usersList.map((user) => (
          <tr key={user.id}>
            <td>
              <Link to={`/users/${user.id}`}>
                {user.name}
              </Link>
            </td>
            <td>{user.blogs.length}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default UsersTable;
