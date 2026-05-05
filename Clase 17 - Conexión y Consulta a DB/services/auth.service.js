// Tiene la responsabilidad de manejar la lógica de negocios relacionada a la autenticación (registro, login, etc)
/* 

Registro:
  - Validar que no exita previamente un usuario registrado con el mismo email
  - Va a enviar un mail de verificación de correo electrónico.

*/

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
        await mailerTransporter.sendMail({
          from: ENVIRONMENT.MAIL_USER,
          to: email,
          subject: `Bienvenido ${username} a nuestro sistema`,
          html: `
            <h1>Bienvenido ${username}</h1>
            <p>Gracias por registrarte en nuestro sistema. Necesitamos verificar tu correo electrónico.</p>
            `/* 
            
            El backend solo puede confiar en si mismo, por lo que debemos asumir que el frontend siempre miente.
            JSON Web Token (JWT) es un estándar para transmitir información de forma segura entre el backend y el frontend. 
              - Transforma Objetos en base64.
              - Se puede firmar con una clave secreta para garantizar su integridad.
              - El backend puede generar un token JWT que contenga la información del usuario (como su ID) y enviarlo al frontend. 
              - El frontend puede almacenar este token (por ejemplo, en localStorage) y enviarlo de vuelta al backend en cada solicitud. 
              De esta manera, el backend puede verificar la autenticidad del token y obtener la información del usuario sin necesidad de confiar en lo que el frontend le dice directamente.
            JSON Web Token, se divide en 3 partes:
              1. Header: Contiene información sobre el tipo de token y el algoritmo de firma utilizado.
              2. Payload: Contiene la información que queremos transmitir (por ejemplo, el ID del usuario).
              3. Signature: Es una firma digital que se genera utilizando el header, el payload y una clave secreta. Sirve para verificar que el token no ha sido alterado.
              
            */`
            <a href="${ENVIRONMENT.URL_BACKEND + `/api/auth/verify-email?email=${email}`}">Click aquí para verificar</a>
            <span>Si no te registraste, ignora este correo.</span>
            `
        }) 
        // Registrar el usuario en la DB
        await userRepository.create(username, email, password)
    }
  
}

const authService = new AuthService()
export default authService