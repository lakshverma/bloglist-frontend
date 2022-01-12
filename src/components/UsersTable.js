/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/function-component-definition */
import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const UsersTable = () => {
  const usersList = useSelector((state) => state.users);
  // console.log(usersList);
  return (
    <table className="text-lime-900 table-auto outline outline-lime-300 outline-1">
      <thead className="bg-neutral-200">
        <tr>
          <th className="p-2">Username</th>
          <th className="p-2">Blogs created</th>
        </tr>
      </thead>
      <tbody>
        {usersList.map((user) => (
          <tr key={user.id} className="odd:bg-white even:bg-lime-200">
            <td className="p-2 hover:underline">
              <Link to={`/users/${user.id}`}>
                {user.name}
              </Link>
            </td>
            {/* {console.log(user, user.blogs)} */}
            <td className="p-2">{user.blogs.length}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default UsersTable;
