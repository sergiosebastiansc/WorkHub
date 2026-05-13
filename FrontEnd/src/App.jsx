import { Routes, Route } from 'react-router-dom'
import { useEffect, useState } from "react";
import { AppProvider } from './context/AppContext.jsx'
import { ToastProvider } from './context/ToastContext.jsx'
import { getEspacios, getReservas } from "./api";
import { useAuth, AUTH_ACTIONS } from "./context/AuthContext";

import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import Toast from './components/Toast.jsx'
import DecorGrid from './components/DecorGrid.jsx'

import Home from './pages/Home.jsx'
import Booking from './pages/Booking.jsx'
import MyBookings from './pages/MyBookings.jsx'
import Contact from './pages/Contact.jsx'
import Register from './pages/Register.jsx'
import Admin from './pages/Admin.jsx'
import Login from './pages/Login.jsx'
import Account from './pages/Account.jsx'

export default function App() {
  const { state, dispatch } = useAuth();
  const [vistaAuth, setVistaAuth] = useState("login"); // "login" | "registro"

  const [espacios, setEspacios] = useState([]);
  const [reservas, setReservas] = useState([]);
  const [tab, setTab] = useState("espacios");
  const [loadingEspacios, setLoadingEspacios] = useState(true);
  const [loadingReservas, setLoadingReservas] = useState(true);
  const [errorEspacios, setErrorEspacios] = useState("");
  const [errorReservas, setErrorReservas] = useState("");
  


   useEffect(() => {
    if (!state.token) return;
    setLoadingEspacios(true);
    getEspacios()
      .then(setEspacios)
      .catch((e) => setErrorEspacios(e.message))
      .finally(() => setLoadingEspacios(false));
  }, [state.token]);

  const cargarReservas = () => {
    setLoadingReservas(true);
    getReservas(state.usuario.id)
      .then(setReservas)
      .catch((e) => setErrorReservas(e.message))
      .finally(() => setLoadingReservas(false));
  };

  useEffect(() => {
    if (!state.token) return;
    cargarReservas();
  }, [state.token]);

  return (
    
    <AppProvider>
      <ToastProvider>
        <DecorGrid />
        <Routes>
          {/* Login — sin Navbar ni Footer */}
          <Route path="/login" element={
            <>
              <Login />
              <Toast />
            </>
          } />

          {/* App principal — con Navbar y Footer */}
          <Route path="/*" element={
            <>
              <Navbar />
              <main>
                <Routes>
                  <Route path="/"            element={<Home />} />
                  <Route path="/booking"     element={<Booking />} />
                  <Route path="/my-bookings" element={<MyBookings />} />
                  <Route path="/contact"     element={<Contact />} />
                  <Route path="/register"    element={<Register />} />
                  <Route path="/admin"       element={<Admin />} />
                  <Route path="/account"     element={<Account />} />
                </Routes>
              </main>
              <Footer />
              <Toast />
            </>
          } />
        </Routes>
      </ToastProvider>
    </AppProvider>
  )
}
