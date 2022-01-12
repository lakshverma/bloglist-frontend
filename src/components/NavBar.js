/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/function-component-definition */
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { logoutAction } from '../reducer/userReducer';

const NavBar = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  if (!user) {
    return null;
  }

  const handleLogout = () => {
    dispatch(logoutAction());
  };

  const padding = {
    padding: 5,
  };

  return (
    <nav className=" flex flex-wrap items-center justify-between bg-lime-800 p-2 pl-24 pr-24">
      <div className="flex flex-wrap text-lime-50 list-none">
        <li className="text-lg hover:text-lime-300">
          <Link style={padding} to="/">blogs</Link>
        </li>
        <li className="text-lg hover:text-lime-300">
          <Link style={padding} to="/users">users</Link>
        </li>
      </div>

      <div className="text-lime-50">
        {user.name}
        {' '}
        is logged in
        {' '}
        <button type="button" onClick={handleLogout} className="border-lime-50 border-2 p-1 pr-4 pl-4 ml-2 rounded font-bold hover:text-lime-300 hover:border-lime-300"> Logout </button>
      </div>
    </nav>
  );
};

export default NavBar;
