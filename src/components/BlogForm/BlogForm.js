import { useState } from 'react'
import PropTypes from 'prop-types'
const BlogPostForm = ({ onSubmit }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addBlog = (e) => {
    e.preventDefault()
    onSubmit(url, author, title)
    setAuthor('')
    setTitle('')
    setUrl('')
  }
  return (
    <div>
      <h2>Create new</h2>
      <form onSubmit={addBlog}>
        <label htmlFor="title">Title</label>
        <input
          type="text"
          name="title"
          placeholder="Enter title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <br />
        <label htmlFor="author">Author</label>
        <input
          type="text"
          name="author"
          placeholder="Enter author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
        <br />
        <label htmlFor="url">url</label>
        <input
          type="text"
          name="url"
          placeholder="Enter url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <br />
        <button type="submit">Create</button>
      </form>
    </div>
  )
}
BlogPostForm.prototype = {
  onSubmit: PropTypes.func.isRequired,
}

export default BlogPostForm
