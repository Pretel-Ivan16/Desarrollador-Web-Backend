import ENVIRONMENT from "./config/environment.config.js";
import express from 'express'

// Crear una app en express

const app = express()

//Hace que nuestra app en express se escuche en cierto puerto de nuestra PC
//Espera recibir 2 parámetros
//  1: puerto => en que direciion se ejcuta la app
//  2: Callback FN => una vez ña app se ejecute en ese puerto se activara la callback

app.listen(
  ENVIRONMENT.PORT,
  () => (
    console.log(`La aplicación se está ejecutando correctamente en el puerto ${ENVIRONMENT.PORT}`)
  )
)