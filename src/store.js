import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import notificationReducer from './reducer/notificationReducer';

const reducer = combineReducers({
  notifications: notificationReducer,
});

const store = createStore(reducer, composeWithDevTools(
  applyMiddleware(thunk),
));

export default store;
