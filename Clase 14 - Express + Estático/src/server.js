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
      return response.json({error: 'El preco debe ser mayor a 1.'})
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
        (product) => product.price >= Number(max_price)
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


/* 

Que es express? 
Es un framework de desarrollo de NodeJs que nos permite crear aplicaciones y servidores web de forma sencilla.
Puntualmente nosotros vamos a estar creando APIs REST, que son un tipo de aplicaciones web que permiten a los clientes (como el frontend) interactuar con el servidor a través de peticiones HTTP (GET, POST, PUT, DELETE, etc.).

Las APIs que creamos, como podemos testearlas?
Podemos testearlas a través de herramientas como Postman, Insomnia o Thunder Client, que nos permiten enviar peticiones HTTP a nuestro servidor y ver las respuestas que recibimos.

¿Que son y para que sirven los metodos HTTP?
Son los diferentes tipos de peticiones que podemos hacer a un servidor. Cada uno tiene un propósito diferente:
- GET: se utiliza para obtener datos del servidor.
- POST: se utiliza para enviar datos al servidor y crear nuevos recursos.
- PUT: se utiliza para actualizar recursos existentes en el servidor.
- DELETE: se utiliza para eliminar recursos del servidor.

EJEMPLO tengo el endpont /api/products:
  GET /api/products => me devuelve la lista de productos
  POST /api/products => me permite crear un nuevo producto
  PUT /api/products/1 => me permite actualizar un producto
  DELETE /api/products/1 => me permite eliminar un producto


¿Ques es el CRUD?
CRUD es un acrónimo que se refiere a las operaciones básicas que se pueden realizar en una base de datos o en una API:
- Create (Crear): se refiere a la operación de crear un nuevo recurso.
- Read (Leer): se refiere a la operación de obtener datos o recursos existentes.
- Update (Actualizar): se refiere a la operación de modificar recursos existentes.
- Delete (Eliminar): se refiere a la operación de eliminar recursos existentes.

Pregunta Técnica: El metodo defne al 100% el tipo de accion que realmente se hara, es decr podemos asegurar que un POST crea un recurso en el seervidor?
No, el verbo es semantico, es decir, es una buena practica que cree un recurso en el servidor s es un POST, pero la eleccion es del desarrollador, no es algo que el servidor imponga. Es decir, un POST podria actualizar un recurso, aunque no es lo recomendado.

Formas de pasar dattos a un servidor:
- BODY: la carga util (payload) que enviamos al servidor, generalmente se utiliza para enviar datos en formato JSON.
    Aclaración: No te olvdes de que si vas a mandar JSON debes configurar tu API para que pueda entenderlo, en express esto se hace con el middleware express.json()
    EJEMPLO: Si creo un producto, los datos de ese producto se envian por body al servidor.

- QueryString: son los parámetros que se envían en la URL después del signo de interrogación (?).
    EJEMPLO: /api/products?lmmit=20$page=2&search=audi&cattegory=autos.
      {
        limit: 20,
        page: 2,
        search: 'audi',
        category: 'autos'
      }

- PathParams: son los parámetros que se incluyen en la ruta de la URL, generalmente se utilizan para identificar recursos específicos.
    EJEMPLO: GET /api/product:product_id donde product_id es un path param que representa el id del produco que estamos buscando. Si queremos buscar el producto con id 5, la URL seria GET /api/product/5
    Para acceder a las patParams debemos hacerlo a traves por medio de equest.params y tengan en cuenta que siempre seran STRINGS.

*/

/* 

EJERCICIO:

TO DO List

El servidor tendra un estado centralizado donde guardara la información de las task a resolver.
Cada task tendra la siguiente estructura:
{
  titulo,
  descripcion,
  tiempo_estimado_en_horas,
  finalizado,
  id
}

ENDPOINTS:
  POST /api/tareas
    body: {titulo, descripcion, tiempo_estimado_en_horas} (el id se lo asgina el servidor)
    Deberá crear y agregar la tarea con su id al estado global de tareas.

  GET /api/tareas
    Deberá devolver la lista de tareas.
  GET /api/tareas/:tarea_id
    Deberá devolver la tarea que corresponda al id recibido por params.
  PUT /api/tareas/:tarea_id/status
    Enviar por body si finalizado es true o false (sirve para finalizar una tarea). Si finaliza guardar fecha_finalizacion como la fecha actual, si quita el finalzado entonces guardar finalizado como false y fecha_finalizacion como null.
  DELETE /api/tareas/:tarea_id
    Deberá eliminar la tarea que corresponda al id recibido por params.

Aclaración: Para guardar una fecha usar new Date()
  Si se busca hacer cierta accion sobre una tarea no existe responde con un mensaje que diga que dicho recurso no existe.

*/

const tareas = [
  {
    titulo: 'Ir al supermercado',
    descripcion: 'Comprar carne, verduras y bebidas',
    tiempo_estimado_en_horas: 1,
    finalizado: false,
    fecha_finalizacion: null,
    id: 1
  },
  {
    titulo: 'Jugar voley',
    descripcion: 'Ir y jugar voley recreativo con amigos',
    tiempo_estimado_en_horas: 4,
    finalizado: false,
    fecha_finalizacion: null,
    id: 2 
  },
  {
    titulo: 'Estudiar Python',
    descripcion: 'Hacer ejercicios de python para practicar lo aprendido en clase',
    tiempo_estimado_en_horas: 2,
    finalizado: false,
    fecha_finalizacion: null,
    id: 3
  },
  {
    titulo: 'Leer un libro',
    descripcion: 'Leer un libro de ciencia ficcion',
    tiempo_estimado_en_horas: 1,
    finalizado: false,
    fecha_finalizacion: null,
    id: 4
  },
  {
    titulo: 'Almorzar',
    descripcion: 'Cocinar costeletas de cerdo, con arroz y ensalada',
    tiempo_estimado_en_horas: 2.5,
    finalizado: false,
    fecha_finalizacion: null,
    id: 5
  }
]

app.post(
  '/api/tareas',
  (request, response) => {
    const {titulo, descripcion, tiempo_estimado_en_horas} = request.body

    if (!titulo || !descripcion || !tiempo_estimado_en_horas) {
      return response.json({error: 'Faltan datos!'})
    }

    const nueva_tarea = {
      titulo,
      descripcion,
      tiempo_estimado_en_horas,
      finalizado: false,
      fecha_finalizacion: null,
      id: tareas.length + 1
    }

    tareas.push(nueva_tarea)
    return response.json({ message: 'Tarea creada con éxito!', tarea: nueva_tarea })
  }
)

app.get('/api/tareas', (request, response) => {
  response.json({ message: 'Lista de tareas', tareas: tareas })
})

app.get('/api/tareas/:tarea_id', (request, response) => {
  const { tarea_id } = request.params
  const tarea_encontrada = tareas.find(
    tarea => Number(tarea.id) === Number(tarea_id)
  )
  
  if (!tarea_encontrada) {
    return response.json({ error: 'El recurso solicitado no existe' })
  }
  
  response.json({ message: 'Tarea encontrada', tarea: tarea_encontrada })
})

app.put('/api/tareas/:tarea_id/status', (request, response) => {
  const { tarea_id } = request.params
  const { finalizado } = request.body  // true o false
  
  const tarea_encontrada = tareas.find(
    tarea => Number(tarea.id) === Number(tarea_id)
  )
  
  if (!tarea_encontrada) {
    return response.json({ error: 'El recurso solicitado no existe' })
  }
  
  // Si finalizado es true, guarda la fecha actual
  if (finalizado === true) {
    tarea_encontrada.finalizado = true
    tarea_encontrada.fecha_finalizacion = new Date()
  } else {
    // Si es false, limpia la fecha
    tarea_encontrada.finalizado = false
    tarea_encontrada.fecha_finalizacion = null
  }
  
  response.json({ message: 'Tarea actualizada', tarea: tarea_encontrada })
})

app.delete('/api/tareas/:tarea_id', (request, response) => {
  const { tarea_id } = request.params
  const tarea_index = tareas.findIndex(
    tarea => Number(tarea.id) === Number(tarea_id)
  )
  
  if (tarea_index === -1) {
    return response.json({ error: 'El recurso solicitado no existe' })
  }
  
  const tarea_eliminada = tareas.splice(tarea_index, 1)
  response.json({ message: 'Tarea eliminada', tarea: tarea_eliminada[0] })
})