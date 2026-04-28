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
import { engine as handlebarsEngine } from 'express-handlebars'

connectMongoDB()

const app = express()

//Configuramos handlebars como motor de vistas
app.engine('handlebars', handlebarsEngine());

// Indicamos que el motor de vistas es handlebars (archivos con extension .handlebars)
app.set('view engine', 'handlebars');

// Indicamos que las vistas van a estar en la carpeta 'views'
app.set('views', './views');

/* 
Delegamos las consultas que vengan sobre '/api/health' al healthRouter
*/
app.use('/api/health', healthRouter)

app.get('/', (request, response) => {
    return response.render(
        'home', 
        {
            username: 'Pepito',
            isVip: false,
            favorite_foods: [
                {
                    nombre: 'Milanesa con papas fritas',
                    calorias: 1200
                }, 
                {
                    nombre: 'Pizza',
                    calorias: 1000
                }, 
                {
                    nombre: 'Hamburguesa',
                    calorias: 600
                }
            ]
        }
    )
})

app.listen(
    ENVIRONMENT.PORT, 
    () => {
        console.log('La aplicacion se esta escuchando en el puerto ' + ENVIRONMENT.PORT)
    }
)