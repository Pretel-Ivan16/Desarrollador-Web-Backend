/* function crearPersona(nombre, edad){
    return {
        nombre: nombre,
        edad: edad
    }
}

const persona_1 = crearPersona("pepe", 40);
const persona_2 = crearPersona("Juan", 33); */

// Function Constructora

/* 

this es una palabra reservada que cambia de valor dependiendo el contexto
en el contexto de una función constructora es una autoreferencia a la instancia de la función
La instancia de la función se fenera cada vez que hay un new Persona()

Esta función va a retornar al objeto this

*/

/* function Persona(nombre, edad){
    console.log(this)
    this.nombre = nombre
    this.edad = edad
}

const persona_1 = new Persona ('pepe', 40)
console.log(persona_1) */

// Metodo
// Son funciones directamente asociadas a la clase Persona

// Class ES6

/* class Persona {
    constructor (nombre,edad){
        this.nombre = nombre,
        this.edad = edad
    }
    presentarse(){
        console.log('Hola me llamo ' + this.nombre)
    }
}

const persona_1 = new Persona('pepe', 40)
persona_1.presentarse() */