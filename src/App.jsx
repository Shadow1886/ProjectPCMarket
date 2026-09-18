import { Link, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import PartDetails from './pages/PartDetails'

function App() {
  return (
    <>
      <Navbar />

      <main className="page">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/parts/:id" element={<PartDetails />} />
          {/* Any other URL: 404 page */}
          <Route
            path="*"
            element={
              <div className="container center">
                <h1 className="big-number">404</h1>
                <p className="muted">This page does not exist.</p>
                <Link to="/" className="btn btn-primary">
                  Back to home
                </Link>
              </div>
            }
          />
        </Routes>
      </main>

      <footer className="footer">
        <div className="container">© {new Date().getFullYear()} PC Forge - ReactJS course project</div>
      </footer>
    </>
  )
}

export default App
