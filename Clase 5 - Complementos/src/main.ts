/* 

EJERCICIO: SISTEMA DE CURSOS ONLINE

TIPOS: 
	- RolUsuario = "Estudiante" | "Instructor" | "Administrador"
	- NivelCurso = "Inicial" | "Intermedio" | "Avanzado"
	- AccionCurso = "CrearCurso" | "InscribirAlumno" | "FinalizarCurso"
	
	CLASE: Usuario
		- nombre
		- email
		- id_usuario
		- rol
		- presentarse():
			Debe mostrar por consola:
				"Hola, soy {nombre} y mi rol es {rol}"

	CLASE: Estudiante (extiende Usuario)
		- cursos_inscriptos: Curso[]
		- inscribirseACurso(Curso)
		- listarCursos()

	CLASE: Instructor (extiende Usuario)
		- especialidad
		- cursos_dictados: Curso[]
		-	crearCurso(titulo, nivel, duracion_horas)

	CLASE: Curso
		- id_curso
		- titulo
		- nivel
		- duracion_horas
		- instructor
		- estudiantes: Estudiante[]
		- agregarEstudiante()


*/

type RolUsuario = "Estudiante" | "Instructor" | "Administrador"
type NivelCurso = "Inicial" | "Intermedio" | "Avanzado"

class Usuario{
	nombre: string
	email: string | number
	id_usuario: number
	rol: RolUsuario

	constructor(
		nombre: string,
		email: string | number,
		id_usuario: number,
		rol: RolUsuario
	){
		this.nombre = nombre
		this.email = email
		this.id_usuario = id_usuario
		this.rol = rol
	}
	presentarse(): void{
		console.log(`Hola, soy ${this.nombre} y mi rol es ${this.rol}`);
	}
}

class Instructor extends Usuario{
	especialidad: string
	cursos_dictados: Curso[]

	constructor(
		nombre: string,
		email: string | number,
		id_usuario: number,
		rol: RolUsuario,
		especialidad: string,
		cursos_dictados: Curso[] = []
	){
		super(nombre, email, id_usuario, rol)
		this.especialidad = especialidad
		this.cursos_dictados = cursos_dictados
	}

	crearCurso(titulo: string, nivel: NivelCurso, duracion_horas: number): Curso{
		const id_curso = this.cursos_dictados.length + 1
		const curso = new Curso(id_curso, titulo, nivel, duracion_horas, this)
		this.cursos_dictados.push(curso)
		return curso
	}
}

class Curso{
	id_curso: number
	titulo: string
	nivel: NivelCurso
	duracion_horas: number
	instructor: Instructor
	estudiantes: Estudiante[]

	constructor(
		id_curso: number,
		titulo: string,
		nivel: NivelCurso,
		duracion_horas: number,
		instructor: Instructor
	){
		this.id_curso = id_curso
		this.titulo = titulo
		this.nivel = nivel
		this.duracion_horas = duracion_horas
		this.instructor = instructor
		this.estudiantes = []
	}

	agregarEstudiante(estudiante: Estudiante): void{
		this.estudiantes.push(estudiante)
	}
}

class Estudiante extends Usuario{
	cursos_inscriptos: Curso[]

	constructor(
		nombre: string,
		email: string | number,
		id_usuario: number,
		rol: RolUsuario,
		cursos_inscriptos: Curso[] = []
	){
		super(nombre, email, id_usuario, rol)
		this.cursos_inscriptos = cursos_inscriptos
	}

	inscribirseACurso(curso: Curso): void{
		this.cursos_inscriptos.push(curso)
		curso.agregarEstudiante(this)
	}

	listarCursos(): void{
		console.log(`\nCursos de ${this.nombre}:`)
		this.cursos_inscriptos.forEach(curso => {
			console.log(`- ${curso.titulo} (${curso.nivel})`)
		})
	}
}
