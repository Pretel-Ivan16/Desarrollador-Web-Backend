import express, { response } from 'express'
import userRepository from '../repository/user.repository.js'
import healthController from '../../controllers/health.controller.js'

const healthRouter = express.Router()

healthRouter.get(
  '/',
  healthController.getApi
)

healthRouter.get(
  '/database',
  healthController.getDB
)

export default healthRouter