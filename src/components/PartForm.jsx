import { useState } from 'react'

const categories = ['cpu', 'gpu', 'motherboard', 'ram', 'storage', 'psu', 'case', 'cooling']

// The same form is used for "Add part" and "Edit part".
// Props: initialData - the starting values, onSubmit - what to do with the data, buttonText
function PartForm({ initialData, onSubmit, buttonText }) {
  // All fields are kept in one object: { name, brand, category, price, description }
  const [form, setForm] = useState(initialData)
  const [error, setError] = useState('')

  // One function for all inputs: the input's "name" tells which field to update
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!form.name || !form.brand || !form.price || !form.description) {
      setError('Please fill in all fields.')
      return
    }
    if (Number(form.price) <= 0) {
      setError('Price must be greater than 0.')
      return
    }

    try {
      await onSubmit({
        name: form.name,
        brand: form.brand,
        category: form.category,
        price: Number(form.price),
        description: form.description,
      })
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <form className="form" onSubmit={handleSubmit}>
      {error && <p className="error">{error}</p>}

      <label>Name</label>
      <input name="name" className="input" value={form.name} onChange={handleChange} />

      <label>Brand</label>
      <input name="brand" className="input" value={form.brand} onChange={handleChange} />

      <label>Category</label>
      <select name="category" className="input" value={form.category} onChange={handleChange}>
        {categories.map((category) => (
          <option key={category} value={category}>
            {category.toUpperCase()}
          </option>
        ))}
      </select>

      <label>Price (€)</label>
      <input name="price" type="number" className="input" value={form.price} onChange={handleChange} />

      <label>Description</label>
      <textarea
        name="description"
        rows="4"
        className="input"
        value={form.description}
        onChange={handleChange}
      />

      <button type="submit" className="btn btn-primary">
        {buttonText}
      </button>
    </form>
  )
}

export default PartForm
