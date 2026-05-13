import { useApp } from '../context/AppContext.jsx'
import { useToast } from '../context/ToastContext.jsx'

export default function Admin() {
  const { spaces, toggleAvailability } = useApp()
  const { showToast } = useToast()

  function handleToggle(space) {
    toggleAvailability(space.id)
    showToast(
      space.available ? 'Espacio marcado como ocupado' : 'Disponibilidad activada',
      'success'
    )
  }

  return (
    <section className="section active">
      <header className="section-header">
        <span className="data-label">GESTIÓN DE DISPONIBILIDAD</span>
        <h2>Control de Espacios</h2>
      </header>

      <div className="strata-grid">
        {spaces.map((space, index) => (
          <div
            key={space.id}
            className="stratum-card"
            style={{
              borderLeft: space.available ? '4px solid var(--success)' : '4px solid var(--danger)',
              animationDelay: `${index * 0.1}s`
            }}
          >
            <div className="card-header">
              <div className="card-title">{space.name}</div>
              <label className="toggle-switch">
                <input
                  type="checkbox"
                  checked={space.available}
                  onChange={() => handleToggle(space)}
                />
                <span className="slider"></span>
              </label>
            </div>
            <div className="card-desc">ID: #{space.id} | {space.type}</div>
            <div className="card-meta">
              <span>Estado: {space.available ? 'ABIERTO' : 'CERRADO'}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
