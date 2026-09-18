import { useEffect, useState } from 'react'
import { getParts } from '../api'
import PartCard from '../components/PartCard'

function Home() {
  const [parts, setParts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [search, setSearch] = useState('')

  // Runs once, after the page is shown: loads the parts from the REST API
  useEffect(() => {
    getParts()
      .then((data) => setParts(data))
      .catch(() => setError('Could not load the parts. Is JSON Server running?'))
      .finally(() => setLoading(false))
  }, [])

  // Only the parts whose name contains the search text
  const filteredParts = parts.filter((part) =>
    part.name.toLowerCase().includes(search.toLowerCase()),
  )

  return (
    <div className="container">
      <section className="hero">
        <h1>
          Find the <span className="accent">perfect parts</span> for your PC
        </h1>
        <p className="muted">
          {parts.length} components shared by the PC Forge community.
        </p>
      </section>

      <input
        type="text"
        className="input search"
        placeholder="Search parts..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {loading && <p className="muted">Loading...</p>}
      {error && <p className="error">{error}</p>}
      {!loading && !error && filteredParts.length === 0 && <p className="muted">No parts found.</p>}

      <div className="grid">
        {filteredParts.map((part) => (
          <PartCard key={part.id} part={part} />
        ))}
      </div>
    </div>
  )
}

export default Home
