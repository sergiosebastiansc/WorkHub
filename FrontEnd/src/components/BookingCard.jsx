import { useState } from 'react'
import { useApp } from '../context/AppContext.jsx'
import { useToast } from '../context/ToastContext.jsx'

export default function BookingCard({ booking }) {
  const { spaces, cancelBooking } = useApp()
  const { showToast } = useToast()
  const [cancelling, setCancelling] = useState(false)

  const space = spaces.find(s => s.id === booking.spaceId)
  const spaceName  = space ? space.name  : `Espacio #${booking.spaceId}`
  const spacePrice = space ? space.price : ''

  const dateFormatted = new Date(booking.date + 'T00:00:00').toLocaleDateString('es-ES', {
    day: '2-digit', month: 'short', year: 'numeric'
  })

  function handleCancel() {
    setCancelling(true)
    setTimeout(() => {
      cancelBooking(booking.id)
      showToast('Reserva cancelada correctamente', 'error')
    }, 500)
  }

  return (
    <div className={`booking-card ${cancelling ? 'cancelling' : ''}`} id={`booking-${booking.id}`}>
      <div className="booking-info">
        <div className="booking-space">{spaceName}</div>
        <div className="booking-details">
          <div className="booking-detail">
            <span className="detail-label">USUARIO</span>
            <span>{booking.user}</span>
          </div>
          <div className="booking-detail">
            <span className="detail-label">FECHA</span>
            <span>{dateFormatted}</span>
          </div>
          <div className="booking-detail">
            <span className="detail-label">HORA</span>
            <span>{booking.time}</span>
          </div>
          {spacePrice && (
            <div className="booking-detail">
              <span className="detail-label">PRECIO</span>
              <span>{spacePrice}</span>
            </div>
          )}
        </div>
        <div className="booking-id">REF: {booking.id}</div>
      </div>
      <button className="btn-danger" onClick={handleCancel}>✕ CANCELAR</button>
    </div>
  )
}
