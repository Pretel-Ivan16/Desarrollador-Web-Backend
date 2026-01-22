/*

Programación 

*/

/* class Persona {
  nombre:string = ''
  edad: number

  constructor (nombre: string, edad: number){
    this.edad = edad
    this.nombre = nombre
  }

  presentarse(): void{
    console.log('Hola mi nombre es ' + this.nombre + ' y tengo ' + this.edad + '.')
  }
}

const persona_1 = new Persona('pepe', 40)
persona_1.presentarse() 
 */
/*

Item
  - id
  - precio
  - nivel
  - titulo
  - description

Personaje
  - nombre
  - vida
  - id
  - items (esto debe ser de tipo array de Items)

Crear 3 items y un persona con datos random

*/

/* class Item {
  id: number
  precio: number
  nivel: number
  titulo: string
  description: string

  constructor(
    id: number,
    precio: number,
    nivel: number,
    titulo: string,
    description: string
  ) {
    this.id = id
    this.precio = precio
    this.nivel = nivel
    this.titulo = titulo
    this.description = description
  }

  presentar(): void {
    console.log(`Item: ${this.titulo} (nivel ${this.nivel})`)
  }
}

class Personaje {
  id: number
  nombre: string
  vida: number
  items: Item[]

  constructor(
    id: number,
    nombre: string,
    vida: number,
    items: Item[]
  ) {
    this.id = id
    this.nombre = nombre
    this.vida = vida
    this.items = items
  }

  mostrarItems(): void {
    console.log(`Items de ${this.nombre}:`)
    this.items.forEach(item => item.presentar())
  }
}

const item1 = new Item(
  1, 
  5000, 
  5, 
  "Kunai", 
  "Arma básica de los ninjas para combate cuerpo a cuerpo"
)

const item2 = new Item(
  2, 
  12000, 
  8, 
  "Pergamino", 
  "Contiene técnicas ninja avanzadas"

)
const item3 = new Item(
  3, 
  8000, 
  6, 
  "Chaleco Jōnin", 
  "Aumenta la defensa del ninja en combate"
)

const personaje1 = new Personaje(
  1,
  "Arthas",
  100,
  [item1, item2, item3]
)

personaje1.mostrarItems() */

/* 
ItemInventario
Se usara para representar cada item dentro del Inventario
  - id
  - precio
  - nivel
  - titulo
  - descripcion
  - cantidad
Inventario
Tendra la responsabilidad de manejar el sistema de items de la app
- propiedades:
  - limite_items
  - items[] : ItemInventario
- parametro configurable: 
  - limite de items
- metodos
  - agregarItem(item) 
    Evaluara si el id del item agregado ya esta en la lista de items y en caso de estar solo incrementara la cantidad
    Si no esta entonces evaluara si no se llego al limite y en caso de no haber llegado agregara el item con cantidad 1
  
  - eliminarItem(item_id)
    Eliminar el item de la lista de items
  - soltarUnItem(item_id)
    Evaluara si la cantidad de items con ese id es mayor a 1 y en ese caso disminuira la cantidad en 1
    Sino lo eliminara

new ItemManager ({max_size: 4})
//Por el el momento no vamos a conectar el inventario al personaje
*/

class ItemInventario{
  id: number
  precio: number
  nivel: number
  titulo: string
  description: string
  cantidad: number

  constructor(
    id: number,
    precio: number,
    nivel: number,
    titulo: string,
    description: string,
    cantidad: number = 1
  ) {
    this.id = id
    this.precio = precio
    this.nivel = nivel
    this.titulo = titulo
    this.description = description
    this.cantidad = cantidad
  }
}

class Inventario {
  limite_de_items: number
  items: ItemInventario[] = [] // Inicializamos la propiedad

  constructor(limite_de_items: number){
    this.limite_de_items = limite_de_items
  }

  // Metodo agregarUnItem para agregar items al inventario:

  agregarUnItem(item: ItemInventario): void{
    const itemExistente = this.items.find(i => i.id === item.id)

    if (itemExistente){
      itemExistente.cantidad++
      return
    }
    if (this.items.length < this.limite_de_items){
      this.items.push(item)
    }
  }

    // Método eliminarUnItem para eliminar items del inventario:

    eliminarUnItem(item_id: number): void {
      this.items = this.items.filter(item => item.id !== item_id)
    }

    // Método soltarUnItem para soltar items del inventario:

    soltarUnItem(item_id: number): void{
      const item = this.items.find(item => item.id === item_id)
      if (!item) return

      if (item.cantidad > 1){
        item.cantidad--
      } else {
        this.eliminarUnItem(item_id)
      }
    }
}

const inventarioNaruto = new Inventario(4)

const kunai = new ItemInventario(
  1,
  350,
  1,
  "Kunai",
  "Es el arma básica de cualquier ninja"
)

const shuriken = new ItemInventario(
  2,
  200,
  1,
  "Shuriken",
  "Es un arma en forma de estrella"
)

const pergamino = new ItemInventario(
  3,
  450,
  2,
  "Pergamino",
  "Se usan para invocaciones o jutsus avanzados"
)

const chalecoJonin = new ItemInventario(
  4,
  1000,
  3,
  "Chaleco Jonin",
  "Solo los Jonin pueden comprar este chaleco mejorado"
)

inventarioNaruto.agregarUnItem(kunai)
inventarioNaruto.agregarUnItem(kunai)
inventarioNaruto.agregarUnItem(kunai)
inventarioNaruto.agregarUnItem(kunai)
inventarioNaruto.agregarUnItem(shuriken)
inventarioNaruto.agregarUnItem(shuriken)
inventarioNaruto.agregarUnItem(shuriken)
inventarioNaruto.agregarUnItem(shuriken)
inventarioNaruto.agregarUnItem(shuriken)
inventarioNaruto.agregarUnItem(shuriken)
inventarioNaruto.agregarUnItem(shuriken)
inventarioNaruto.agregarUnItem(pergamino)
inventarioNaruto.agregarUnItem(pergamino)
inventarioNaruto.agregarUnItem(pergamino)
inventarioNaruto.agregarUnItem(pergamino)
inventarioNaruto.agregarUnItem(chalecoJonin)

inventarioNaruto.soltarUnItem(1)
inventarioNaruto.eliminarUnItem(2)

console.log(inventarioNaruto.items)