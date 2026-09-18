import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import { createPart } from '../api'
import PartForm from '../components/PartForm'

function CreatePart() {
  const { user } = useContext(AuthContext)
  const navigate = useNavigate()

  const emptyPart = { name: '', brand: '', category: 'cpu', price: '', description: '' }

  const handleCreate = async (partData) => {
    // userId = the owner of the part (required by json-server-auth)
    const newPart = await createPart({ ...partData, userId: user.id }) // POST /parts
    navigate(`/parts/${newPart.id}`)
  }

  return (
    <div className="container">
      <h1 className="center">Add a new part</h1>
      <PartForm initialData={emptyPart} onSubmit={handleCreate} buttonText="Add part" />
    </div>
  )
}

export default CreatePart
