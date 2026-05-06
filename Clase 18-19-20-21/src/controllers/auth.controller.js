import ServerError from "../helpers/error.helper.js";
import userRepository from "../repository/user.repository.js";
import authService from "../services/auth.service.js";

class AuthController {
    async register(req, res) {

        try {

            const { email, name, password } = req.body;

            await authService.register({ name, email, password })

            return res.status(201).json({
                ok: true,
                status: 201,
                message: "El usuario se ha creado exitosamente",
            });
        }
        catch (error) {
            //Errores esperables en el sistema
            if (error instanceof ServerError) {
                return res.status(error.status).json(
                    {
                        ok: false,
                        status: error.status,
                        message: error.message
                    }
                )
            }
            else {
                console.error('Error inesperado en el registro', error)
                return res.status(500).json(
                    {
                        ok: false,
                        status: 500,
                        message: "Internal server error"
                    }
                )
            }
        }
    }


    async login(req, res) {
        try {
            const { email, password } = req.body;
            const auth_token = await authService.login({ email, password })
            return res.status(200).json({
                message: "Login successful",
                status: 200,
                ok: true,
                data: {
                    auth_token: auth_token
                }
            });
        }
        catch (error) {
            //Errores esperables en el sistema
            if (error instanceof ServerError) {
                return res.status(error.status).json(
                    {
                        ok: false,
                        status: error.status,
                        message: error.message
                    }
                )
            }
            else {
                console.error('Error inesperado en el login', error)
                return res.status(500).json(
                    {
                        ok: false,
                        status: 500,
                        message: "Internal server error"
                    }
                )
            }
        }
    }

    async verifyEmail(request, response) {
        try {
            const { verify_email_token } = request.query

            await authService.verifyEmail({ verify_email_token })

            response.status(200).send(`<h1>Mail verificado exitosamente</h1>`)
        }
        catch (error) {
            //Errores esperables en el sistema
            if (error instanceof ServerError) {
                return response.status(error.status).json(
                    {
                        ok: false,
                        status: error.status,
                        message: error.message
                    }
                )
            }

            else {
                console.error('Error inesperado en el login', error)
                return response.status(500).json(
                    {
                        ok: false,
                        status: 500,
                        message: "Internal server error"
                    }
                )
            }
        }

    }

    async resetPasswordRequest(req, res) {
        try {
            const { email } = req.body;
            await authService.resetPasswordRequest({ email });
            return res.status(200).json({
                ok: true,
                status: 200,
                message: "Se ha enviado un correo electrónico para restablecer la contraseña",
            });
        } catch (error) {
            if (error instanceof ServerError) {
                return res.status(error.status).json({
                    ok: false,
                    status: error.status,
                    message: error.message,
                });
            }
            console.log(error)
            return res.status(500).json({
                ok: false,
                status: 500,
                message: "Error al solicitar el restablecimiento de contraseña",
            })
        }
    }

    async showResetPasswordForm(req, res) {
        try {
            const { reset_password_token } = req.params
            
            // Verificar que el token sea válido
            const decoded = await authService.verifyResetPasswordToken({reset_password_token})
            
            // Mostrar formulario HTML sin scripts inline
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
                        input[type="password"] {
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
                                <label for="password">Nueva Contraseña</label>
                                <input 
                                    type="password" 
                                    id="password" 
                                    name="password" 
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
            const { reset_password_token } = req.params;
            const { password, confirm_password } = req.body;
            
            // Validar que las contraseñas coincidan
            if (password !== confirm_password) {
                // Si vino desde formulario HTML
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
                            </style>
                        </head>
                        <body>
                            <div class="error">
                                <h1>❌ Error</h1>
                                <p>Las contraseñas no coinciden. Por favor intenta de nuevo.</p>
                                <a href="javascript:history.back()" style="color: white; text-decoration: none;">Volver</a>
                            </div>
                        </body>
                        </html>
                    `)
                }
                // Si vino desde JSON
                return res.status(400).json({
                    ok: false,
                    status: 400,
                    message: 'Las contraseñas no coinciden'
                })
            }
            
            await authService.resetPassword({ reset_password_token, password });
            
            // Si vino desde formulario HTML
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
                        </style>
                    </head>
                    <body>
                        <div class="success">
                            <h1>✅ Éxito</h1>
                            <p>Tu contraseña ha sido restablecida correctamente.</p>
                            <p>Redirigiendo en 3 segundos...</p>
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
            
            // Si vino desde JSON
            return res.status(200).json({
                ok: true,
                status: 200,
                message: "La contraseña se ha restablecido exitosamente",
            });
        } catch (error) {
            if (error instanceof ServerError) {
                return res.status(error.status).json({
                    ok: false,
                    status: error.status,
                    message: error.message,
                });
            }
            return res.status(500).json({
                ok: false,
                status: 500,
                message: "Error al restablecer la contraseña",
            })
        }
    }


}
const authController = new AuthController();
export default authController

/* 
Hacer el flujo de restablecimiento de contraseña

    POST /api/auth/reset-password-request
    body: {email}
    Esto enviara un mail al email proporcionado con un link para restablecer la password, ese link tendra un JWT firmado con datos del usuario como el email o id.
    
Por otro lado desarrollaran el 
    POST /api/auth/reset-password/:reset_token
    body: {new_password}
    El backend valida el token enviado y la nueva contraseña, si todo esta bien cambia la password

*/