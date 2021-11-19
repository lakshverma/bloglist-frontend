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
  <div>
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          id="username"
          type="text"
          value={username}
          name="Username"
          onChange={controlUsername}
        />
      </div>
      <div>
        password
        <input
          id="password"
          type="password"
          value={password}
          name="Password"
          onChange={controlPassword}
        />
      </div>
      <button id="#login-button" type="submit">login</button>
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
