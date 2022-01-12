/* eslint-disable react/jsx-filename-extension */
import PropTypes from 'prop-types';
import React from 'react';

// eslint-disable-next-line react/function-component-definition
const Login = ({
  handleLogin,
  username,
  password,
  controlUsername,
  controlPassword,
}) => (
  <div className="">
    <form onSubmit={handleLogin}>
      <div>
        <input
          id="username"
          type="text"
          value={username}
          name="Username"
          onChange={controlUsername}
          placeholder="Username"
          className="box-border w-1/6 min-w-fit px-1 bg-gray-50 mb-2 rounded outline outline-2 outline-gray-300 focus:outline-lime-700"
        />
      </div>
      <div>
        <input
          id="password"
          type="password"
          value={password}
          name="Password"
          onChange={controlPassword}
          placeholder="Password"
          className="box-border w-1/6 min-w-fit px-1 bg-gray-50 mb-2 rounded outline outline-2 outline-gray-300 focus:outline-lime-700"
        />
      </div>
      <button
        id="#login-button"
        className="bg-lime-800 hover:bg-lime-700 rounded text-lime-50 font-bold p-2 pl-4 pr-4 my-4"
        type="submit"
      >
        login
      </button>
    </form>
  </div>
);

Login.propTypes = {
  handleLogin: PropTypes.func.isRequired,
  controlUsername: PropTypes.func.isRequired,
  controlPassword: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
};

export default Login;
