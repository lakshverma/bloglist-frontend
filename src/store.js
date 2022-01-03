import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import notificationReducer from './reducer/notificationReducer';
import blogReducer from './reducer/blogReducer';

const reducer = combineReducers({
  notifications: notificationReducer,
  blogs: blogReducer,
});

const store = createStore(reducer, composeWithDevTools(
  applyMiddleware(thunk),
));

export default store;
