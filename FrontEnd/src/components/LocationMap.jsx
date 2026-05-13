import React, { useState, useEffect } from 'react';

const LocationMap = () => {
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Simulamos una petición a un endpoint de configuración 
    const fetchLocationData = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://jsonplaceholder.typicode.com/users/1'); // Endpoint de prueba

        if (!response.ok) {
          // Verificación de gestión de errores (ej. 404, 500)
          throw new Error(`Error ${response.status}: No se pudo obtener la ubicación.`);
        }

        const data = await response.json();
        
        // Simulamos que la API nos devuelve las coordenadas de WorkHub
        
        const officeCoords = {
          
          mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3329.123456789!2d-70.64827!3d-33.4372!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzPCsDI2JzEzLjMiUyA3MMKwMzgnNTMuOCJX!5e0!3m2!1ses!2scl!4v1620000000000!5m2!1ses!2scl"
        };

        setLocation(officeCoords);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchLocationData();
  }, []);

  // 1. Estado de Carga
  if (loading) {
    return (
      <div className="map-placeholder d-flex justify-content-center align-items-center bg-dark text-warning" style={{ height: '400px', borderRadius: '15px' }}>
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Cargando mapa...</span>
        </div>
        <p className="ms-3">Buscando coordenadas de WorkHub...</p>
      </div>
    );
  }

  // 2. Gestión de Errores Visuales
  if (error) {
    return (
      <div className="alert alert-danger shadow-sm" role="alert">
        <strong>Hubo un problema:</strong> {error}
        <button className="btn btn-sm btn-outline-danger ms-3" onClick={() => window.location.reload()}>Reintentar</button>
      </div>
    );
  }

  // 3. Renderizado Exitoso
  return (
    <div className="map-container stratum-card" style={{ overflow: 'hidden', marginTop: '2rem' }}>
      <div className="card-header">
        <span className="data-label ">NUESTRA UBICACIÓN</span>
        <p className="small mb-0">{location.address}</p>
      </div>
      <iframe
        title="Ubicación de WorkHub"
        src={location.mapUrl}
        width="100%"
        height="240"
        style={{ border: 0, filter: 'grayscale(0.5) contrast(1.2)' }}
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
       
        
      ></iframe>
    </div>
  );
};

export default LocationMap;
