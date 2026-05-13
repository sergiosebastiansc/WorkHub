import { useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext.jsx'
import BookingCard from '../components/BookingCard.jsx'

export default function MyBookings() {
  const { bookings } = useApp()
  const navigate = useNavigate()

  return (
    <section className="section active">
      <header className="section-header">
        <span className="data-label">GESTIÓN PERSONAL</span>
        <h2>Mis Reservas</h2>
      </header>

      <div className="contenedor-center">
        {bookings.length === 0 ? (
          <div className="bookings-empty">
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
              <line x1="16" y1="2" x2="16" y2="6"></line>
              <line x1="8" y1="2" x2="8" y2="6"></line>
              <line x1="3" y1="10" x2="21" y2="10"></line>
            </svg>
            <p>Sin reservas activas</p>
          </div>
        ) : (
          <>
            <p className="bookings-count">
              {bookings.length} reserva{bookings.length !== 1 ? 's' : ''} activa{bookings.length !== 1 ? 's' : ''}
            </p>
            <div className="bookings-list" style={{ width: '100%' }}>
              {bookings.map(booking => (
                <BookingCard key={booking.id} booking={booking} />
              ))}
            </div>
          </>
        )}

        <div style={{ marginTop: '2rem' }}>
          <button className="btn-crystal" onClick={() => navigate('/booking')} style={{ fontSize: '0.75rem', padding: '0.8rem 1.5rem' }}>
            + NUEVA RESERVA <span>&rarr;</span>
          </button>
        </div>
      </div>
    </section>
  )
}
