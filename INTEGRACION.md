# Integración Clase 17 - Backend + Frontend

## Resumen de cambios realizados

Se ha integrado correctamente la carpeta **Clase 18-19-20-21** con **Clase 17** y se ha incorporado el **frontend** React.

### Cambios en Clase 17:

1. **Nuevas carpetas agregadas:**
   - `src/middlewares/` - Contiene `authMiddleware.js` para validar tokens JWT
   - `src/services/` - Contiene `auth.service.js` con lógica de negocio de autenticación

2. **Nuevos archivos agregados:**
   - `src/controllers/workspace.controller.js` - Controlador para gestionar espacios de trabajo
   - `src/routes/workspace.router.js` - Rutas para espacios de trabajo
   - `src/middlewares/authMiddleware.js` - Middleware de autenticación con JWT
   - `src/services/auth.service.js` - Lógica de negocio de autenticación

3. **Actualizaciones realizadas:**
   - Renombrados archivos de rutas: `*.route.js` → `*.router.js` para consistencia
   - Actualizado `src/main.js`:
     - Agregado `cors` para permitir solicitudes desde el frontend
     - Importado `authMiddleware` para rutas protegidas
     - Agregado `workspaceRouter` para gestionar espacios de trabajo
     - Agregada ruta `/api/test` protegida con autenticación

4. **Dependencias actualizadas en `package.json`:**
   - Agregado: `cors: ^2.8.6`
   - Actualizado: `bcrypt` a versión `^6.0.0`

### Frontend (React + Vite):

1. **Ubicación:** `/frontend`
2. **Stack:** React 19 + Vite + React Router 7
3. **Configuración de API:** Usa variable de entorno `VITE_API_URL`
   - Archivo: `frontend/.env`
   - Valor: `VITE_API_URL=http://localhost:8080/api`

### Carpeta copiada:

- **Clase 18-19-20-21:** Copiada como referencia en el repositorio padre

---

## Cómo ejecutar el proyecto

### 1. Backend (Clase 17)

```bash
cd "Clase 17 - Conexión y Consulta a DB"

# Instalar dependencias (ya se hizo)
npm install

# Ejecutar en modo desarrollo con watch
npm run dev
```

**El backend se ejecutará en:** `http://localhost:8080`

### 2. Frontend (React)

```bash
cd frontend

# Instalar dependencias (ya se hizo)
npm install

# Ejecutar en modo desarrollo
npm run dev
```

**El frontend se ejecutará en:** `http://localhost:5173` (puerto por defecto de Vite)

---

## Requisitos previos

1. **MongoDB** debe estar ejecutándose en `localhost:27017`
   - O actualizar la variable `MONGO_DB_CONNECTION_STRING` en `Clase 17/.env`

2. **Node.js 16+** instalado

3. **Variables de entorno configuradas:**
   - Backend: `Clase 17/.env` (ya existe)
   - Frontend: `frontend/.env` (ya existe con URL correcta)

---

## Flujo de autenticación integrado

1. Usuario se registra/inicia sesión en el frontend
2. Backend valida credenciales y genera JWT
3. Frontend almacena JWT (normalmente en localStorage)
4. Frontend incluye JWT en header `Authorization: Bearer <token>` para solicitudes protegidas
5. `authMiddleware` valida el token en el backend
6. Si es válido, la ruta continúa; si no, retorna error 401

---

## Rutas disponibles

### Autenticación (`/api/auth`)

- `POST /register` - Registro de usuario
- `POST /login` - Inicio de sesión
- `GET /verify-email` - Verificación de email
- `POST /reset-password-request` - Solicitar reset de contraseña
- `POST /reset-password/:token` - Resetear contraseña

### Espacios de trabajo (`/api/workspace`)

- `GET /` - Obtener espacios de trabajo del usuario (requiere autenticación)

### Health Check (`/api/health`)

- `GET /` - Verificar estado del servidor

### Test (`/api/test`)

- `GET /` - Ruta de prueba protegida (requiere JWT válido)

---

## Notas importantes

1. **CORS está habilitado** - El frontend puede hacer solicitudes al backend
2. **JWT es obligatorio** para rutas protegidas (como `/api/workspace`)
3. **El puerto del backend es 8080** - Asegúrate de que no esté en uso
4. **El .env contiene credenciales de email** - Para producción, usar variables de entorno seguras

---

## Solución de problemas

### "Cannot find module"

```bash
# Asegúrate de haber ejecutado npm install en ambas carpetas
npm install
```

### "Port 8080 is already in use"

Cambiar puerto en `Clase 17/.env`:

```
PORT=3001
```

Y actualizar también `frontend/.env`:

```
VITE_API_URL=http://localhost:3001/api
```

### "MongoDB connection refused"

Asegúrate de que MongoDB está ejecutándose:

```bash
mongod
```

### "CORS errors"

El backend ya tiene CORS configurado. Si aún tienes problemas, verifica que `frontend/.env` tenga la URL correcta del backend.

---

## Estructura final

```
Repositorio/
├── Clase 17 - Conexión y Consulta a DB/
│   ├── src/
│   │   ├── main.js (actualizado)
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── helpers/
│   │   ├── middlewares/       (nuevo)
│   │   ├── models/
│   │   ├── repository/
│   │   ├── routes/            (archivos renombrados)
│   │   └── services/          (nuevo)
│   ├── .env
│   └── package.json           (actualizado)
│
├── frontend/
│   ├── src/
│   │   ├── config/
│   │   ├── services/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── .env                   (nuevo)
│   └── package.json
│
└── Clase 18-19-20-21/         (referencia)
```

---

¡Tu proyecto está listo para usar! 🎉
