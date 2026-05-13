import { useState } from 'react'
import { useToast } from '../context/ToastContext.jsx'
import LocationMap from '../components/LocationMap.jsx'

export default function Contact() {
  const { showToast } = useToast()
  const [form, setForm] = useState({ name: '', email: '', message: '' })

  function handleChange(e) {
    setForm(prev => ({ ...prev, [e.target.id]: e.target.value }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    showToast(`Gracias ${form.name}, te contactaremos pronto`, 'success')
    setForm({ name: '', email: '', message: '' })
  }

  return (
    <section className="section active">
      <header className="section-header">
        <span className="data-label">CONTACTO</span>
        <h2>Ponte en Contacto</h2>
      </header>

      <div className="contenedor-center">
        <aside className="stratum-card" style={{ marginBottom: '2rem' }}>
          <div className="card-header">
            <div className="card-icon" aria-hidden="true">✉</div>
            <span className="data-label">INFORMACIÓN DE CONTACTO</span>
          </div>
          <h3 className="card-title">WorkHub Coworking</h3>
          <p className="card-desc">Estamos aquí para ayudarte con cualquier pregunta sobre nuestros espacios y servicios.</p>
          <address className="card-meta" style={{ fontStyle: 'normal', flexDirection: 'column', gap: '0.5rem' }}>
            <span>📍 Calle Providencia 351, Santiago, Chile</span>
            <span>📞 +34 900 000 000</span>
            <span>✉ <a href="mailto:hola@workhub.com" style={{ color: 'inherit' }}>hola@workhub.com</a></span>
          </address>
           <LocationMap/>
        </aside>

        <form onSubmit={handleSubmit} style={{ width: '100%' }}>
          <div className="form-group">
            <label htmlFor="name" className="form-label">Nombre</label>
            <input type="text" className="form-input" id="name" placeholder="Tu nombre" value={form.name} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="email" className="form-label">Email</label>
            <input type="email" className="form-input" id="email" placeholder="tu@email.com" value={form.email} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="message" className="form-label">Mensaje</label>
            <textarea className="form-input" id="message" placeholder="¿En qué podemos ayudarte?" rows="5" value={form.message} onChange={handleChange} required style={{ resize: 'vertical' }} />
          </div>
          <button type="submit" className="btn-primary">ENVIAR MENSAJE</button>
        </form>
        
      </div>
     
    </section>
   
  )
}

