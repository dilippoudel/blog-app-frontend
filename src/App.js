import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification/Notification'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [url, setUrl] = useState('')
  const [author, setAuthor] = useState('')
  const [title, setTitle] = useState('')
  const [notification, setNotification] = useState(null)
  useEffect(() => {
    const loggedUserJSON = localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])
  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs))
  }, [])
  const logInHandle = async (e) => {
    e.preventDefault()
    try {
      const loggedInUser = await loginService.login({ username, password })
      setUser(loggedInUser)
      const newMessage = {
        ...notification,
        success: `welcome back`,
      }
      setNotification(newMessage)
      setTimeout(() => setNotification(null), 3000)
      setUsername('')
      setPassword('')
      window.localStorage.setItem(
        'loggedBlogappUser',
        JSON.stringify(loggedInUser),
      )
      blogService.setToken(user.token)
    } catch (error) {
      const newMessage = {
        ...notification,
        error: `username or password invalid`,
      }
      setNotification(newMessage)
      setTimeout(() => setNotification(null), 3000)
    }
  }

  const blogSubmitHandle = async (e) => {
    e.preventDefault()
    try {
      await blogService.create({ url, author, title })
      const newMessage = {
        ...notification,
        success: `a new blog ${title} added`,
      }
      setNotification(newMessage)
      setTimeout(() => setNotification(null), 3000)

      setAuthor('')
      setUrl('')
      setTitle('')
    } catch (exception) {
      console.log('sth wrong')
    }
  }

  const blogPostForm = () => (
    <div>
      <h2>Create new</h2>
      <form onSubmit={blogSubmitHandle}>
        <label htmlFor="title">Title</label>
        <input
          type="text"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <br />
        <label htmlFor="author">Author</label>
        <input
          type="text"
          name="author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
        <br />
        <label htmlFor="url">url</label>
        <input
          type="text"
          name="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <br />
        <button type="submit">Create</button>
      </form>
    </div>
  )
  if (user === null) {
    return (
      <div>
        <Notification message={notification} />
        <h2>Log in to the application</h2>
        <form onSubmit={logInHandle}>
          <div>
            <label htmlFor="">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div>
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit">Login</button>
        </form>
      </div>
    )
  }

  return (
    <div>
      <Notification message={notification} />

      {blogPostForm()}
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
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  )
}

export default App
