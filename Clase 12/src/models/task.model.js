import mongoose from 'mongoose';
// Se define el esquema de tarea utilizando Mongoose
const taskSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        description:{
            type: String,
            required: false,
        },
        duration_min:{
            type: Number,
            required: false,
        },
        completed:{
            type: Boolean,
            required: false,
            default: false,   
        },
        created_at: {
            type: Date,
            required: true,
            default: Date.now,
        },
        end_at: {
            type: Date,
            default: null
        },
        fk_id_mission: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Mission',
            required: true
        }
        
    }
);
const Task = mongoose.model('Task', taskSchema); 
export default Task;
