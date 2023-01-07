import { useState } from 'react'
const LoginForm = ({ onSubmit }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const Login = (e) => {
    e.preventDefault()
    onSubmit(username, password)
    setUsername('')
    setPassword('')
  }
  return (
    <>
      <h2>Log in to the application</h2>
      <form onSubmit={Login}>
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
    </>
  )
}
export default LoginForm
