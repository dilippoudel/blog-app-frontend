import { useState } from 'react'
import './Blog.css'
const Blog = ({ blog }) => {
  const [visible, setVisible] = useState(false)
  const showWhenVisible = { display: visible ? '' : 'none' }
  const toggleVisibility = () => {
    setVisible(!visible)
  }
  const buttonText = visible ? 'hide' : 'show'

  return (
    <div className="blog_container">
      <div className="blog_title">
        <p className="blog_title_text">
          {blog.title} <button onClick={toggleVisibility}>{buttonText}</button>
        </p>
      </div>
      <div style={showWhenVisible}>
        <p>
          <a href="#">{blog.url}</a>
        </p>
        <p>
          Likes: {blog.likes} <button>Like</button>
        </p>
        <p>
          <b>{blog.author}</b>{' '}
        </p>
      </div>
    </div>
  )
}

export default Blog
