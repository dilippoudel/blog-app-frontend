import { useState } from 'react'
import blogService from '../../services/blogs'
import PropTypes from 'prop-types'
import './Blog.css'
const Blog = ({ blog, blogId, user, onSubmit }) => {
  const [visible, setVisible] = useState(false)
  const showWhenVisible = { display: visible ? '' : 'none' }
  const toggleVisibility = () => {
    setVisible(!visible)
  }
  const buttonText = visible ? 'hide' : 'show'
  const handleDelete = async (id) => {
    if (window.confirm('Do you want to delete this blog?')) {
      await blogService.deleteBlogById(id)
    }
  }
  return (
    <div className="blog_container">
      <div className="blog_title">
        <p className="blog_title_text">
          {blog.title} <button onClick={toggleVisibility}>{buttonText}</button>
        </p>
      </div>
      <div className="hideAndShow" style={showWhenVisible}>
        <p>
          <a href="http:localhost:30000">{blog.url}</a>
        </p>
        <p>
          Likes: {blog.likes}{' '}
          <button id="like" onClick={() => onSubmit(blog.likes, blogId)}>
            Like
          </button>
        </p>
        <p>
          <b>{blog.author}</b>{' '}
        </p>
        {user === blog.user.id && (
          <button onClick={() => handleDelete(blog.id)}>Delete</button>
        )}
      </div>
    </div>
  )
}
Blog.prototype = {
  blog: PropTypes.object.isRequired,
  blogId: PropTypes.string.isRequired,
  user: PropTypes.string.isRequired,
}
export default Blog
