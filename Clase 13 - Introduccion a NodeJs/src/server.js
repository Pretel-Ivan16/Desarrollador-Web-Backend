import ENVIRONMENT from "./config/environment.config.js";
import express from 'express'

// Crear una app en express
const app = express()

/* 
Esto es un middleware, basicamente una función que se antepone al controlador. 
Lo que hace en este caso es transformar el body recibido como JSON en el caso de que envien un JSON.
Express por defecto no espera recibir JSON, por ende si vos envias JSON, por defectto este sera undefined.
*/

app.use(
  express.json()
)

const products = [
  {
    id: 1,
    title: 'Mesa Negra',
    description: 'lorem',
    price: 200
  },
  {
    id: 2,
    title: 'Mesa Blanca',
    description: 'lorem',
    price: 1500
  },
  {
    id: 3,
    title: 'Mesa Gris',
    description: 'lorem',
    price: 5000
  },
]

app.post(
  '/api/products',
  (request, response) => {
    //Resquest.body es donde el cliente va a enviar datos

    const {title, price, description} = request.body

    if (title.length <= 3) {
      return response.json({error: 'El título debe tener más de 3 caracteres.'})
    } else if (price < 1) {
      return response.json({error: 'El precio debe ser mayor a 1.'})
    }

    const new_product = {
      title,        // title tiene que ser un string de al menos 3 caracteres
      price,        // price tiene que ser un número mayor a 1
      description,  // Opcional
      id: products.length + 1
    }
    products.push(new_product)

    response.json({
      message: 'Producto Creado.',
      products: products
    })
  }
)

app.get(
  '/api/products',
  (request, response) => {

    const {min_price, max_price} = request.query
    let product_filtered = [...products]

    console.log(min_price, max_price, products)

    if(min_price && !isNaN(min_price)){
      product_filtered = product_filtered.filter(
        (product) => product.price >= Number(min_price)
      )
    }
    if(max_price && !isNaN(max_price)){
      product_filtered = product_filtered.filter(
        (product) => product.price <= Number(max_price)
      )
    }

    //Envio una respuesta JSON al cliente
    return response.json(
      {
        message: 'Lista de productos obtenida.',
        products: product_filtered
      }
    )
  }
)

app.get(
  '/api/products/:product_id',
  (request, response) => {
    const {product_id} = request.params
    const product_selected = products.find(
      (product) => Number(product.id) === Number(product_id)
    )
    if(!product_selected){
      return response.json(
        {
          message: 'Producto no encontrado.'
        }
      )
    }
    else{
      return response.json(
        {
          message: 'Producto encontrado.',
          product: product_selected
        }
      )
    }
  }
)

// Cuando alguien haga un GET a la direccion principal de nuestra API, responderemos con un 'Hola desde express'
app.get(
  '/',
  // request: consulta - response: respuesta
  (request, response) => {
    response.send('Hola desde express')
  }
)

app.post(
  '/',
  (request, response) =>
    response.send('hola desde express')
)

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
