import { useState } from 'react'
import blogService from '../../services/blogs'
import './Blog.css'
const Blog = ({ blog, blogId }) => {
  const [visible, setVisible] = useState(false)
  const showWhenVisible = { display: visible ? '' : 'none' }
  const toggleVisibility = () => {
    setVisible(!visible)
  }
  const buttonText = visible ? 'hide' : 'show'
  const likeUpdateHandler = async (prevLike) => {
    const newLike = { likes: prevLike + 1 }
    const response = await blogService.updateLike(blogId, newLike)
    return response.data
  }
  return (
    <div className="blog_container">
      <div className="blog_title">
        <p className="blog_title_text">
          {blog.title} <button onClick={toggleVisibility}>{buttonText}</button>
        </p>
      </div>
      <div style={showWhenVisible}>
        <p>
          <a href="http:localhost:30000">{blog.url}</a>
        </p>
        <p>
          Likes: {blog.likes}{' '}
          <button onClick={() => likeUpdateHandler(blog.likes)}>Like</button>
        </p>
        <p>
          <b>{blog.author}</b>{' '}
        </p>
      </div>
    </div>
  )
}

export default Blog
