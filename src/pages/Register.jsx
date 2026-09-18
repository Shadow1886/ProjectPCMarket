import { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import { register } from '../api'

function Register() {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [repeatPassword, setRepeatPassword] = useState('')
  const [error, setError] = useState('')

  const { saveAuth } = useContext(AuthContext)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Simple validation
    if (!username || !email || !password) {
      setError('Please fill in all fields.')
      return
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters.')
      return
    }
    if (password !== repeatPassword) {
      setError('Passwords do not match.')
      return
    }

    try {
      const data = await register(username, email, password) // POST /register
      saveAuth(data)
      navigate('/')
    } catch (err) {
      setError(err.message) // e.g. "Email already exists"
    }
  }

  return (
    <div className="container">
      <form className="form" onSubmit={handleSubmit}>
        <h1>Register</h1>

        {error && <p className="error">{error}</p>}

        <label>Username</label>
        <input className="input" value={username} onChange={(e) => setUsername(e.target.value)} />

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

        <label>Repeat password</label>
        <input
          type="password"
          className="input"
          value={repeatPassword}
          onChange={(e) => setRepeatPassword(e.target.value)}
        />

        <button type="submit" className="btn btn-primary">
          Register
        </button>

        <p className="muted">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </form>
    </div>
  )
}

export default Register
