// Tiene la responsabilidad de manejar la lógica de negocios relacionada a la autenticación (registro, login, etc)
/* 

Registro:
  - Validar que no exita previamente un usuario registrado con el mismo email
  - Va a enviar un mail de verificación de correo electrónico.

*/

import JWT from 'jsonwebtoken'
import ENVIRONMENT from "../src/config/environment.config.js"
import mailerTransporter from "../src/config/mailer.config.js"
import ServerError from "../src/helpers/error.helper.js"
import userRepository from "../src/repository/user.repository.js"

class AuthService {
    async register({username, email, password}){
        // Validar que el usuario no exista previamente
        const existingUser = await userRepository.getByEmail(email)
        if (existingUser) {
            throw new ServerError('Usuario ya registrado', 400)
            /* return res.status(400).json({
                ok: false,
                status: 400,
                message: 'Usuario ya registrado'
            }) */
        }

        const verify_email_token = JWT.sign(
          {
            email: email
          },
          ENVIRONMENT.JWT_SECRET_KEY
          
        )

        await mailerTransporter.sendMail({
          from: ENVIRONMENT.MAIL_USER,
          to: email,
          subject: `Bienvenido ${username} a nuestro sistema`,
          html: `
            <h1>Bienvenido ${username}</h1>
            <p>Gracias por registrarte en nuestro sistema. Necesitamos verificar tu correo electrónico.</p>
            <a href="${ENVIRONMENT.URL_BACKEND + `/api/auth/verify-email?verify_email_token=${verify_email_token}`}">Click aquí para verificar</a>
            <span>Si no te registraste, ignora este correo.</span>
            `
        }) 
        // Registrar el usuario en la DB
        await userRepository.create(username, email, password)
    }
  
}

const authService = new AuthService()
export default authService