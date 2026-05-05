# Clase 11 - Workspace System con MongoDB

Sistema de gestión de espacios de trabajo con usuarios, canales y miembros utilizando MongoDB y Mongoose.

## Estructura del Proyecto

```
Clase 11/
├── src/
│   ├── config/
│   │   ├── environment.config.js      # Configuración de variables de entorno
│   │   └── mongoDB.config.js          # Conexión a MongoDB
│   ├── models/
│   │   ├── user.model.js              # Modelo de Usuario
│   │   ├── workspace.model.js         # Modelo de Workspace
│   │   ├── workspaceMember.model.js   # Modelo de Miembro del Workspace
│   │   ├── channel.model.js           # Modelo de Canal
│   │   └── channelMessages.model.js   # Modelo de Mensajes del Canal
│   ├── repository/
│   │   ├── user.repository.js         # Repository de Usuario
│   │   ├── workspace.repository.js    # Repository de Workspace
│   │   └── member.repository.js       # Repository de Miembro
│   └── main.js                        # Archivo principal
├── .env.example                       # Ejemplo de variables de entorno
├── .gitignore                         # Archivos a ignorar
├── package.json                       # Dependencias del proyecto
└── README.md                          # Este archivo
```

## Instalación

1. **Instalar dependencias:**

```bash
npm install
```

2. **Configurar variables de entorno:**
   - Copiar `.env.example` a `.env`
   - Actualizar `MONGO_DB_CONNECTION_STRING` con tu cadena de conexión MongoDB

3. **Ejecutar en modo desarrollo:**

```bash
npm run dev
```

## Modelos de Datos

### User

- `name`: Nombre del usuario
- `email`: Email único
- `password`: Contraseña
- `email_verified`: Verificación de email
- `created_at`: Fecha de creación

### Workspace

- `title`: Título del workspace
- `description`: Descripción
- `created_at`: Fecha de creación
- `active`: Estado activo/inactivo
- `url_image`: URL de imagen

### WorkspaceMember

- `fk_id_user`: Referencia a Usuario
- `fk_id_workspace`: Referencia a Workspace
- `role`: Rol (owner, admin, user)
- `created_at`: Fecha de creación

### Channel

- `fk_id_workspace`: Referencia a Workspace
- `name`: Nombre del canal
- `description`: Descripción
- `created_at`: Fecha de creación

### ChannelMessages

- `fk_id_channel`: Referencia a Canal
- `fk_id_member`: Referencia a Miembro del Workspace
- `content`: Contenido del mensaje
- `created_at`: Fecha de creación

## Repositories

Los repositories implementan operaciones CRUD:

- **UserRepository**: create, getById, updateById, deleteById, getByEmail
- **WorkspaceRepository**: create, getById, updateById, deleteById
- **WorkspaceMemberRepository**: create, getById, updateRoleById, deleteById, getMemberList

## Notas Importantes

- Asegúrate de tener una cadena de conexión MongoDB válida en `.env`
- Los modelos usan referencias (ObjectId) para mantener la integridad relacional
- El método `getMemberList` en WorkspaceMemberRepository utiliza `populate` para traer datos relacionados
- Se recomienda usar `async/await` para manejar operaciones asincrónicas
