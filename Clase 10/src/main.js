import ENVIRONMENT from "./config/environment.config.js";
import connectMongoDB from "./config/mongoDB.config.js";
import User from "./models/user.models.js";

console.log("Hola mundo");
console.log(ENVIRONMENT.MONGO_DB_CONNECTION_STRING);

connectMongoDB()

async function createdUser (username, email, password){
  await User.create({
    name: username,
    email: email,
    password: password
  })
}

createdUser('Test', 'test@gmail.com', 'test123')