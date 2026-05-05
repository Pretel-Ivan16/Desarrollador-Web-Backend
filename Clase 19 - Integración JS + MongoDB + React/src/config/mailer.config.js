import nodemailer from 'nodemailer'
import ENVIRONMENT from './environment.config.js'

const mailerTransporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: ENVIRONMENT.MAIL_USER,
        pass: ENVIRONMENT.MAIL_PASSWORD
    }
})

export default mailerTransporter