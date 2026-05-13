export default function SpaceCard({ space, index }) {
  return (
    <div
      className={`stratum-card ${!space.available ? 'unavailable' : ''}`}
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <img
        src={space.image}
        alt={space.name}
        style={{ width: '100%', height: '150px', objectFit: 'cover', objectPosition: 'center', borderRadius: '4px', marginBottom: '10px' }}
      />
      <div className="card-header">
        <div className="card-icon">◈</div>
        <span style={{ fontFamily: "'JetBrains Mono'", fontSize: '0.7rem', color: space.available ? 'var(--success)' : 'var(--danger)' }}>
          {space.available ? 'DISPONIBLE' : 'OCUPADO'}
        </span>
      </div>
      <div className="card-title">{space.name}</div>
      <div className="card-desc">{space.desc}</div>
      <div className="card-meta">
        <span>CAP: {space.capacity}</span>
        <span>{space.price}</span>
      </div>
    </div>
  )
}
