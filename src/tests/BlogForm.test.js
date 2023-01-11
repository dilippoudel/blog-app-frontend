import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import userEvent from '@testing-library/user-event'
import BlogForm from '../components/BlogForm/BlogForm'

test('<BlogForm/> should get onSubmit props and create a blog with title, author and URL properties', async () => {
  const createBlog = jest.fn()
  const user = userEvent.setup()
  render(<BlogForm onSubmit={createBlog} />)
  const urlInput = screen.getByPlaceholderText('Enter url')
  const authorInput = screen.getByPlaceholderText('Enter author')
  const titleInput = screen.getByPlaceholderText('Enter title')
  await user.type(urlInput, 'https:localhost:3001')
  await user.type(titleInput, 'Power of Kushwaha')
  await user.type(authorInput, 'Dilip Poudel')
  const submitButton = screen.getByText('Create')
  await userEvent.click(submitButton)
  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][1]).toBe('Dilip Poudel')
})
