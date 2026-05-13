import { useState } from 'react'
import { login } from "../api";
import { useAuth, AUTH_ACTIONS } from "../context/AuthContext";

import { useNavigate, Link } from 'react-router-dom'
import { useApp } from '../context/AppContext.jsx'
import { useToast } from '../context/ToastContext.jsx'
import '../css/acceso.css'


export default function Login() {
   const { dispatch } = useAuth();
  const { loginUser } = useApp()
  const { showToast } = useToast()
  const navigate = useNavigate()

  const [form, setForm] = useState({ email: '', password: '' })
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  


  function handleChange(e) {
    setForm(prev => ({ ...prev, [e.target.id]: e.target.value }))
  }

     const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    
    try {
      const result = await login(form.email, form.password);

      if (result && result.token) {
        // Decodificar el payload del JWT para obtener los datos del usuario
        const payload = JSON.parse(atob(result.token.split(".")[1]));
        dispatch({
          type: AUTH_ACTIONS.LOGIN,
          payload: {
            token: result.token,
            usuario: { id: payload.id, email: payload.email, rol: payload.rol },
          },
        });
        showToast('¡Ingreso exitoso! Bienvenido', 'success');
        setTimeout(() => navigate('/'), 1000);
      } else {
        showToast(result.msg || 'Credenciales incorrectas', 'error');
      }
    } catch (err) {
      showToast('Error al conectar con el servidor', 'error');
    } finally {
      setLoading(false);
    }
  }

  return (
    <main>
      <div className="login-wrapper">
        <form className="stratum-card" onSubmit={handleSubmit}>

          <div className="card-header">
            <span className="data-label">WorkHub // Acceso</span>
            <div className="status-dot"></div>
          </div>

          <h2 className="card-title">Bienvenido</h2>
          <p className="card-desc">Introduce tus credenciales para continuar</p>

          <div className="form-group">
            <label htmlFor="email" className="form-label">Correo electrónico</label>
            <input
              type="email"
              id="email"
              className="form-input"
              placeholder="tu@email.com"
              value={form.email}
              onChange={handleChange}
              required
              autoComplete="email"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password" className="form-label">Contraseña</label>
            <input
              type="password"
              id="password"
              className="form-input"
              placeholder="••••••••"
              value={form.password}
              onChange={handleChange}
              required
              autoComplete="current-password"
            />
          </div>

          <button type="submit" className="btn-primary" disabled={loading} >  {loading ? "Ejecutando Ingreso" : "Entrar"} </button>

          <Link to="/" className="back-link">← Volver al inicio</Link>

        </form>
      </div>
    </main>
  )
}
