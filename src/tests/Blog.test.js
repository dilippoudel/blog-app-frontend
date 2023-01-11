import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from '../components/Blog/Blog'

test('render blog list and should not display other properties of blog except title', () => {
  const blog = {
    title: 'React with Redux',
    author: 'Matti Lutainen',
    url: 'http://localhost:3000/blog/matti',
    likes: 24,
    user: 1,
  }

  const blogContainer = render(<Blog blog={blog} />).container
  const element = screen.getByText('React with Redux')
  expect(element).toBeDefined()
  const div = blogContainer.querySelector('.hideAndShow')
  expect(div).toHaveStyle('display: none')
})
test('Url, author and number of likes should be displayed after clicking the button ', async () => {
  const blog = {
    title: 'React with Redux',
    author: 'Matti Lutainen',
    url: 'http://localhost:3000/blog/dilip',
    likes: 24,
    user: 2,
  }
  const container = render(<Blog blog={blog} />).container
  const beforButtonClicked = container.querySelector('.hideAndShow')
  expect(beforButtonClicked).toHaveStyle('display: none')
  const button = screen.getByText('show')
  await userEvent.click(button)
  const styleAfterButtonClicked = container.querySelector('.hideAndShow')
  expect(styleAfterButtonClicked).not.toHaveStyle('display: none')
})
