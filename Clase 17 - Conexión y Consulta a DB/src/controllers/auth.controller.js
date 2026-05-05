import userRepository from "../repository/user.repository.js"
import ServerError from "../helpers/error.helper.js"
import authService from "../../services/auth.service.js"

class AuthController {

    async register(req, res) {
        try {
            const { username, email, password } = req.body
            await authService.register({username, email, password})
            return res.status(201).json({
                ok: true,
                status: 201,
                message: 'Usuario registrado correctamente'
            })
        } catch (error) {
            if (error instanceof ServerError){
                return res.status(error.status).json({
                    ok: false,
                    status: error.status,
                    message: error.message
                })
            } else {
                return res.status(500).json({
                    ok: false,
                    status: 500,
                    message: 'Error interno del servidor'
                })
            }
        }
    }

    async login(req, res) {
        try {
            const { email, password } = req.body

            // Buscar usuario por email
            const user = await userRepository.getByEmail(email)
            if (!user) {
                throw new ServerError('Usuario no encontrado', 404)
                /* return res.status(404).json({
                    ok: false,
                    status: 404,
                    message: 'Usuario no encontrado'
                }) */
            }

            // Verificar contraseña
            if (user.password !== password) {
                throw new ServerError('Contraseña incorrecta', 401)
                /* return res.status(401).json({
                    ok: false,
                    status: 401,
                    message: 'Contraseña incorrecta'
                }) */
            }

            return res.status(200).json({
                ok: true,
                status: 200,
                message: 'Login exitoso'
            })
        } catch (error) {
            // Si el error es una instancia de ServerError, devolver su status y mensaje
            if (error instanceof ServerError){
                return res.status(error.status).json({
                    ok: false,
                    status: error.status,
                    message: error.message
                })
            } else {
                return res.status(500).json({
                    ok: false,
                    status: 500,
                    message: 'Error interno del servidor'
                })
            }
        }
    }
}

const authController = new AuthController()
export default authController
