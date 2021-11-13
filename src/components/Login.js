const Login = ({
  handleLogin,
  username,
  password,
  controlUsername,
  controlPassword,
}) => {
  return (
    <div>
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            type="text"
            value={username}
            name="Username"
            onChange={controlUsername}
          />
        </div>
        <div>
          password
          <input
            type="password"
            value={password}
            name="Password"
            onChange={controlPassword}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  );
};

export default Login;
