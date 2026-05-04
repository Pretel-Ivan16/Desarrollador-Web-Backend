import express from 'express'
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

export default authRouter
