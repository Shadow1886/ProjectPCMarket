import { useContext, useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import { deletePart, getPart } from '../api'

function PartDetails() {
  // The id from the URL, e.g. /parts/4 -> id = "4"
  const { id } = useParams()
  const { user } = useContext(AuthContext)
  const navigate = useNavigate()

  const [part, setPart] = useState(null)
  const [error, setError] = useState('')

  // Load the part every time the id in the URL changes
  useEffect(() => {
    getPart(id)
      .then((data) => setPart(data))
      .catch(() => setError('Part not found.'))
  }, [id])

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this part?')) {
      return
    }
    try {
      await deletePart(id) // DELETE /parts/:id
      navigate('/')
    } catch (err) {
      setError(err.message)
    }
  }

  if (error) {
    return (
      <div className="container">
        <p className="error">{error}</p>
        <Link to="/">Back to home</Link>
      </div>
    )
  }

  if (!part) {
    return <p className="container muted">Loading...</p>
  }

  // Only the user who added the part can edit or delete it
  const isOwner = user && user.id === part.userId

  return (
    <div className="container">
      <Link to="/">← Back to all parts</Link>

      <div className="details">
        <img src={`/images/${part.category}.svg`} alt={part.category} className="details-image" />

        <div>
          <span className="category">{part.category.toUpperCase()}</span>
          <h1>{part.name}</h1>
          <p className="muted">by {part.brand}</p>
          <p className="details-price">€{part.price}</p>
          <p className="details-description">{part.description}</p>

          {isOwner && (
            <div className="buttons">
              <Link to={`/parts/${part.id}/edit`} className="btn">
                Edit
              </Link>
              <button className="btn btn-danger" onClick={handleDelete}>
                Delete
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default PartDetails
