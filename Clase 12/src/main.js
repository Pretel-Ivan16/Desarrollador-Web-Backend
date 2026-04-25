import ENVIRONMENT from "./config/environment.config.js"
import connectMongoDB from "./config/mongoDB.config.js"
import missionRepository from "./repository/mission.repository.js"
import taskRepository from "./repository/task.repository.js"
import userRepository from "./repository/user.repository.js"



connectMongoDB()

//userRepository.create('Test')

/* missionRepository.create('Codificar facebook funcional', '699ca7e6e7491a39707bad1c') */

//taskRepository.createTask('699ca8818e49bc2ca54ec8d5', 'hacer un logo', 'lorem', 240)

//taskRepository.updateCompletedById('699ca8df701868921bdac8ad', true)

//taskRepository.deleteById('699ca8df701868921bdac8ad')

/* 
missionRepository
    getByUserId(user_id) => Trae las misiones asociadas a un usuario
    [
        {
            title,
            status,
            created_at
        }
    ]

    getGlobal() => Trae todas las misiones con el nombre del usuario que las creo
    [
        {
            mission_id,
            mission_title,
            mission_status,
            mission_created_at,
            user_name,
            user_id
        }
    ]
    PD: Recuerden que pueden mapear para mejorar el formato de respuesta

taskRepository 
    getTasksByMissionId(mission_id) => Todas las tareas asociadas a una mision


*/
/* missionRepository.getByUserId('699ca7e6e7491a39707bad1c') */
//missionRepository.getGlobalMissions()

//taskRepository.createTask('699ca8818e49bc2ca54ec8d5', 'hacer un logo', 'lorem', 240)

//taskRepository.getTasksByMissionId('699ca8818e49bc2ca54ec8d5').then(result => console.log(result))

/* 
missionRepository
clone(mission_id) => Se debera crear una mision nueva a partir de la mision id proporcionada, esta nueva mision tendra el mismo estado de la mision origial (exceptuando el id) y tambien tendra todas las tareas asociadas, pero los estados temporales seran reiniciados (osea un task terminada ahora volvera a no estarlo y el estatus de mision volvera a ser pendiente o false) 

Crear un nuevo modelo llamado Visitantes / Visitor, ahora otros usuarios podran ser visitantes de nuestra mision, es decir que podremos agregar gente que vea el seguimiento de nuestra mision y tareas

Para esto el visitante se relacionara a una mision, tendra un rol 'read-only' o 'support' o 'admin'

En su repository tendremos:

.add(mission_id, user_id, role)
.delete(mission_id, user_id)
.modifyRole(mission_id, user_id, new_role)


*/
