import mongoose from "mongoose";
import { MISSION_STATUS } from "../utils/constants/mission.constants.js";


const missionSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true
        },
        created_at:{
            type: Date,
            default: Date.now,
            require: true
        },
        status:{
            type: String,
            enum:[MISSION_STATUS.PENDING, MISSION_STATUS.COMPLETED],
            default: MISSION_STATUS.PENDING
        },
        fk_id_user:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        }
    }
)
const misionModel = mongoose.model('Mission', missionSchema);
export default misionModel;
