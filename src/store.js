import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import notificationReducer from './reducer/notificationReducer';
import blogReducer from './reducer/blogReducer';
import userReducer from './reducer/userReducer';
import usersReducer from './reducer/usersReducer';

const reducer = combineReducers({
  notifications: notificationReducer,
  blogs: blogReducer,
  user: userReducer,
  users: usersReducer,
});

const store = createStore(reducer, composeWithDevTools(
  applyMiddleware(thunk),
));

export default store;
