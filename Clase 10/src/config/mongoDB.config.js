import mongoose from "mongoose";
import ENVIRONMENT from "./environment.config.js";

async function connectMongoDB(){
  try{
    await mongoose.connect(ENVIRONMENT.MONGO_DB_CONNECTION_STRING)
    console.log("Conexión Exitosa!");
  }
  catch(error){
    console.log("Error de conexión " + error);
  }
}

export default connectMongoDB