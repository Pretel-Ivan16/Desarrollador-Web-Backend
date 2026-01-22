/* 
- Tipos de datos

- Operadores aritmeticos

- Operadores logicos (&&, ||, !)

- Variables, Alcance  

- Condicionales

- Bucles: 
    - For (1)
    - for of  (2)
    - for in  (1)

- funciones
    - parametros
    - retorno
    - callbacks (1)

- Objetos y arrays
    - desestructuracion

- Metodos avanzados de array (3)
    - map
    - filter (1)
    - find (1)
    - findIndex (6)

- spread operator (...) (3)

falsy:
    NaN
    0
    undefined
    null
    ''
    -0
*/

/* 
- findIndex VISTO
- Metodos avanzados de array VISTO
- spread operator (...) VISTO
- for of  VISTO
- for in  VISTO
- For VISTO
- callbacks (1)
*/

/* const personas = [
    {
        id: 1, 
        nombre: 'Sergio'
    },
    {
        id: 2, 
        nombre: 'Ricardo'
    },
    {
        id: 3, 
        nombre: 'Javier'
    },
] */

//Eliminar a el usuario con id 2

//splice
/* 
- el indice del elemento que queremos eliminar
- cuantos elementos quiero eliminar
*/

//Como puedo averigurar el indice del elemento con id 2
//Deberiamos usar findIndex porque es un metodo que te permite determinar el indice de un elemento a partir de una condicion
//findIndex tiene un recorrido interno del array, recibira una funcion y esa funcion la ejecutara por CADA ELEMENTO del array, si la funcion retorna un falsy entonces pasa al sig elemento y si la funcion retorna Thruthy el metodo findIndex retorna el indice de el elemento que estamos recorriendo
/* 
const posicion_del_usuario_2 = personas.findIndex(
    (persona) => {
        return Number(persona.id) === Number(2)
    }
)


personas.splice(posicion_del_usuario_2, 1) 
*/
/* 
const posicion_del_usuario_2 = personas.findIndex(
    function (persona) {
        return Number(persona.id) === Number(2)
    }
)
personas.findIndex(
    (persona) => Number(persona.id) === Number(2)

) */

/* 
Filter:
Nos permite obtener a partir de un array otro array donde cada elemento cumpla con una x condicion 
NO MUTABLE (no modifica el objeto original)
Recorre todo el array
SIEMPRE DEVUELVE UN ARRAY 
*/
/* const galletitas = [
    {
        id: 8,
        tipo: 'rumba'
    },
    {   
        id: 1,
        tipo: 'alfajorcito'
    },
    {   
        id: 2,
        tipo: 'sonrisas'
    },
    {   
        id: 5,
        tipo: 'sonrisas'
    },
    {
        id: 3,
        tipo: "melba"
    },
    {
        id: 7,
        tipo: "melba"
    },
    {
        id: 4,
        tipo: 'rumba'
    }
] */

//Quiero obtener todas las rumbas de la bolsa de galletitas
/* const rumbas = galletitas.filter(
    (galletita) => {
        return galletita.tipo === 'rumba'
    }
)

if(rumbas.length){
    console.log('Hay rumbas')
} */

//Quiero obtener una rumba
//Find lo usamos para obtener cierto elemento del array, una particularidad es que find devuelve la referencia del objeto dentro del array

/* const rumba = galletitas.find(
    (
        (galletita) => galletita.tipo === 'rumba'
    )
)


rumba.caracteristica = 'partida a la mitad'

console.log(galletitas)
 */

/* SPREAD OPERATOR */
/* 
Lo vamos a utilizar para romper referencias (clonacion)
*/
/* const persona_1 = {
    name: 'pepe',
    edad: 40
}

let nombre_propiedad_nueva = 'estatura'
let valor_propiedad_nueva = '176cm'
const persona_2 = {...persona_1, ['edad']: 50, color: 'red', [nombre_propiedad_nueva]: valor_propiedad_nueva}

persona_1.name = 'juan'

console.log(persona_2) */

/* const nombres = ['pepe', 'juan']

const nombres_2 = [...nombres, 'maria']
console.log(nombres_2) */

/* 
FOR:
Repetir la ejecucion de un bloque de codigo
Lo usamos cuando podemos conocer o saber la cantidad de veces que vamos a repetir algo
For tiene un contador que le indicara si debe repetir o no la ejecucion del bloque de codigo

tenemos una lista de ganancias trimestrales

*/

/* const ganancias_trimestrales = [900, 400, 300, 1500] */

//Averiguar el promedio de las ganancias trimestrales
// sumatoria de notas / cantidad de notas

//El contador ira del 0 al 3
/* let sumatoria_ganancias = 0
for(
    let contador = 0; 
    contador < ganancias_trimestrales.length; 
    contador = contador + 1
){
    const ganancia = ganancias_trimestrales[contador]
    sumatoria_ganancias = sumatoria_ganancias + ganancia
}

let resultado = sumatoria_ganancias / ganancias_trimestrales.length
console.log("el promedio de ganancia trimestral es: $" + resultado )
 */

//FOR OF
/* 
Sirve para recorrer elementos iterables
Se lo suele usar principalmente para recorrer ARRAYS
 */
/* let sumatoria_ganancias = 0 

for(const ganancia_trimestral of ganancias_trimestrales){
    sumatoria_ganancias = sumatoria_ganancias + ganancia_trimestral
}

let resultado = sumatoria_ganancias / ganancias_trimestrales.length
console.log("el promedio de ganancia trimestral es: $" + resultado )
 */

//FOR IN
//Nos permite recorrer un objeto, recorremos las propiedades de un objeto

/* const persona = {
    "D.N.I": 11222333,
    "Nombre": 'Pepe',
    "Apellidos": "Suarez",
    "Pais nacimento": "argentina"
}

let mensaje = 'Los datos del usuario son:\n'

for(let propiedad in persona){
    const valor = persona[propiedad]
    mensaje = mensaje + `${propiedad}: ${valor}\n`
}

console.log(mensaje) */

//Callbacks
/* 
Las callbacks nos permiten transmitir funciones a otras funciones
Es como si te escribiera en hoja "salta" y te la diera, pero te digo que ejecutes lo que dice la hoja luego de alejarte 10 metros
*/

/* function alejarse10MetrosYHacerAlgo(algoCallback){
    console.log('Me alejo 10 metros...')
    algoCallback()
}

alejarse10MetrosYHacerAlgo(
    () => {
        console.log("saltar")
    }
) */

/* function filtro (array, filtroCallback){
    const resultado = []
    for(const elemento of array){
        if(filtroCallback(elemento)){
            resultado.push(elemento)
        }
    }
    return resultado
}

const nombres = ['pepe', 'juan', 'pepe']

console.log(filtro(nombres, (nombre) => nombre === 'pepe')) */


/* function solicitarDatoNumerico (mensaje){
    let dato = prompt(mensaje)
    while(!dato || isNaN(dato)){
        alert('Debes ingresar un numero')
        dato = prompt(mensaje)
    }
    return Number(dato)
} */

/* function solicitarDato (mensaje, error, condicionCallback){
    let dato = prompt(mensaje)
    while(!condicionCallback(dato)){
        alert(error)
        dato = prompt(mensaje)
    }
    return dato
}

let nombre = solicitarDato(
    'Ingrese el nombre', 
    'Error debes ingresar un texto mayor a 3 caracteres', 
    (dato) => dato && dato.length > 3
) */

const btn = document.getElementById("btn-confirmar-compra")
btn.addEventListener(
    'click',
    () => {
        console.log('compra confirmada')
    }
)