import userRepository from "../repository/user.repository.js"

class AuthController {

    async register(req, res) {
        try {
            const { email, password, username } = req.body

            // Validar que el usuario no exista previamente
            const existingUser = await userRepository.getByEmail(email)
            if (existingUser) {
                return res.status(400).json({
                    ok: false,
                    status: 400,
                    message: 'Usuario ya registrado'
                })
            }

            // Registrar el usuario en la DB
            await userRepository.create(username, email, password)

            return res.status(201).json({
                ok: true,
                status: 201,
                message: 'Usuario registrado correctamente'
            })
        } catch (error) {
            console.error('Error en registro:', error)
            return res.status(500).json({
                ok: false,
                status: 500,
                message: 'Error interno del servidor'
            })
        }
    }

    async login(req, res) {
        try {
            const { email, password } = req.body

            // Buscar usuario por email
            const user = await userRepository.getByEmail(email)
            if (!user) {
                return res.status(404).json({
                    ok: false,
                    status: 404,
                    message: 'Usuario no encontrado'
                })
            }

            // Verificar contraseña
            if (user.password !== password) {
                return res.status(401).json({
                    ok: false,
                    status: 401,
                    message: 'Credenciales incorrectas'
                })
            }

            return res.status(200).json({
                ok: true,
                status: 200,
                message: 'Usuario registrado correctamente'
            })
        } catch (error) {
            console.error('Error en login:', error)
            return res.status(500).json({
                ok: false,
                status: 500,
                message: 'Error interno del servidor'
            })
        }
    }
}

const authController = new AuthController()
export default authController
