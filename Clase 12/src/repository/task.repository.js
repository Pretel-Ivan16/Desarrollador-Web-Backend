import Task from "../models/task.model.js";


class TaskRepository {
    async createTask(id_mission, name, description, stimated_duration_min) {
        await Task.create({
            title: name,
            description: description,
            duration_min: stimated_duration_min,
            fk_id_mission: id_mission
        });
    };
    async updateCompletedById(task_id, new_value) {
        const updatedElement = await Task.findByIdAndUpdate(
            task_id,
            { completed: new_value, end_at: new_value === true ? new Date() : null },
            { new: true }
        );
        return updatedElement;
    };
    async deleteById(task_id) {
        await Task.findByIdAndDelete(task_id);
    };

    async updateById(id, new_props) {
        const updatedElement = await Task.findByIdAndUpdate(
            id,
            new_props,
            { new: true }
        );
        return updatedElement;
    };

    async getTasksByMissionId(mission_id) {
        return await Task.find({ fk_id_mission: mission_id });
    }

    async createMany(tasks_to_create){
        await Task.insertMany(tasks_to_create)
    }
};

const taskRepository = new TaskRepository()
export default taskRepository
