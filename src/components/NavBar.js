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
    <nav>
      <Link style={padding} to="/">blogs</Link>
      <Link style={padding} to="/users">users</Link>
      {user.name}
      {' '}
      is logged in
      {' '}
      <button type="button" onClick={handleLogout}> Logout </button>
    </nav>
  );
};

export default NavBar;
