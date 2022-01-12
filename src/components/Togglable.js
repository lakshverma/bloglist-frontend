/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/button-has-type */
/* eslint-disable react/jsx-filename-extension */
import React, { useState } from 'react';
import PropTypes from 'prop-types';

// eslint-disable-next-line react/function-component-definition
const Togglable = (props) => {
  const [visible, setVisible] = useState(false);

  const hideWhenVisible = { display: visible ? 'none' : '' };
  const showWhenVisible = { display: visible ? '' : 'none' };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  return (
    <div className="flex ml-24">
      <div style={hideWhenVisible}>
        <button onClick={toggleVisibility} className="bg-lime-800 hover:bg-lime-700 rounded text-lime-50 font-bold p-2 pl-4 pr-4 mb-4">{props.buttonLabel}</button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <button onClick={toggleVisibility} className="bg-lime-800 hover:bg-lime-700 rounded text-lime-50 font-bold p-2 pl-4 pr-4 mb-4">cancel</button>
      </div>
    </div>
  );
};

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
};

export default Togglable;
