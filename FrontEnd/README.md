# WorkHub Coworking — Sistema de Reservas

![React](https://img.shields.io/badge/React-18.3-61DAFB?style=for-the-badge&logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-5.4-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![React Router](https://img.shields.io/badge/React_Router-6.28-CA4245?style=for-the-badge&logo=reactrouter&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-ES2020-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

Aplicación web desarrollada como **segunda iteración del sistema digital de reservas para WorkHub Coworking**, construida durante el **Módulo 3 – Fundamentos de React**.

Esta versión migra la arquitectura de HTML/CSS/JS vanilla a una **Single Page Application (SPA)** con React, React Router y gestión de estado global mediante Context API.

---

## Tabla de Contenido

- [Contexto del Proyecto](#contexto-del-proyecto)
- [Tecnologías Utilizadas](#tecnologías-utilizadas)
- [Arquitectura del Proyecto](#arquitectura-del-proyecto)
- [Estructura de Carpetas](#estructura-de-carpetas)
- [Páginas y Rutas](#páginas-y-rutas)
- [Componentes](#componentes)
- [Context API — Estado Global](#context-api--estado-global)
- [Cómo Ejecutar el Proyecto](#cómo-ejecutar-el-proyecto)
- [Estado del Proyecto](#estado-del-proyecto)
- [Mejoras Futuras](#mejoras-futuras)
- [Autores](#autores)

---

## Contexto del Proyecto

**WorkHub Coworking** es una plataforma digital para la gestión y reserva de espacios de trabajo profesionales. Permite a los usuarios alquilar desde oficinas privadas hasta escritorios compartidos, y a los administradores controlar la disponibilidad en tiempo real.

Esta segunda versión reescribe completamente el frontend con React para lograr:

- Navegación entre páginas sin recargar el navegador (SPA)
- Estado compartido entre componentes sin duplicar datos
- Código modular, reutilizable y más fácil de mantener

---

## Tecnologías Utilizadas

| Tecnología | Versión | Uso |
|---|---|---|
| React | 18.3 | Biblioteca principal de UI |
| React Router DOM | 6.28 | Navegación entre páginas (SPA) |
| Vite | 5.4 | Bundler y servidor de desarrollo |
| Context API | (incluido en React) | Estado global de la aplicación |
| CSS3 | — | Estilos personalizados |
| Bootstrap 5 | (vía CDN) | Componentes visuales (carrusel) |

Fuentes utilizadas: **Inter** · **JetBrains Mono**

---

## Arquitectura del Proyecto

La aplicación funciona completamente en el **frontend**. Los datos (espacios, reservas, usuarios) se almacenan en memoria mediante el **Context API de React**, sin backend ni base de datos en esta versión.

```
Usuario
  │
  ▼
BrowserRouter (GPS de la app)
  │
  ▼
App.jsx (define las rutas)
  │
  ├── AppContext   →  espacios, reservas, usuarios
  └── ToastContext →  notificaciones globales
```

Cuando el usuario navega a una URL, React Router muestra el componente correspondiente. Ese componente obtiene los datos que necesita del Context sin que nadie se los pase manualmente.

---

## Estructura de Carpetas

```
src/
│
├── main.jsx                  # Punto de entrada — enciende React
├── App.jsx                   # Define las rutas de la aplicación
│
├── context/
│   ├── AppContext.jsx         # Estado global: espacios, reservas, usuarios
│   └── ToastContext.jsx       # Estado global: notificaciones toast
│
├── pages/                    # Una página por ruta
│   ├── Home.jsx              # /  →  Portada con carrusel y espacios
│   ├── Booking.jsx           # /booking  →  Formulario de reserva
│   ├── MyBookings.jsx        # /my-bookings  →  Mis reservas activas
│   ├── Contact.jsx           # /contact  →  Formulario de contacto
│   ├── Register.jsx          # /register  →  Registro de usuario
│   ├── Login.jsx             # /login  →  Inicio de sesión
│   └── Admin.jsx             # /admin  →  Panel de administración
│
├── components/               # Piezas reutilizables
│   ├── Navbar.jsx            # Barra de navegación superior
│   ├── Footer.jsx            # Pie de página
│   ├── SpaceCard.jsx         # Tarjeta de un espacio
│   ├── BookingCard.jsx       # Tarjeta de una reserva
│   ├── Toast.jsx             # Notificación flotante
│   └── DecorGrid.jsx         # Decoración visual de fondo
│   └── LocationMap.jsx       # Ubicación de Oficinas, API GoogleMaps
│
└── css/
    ├── style.css             # Estilos globales
    └── acceso.css            # Estilos del login/registro
```

---

## Páginas y Rutas

| Ruta | Componente | Descripción |
|---|---|---|
| `/` | `Home` | Portada con carrusel y catálogo de espacios |
| `/booking` | `Booking` | Formulario para crear una nueva reserva |
| `/my-bookings` | `MyBookings` | Lista de reservas activas del usuario |
| `/contact` | `Contact` | Formulario de contacto con datos de la empresa |
| `/register` | `Register` | Registro de nueva cuenta |
| `/login` | `Login` | Inicio de sesión (sin Navbar ni Footer) |
| `/admin` | `Admin` | Panel para activar/desactivar disponibilidad de espacios |

La ruta `/login` tiene un layout diferente al resto — no muestra Navbar ni Footer, solo el formulario centrado.

---

## Componentes

### `Navbar`
Barra de navegación fija en la parte superior con links a todas las secciones. Visible en todas las páginas excepto `/login`.

### `Footer`
Pie de página con información de la empresa. Visible en todas las páginas excepto `/login`.

### `SpaceCard`
Tarjeta individual de un espacio de trabajo. Recibe como prop un objeto `space` y muestra su nombre, tipo, capacidad, precio e imagen.

### `BookingCard`
Tarjeta individual de una reserva. Muestra el espacio reservado, fecha, hora, usuario y un botón para cancelar.

### `Toast`
Notificación flotante que aparece y desaparece automáticamente después de 3.5 segundos. Se activa llamando a `showToast(mensaje, tipo)` desde cualquier componente.

### `DecorGrid`
Elemento visual decorativo de fondo. No contiene lógica de negocio.

### `LocationMap`
Este componente gestiona la visualización dinámica de la ubicación física de **WorkHub** utilizando la API de Google Maps y hooks modernos de React.
- **Data Fetching:** Fetch API nativa con patrón `async/await`.
- **Manejo de Estados:** `useState`, para control de carga (`loading`), errores y datos de ubicación.
- **Efectos:** `useEffect` para sincronización de datos al montar el componente.
---

## Context API — Estado Global

La aplicación utiliza dos contextos para compartir datos entre componentes sin necesidad de pasar props manualmente.

### `AppContext`

Centraliza toda la lógica de negocio de la aplicación.

**Estado que maneja:**

| Estado | Tipo | Descripción |
|---|---|---|
| `spaces` | Array | Los 4 espacios de trabajo disponibles |
| `bookings` | Array | Reservas creadas durante la sesión |
| `registeredUsers` | Array | Usuarios registrados durante la sesión |

**Funciones disponibles:**

```javascript
// Cambia la disponibilidad de un espacio (disponible ↔ ocupado)
toggleAvailability(id)

// Crea una nueva reserva y la agrega al estado
addBooking(spaceId, date, time, user)

// Elimina una reserva por su ID
cancelBooking(bookingId)

// Registra un nuevo usuario (valida email duplicado)
registerUser(userData)  // → { ok: true } | { ok: false, message }

// Valida credenciales de ingreso
loginUser(email, password)  // → { ok: true } | { ok: false, message }
```

**Uso en cualquier componente:**

```javascript
import { useApp } from '../context/AppContext.jsx'

const { spaces, addBooking } = useApp()
```

### `ToastContext`

Gestiona las notificaciones visuales de la aplicación.

```javascript
import { useToast } from '../context/ToastContext.jsx'

const { showToast } = useToast()

showToast('Reserva confirmada', 'success')
showToast('Las contraseñas no coinciden', 'error')
```

---

## Cómo Ejecutar el Proyecto

**Requisitos previos:** Node.js 18 o superior instalado.

```bash
# 1. Clonar el repositorio
git clone https://github.com/sergiosebastiansc/Proyecto-integrador-react.git

# 2. Entrar a la carpeta
cd Proyecto-integrador-react

# 3. Instalar dependencias
npm install

# 4. instalar bootstrap
npm install react-bootstrap bootstrap

#5. Iniciar el servidor de desarrollo
npm run dev
```

Abrir en el navegador: [http://localhost:5173](http://localhost:5173)

**Otros comandos disponibles:**

```bash
npm run build    # Genera la versión de producción en /dist
npm run preview  # Previsualiza la versión de producción localmente
```

---

## Estado del Proyecto

- ✅ SPA con React Router y 7 rutas
- ✅ Estado global con Context API
- ✅ Sistema de reservas funcional
- ✅ Panel de administración con toggle de disponibilidad
- ✅ Registro y login de usuarios (simulado en frontend)
- ✅ Notificaciones toast globales
- ✅ Diseño responsive
- ⏳ Sin backend ni persistencia de datos (los datos se pierden al recargar)

---

## Mejoras Futuras

- Integración con backend (Node.js + Express)
- Base de datos para persistir reservas y usuarios
- Autenticación real con JWT
- Rutas protegidas (redirigir a login si no hay sesión)
- Panel de administración con métricas y estadísticas
- Envío real del formulario de contacto
- Despliegue en producción (Vercel / Netlify)

---

## Autores

Proyecto desarrollado en el marco de un bootcamp de desarrollo Fullstack JavaScript.

| Nombre | Rol |
|---|---|
| Gloria Cornelio | Frontend |
| Rodrigo Contreras | Frontend |
| Sergio Salinas | Frontend |
| Mauricio Díaz | Frontend |
| Valentina Medina | Frontend |
| Marcelo Martínez | Frontend |

---

*Este proyecto es de código abierto con fines educativos. Siéntete libre de explorarlo, clonarlo y proponer mejoras.*

