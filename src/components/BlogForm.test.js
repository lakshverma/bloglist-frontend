/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';
// import { prettyDOM } from '@testing-library/dom';
import BlogForm from './BlogForm';

test('<BlogForm /> updates parent state and calls onSubmit', () => {
  const createBlog = jest.fn();

  const component = render(
    <BlogForm createBlog={createBlog} />,
  );

  const title = component.container.querySelector('#title');
  // console.log(prettyDOM(title));
  const author = component.container.querySelector('#author');
  const url = component.container.querySelector('#url');
  const form = component.container.querySelector('form');

  fireEvent.change(title, {
    target: { value: '6 - Way more changesr' },
  });

  fireEvent.change(author, {
    target: { value: 'Mahela Jayawardene' },
  });

  fireEvent.change(url, {
    target: { value: 'www.abcd.com' },
  });

  fireEvent.submit(form);

  expect(createBlog.mock.calls).toHaveLength(1);
//   expect(createBlog.mock.calls[0][0].content).toBe('testing of forms could be easier');
});
