# 🚀 User CRUD - Backend

![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)
![MySQL](https://img.shields.io/badge/MySQL-005C84?style=for-the-badge&logo=mysql&logoColor=white)
![Sequelize](https://img.shields.io/badge/Sequelize-52B0E7?style=for-the-badge&logo=Sequelize&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens)

API REST para gestión de usuarios y posiciones desarrollada como parte del proyecto de Herramientas de Programacion III. Este sistema implementa un CRUD completo con autenticación basada en roles.

👉 **Repositorio del frontend:** [Management Frontend](https://github.com/KarenGarzonM/management-frontend)

---

## 📋 Tabla de Contenidos

- [Descripción](#-descripción)
- [Funcionalidades Principales](#-funcionalidades-principales)
- [Tecnologías y Dependencias](#-tecnologías-y-dependencias)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [Instalación](#-instalación)
- [API Endpoints](#-api-endpoints)
- [Seguridad](#-seguridad)
- [Autores](#-autores)

---

## 📝 Descripción

El sistema permite gestionar usuarios y sus posiciones laborales con control de acceso basado en roles. Solo usuarios autenticados con roles de **admin** o **supervisor** pueden acceder a las funcionalidades del sistema según sus permisos.

---

## 🔐 Funcionalidades Principales

- **Autenticación y Autorización**
  - Login con validación de roles (admin/supervisor)
  - Protección de rutas con JWT

- **Gestión de Usuarios**
  - Creación de usuarios con contraseñas seguras
  - Consulta, actualización y eliminación de usuarios
  - Validación de datos de entrada

- **Gestión de Posiciones**
  - CRUD completo para posiciones laborales
  - Validación de datos de entrada
  - Control de estado activo/inactivo

- **Seguridad**
  - Hash de contraseñas con bcryptjs
  - Protección contra inyección SQL con ORM
  - Validaciones con express-validator
  - Tokens JWT para autenticación

---

## 🧰 Tecnologías y Dependencias

### Backend
- **Node.js** - Entorno de ejecución
- **Express** - Framework web
- **Sequelize** - ORM para bases de datos
- **MySQL** - Base de datos relacional

### Seguridad
- **bcryptjs** - Hash de contraseñas
- **jsonwebtoken** - Generación y validación de tokens JWT

### Utilidades
- **cors** - Manejo de CORS
- **dotenv** - Variables de entorno
- **express-validator** - Validación de datos

---

## 📂 Estructura del Proyecto

```
management-backend/
├── src/
│   ├── api/
│   │   ├── app.js                           # Configuración de la aplicación Express
│   │   ├── server.js                        # Punto de entrada del servidor
│   │   ├── auth/
│   │   │   ├── auth.controller.js           # Controlador de autenticación
│   │   │   ├── auth.middleware.js           # Middlewares de autenticación (JWT)
│   │   │   ├── auth.routes.js               # Rutas de autenticación
│   │   │   ├── auth.service.js              # Lógica de negocio de autenticación
│   │   │   └── auth.validator.js            # Validación de datos de entrada
│   │   ├── dashboard/                       
│   │   │   ├── dashboard.controller.js      # Controlador del dashboard
│   │   │   ├── dashboard.repository.js      # Acceso a datos del dashboard
│   │   │   ├── dashboard.routes.js          # Rutas del dashboard
│   │   │   └── dashboard.service.js         # Lógica de negocio del dashboard
│   │   ├── positions/
│   │   │   ├── position.controller.js       # Controlador de posiciones
│   │   │   ├── position.repository.js       # Acceso a datos de posiciones
│   │   │   ├── position.service.js          # Lógica de negocio de posiciones
│   │   │   ├── position.validator.js        # Validación de datos de posiciones
│   │   │   └── positions.routes.js          # Rutas de posiciones
│   │   └── users/
│   │       ├── user.controller.js           # Controlador de usuarios
│   │       ├── user.repository.js           # Acceso a datos de usuarios
│   │       ├── user.routes.js               # Rutas de usuarios
│   │       ├── user.service.js              # Lógica de negocio de usuarios
│   │       └── user.validator.js            # Validación de datos de usuarios
│   └── database/
│       ├── config/
│       │   └── config.js                    # Configuración de conexión a BD
│       ├── migrations/
│       │   ├── 20251112012406-create-position.js  # Crear tabla positions
│       │   └── 20251112012419-create-user.js      # Crear tabla users
│       ├── models/
│       │   ├── index.js                     # Exporta todos los modelos
│       │   ├── position.js                  # Modelo de posiciones
│       │   └── user.js                      # Modelo de usuarios
│       └── seeders/
│           ├── 20251112013621-positions-seeder.js # Datos iniciales de posiciones
│           └── 20251112013626-users-seeder.js     # Datos iniciales de usuarios
├── shared/
│   └── utils/
│       └── util.js                          # Funciones utilitarias comunes
├── package.json                             # Dependencias y scripts
├── README.md                                # Documentación
```

---

## 📦 Instalación

### Requisitos Previos
- Node.js (v14 o superior)
- MySQL (v5.7 o superior)

### Pasos

1. **Clonar el repositorio:**

```bash
git clone https://github.com/nykt3r/management-backend
cd management-backend
```

2. **Instalar dependencias:**

```bash
npm install
```

3. **Configurar variables de entorno:**

Crea un archivo `.env` en la raíz del proyecto con la siguiente configuración:

```bash
PORT=8080
DB_PORT=3306
DB_NAME=nombre_de_tu_base_de_datos
DB_USER=tu_usuario
DB_PASS=tu_contraseña
DB_DIALECT=mysql
DB_HOST=localhost
JWT_SECRET=9d7!A#s2$P0x1Tz&kLmN4@rQ8^vYwZbC # Puedes cambiarla por cualquier cadena segura
JWT_EXPIRES_IN=24h
```
⚠️ **Nota sobre JWT_SECRET**: La clave secreta proporcionada es solo un ejemplo. Para entornos de producción, se recomienda generar una clave secreta única y compleja.

4. **Crear la base de datos:**

Antes de ejecutar las migraciones, necesitas crear la base de datos manualmente en MySQL:

```bash
CREATE DATABASE nombre_de_tu_base_de_datos;
```

5. **Inicializar la base de datos:**

```bash
npx sequelize-cli db:migrate
```

6. **Insertar datos iniciales:**
Ejecuta los siguientes comandos en tu cliente MySQL para crear los roles y usuario admin inicial:

```bash
USE nombre_de_tu_base_de_datos;

INSERT INTO positions(positionId, positionName) VALUES (1, "Admin"), (2, "Supervisor");

INSERT INTO users(id, firstName, lastName, email, age, positionId, password) 
VALUES (1, "admin", "admin", "admin@gmail.com", 20, 1, "$2b$10$Eryl4S6V6mIae/SL5JXmB.QUhZR1kLdqieWlWRll7cHueCJApi.Ba");
```

> 💡 **Credenciales por defecto:**
>
> El sistema incluye un usuario administrador preconfigurado:
>
> **Email:** `admin@gmail.com`  
> **Contraseña:** `123456789`  
> _(La contraseña está hasheada en la base de datos con bcrypt)_


5. **Iniciar el servidor:**

```bash
# Modo desarrollo
npm run dev

# Modo producción
npm start
```

El servidor estará disponible en `http://localhost:8080`.

---

## 🔗 API Endpoints

### Autenticación

| Método | Endpoint | Descripción | Roles |
|--------|----------|-------------|-------|
| POST | `/api/auth/login` | Iniciar sesión | Público |
| GET | `/api/auth/validate` | Validar token JWT | Público |
| POST | `/api/auth/logout` | Cerrar sesión | Autenticado |

### Usuarios

| Método | Endpoint | Descripción | Roles |
|--------|----------|-------------|-------|
| GET | `/api/users` | Obtener todos los usuarios (paginado) | Admin, Supervisor |
| GET | `/api/users/:id` | Obtener usuario por ID | Admin |
| POST | `/api/users` | Crear nuevo usuario | Admin |
| PUT | `/api/users/:id` | Actualizar usuario | Admin |
| DELETE | `/api/users/:id` | Eliminar usuario | Admin |

### Posiciones

| Método | Endpoint | Descripción | Roles |
|--------|----------|-------------|-------|
| GET | `/api/positions` | Obtener todas las posiciones (paginado) | Admin, Supervisor |
| GET | `/api/positions/All` | Obtener todas las posiciones activas | Admin, Supervisor |
| GET | `/api/positions/:id` | Obtener posición por ID | Admin, Supervisor |
| POST | `/api/positions` | Crear nueva posición | Admin |
| PUT | `/api/positions/:id` | Actualizar posición | Admin, Supervisor |
| DELETE | `/api/positions/:id` | Eliminar posición | Admin |

### Dashboard

| Método | Endpoint | Descripción | Roles |
|--------|----------|-------------|-------|
| GET | `/api/dashboard` | Metricas/estadisticas del aplicativo | Admin, Supervisor |

---

## 🔒 Seguridad

El sistema implementa las siguientes medidas de seguridad:

- **Autenticación**: JWT (JSON Web Tokens) para verificar la identidad del usuario.
- **Autorización**: Control de acceso basado en roles.
- **Contraseñas**: Hash con bcryptjs (10 rondas de salt).
- **Validación**: Validación de entrada con express-validator para prevenir inyecciones y datos malformados.
- **Sesiones**: Tiempo de expiración de tokens configurable.

---

## 👥 Autores

- [**Juan Jose Alvarez Gonzalez**](https://github.com/nykt3r)
- [**Jarol Stiben Paria Ramírez**](https://github.com/JarolParia)
- [**Karen Daniela Garzón Morales**](https://github.com/KarenGarzonM)

Todos los desarrolladores participaron activamente en el diseño y desarrollo del **frontend** y **backend** del sistema User CRUD.