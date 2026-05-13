import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext.jsx'
import logoIcon from './assets/isotipo.svg'
import { useAuth, AUTH_ACTIONS } from "../context/AuthContext";




export default function Navbar() {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const { state, dispatch } = useAuth()
  const usuario = state.usuario

  const handleLogout = () => {
    dispatch({ type: AUTH_ACTIONS.LOGOUT })
    navigate('/')
  }

  const guestLinks = [
    { to: '/register', label: 'REGÍSTRATE' },
    { to: '/contact', label: 'CONTACTO' },
    { to: '/login', label: 'LOGIN' },
  ]

  const userLinks = [
    { to: '/booking', label: 'RESERVA' },
    { to: '/my-bookings', label: 'MIS RESERVAS' },
    { to: '/contact', label: 'CONTACTO' },
    { to: '/account', label: 'MI CUENTA' },
  ]

  const adminLinks = [
    { to: '/contact', label: 'CONTACTO' },
    { to: '/admin', label: 'ADMIN' },
    { to: '/account', label: 'MI CUENTA' },
  ]

  let links = guestLinks
  if (usuario) {
    links = usuario.rol === 'admin' ? adminLinks : userLinks
  }

  return (
    <header id="mainNavWrapper">
      <nav className="navbar navbar-expand-lg" id="mainNav">
        <div className="container-fluid">

          <Link className="navbar-brand logo" to="/">
            <img src={logoIcon} alt="WorkHub isotipo" width="28" height="28" />
            WorkHub<span>.Coworking</span>
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarContent"
            aria-controls="navbarContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse justify-content-end" id="navbarContent">
            <ul className="navbar-nav">
              {links.map(link => (
                <li className="nav-item" key={link.to}>
                  <Link
                    className={`nav-link ${pathname === link.to ? 'active-link' : ''}`}
                    to={link.to}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              {usuario && (
                <li className="nav-item">
                  <button
                    className="nav-link btn-link"
                    onClick={handleLogout}
                    style={{ background: 'none', border: 'none', cursor: 'pointer' }}
                  >
                    LOGOUT
                  </button>
                </li>
              )}
            </ul>
          </div>

        </div>
      </nav>
    </header>
  )
}
