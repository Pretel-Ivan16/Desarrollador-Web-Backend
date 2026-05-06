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
            console.error('Error en register:', error);
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

            const auth_token = await authService.login({email, password})

            return res.status(200).json({
                ok: true,
                status: 200,
                message: 'Login exitoso',
                data: {
                    auth_token: auth_token
                }
            })
        } catch (error) {
            console.error('Error en login:', error);
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

    async verifyEmail(req, res) {
        try{
            const { verify_email_token } = req.query

            await authService.verifyEmail({verify_email_token})

            res.status(200).send(`<h1>Mail verificado exitosamente</h1>`)
            
        } catch (error) {
            if (error instanceof ServerError){
                return res.status(error.status).send(`<h1>${error.message}</h1>`)
            } else {
                return res.status(500).send(`<h1>Error interno del servidor</h1>`)
            }
        }
    }

    async requestPasswordReset(req, res) {
        try {
            const { email } = req.body
            
            await authService.requestPasswordReset({email})
            
            return res.status(200).json({
                ok: true,
                status: 200,
                message: 'Se ha enviado un email con instrucciones para restablecer tu contraseña'
            })
        } catch (error) {
            console.error('Error en requestPasswordReset:', error);
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

    async showResetPasswordForm(req, res) {
        try {
            const { reset_password_token } = req.params
            
            // Verificar que el token sea válido (sin modificar nada)
            const decoded = await authService.verifyResetPasswordToken({reset_password_token})
            
            // Mostrar formulario HTML sin scripts inline (evitar CSP issues)
            return res.status(200).send(`
                <!DOCTYPE html>
                <html lang="es">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>Restablecer Contraseña</title>
                    <style>
                        * {
                            margin: 0;
                            padding: 0;
                            box-sizing: border-box;
                        }
                        body {
                            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                            min-height: 100vh;
                            display: flex;
                            justify-content: center;
                            align-items: center;
                        }
                        .container {
                            background: white;
                            padding: 40px;
                            border-radius: 10px;
                            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
                            width: 100%;
                            max-width: 400px;
                        }
                        h1 {
                            text-align: center;
                            color: #333;
                            margin-bottom: 30px;
                            font-size: 24px;
                        }
                        .form-group {
                            margin-bottom: 20px;
                        }
                        label {
                            display: block;
                            margin-bottom: 8px;
                            color: #555;
                            font-weight: 500;
                        }
                        input[type="password"], input[type="hidden"] {
                            width: 100%;
                            padding: 12px;
                            border: 1px solid #ddd;
                            border-radius: 5px;
                            font-size: 14px;
                            transition: border-color 0.3s;
                        }
                        input[type="password"]:focus {
                            outline: none;
                            border-color: #667eea;
                            box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
                        }
                        button {
                            width: 100%;
                            padding: 12px;
                            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                            color: white;
                            border: none;
                            border-radius: 5px;
                            font-size: 16px;
                            font-weight: 600;
                            cursor: pointer;
                            transition: transform 0.2s;
                        }
                        button:hover {
                            transform: translateY(-2px);
                        }
                        button:active {
                            transform: translateY(0);
                        }
                        .message {
                            text-align: center;
                            margin-top: 15px;
                            font-size: 14px;
                            padding: 10px;
                            border-radius: 5px;
                        }
                        .success {
                            color: white;
                            background-color: #27ae60;
                        }
                        .error {
                            color: white;
                            background-color: #e74c3c;
                        }
                        .info {
                            color: #333;
                            background-color: #f0f0f0;
                        }
                    </style>
                </head>
                <body>
                    <div class="container">
                        <h1>🔐 Restablecer Contraseña</h1>
                        <form method="POST" action="/api/auth/reset-password/${reset_password_token}">
                            <div class="form-group">
                                <label for="new_password">Nueva Contraseña</label>
                                <input 
                                    type="password" 
                                    id="new_password" 
                                    name="new_password" 
                                    placeholder="Ingresa tu nueva contraseña" 
                                    minlength="6"
                                    required
                                >
                            </div>
                            <div class="form-group">
                                <label for="confirm_password">Confirmar Contraseña</label>
                                <input 
                                    type="password" 
                                    id="confirm_password" 
                                    name="confirm_password" 
                                    placeholder="Confirma tu nueva contraseña" 
                                    minlength="6"
                                    required
                                >
                            </div>
                            <button type="submit">Restablecer Contraseña</button>
                        </form>
                        <div class="message info">
                            Por favor, ingresa tu nueva contraseña (mínimo 6 caracteres)
                        </div>
                    </div>
                </body>
                </html>
            `)
        } catch (error) {
            console.error('Error en showResetPasswordForm:', error);
            if (error instanceof ServerError){
                return res.status(error.status).send(`
                    <!DOCTYPE html>
                    <html>
                    <head>
                        <meta charset="UTF-8">
                        <title>Error</title>
                        <style>
                            body { font-family: Arial; background: #f5f5f5; }
                            .error { 
                                background: #e74c3c; 
                                color: white; 
                                padding: 20px; 
                                border-radius: 5px;
                                max-width: 400px;
                                margin: 50px auto;
                                text-align: center;
                            }
                        </style>
                    </head>
                    <body>
                        <div class="error">
                            <h1>❌ Error</h1>
                            <p>${error.message}</p>
                        </div>
                    </body>
                    </html>
                `)
            } else {
                return res.status(500).send(`
                    <!DOCTYPE html>
                    <html>
                    <head>
                        <meta charset="UTF-8">
                        <title>Error</title>
                        <style>
                            body { font-family: Arial; background: #f5f5f5; }
                            .error { 
                                background: #e74c3c; 
                                color: white; 
                                padding: 20px; 
                                border-radius: 5px;
                                max-width: 400px;
                                margin: 50px auto;
                                text-align: center;
                            }
                        </style>
                    </head>
                    <body>
                        <div class="error">
                            <h1>❌ Error</h1>
                            <p>Token inválido o expirado</p>
                        </div>
                    </body>
                    </html>
                `)
            }
        }
    }

    async resetPassword(req, res) {
        try {
            const { reset_password_token } = req.params
            const { new_password, confirm_password } = req.body
            
            // Validar que las contraseñas coincidan
            if (new_password !== confirm_password) {
                // Si vino desde formulario HTML, retornar HTML
                if (req.headers['content-type']?.includes('application/x-www-form-urlencoded')) {
                    return res.status(400).send(`
                        <!DOCTYPE html>
                        <html>
                        <head>
                            <meta charset="UTF-8">
                            <title>Error</title>
                            <style>
                                body { font-family: Arial; background: #f5f5f5; }
                                .error { 
                                    background: #e74c3c; 
                                    color: white; 
                                    padding: 20px; 
                                    border-radius: 5px;
                                    max-width: 400px;
                                    margin: 50px auto;
                                    text-align: center;
                                }
                                a { color: white; text-decoration: none; }
                            </style>
                        </head>
                        <body>
                            <div class="error">
                                <h1>❌ Error</h1>
                                <p>Las contraseñas no coinciden. Por favor intenta de nuevo.</p>
                                <a href="javascript:history.back()">Volver</a>
                            </div>
                        </body>
                        </html>
                    `)
                }
                // Si vino desde fetch JSON
                return res.status(400).json({
                    ok: false,
                    status: 400,
                    message: 'Las contraseñas no coinciden'
                })
            }
            
            await authService.resetPassword({reset_password_token, new_password})
            
            // Si vino desde formulario HTML, retornar HTML de éxito
            if (req.headers['content-type']?.includes('application/x-www-form-urlencoded')) {
                return res.status(200).send(`
                    <!DOCTYPE html>
                    <html>
                    <head>
                        <meta charset="UTF-8">
                        <title>Éxito</title>
                        <style>
                            body { font-family: Arial; background: #f5f5f5; }
                            .success { 
                                background: #27ae60; 
                                color: white; 
                                padding: 20px; 
                                border-radius: 5px;
                                max-width: 400px;
                                margin: 50px auto;
                                text-align: center;
                            }
                            a { color: white; text-decoration: none; margin-top: 15px; display: inline-block; }
                        </style>
                    </head>
                    <body>
                        <div class="success">
                            <h1>✅ Éxito</h1>
                            <p>Tu contraseña ha sido restablecida correctamente.</p>
                            <p>Redirigiendo...</p>
                        </div>
                        <script>
                            setTimeout(() => {
                                window.location.href = '/';
                            }, 3000);
                        </script>
                    </body>
                    </html>
                `)
            }
            
            // Si vino desde fetch JSON
            return res.status(200).json({
                ok: true,
                status: 200,
                message: 'Contraseña restablecida correctamente'
            })
        } catch (error) {
            console.error('Error en resetPassword:', error);
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


/* 

Hacer el flujo de restablecimiento de contraseña es muy similar al flujo de verificación de email, 
la única diferencia es que en el token no vamos a incluir el email_verified sino un purpose que indique que el token es para restablecimiento de contraseña, 
y en el endpoint de restablecimiento de contraseña vamos a verificar que el purpose del token sea correcto y luego permitir al usuario ingresar una nueva contraseña.

POST /api/auth/request-password-reset
  Body: { email }
Esto enviara un mail al email proporcionado con un link para restablecer la password,
ese link tendra un WT firmado con datos del usuario como el email y el id

Por otro lado desarrollaran el:
POST /api/auth/reset-password/:reset_token
	body: { new_password }
El backend valida el token enviado y la nueva contraseña y la nueva contraseña, si todo está bien cambia la contraseña del usuario en la DB

*/