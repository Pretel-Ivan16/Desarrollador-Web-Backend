import ENVIRONMENT from "./config/environment.config.js";
import connectMongoDB from "./config/mongoDB.config.js";

console.log("Hola mundo");
console.log(ENVIRONMENT.MONGO_DB_CONNECTION_STRING);

connectMongoDB