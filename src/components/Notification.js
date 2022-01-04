/* eslint-disable react/function-component-definition */
/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { useSelector } from 'react-redux';

const Notification = () => {
  const notifications = useSelector((state) => state.notifications);

  return (
    <div className={notifications.type}>
      {notifications.message}
    </div>
  );
};

export default Notification;
