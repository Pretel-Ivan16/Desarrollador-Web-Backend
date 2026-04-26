import userRepository from "../src/repository/user.repository.js";

class HealthController {
  getApi (request, response) {
    response.status(200).json(
      {
        message: "API está viva",
        status: 200,
        ok: true
      }
    )
  }
  async getDB (request, response) {
    try{
      await userRepository.getUsers()
      return response.status(200).json(
        {
          message: "La DB funciona correctamente",
          status: 200,
          ok: true
        }
      )
    }
    catch(error){
      console.log("ERROR EN LA DB:", error);
      return response.status(500).json(
        {
          message: 'La DB está fallando, contactarse con el administrador',
          status: 500,
          ok: false,
          code: '3_001'
        }
      )
    }
  }
}

const healthController = new HealthController()
export default healthController