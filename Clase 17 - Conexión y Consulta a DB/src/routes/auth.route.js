import express, { response } from 'express'
import authController from '../controllers/auth.controller.js'

const authRouter = express.Router()

// POST /api/auth/register
authRouter.post('/register', (req, res) => {
    authController.register(req, res)
})

// POST /api/auth/login
authRouter.post('/login', (req, res) => {
    authController.login(req, res)
})

authRouter.get('/verify-email', (req, res) => {
    const { email } = req.query
    if (!email){
        response.status(400).send(`<h1>Página no encontrada</h1>`)
    }
    // Aquí podríamos actualizar el estado de verificación del usuario en la DB
    console.log('El usuario intento verificar el email: ' + email);
    res.status(200).send(`<h1>Mail verificado exitosamente</h1>`)
})


export default authRouter
