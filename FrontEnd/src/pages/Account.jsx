import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext.jsx'
import { useToast } from '../context/ToastContext.jsx'
import { useAuth, AUTH_ACTIONS } from "../context/AuthContext";

export default function Account() {
    const { state, dispatch } = useAuth()
    const { updateUser, changePassword } = useApp()
    const usuario = state.usuario
    const { showToast } = useToast()
    const navigate = useNavigate()
    const [form, setForm] = useState({
        firstname: usuario?.nombre?.split(' ')[0] || '',
        lastname: usuario?.nombre?.split(' ').slice(1).join(' ') || '',
        email: usuario?.email || '',
        phone: usuario?.telefono || '',
        company: usuario?.empresa || '',
    })
    const [passwordForm, setPasswordForm] = useState({
        newPassword: '',
        confirmPassword: '',
    })
    const [isEditing, setIsEditing] = useState(false)
    function handleChange(e) {
        setForm(prev => ({ ...prev, [e.target.id]: e.target.value }))
    }
    function handlePasswordChange(e) {
        setPasswordForm(prev => ({ ...prev, [e.target.id]: e.target.value }))
    }
    function handleSubmit(e) {
        e.preventDefault()
        updateUser(form)
        showToast('Datos actualizados correctamente', 'success')
        setIsEditing(false)
    }
    function handlePasswordSubmit(e) {
        e.preventDefault()
        if (passwordForm.newPassword !== passwordForm.confirmPassword) {
            showToast('Las contraseñas no coinciden', 'error')
            return
        }
        if (passwordForm.newPassword.length < 6) {
            showToast('La contraseña debe tener al menos 6 caracteres', 'error')
            return
        }
        changePassword(passwordForm.newPassword)
        showToast('Contraseña actualizada correctamente', 'success')
        setPasswordForm({ newPassword: '', confirmPassword: '' })
    }
    function handleLogout() {
        dispatch({ type: AUTH_ACTIONS.LOGOUT })
        showToast('Sesión cerrada', 'success')
        navigate('/')
    }
    return (
        <section className="section active">
            <header className="section-header">
                <span className="data-label">GESTIÓN DE CUENTA</span>
                <h2>Mi Cuenta</h2>
            </header>
            <div className="contenedor-center">
                <div style={{ width: '100%', maxWidth: '600px' }}>
                    <div className="account-section">
                        <div className="account-header">
                            <h3>DATOS PERSONALES</h3>
                            {!isEditing && (
                                <button className="btn-edit" onClick={() => setIsEditing(true)}>
                                    Editar
                                </button>
                            )}
                        </div>
                        {isEditing ? (
                            <form onSubmit={handleSubmit}>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                    <div className="form-group">
                                        <label htmlFor="firstname" className="form-label">Nombre</label>
                                        <input type="text" className="form-input" id="firstname" value={form.firstname} onChange={handleChange} required />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="lastname" className="form-label">Apellido</label>
                                        <input type="text" className="form-input" id="lastname" value={form.lastname} onChange={handleChange} required />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="email" className="form-label">Email</label>
                                    <input type="email" className="form-input" id="email" value={form.email} onChange={handleChange} required />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="phone" className="form-label">Teléfono</label>
                                    <input type="tel" className="form-input" id="phone" value={form.phone} onChange={handleChange} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="company" className="form-label">Empresa</label>
                                    <input type="text" className="form-input" id="company" value={form.company} onChange={handleChange} />
                                </div>
                                <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                                    <button type="submit" className="btn-primary" style={{ flex: 1 }}>GUARDAR CAMBIOS</button>
                                    <button type="button" className="btn-cancel" onClick={() => setIsEditing(false)}>CANCELAR</button>
                                </div>
                            </form>
                        ) : (
                            <div className="account-data">
                                <div className="data-row">
                                    <span className="data-label">NOMBRE</span>
                                    <span>{usuario?.nombre}</span>
                                </div>
                                <div className="data-row">
                                    <span className="data-label">EMAIL</span>
                                    <span>{usuario?.email}</span>
                                </div>
                                <div className="data-row">
                                    <span className="data-label">TELÉFONO</span>
                                    <span>{usuario?.telefono || 'No especificado'}</span>
                                </div>
                                <div className="data-row">
                                    <span className="data-label">EMPRESA</span>
                                    <span>{usuario?.empresa || 'No especificada'}</span>
                                </div>
                            </div>
                        )}
                    </div>
                    <div className="account-section" style={{ marginTop: '2rem' }}>
                        <h3>CAMBIAR CONTRASEÑA</h3>
                        <form onSubmit={handlePasswordSubmit}>
                            <div className="form-group">
                                <label htmlFor="newPassword" className="form-label">Nueva Contraseña</label>
                                <input type="password" className="form-input" id="newPassword" placeholder="Mínimo 6 caracteres" value={passwordForm.newPassword} onChange={handlePasswordChange} required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="confirmPassword" className="form-label">Confirmar Contraseña</label>
                                <input type="password" className="form-input" id="confirmPassword" placeholder="Repite la contraseña" value={passwordForm.confirmPassword} onChange={handlePasswordChange} required />
                            </div>
                            <button type="submit" className="btn-primary">ACTUALIZAR CONTRASEÑA</button>
                        </form>
                    </div>
                    <div style={{ marginTop: '2rem', textAlign: 'center' }}>
                        <button className="btn-danger" onClick={() => dispatch({ type: AUTH_ACTIONS.LOGOUT })} style={{ padding: '1rem 2rem' }}>
                            CERRAR SESIÓN ({state.usuario?.email})
                        </button>
                    </div>
                </div>
            </div>
        </section>
    )
}
