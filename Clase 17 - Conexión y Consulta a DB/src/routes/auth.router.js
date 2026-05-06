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
    authController.verifyEmail(req, res)
})

// POST /api/auth/request-password-reset
authRouter.post('/request-password-reset', (req, res) => {
    authController.requestPasswordReset(req, res)
})

// GET /api/auth/reset-password/:reset_password_token - Muestra formulario HTML
authRouter.get('/reset-password/:reset_password_token', (req, res) => {
    authController.showResetPasswordForm(req, res)
})

// POST /api/auth/reset-password/:reset_password_token - Procesa el reset
authRouter.post('/reset-password/:reset_password_token', (req, res) => {
    authController.resetPassword(req, res)
})


export default authRouter
