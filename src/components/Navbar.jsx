import { Link, NavLink } from 'react-router-dom'

function Navbar() {
  return (
    <header className="navbar">
      <div className="container navbar-inner">
        <Link to="/" className="logo">
          <img src="/favicon.svg" alt="" width="32" height="32" />
          PC <span className="accent">Forge</span>
        </Link>

        <nav className="nav-links">
          <NavLink to="/">Home</NavLink>
        </nav>
      </div>
    </header>
  )
}

export default Navbar
