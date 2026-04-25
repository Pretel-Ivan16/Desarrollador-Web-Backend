import Mission from "../models/mission.model.js";
import taskRepository from "./task.repository.js";
class MissionRepository {
    async create(title, id_user) {
        await Mission.create({
            title: title,
            fk_id_user: id_user
        })
    }
    async actualizarEstatusPorId(mission_id, new_status) {
        return await Mission.findByIdAndUpdate(mission_id, { status: new_status }, { new: true })
    }

    async getByUserId(id_user) {
        const userMissions = await Mission.find({ fk_id_user: id_user });
        const missions_list = userMissions.map((mission) => {
            return {
                _id: mission._id,
                title: mission.title,
                status: mission.status,
                created_at: mission.created_at,
            };
        });
        return missions_list;
    }

    async getGlobalMissions() {
        const missions = await Mission.find().populate('fk_id_user', 'name');
        const globalMissionsMerged = missions.map(mission => {
            return {
                mission_id: mission._id,
                mission_title: mission.title,
                mission_status: mission.status,
                mission_created_at: mission.created_at,
                user_name: mission.fk_id_user.name,
                user_id: mission.fk_id_user._id
            }
        });
        console.log(globalMissionsMerged);
        return globalMissionsMerged;
    };

    async clone(epic_id) {
        const mission = await Mission.findById(epic_id);
        if (!mission) {
            throw new Error("Epic not found");
        }
        const clonedMission = {
            ...mission.toObject(),
            status: false,
            _id: undefined,
        };
        const clonedMissionCreated = await Mission.create(clonedMission);

        /* Aca lo ideal es crear el metodo cloneTasksToNewMission(origial_mission_id, new_mission_id)  cree las tareas asociadas a una mision para una nueva mision*/
        const tasks = await taskRepository.getTasksByMissionId(clonedMissionCreated._id)
        const clonedTasks = tasks.map((task) => ({
            ...task.toObject(),
            completed: false,
            fk_id_mission: clonedMissionCreated._id,
            _id: undefined,
        }));
        await taskRepository.createMany(clonedTasks);
    }
}
const missionRepository = new MissionRepository()
export default missionRepository
