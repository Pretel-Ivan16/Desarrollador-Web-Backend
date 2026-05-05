// Tiene la responsabilidad de manejar la lógica de negocios relacionada a la autenticación (registro, login, etc)
/* 

Registro:
  - Validar que no exita previamente un usuario registrado con el mismo email
  - Va a enviar un mail de verificación de correo electrónico.

*/

import JWT from 'jsonwebtoken'
import bcrypt from 'bcrypt'
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
        const passwordHashed = await bcrypt.hash(password, 10)

        // Registrar el usuario en la DB
        await userRepository.create(username, email, passwordHashed)
        await this.sendVerifyEmail({username, email})
    }
  
    async verifyEmail({verify_email_token}) {
        if (!verify_email_token) {
          throw new ServerError('Token de verificación no proporcionado', 400)
        }
        /*
        ESTO ES CLAVE
        Gracias a esto sabremos si el token fue creado por nosotros
        */
        try{

          const {email, username} = JWT.verify(verify_email_token, ENVIRONMENT.JWT_SECRET_KEY)
          const user = await userRepository.getByEmail(email)
          if (!user) {
            throw new ServerError('Usuario no existe', 404)
          }
          else if (user.email_verified) {
            throw new ServerError('Email ya verificado', 400)
          }
          else{
            return userRepository.updateEmailVerified({email_verified: true}, email)
          }

        } catch(error){
          if (error instanceof JWT.TokenExpiredError) {

            const {email, username} = JWT.decode(verify_email_token) // Esto nos permite leer el token pero no verifica firma

            //Enviar otro mail al usuario para que vuelva a intentar verificar su email
            throw new ServerError('Token de verificación expiró', 401)
          } else if (error instanceof JWT.JsonWebTokenError) {

            throw new ServerError('Token de verificación inválido', 401)
          }
          // Sino es el error de JWT que el error siga el flujo normal de errores para que se maneje como un error 500
          else{
            throw error
          }
        }
        

        // Aquí podríamos actualizar el estado de verificación del usuario en la DB
        console.log('El usuario intento verificar el email. Su token de validación: ' + verify_email_token);
    }

    async login({email, password}) {
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
      const is_same_password = await bcrypt.compare(password, user.password)

      if (!is_same_password) {
        throw new ServerError('Contraseña incorrecta', 401)
        /* return res.status(401).json({
            ok: false,
            status: 401,
            message: 'Contraseña incorrecta'
            }) 
        */
      }

      const auth_token = JWT.sign(
        {
          email: user.email,
          name: user.name,
          id: user._id,
          created_at: user.created_at
        },
        ENVIRONMENT.JWT_SECRET_KEY
      )
      return auth_token
    }


    async sendVerifyEmail({username, email}){
      // Se crea un token firmado por el backend con el email del usuario a registar, y una clave secreta. Este token lo vamos a usar para verificar que el usuario es el dueño del email que esta usando para registrarse.
        const verify_email_token = JWT.sign(
          {
            email: email,
            username: username
          },
          ENVIRONMENT.JWT_SECRET_KEY,
          {
            expiresIn: '7d'
          }
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

    }

    async requestPasswordReset({email}) {
      // Buscar usuario por email
      const user = await userRepository.getByEmail(email)
      if (!user) {
        throw new ServerError('Usuario no encontrado', 404)
      }

      // Se crea un token firmado con el email del usuario y un purpose indicando que es para resetear contraseña
      const reset_password_token = JWT.sign(
        {
          email: user.email,
          id: user._id,
          purpose: 'password-reset'
        },
        ENVIRONMENT.JWT_SECRET_KEY,
        {
          expiresIn: '1h'
        }
      )

      // Enviar mail con el link para resetear contraseña
      await mailerTransporter.sendMail({
        from: ENVIRONMENT.MAIL_USER,
        to: email,
        subject: 'Restablece tu contraseña',
        html: `
          <h1>Restablecimiento de Contraseña</h1>
          <p>Hemos recibido una solicitud para restablecer tu contraseña.</p>
          <a href="${ENVIRONMENT.URL_BACKEND + `/api/auth/reset-password/${reset_password_token}`}">Click aquí para restablecer tu contraseña</a>
          <p>Este link expira en 1 hora.</p>
          <p>Si no solicitaste esto, ignora este correo.</p>
        `
      })
    }

    async resetPassword({reset_password_token, new_password}) {
      if (!reset_password_token) {
        throw new ServerError('Token de restablecimiento no proporcionado', 400)
      }

      try {
        // Verificar el token
        const {email, purpose} = JWT.verify(reset_password_token, ENVIRONMENT.JWT_SECRET_KEY)
        
        // Validar que el purpose sea para resetear contraseña
        if (purpose !== 'password-reset') {
          throw new ServerError('Token inválido', 401)
        }

        // Buscar el usuario
        const user = await userRepository.getByEmail(email)
        if (!user) {
          throw new ServerError('Usuario no encontrado', 404)
        }

        // Hashear la nueva contraseña
        const passwordHashed = await bcrypt.hash(new_password, 10)

        // Actualizar la contraseña del usuario
        await userRepository.updateById({
          id: user._id,
          password: passwordHashed
        })

      } catch (error) {
        if (error instanceof JWT.TokenExpiredError) {
          throw new ServerError('Token de restablecimiento expiró', 401)
        } else if (error instanceof JWT.JsonWebTokenError) {
          throw new ServerError('Token inválido', 401)
        } else if (error instanceof ServerError) {
          throw error
        } else {
          throw error
        }
      }
    }

    async verifyResetPasswordToken(reset_password_token) {
      if (!reset_password_token) {
        throw new ServerError('Token de restablecimiento no proporcionado', 400)
      }

      try {
        const decoded = JWT.verify(reset_password_token, ENVIRONMENT.JWT_SECRET_KEY)
        
        if (decoded.purpose !== 'password-reset') {
          throw new ServerError('Token inválido', 401)
        }

        return decoded
      } catch (error) {
        if (error instanceof JWT.TokenExpiredError) {
          throw new ServerError('Token de restablecimiento expiró', 401)
        } else if (error instanceof JWT.JsonWebTokenError) {
          throw new ServerError('Token inválido', 401)
        } else {
          throw error
        }
      }
    }
}

const authService = new AuthService()
export default authService