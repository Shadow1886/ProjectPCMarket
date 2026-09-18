import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getPart, updatePart } from '../api'
import PartForm from '../components/PartForm'

function EditPart() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [part, setPart] = useState(null)

  // First load the existing part, so the form can be filled with its data
  useEffect(() => {
    getPart(id).then((data) => setPart(data))
  }, [id])

  const handleUpdate = async (partData) => {
    await updatePart(id, partData) // PATCH /parts/:id
    navigate(`/parts/${id}`)
  }

  if (!part) {
    return <p className="container muted">Loading...</p>
  }

  return (
    <div className="container">
      <h1 className="center">Edit part</h1>
      <PartForm initialData={part} onSubmit={handleUpdate} buttonText="Save changes" />
    </div>
  )
}

export default EditPart
