// Shows one part as a card. The part comes from the parent as a prop.
function PartCard({ part }) {
  return (
    <div className="card">
      <img src={`/images/${part.category}.svg`} alt={part.category} className="card-image" />

      <div className="card-body">
        <span className="category">{part.category.toUpperCase()}</span>
        <h3>{part.name}</h3>
        <p className="muted">{part.brand}</p>
        <p className="price">€{part.price}</p>
      </div>
    </div>
  )
}

export default PartCard
