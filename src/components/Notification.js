/* eslint-disable react/function-component-definition */
/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { useSelector } from 'react-redux';

const Notification = () => {
  const notifications = useSelector((state) => state.notifications);

  if (notifications.type === 'error') {
    return (
      <div className="bg-red-300 font-semibold text-lg px-24 text-center">
        {'❌ '}
        {notifications.message}
      </div>
    );
  } if (notifications.type === 'success') {
    return (
      <div className="bg-amber-200 font-semibold text-lg px-24 text-center">
        {'🎉 '}
        {notifications.message}
      </div>
    );
  }
  return (
    <div className="bg-yellow-50 font-semibold text-lg px-24 text-center">
      {notifications.message}
    </div>
  );
};

export default Notification;
