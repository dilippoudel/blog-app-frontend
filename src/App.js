import { useState, useEffect } from 'react'
import Blog from './components/Blog/Blog'
import BlogPostForm from './components/BlogForm/BlogForm'
import LoginForm from './components/Login/Login'
import Notification from './components/Notification/Notification'
import Togglable from './components/Togglable/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState(null)
  useEffect(() => {
    const loggedUserJSON = localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const loggedUser = JSON.parse(loggedUserJSON)
      setUser(loggedUser)
      blogService.setToken(loggedUser.token)
    }
  }, [])
  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs))
  }, [])
  const logInHandle = async (username, password) => {
    try {
      const loggedInUser = await loginService.login({ username, password })
      setUser(loggedInUser)
      window.localStorage.setItem(
        'loggedBlogappUser',
        JSON.stringify(loggedInUser),
      )
      blogService.setToken(loggedInUser.token)
      const newMessage = {
        ...notification,
        success: 'welcome back',
      }
      setNotification(newMessage)
      setTimeout(() => setNotification(null), 3000)
    } catch (error) {
      const newMessage = {
        ...notification,
        error: 'username or password invalid',
      }
      setNotification(newMessage)
      setTimeout(() => {
        setNotification(null)
      }, 3000)

      console.log('username or password invalid')
    }
  }

  const blogSubmitHandle = async (url, author, title) => {
    try {
      await blogService.create({ url, author, title })
      const newMessage = {
        ...notification,
        success: `a new blog ${title} added`,
      }
      setNotification(newMessage)
      setTimeout(() => setNotification(null), 3000)
    } catch (exception) {
      const newMessage = {
        ...notification,
        error: 'Blog validation error',
      }
      setNotification(newMessage)
      setTimeout(() => setNotification(null), 3000)
    }
  }
  return (
    <div>
      <h1>Blog post Application</h1>
      <Notification message={notification} />
      {user === null ? (
        <div>
          <LoginForm onSubmit={logInHandle} />
        </div>
      ) : (
        <>
          <Togglable buttonLabel="Create new Blog">
            <BlogPostForm onSubmit={blogSubmitHandle} />
          </Togglable>
          <h2>blogs</h2>
          <p>{user.name} is logged in</p>
          <button
            onClick={() => {
              window.localStorage.clear()
              setUser(null)
            }}
          >
            Log out
          </button>
          {blogs
            .sort((a, b) => b.likes - a.likes)
            .map((blog) => (
              <Blog
                key={blog.id}
                blog={blog}
                blogId={blog.id}
                user={user.user_id}
              />
            ))}
        </>
      )}
    </div>
  )
}

export default App
