/* eslint-disable default-param-last */
const userReducer = (state = null, action) => {
  switch (action.type) {
    case 'LOGIN':
      return action.data;
    case 'LOGOUT':
      return null;
    default:
      return state;
  }
};

export const loginAction = (user) => async (dispatch) => {
  dispatch({
    type: 'LOGIN',
    data: user,
  });
};

export const logoutAction = () => {
  window.localStorage.removeItem('loggedBlogappUser');
  return async (dispatch) => {
    dispatch({
      type: 'LOGOUT',
    });
  };
};

export default userReducer;
