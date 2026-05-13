import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext.jsx'
import SpaceCard from '../components/SpaceCard.jsx'

export default function Home() {
  const { spaces } = useApp()
  const navigate = useNavigate()

  // Efecto parallax 3D con el mouse
  useEffect(() => {
    function handleMouseMove(e) {
      const strata = document.querySelectorAll('.stratum')
      const x = (window.innerWidth / 2 - e.pageX) / 40
      const y = (window.innerHeight / 2 - e.pageY) / 40
      strata.forEach((stratum, index) => {
        const factor = (index + 1) * 0.5
        stratum.style.transform = `rotateY(${x * factor}deg) rotateX(${-y * factor}deg)`
      })
    }
    document.addEventListener('mousemove', handleMouseMove)
    return () => document.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <section className="section active">
      {/* HERO */}
      <div className="hero-layout">
        <article className="hero-content">
          <span className="data-label" style={{ fontSize: '0.9rem' }}>LA NUEVA INNOVACIÓN DEL TRABAJO</span>
          <h1>Espacios<br />Flexibles</h1>
          <p>Un entorno de espacio de trabajo refinado arquitectónicamente, diseñado alrededor de los principios de transparencia, profundidad y silencio enfocado para tu máximo rendimiento.</p>
          <button className="btn-crystal" onClick={() => navigate('/booking')}>
            EXPLORAR MÓDULOS <span>&rarr;</span>
          </button>
        </article>

        <div className="strata-container" style={{ height: '600px' }}>
          <div className="stratum stratum-tertiary"></div>
          <div className="stratum stratum-secondary"></div>
          <div className="stratum stratum-primary" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            {/* Carrusel Bootstrap */}
            <div id="envCarousel" className="carousel slide" data-bs-ride="carousel">
              <div className="carousel-inner rounded-4 overflow-hidden">
                <div className="carousel-item active">
                  <img src="https://i.ibb.co/5W3g4Zpr/edificio-principal-workhub-cowork.webp" className="d-block w-100" alt="Edificio" />
                  <div className="carousel-caption d-none d-md-block"><h6>Edificio Principal</h6></div>
                </div>
                <div className="carousel-item">
                  <img src="https://img.freepik.com/foto-gratis/moderno-hotel-lujo-recepcion-oficina-salon-sala-reuniones_105762-1772.jpg?semt=ais_hybrid&w=740&q=80" className="d-block w-100" alt="Recepción" />
                  <div className="carousel-caption d-none d-md-block"><h6>Recepción</h6></div>
                </div>
                <div className="carousel-item">
                  <img src="https://images.unsplash.com/photo-1606836576983-8b458e75221d?q=80&w=1170&auto=format&fit=crop" className="d-block w-100" alt="Cafetería" />
                  <div className="carousel-caption d-none d-md-block"><h6>Cafetería</h6></div>
                </div>
                <div className="carousel-item">
                  <img src="https://images.unsplash.com/photo-1519389950473-47ba0277781c" className="d-block w-100" alt="Zona Networking" />
                  <div className="carousel-caption d-none d-md-block"><h6>Zona de Networking</h6></div>
                </div>
              </div>
              <button className="carousel-control-prev" type="button" data-bs-target="#envCarousel" data-bs-slide="prev">
                <span className="carousel-control-prev-icon"></span>
              </button>
              <button className="carousel-control-next" type="button" data-bs-target="#envCarousel" data-bs-slide="next">
                <span className="carousel-control-next-icon"></span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ESPACIOS */}
      <header className="section-header">
        <span className="data-label">ESPACIOS DISPONIBLES</span>
        <h2>Módulos de Trabajo</h2>
      </header>
      <div className="strata-grid">
        {spaces.map((space, index) => (
          <SpaceCard key={space.id} space={space} index={index} />
        ))}
      </div>
    </section>
  )
}
