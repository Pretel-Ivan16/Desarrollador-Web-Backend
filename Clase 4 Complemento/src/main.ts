/* 

SISTEMA DE PLATAFORMA DE STREAMING

Contenido: respresenta cualquier contenido disponible en la plataforma.
Propiedades:
  - id
  - titulo
  - duración (en minutos)
  - genero
  - calificación

Usuario: representa a un usuario de la plataforma
Propiedades:
  - id
  - nombre
  - plan (free / premium)
  -lista[]: Contenido

Reproductor: se encarga de administrar el contenido del usuario.
Propiedades:
  - limite_contenido
  - contenidos[]: Contenido
Parámetro configurable:
  - limite de contenidos guardados

Metodos:
  agregarContenido(contenido)
  - Si el contenido ya está en la lista (por id), no lo agrega
  - Si no está:
    - verifica si no se alcanzó el límite
    - si hay espacio, lo agrega

  elminarContenido(contenido_id)
  - Elimina un contenido de la lista

  reproducirContenido(contenido_id)
  - Busca el contenido
  - Si existe, muestra que se está reproduciendo
  - Si no existe, muestra un mensaje de error

*/

type calificacion = "G" | "PG" | "R";
type plan = "free" | "premium";

class Contenido{
  id: number
  titulo: string
  duracion: number
  genero: string
  calificacion: calificacion

  constructor(
    id: number,
    titulo: string,
    duracion: number,
    genero: string,
    calificacion: calificacion
  ){
    this.id = id
    this.titulo = titulo
    this.duracion = duracion
    this.genero = genero
    this.calificacion = calificacion
  }
}

class Usuario{
  id: number | string
  nombre: string
  plan: plan
  lista: Contenido[]

  constructor(
    id: number | string,
    nombre: string,
    plan: plan,
    lista: Contenido[]
  ){
    this.id = id
    this.nombre = nombre
    this.plan = plan
    this.lista = lista
  }
}

class Reproductor{
  private limite_contenido: number
  private contenido: Contenido[] = []

  constructor(limite: number){
    this.limite_contenido = limite
    this.contenido = []
  }

  agregarContenido(contenido: Contenido): void{
    const contenidoExistente = this.contenido.find(i => i.id === contenido.id)
    if (contenidoExistente){
      return
    }
    if (!contenidoExistente){
      if(this.contenido.length < this.limite_contenido){
        this.contenido.push(contenido)
      } else {
        console.log("Error")
      }
      return
    }
  }

  eliminarContenido(contenido_id: number): void{
    const contenidoExiste = this.contenido.findIndex(c => c.id === contenido_id)
    if(contenidoExiste !== 1){
      this.contenido.splice(contenidoExiste, 1)
      console.log("Contenido Eliminado")
    } else{
      console.log("Error: Contenido no encontrado");
    }
  }
}
