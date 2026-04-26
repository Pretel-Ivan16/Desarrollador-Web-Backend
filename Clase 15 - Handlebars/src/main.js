import ENVIRONMENT from "./config/environment.config.js"
import connectMongoDB from "./config/mongoDB.config.js"
/* import User from "./models/user.model.js"
import Workspace from "./models/workspace.model.js" */
import WorkspaceMember from "./models/workspaceMember.model.js"
import workspaceMemberRepository from "./repository/member.repository.js"
import userRepository from "./repository/user.repository.js"
import workspaceRepository from "./repository/workspace.repository.js"
import express, { response } from 'express';
import healthRouter from "./routes/health.route.js"

connectMongoDB()

const app = express()

// Delegamos las consultas que vengan sobre '/api/health' al healthRouter

app.use('/api/health', healthRouter)

app.listen(ENVIRONMENT.PORT,
  () => {
    console.log('La app se está escuchando en el puerto ' + ENVIRONMENT.PORT);
    
  }
)