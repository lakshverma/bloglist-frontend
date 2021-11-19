/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';
// import { prettyDOM } from '@testing-library/dom';
import Blog from './Blog';

test("renders the blog's title and author but ", () => {
  const blog = {
    title: '6 - Way more changes',
    author: 'Mahela Jayawardene',
    url: 'www.abcd.com',
    likes: '101',
  };
  const mockBlogDelete = jest.fn();
  const mockLikesHandler = jest.fn();
  const component = render(
    <Blog blog={blog} handleUpdateBlog={mockLikesHandler} handleDeleteBlog={mockBlogDelete} />,
  );

  expect(component.container).toHaveTextContent('6 - Way more changes Mahela Jayawardene');
});

test('does not render url or number of likes by default', () => {
  const blog = {
    title: '6 - Way more changes',
    author: 'Mahela Jayawardene',
    url: 'www.abcd.com',
    likes: '101',
  };

  const mockBlogDelete = jest.fn();
  const mockLikesHandler = jest.fn();
  const component = render(
    <Blog blog={blog} handleUpdateBlog={mockLikesHandler} handleDeleteBlog={mockBlogDelete} />,
  );

  expect(component.container).not.toHaveTextContent('www.abcd.com');
  expect(component.container).not.toHaveTextContent('101');
});

test('blog\'s url and number of likes are shown when button is clicked', () => {
  const blog = {
    title: '6 - Way more changes',
    author: 'Mahela Jayawardene',
    url: 'www.abcd.com',
    likes: '101',
  };

  const mockBlogDelete = jest.fn();
  const mockLikesHandler = jest.fn();
  const component = render(
    <Blog blog={blog} handleUpdateBlog={mockLikesHandler} handleDeleteBlog={mockBlogDelete} />,
  );
  const button = component.getByText('view');
  fireEvent.click(button);

  //   const div = component.container.querySelector('.fullBlog');
  //   expect(div).not.toHaveStyle('display: none');

  expect(component.container).toHaveTextContent('101');
  expect(component.container).toHaveTextContent('www.abcd.com');
});

test('if like button is clicked twice, event handler the component received as props is called twice', () => {
  const blog = {
    title: '6 - Way more changes',
    author: 'Mahela Jayawardene',
    url: 'www.abcd.com',
    likes: '101',
  };

  const mockBlogDelete = jest.fn();
  const mockLikesHandler = jest.fn();
  const component = render(
    <Blog blog={blog} handleUpdateBlog={mockLikesHandler} handleDeleteBlog={mockBlogDelete} />,
  );

  const button = component.getByText('view');
  fireEvent.click(button);

  const likeButton = component.getByText('like');
  // console.log(prettyDOM(likeButton));
  fireEvent.click(likeButton);
  fireEvent.click(likeButton);

  expect(mockLikesHandler.mock.calls).toHaveLength(2);
});
