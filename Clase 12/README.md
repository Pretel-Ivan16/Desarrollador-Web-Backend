# Clase 12 - Sistema de Misiones y Tareas

Sistema de gestión de misiones y tareas con MongoDB y Mongoose, implementando patrones de repositorio para operaciones CRUD.

## Estructura del Proyecto

```
Clase 12/
├── src/
│   ├── config/
│   │   ├── environment.config.js      # Configuración de variables de entorno
│   │   └── mongoDB.config.js          # Conexión a MongoDB
│   ├── models/
│   │   ├── user.model.js              # Modelo de Usuario
│   │   ├── mission.model.js           # Modelo de Misión
│   │   └── task.model.js              # Modelo de Tarea
│   ├── repository/
│   │   ├── user.repository.js         # Repository de Usuario
│   │   ├── mission.repository.js      # Repository de Misión
│   │   └── task.repository.js         # Repository de Tarea
│   ├── utils/
│   │   └── constants/
│   │       └── mission.constants.js   # Constantes de Misión
│   ├── main.js                        # Archivo principal
├── test.js                            # Archivo de ejemplo/test
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
- `created_at`: Fecha de creación

### Mission

- `title`: Título de la misión
- `created_at`: Fecha de creación
- `status`: Estado (pending, completed)
- `fk_id_user`: Referencia a Usuario

### Task

- `title`: Título de la tarea
- `description`: Descripción de la tarea
- `duration_min`: Duración estimada en minutos
- `completed`: Estado de completitud
- `created_at`: Fecha de creación
- `end_at`: Fecha de finalización
- `fk_id_mission`: Referencia a Misión

## Repositories

### UserRepository

- `create(name)`: Crear un nuevo usuario

### MissionRepository

- `create(title, id_user)`: Crear una nueva misión
- `actualizarEstatusPorId(mission_id, new_status)`: Actualizar estado de misión
- `getByUserId(id_user)`: Obtener misiones de un usuario
- `getGlobalMissions()`: Obtener todas las misiones con datos del usuario
- `clone(epic_id)`: Clonar una misión con todas sus tareas

### TaskRepository

- `createTask(id_mission, name, description, stimated_duration_min)`: Crear tarea
- `updateCompletedById(task_id, new_value)`: Actualizar estado de completitud
- `deleteById(task_id)`: Eliminar tarea
- `updateById(id, new_props)`: Actualizar propiedades de tarea
- `getTasksByMissionId(mission_id)`: Obtener tareas de una misión
- `createMany(tasks_to_create)`: Crear múltiples tareas

## Constantes

### MISSION_STATUS

- `PENDING`: "pending" - Misión pendiente
- `COMPLETED`: "completed" - Misión completada

## Ejemplos de Uso

```javascript
// Crear un usuario
await userRepository.create("Test User");

// Crear una misión
await missionRepository.create(
  "Codificar facebook funcional",
  "699ca7e6e7491a39707bad1c",
);

// Crear una tarea
await taskRepository.createTask(
  "699ca8818e49bc2ca54ec8d5",
  "hacer un logo",
  "lorem",
  240,
);

// Obtener misiones de un usuario
await missionRepository.getByUserId("699ca7e6e7491a39707bad1c");

// Obtener todas las misiones
await missionRepository.getGlobalMissions();

// Obtener tareas de una misión
await taskRepository.getTasksByMissionId("699ca8818e49bc2ca54ec8d5");

// Clonar una misión
await missionRepository.clone("699ca8818e49bc2ca54ec8d5");
```

## Notas Importantes

- Asegúrate de tener una cadena de conexión MongoDB válida en `.env`
- Los modelos usan referencias (ObjectId) para mantener la integridad relacional
- Se recomienda usar `async/await` para manejar operaciones asincrónicas
- El método `clone` de MissionRepository clona la misión y todas sus tareas, reiniciando estados temporales
- El archivo `test.js` contiene código de ejemplo
