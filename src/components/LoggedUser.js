/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/function-component-definition */
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logoutAction } from '../reducer/userReducer';

const LoggedUser = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  if (!user) {
    return null;
  }

  const handleLogout = () => {
    dispatch(logoutAction());
  };

  return (
    <div>
      <p>
        {user.name}
        {' '}
        is logged in
        {' '}
      </p>
      <button type="button" onClick={handleLogout}> Logout </button>
    </div>

  );
};

export default LoggedUser;
