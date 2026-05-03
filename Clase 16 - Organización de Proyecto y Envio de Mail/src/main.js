import ENVIRONMENT from "./config/environment.config.js"
import connectMongoDB from "./config/mongoDB.config.js"
/* import User from "./models/user.model.js"
import Workspace from "./models/workspace.model.js" */
import WorkspaceMember from "./models/workspaceMember.model.js"
import workspaceMemberRepository from "./repository/member.repository.js"
import userRepository from "./repository/user.repository.js"
import workspaceRepository from "./repository/workspace.repository.js"
import express from 'express';
import healthRouter from "./routes/health.route.js"
import authRouter from "./routes/auth.route.js"

connectMongoDB()

const app = express()

// Middleware para parsear JSON
app.use(express.json())

/* 
Delegamos las consultas que vengan sobre '/api/health' al healthRouter
*/

app.use('/api/health', healthRouter)
app.use('/api/auth', authRouter)

app.listen(
    ENVIRONMENT.PORT, 
    () => {
        console.log('La aplicacion se esta escuchando en el puerto ' + ENVIRONMENT.PORT)
    }
)