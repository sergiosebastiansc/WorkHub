# 🏢 WorkHub Coworking - Sistema Integral de Gestión y Reservas

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)

WorkHub es una plataforma **FullStack** robusta diseñada para la gestión eficiente de espacios de coworking. Permite a los usuarios registrarse, explorar oficinas disponibles, realizar reservas con validación de horarios en tiempo real y gestionar perfiles personales. Incluye un panel administrativo para el control de inventario y disponibilidad.

---

## 🚀 Arquitectura del Proyecto

El proyecto está dividido en dos grandes bloques:

1.  **Backend (`/BackEnd`):** API REST robusta construida con **Node.js** y **Express**. Utiliza **MongoDB** (vía Mongoose) para la persistencia de datos y **JWT** para la seguridad.
2.  **Frontend (`/FrontEnd`):** Single Page Application (SPA) desarrollada con **React** y **Vite**. Gestiona el estado global mediante **Context API** y la navegación con **React Router**.

---

## 🛠️ Tecnologías Utilizadas

### Backend
- **Runtime:** Node.js
- **Framework:** Express
- **Base de Datos:** MongoDB con Mongoose (ODM)
- **Seguridad:** Bcryptjs (hashing) y JSON Web Tokens (autenticación)
- **Entorno:** Dotenv

### Frontend
- **Librería:** React 18
- **Herramienta de construcción:** Vite
- **Navegación:** React Router DOM
- **Estado Global:** Context API (AuthContext, AppContext, ToastContext)
- **Estilos:** CSS3 personalizado y Bootstrap 5 (componentes visuales)

---

## ⚙️ Configuración e Instalación

### 1. Requisitos Previos
- Node.js v18 o superior.
- Instancia de MongoDB (Local o Atlas).

### 2. Instalación de dependencias
Es necesario instalar las dependencias en ambas carpetas:

```bash
# Instalar dependencias del Backend
cd BackEnd
npm install

# Instalar dependencias del Frontend
cd ../FrontEnd
npm install
```

### 3. Variables de Entorno
Crea los archivos `.env` correspondientes:

**En `WorkHub/BackEnd/.env`:**
```env
PORT=3000 
MONGO_URI=
SECRET_KEY=
```

**En `WorkHub/FrontEnd/.env`:**
```env
VITE_API_URL=http://localhost:3000
```

---

## 🏃 Ejecución del Proyecto

Debes iniciar ambos servidores simultáneamente (en terminales separadas):

**Backend:**
```bash
cd BackEnd
npm run dev
```

**Frontend:**
```bash
cd FrontEnd
npm run dev
```

---

## 📋 Funcionalidades Principales

### Usuarios y Autenticación
- **Registro:** Creación de usuarios con encriptación de contraseña.
- **Login:** Autenticación basada en JWT que permite persistencia de sesión.
- **Perfil:** Los usuarios pueden editar sus datos personales (nombre, teléfono, empresa).

### Reservas y Espacios
- **Exploración:** Catálogo visual de oficinas y salas de reuniones.
- **Reservas:** Sistema de validación de conflictos horarios en el servidor para evitar reservas duplicadas.
- **Mis Reservas:** Panel personal donde el usuario visualiza sus reservas activas obtenidas desde la DB.

### Administración
- **Panel Admin:** Vista exclusiva para usuarios con rol `admin` para gestionar la disponibilidad de espacios.
- **Seguridad:** Rutas protegidas que validan el rol del usuario antes de permitir el acceso.

---

## 📂 Estructura de Carpetas

- `BackEnd/src/models`: Definición de esquemas de Mongoose (Usuarios, Reservas, Espacios).
- `BackEnd/src/controllers`: Lógica de negocio y respuesta a endpoints.
- `FrontEnd/src/context`: Manejo de estados globales (Autenticación y Datos de App).
- `FrontEnd/src/api.js`: Servicios de comunicación con el Backend mediante `fetch`.

---
## 👥 Autores
Proyecto desarrollado por: Gloria Cornelio, Rodrigo Contreras, Sergio Salinas, Mauricio Díaz, Valentina Medina y Marcelo Martínez.