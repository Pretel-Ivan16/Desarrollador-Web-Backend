import dotenv from 'dotenv'

dotenv.config()

const ENVIRONMENT = {
  MONGO_DB_CONNECTION_STRING: process.env.MONGO_DB_CONNECTION_STRING
}

export default ENVIRONMENT
