console.log("Hola mundo");

/* 

Puestos Posibles 'Developer' | 'Designer' | 'Marketing' | 'Proyect Manager' | 'RRHH

Crear las siguientes clases:

Empleado

  - nombre
  - sueldo
  - fecha_contratación
  - id_empleado
  - puesto
  - presentarse(): Debe decir por consola: "Hola soy {nombre} y trabajo como {puesto}"

Pasante (es un empleado)

  - tiempo_de_contrato_en_meses
  - haceCosasDePasante():
    - Si es un dev debe decir por consola "tire mi café por error"
    - Sino solo decir "deberpia terminar a las 10 pero saldré a las 12"

*/

type puestos_Posibles = 'Developer' | 'Designer' | 'Marketing' | 'Proyect Manager' | 'RRHH'


class Empleado {
  nombre: string
  sueldo: number
  fecha_contratacion: number
  id_empleado: string | number
  puesto: puestos_Posibles

  constructor(
    nombre: string,
    sueldo: number,
    fecha_contratacion: number,
    id_empleado: string | number,
    puesto: puestos_Posibles
  ) {
    this.nombre = nombre
    this.sueldo = sueldo
    this.fecha_contratacion = fecha_contratacion
    this.id_empleado = id_empleado
    this.puesto = puesto
  }

  presentarse(): void {
    console.log(`Hola soy ${this.nombre} y trabajo como ${this.puesto}`)
  }
}

class Pasante extends Empleado {
  tiempo_de_contrato_en_meses: number

  constructor(
    nombre: string,
    sueldo: number,
    fecha_contratacion: number,
    id_empleado: string | number,
    puesto: puestos_Posibles,
    tiempo_de_contrato_en_meses: number
  ) {
    super(nombre, sueldo, fecha_contratacion, id_empleado, puesto)

    this.tiempo_de_contrato_en_meses = tiempo_de_contrato_en_meses
  }

  presentarse(): void {
    console.log(`Hola soy ${this.nombre} y trabajo como ${this.puesto}`)
  }

  hacerCosasDePasante(): void {
    if (this.puesto === 'Developer') {
      console.log('tire mi café por error')
    } else {
      console.log('debería terminar a las 10 pero saldré a las 12')
    }
  }
}

/* const pasante = new Pasante(
  'Iván',
  150000,
  2024,
  1,
  'Developer',
  16
)

pasante.presentarse()
pasante.hacerCosasDePasante() */

/* 
ManejadorEmpleados
Responsabilidad de manejar una lista de empleados en una empresa
- contador_id_empleados
- empleados (Tipo Empleados)
- id_empresa
- agregarEmpleado(nombre, puesto, sueldo) (con fecha de contracion de hoy y id_empleado se lo da el sistema)
- obtenerEmpleadoPorId(id_empleado) busqueda de uno
- obtenerEmpleadosPorPuesto(puesto) filtro
- obtenerEmpleadosPorRangoFechas(fecha_inicio, fecha_fin)
- calcularGastoMensualEnSalarios()
- calcularGastoAnualEnSalarios() 
*/

class ManejadorEmpleados {
  contador_id_empleados: number
  empleados: Empleado[]
  id_empresa: string | number

  constructor(id_empresa: string | number) {
    this.id_empresa = id_empresa
    this.contador_id_empleados = 1
    this.empleados = []
  }

  agregarEmpleado(
    nombre: string,
    puesto: puestos_Posibles,
    sueldo: number
  ): void {
    const nuevoEmpleado = new Empleado(
      nombre,
      sueldo,
      new Date().getFullYear(),
      this.contador_id_empleados,
      puesto
    )

    this.empleados.push(nuevoEmpleado)
    this.contador_id_empleados++
  }

  obtenerEmpleadoPorId(id_empleado: string | number): Empleado | undefined {
    return this.empleados.find(
      empleado => empleado.id_empleado === id_empleado
    )
  }

  obtenerEmpleadosPorPuesto(puesto: puestos_Posibles): Empleado[] {
    return this.empleados.filter(
      empleado => empleado.puesto === puesto
    )
  }

  obtenerEmpleadosPorRangoFechas(
    fecha_inicio: number,
    fecha_fin: number
  ): Empleado[] {
    return this.empleados.filter(
      empleado =>
        empleado.fecha_contratacion >= fecha_inicio &&
        empleado.fecha_contratacion <= fecha_fin
    )
  }

  calcularGastoMensualEnSalarios(): number {
    return this.empleados.reduce(
      (total, empleado) => total + empleado.sueldo,
      0
    )
  }

  calcularGastoAnualEnSalarios(): number {
    return this.calcularGastoMensualEnSalarios() * 12
  }
}


/* const manager = new ManejadorEmpleados('Empresa-01')

manager.agregarEmpleado('Ana', 'Designer', 200000)
manager.agregarEmpleado('Lucas', 'Developer', 300000)
manager.agregarEmpleado('Sofi', 'Marketing', 180000)

console.log(manager.obtenerEmpleadoPorId(2))
console.log(manager.obtenerEmpleadosPorPuesto('Developer'))
console.log(manager.calcularGastoMensualEnSalarios())
console.log(manager.calcularGastoAnualEnSalarios()) */


/* 
Empresa
- id_empresa
- manejador_empleados
- razon_social
- cuit

Accion
- tipo: "contratar" | "despedir" | "promover" 
- fecha
- id
- id_empresa
- descripcion: string

HistorialAcciones
- contador_id_acciones
- acciones: Accion[]
- id_empresa
- agregarAcciones(accion)

Ejemplo:

{
  contador_id_acciones: 2,
  id_empresa: 1,
  acciones: [
    {
      tipo: 'contratar',
      fecha: Date.now(),
      id: 1,
      id_empresa: 1,
      descripcion: 'El empleado Pepe con id 20 ha sido contratado'
    }
  ]
}
ACLARACION: No es necesario que el historial_acciones sea llamado en el manejador_empleados
*/

type accionEmpleador = 'Contratar' | 'Despedir' | 'Promover'

class Empresa{
  id_empresa: number | string
  manejador_empleados: ManejadorEmpleados
  razon_social: string
  cuit: number
  
  constructor(
    id_empresa: number | string, manejador_empleados: ManejadorEmpleados, razon_social: string, cuit: number
  ){
    this.id_empresa = id_empresa
    this.manejador_empleados = manejador_empleados
    this.razon_social = razon_social
    this.cuit = cuit
  }
}

class Accion{
  tipo: accionEmpleador
  fecha: Date
  id: number | string
  id_empresa: number | string
  description: string

  constructor(tipo: accionEmpleador, fecha: Date, id: number | string, id_empresa: number | string, description: string){
    this.tipo = tipo
    this.fecha = fecha
    this.id = id
    this.id_empresa = id_empresa
    this.description = description
  }
}

class HistorialAcciones{
  contador_id_acciones: number
  acciones: Accion[]
  id_empresa: number
  constructor(id_empresa: number){
    this.contador_id_acciones = 0
    this.acciones = []
    this.id_empresa = id_empresa
  }
  agregarAcciones(tipo: accionEmpleador, descripcion: string): void{
    this.contador_id_acciones++
    this.acciones.push(new Accion(tipo, new Date(), this.contador_id_acciones, this.id_empresa, descripcion))
  }
}

// Pasantes
const pasanteDev = new Pasante(
  'Tomás',
  120000,
  2024,
  'P-01',
  'Developer',
  6
)

const pasanteNoDev = new Pasante(
  'Lucía',
  100000,
  2024,
  'P-02',
  'Marketing',
  12
)

// Presentarse
pasanteDev.presentarse()
pasanteNoDev.presentarse()

// Comportamiento de pasante
pasanteDev.hacerCosasDePasante()
pasanteNoDev.hacerCosasDePasante()

// Crear manejador de empleados
const manejador = new ManejadorEmpleados(1)

// Agregar empleados
manejador.agregarEmpleado('María', 'Developer', 320000)
manejador.agregarEmpleado('Juan', 'Designer', 250000)
manejador.agregarEmpleado('Carla', 'RRHH', 220000)

// Obtener empleado por ID
const empleadoBuscado = manejador.obtenerEmpleadoPorId(1)
console.log('Empleado por ID:', empleadoBuscado)

// Obtener empleados por puesto
const developers = manejador.obtenerEmpleadosPorPuesto('Developer')
console.log('Developers:', developers)

// Obtener empleados por rango de fechas
const empleados2024 = manejador.obtenerEmpleadosPorRangoFechas(2023, 2025)
console.log('Empleados contratados entre 2023 y 2025:', empleados2024)

// Calcular gastos
console.log('Gasto mensual:', manejador.calcularGastoMensualEnSalarios())
console.log('Gasto anual:', manejador.calcularGastoAnualEnSalarios())

// Crear empresa
const empresa = new Empresa(
  1,
  manejador,
  'Tech Solutions SRL',
  30712345678
)

console.log('Empresa creada:', empresa)

// Crear historial de acciones
const historial = new HistorialAcciones(1)

// Registrar acciones
historial.agregarAcciones(
  'Contratar',
  'El empleado María fue contratado como Developer'
)

historial.agregarAcciones(
  'Promover',
  'El empleado Juan fue promovido a Senior Designer'
)

historial.agregarAcciones(
  'Despedir',
  'El empleado Carla fue desvinculado de la empresa'
)

// Ver historial completo
console.log('Historial de acciones:', historial)
