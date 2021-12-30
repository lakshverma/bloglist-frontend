/* eslint-disable default-param-last */
let previousTimeout = null;

export const setNotification = (message, type, durationInSeconds) => async (dispatch) => {
  if (previousTimeout) {
    clearTimeout(previousTimeout);
  }

  dispatch({
    type: 'SET_NOTIFICATION',
    data: { message, type },
  });

  previousTimeout = setTimeout(() => {
    dispatch({
      type: 'REMOVE_NOTIFICATION',
    });
  }, durationInSeconds * 1000);
};

const initialState = {
  message: null,
  type: null,
  display: 'none',
};

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION': {
      const notification = {
        message: action.data.message,
        type: action.data.type,
        display: '',
      };
      return notification;
    }
    case 'REMOVE_NOTIFICATION': {
      return initialState;
    }
    default: {
      return state;
    }
  }
};

export default notificationReducer;
