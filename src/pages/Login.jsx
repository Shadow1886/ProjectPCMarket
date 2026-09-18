import { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import { login } from '../api'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const { saveAuth } = useContext(AuthContext)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault() // stop the page from reloading

    if (!email || !password) {
      setError('Please fill in all fields.')
      return
    }

    try {
      const data = await login(email, password) // POST /login
      saveAuth(data)
      navigate('/')
    } catch (err) {
      setError(err.message) // e.g. "Incorrect password"
    }
  }

  return (
    <div className="container">
      <form className="form" onSubmit={handleSubmit}>
        <h1>Login</h1>

        {error && <p className="error">{error}</p>}

        <label>Email</label>
        <input
          type="email"
          className="input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label>Password</label>
        <input
          type="password"
          className="input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit" className="btn btn-primary">
          Login
        </button>

        <p className="muted">
          No account? <Link to="/register">Register</Link>
        </p>
        <p className="hint">Demo: demo@pcforge.com / demo123</p>
      </form>
    </div>
  )
}

export default Login
