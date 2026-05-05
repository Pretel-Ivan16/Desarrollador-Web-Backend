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
            const decoded = await authService.verifyResetPasswordToken(reset_password_token)
            
            // Mostrar formulario HTML
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
                        }
                        .success {
                            color: #27ae60;
                        }
                        .error {
                            color: #e74c3c;
                        }
                    </style>
                </head>
                <body>
                    <div class="container">
                        <h1>🔐 Restablecer Contraseña</h1>
                        <form id="resetForm">
                            <div class="form-group">
                                <label for="new_password">Nueva Contraseña</label>
                                <input 
                                    type="password" 
                                    id="new_password" 
                                    name="new_password" 
                                    placeholder="Ingresa tu nueva contraseña" 
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
                                    required
                                >
                            </div>
                            <button type="submit">Restablecer Contraseña</button>
                        </form>
                        <div id="message" class="message"></div>
                    </div>

                    <script>
                        const form = document.getElementById('resetForm');
                        const messageDiv = document.getElementById('message');
                        const token = '${reset_password_token}';

                        form.addEventListener('submit', async (e) => {
                            e.preventDefault();
                            
                            const newPassword = document.getElementById('new_password').value;
                            const confirmPassword = document.getElementById('confirm_password').value;

                            if (newPassword !== confirmPassword) {
                                messageDiv.textContent = '❌ Las contraseñas no coinciden';
                                messageDiv.className = 'message error';
                                return;
                            }

                            if (newPassword.length < 6) {
                                messageDiv.textContent = '❌ La contraseña debe tener al menos 6 caracteres';
                                messageDiv.className = 'message error';
                                return;
                            }

                            try {
                                const response = await fetch(\`/api/auth/reset-password/\${token}\`, {
                                    method: 'POST',
                                    headers: {
                                        'Content-Type': 'application/json'
                                    },
                                    body: JSON.stringify({ new_password: newPassword })
                                });

                                const data = await response.json();

                                if (data.ok) {
                                    messageDiv.textContent = '✅ ' + data.message;
                                    messageDiv.className = 'message success';
                                    form.style.display = 'none';
                                    setTimeout(() => {
                                        alert('Contraseña restablecida correctamente. Redirigiendo...');
                                        window.location.href = '/';
                                    }, 2000);
                                } else {
                                    messageDiv.textContent = '❌ ' + data.message;
                                    messageDiv.className = 'message error';
                                }
                            } catch (error) {
                                messageDiv.textContent = '❌ Error en la solicitud';
                                messageDiv.className = 'message error';
                                console.error('Error:', error);
                            }
                        });
                    </script>
                </body>
                </html>
            `)
        } catch (error) {
            console.error('Error en showResetPasswordForm:', error);
            if (error instanceof ServerError){
                return res.status(error.status).send(`<h1>❌ ${error.message}</h1>`)
            } else {
                return res.status(500).send(`<h1>❌ Token inválido o expirado</h1>`)
            }
        }
    }

    async resetPassword(req, res) {
        try {
            const { reset_password_token } = req.params
            const { new_password } = req.body
            
            await authService.resetPassword({reset_password_token, new_password})
            
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