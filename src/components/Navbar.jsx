import { useContext } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'

function Navbar() {
  const { user, logout } = useContext(AuthContext)
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <header className="navbar">
      <div className="container navbar-inner">
        <Link to="/" className="logo">
          <img src="/favicon.svg" alt="" width="32" height="32" />
          PC <span className="accent">Forge</span>
        </Link>

        <nav className="nav-links">
          <NavLink to="/">Home</NavLink>

          {/* Different links for logged-in users and guests */}
          {user ? (
            <>
              <span className="username">Hi, {user.username}</span>
              <button className="btn" onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <NavLink to="/login">Login</NavLink>
              <NavLink to="/register">Register</NavLink>
            </>
          )}
        </nav>
      </div>
    </header>
  )
}

export default Navbar
