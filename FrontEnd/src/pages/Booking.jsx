import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useApp } from '../context/AppContext.jsx'
import { useToast } from '../context/ToastContext.jsx'
import { crearReserva } from "../api";
import { useAuth } from "../context/AuthContext";

export default function Booking() {
  const { state } = useAuth();
  const { spaces, addBooking } = useApp()
  const { showToast } = useToast()

  const today = new Date().toISOString().split('T')[0]

  const availableSpaces = spaces.filter(s => s.available)

  const [form, setForm] = useState({
    spaceId: availableSpaces[0]?.id ?? '',
    date: '',
    startTime: '',
    endTime: '',
    user: '',
  })

  function handleChange(e) {
    setForm(prev => ({ ...prev, [e.target.id]: e.target.value }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    addBooking(form.spaceId, form.date, form.startTime, form.endTime, form.user)
    showToast(`Reserva confirmada para ${form.user}`, 'success')
    setForm({ spaceId: availableSpaces[0]?.id ?? '', date: '', startTime: '', endTime: '', user: '' })
  }

  return (
    <section className="section active">
      <header className="section-header">
        <span className="data-label">MÓDULO DE RESERVA</span>
        <h2>Configurar Estadía</h2>
      </header>

      <div className="contenedor-center">
        <form onSubmit={handleSubmit}>
          <fieldset style={{ border: 'none', padding: 0, margin: 0 }}>
            <div className="form-group">
              <label htmlFor="spaceId" className="form-label">Seleccionar Espacio</label>
              <select className="form-select" id="spaceId" value={form.spaceId} onChange={handleChange} required>
                {availableSpaces.map(space => (
                  <option key={space.id} value={space.id}>
                    {space.name} — {space.type}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="date" className="form-label">Fecha</label>
              <input type="date" className="form-input" id="date" min={today} value={form.date} onChange={handleChange} required />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div className="form-group">
                <label htmlFor="startTime" className="form-label">Hora inicio</label>
                <input type="time" className="form-input" id="startTime" value={form.startTime} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label htmlFor="endTime" className="form-label">Hora fin</label>
                <input type="time" className="form-input" id="endTime" value={form.endTime} onChange={handleChange} required />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="user" className="form-label">Nombre del Usuario</label>
              <input type="text" className="form-input" id="user" placeholder="Ej. Alex Diseñador" value={form.user} onChange={handleChange} required />
            </div>

            <button type="submit" className="btn-primary">CONFIRMAR RESERVA</button>
          </fieldset>
        </form>

        <div style={{ marginTop: '1.5rem', textAlign: 'center' }}>
          <Link to="/my-bookings" style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.75rem', color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '2px', textDecoration: 'none' }}>
            Ver mis reservas &rarr;
          </Link>
        </div>
      </div>
    </section>
  )
}
