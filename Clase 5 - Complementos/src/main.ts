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
type AccionCurso = "CrearCurso" | "InscribirAlumno" | "FinalizarCurso"

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

class Curso{
	id_curso: number
	titulo: string
	nivel: NivelCurso
	duracion_horas: number
	instructor: 
}

class Estudiante extends Usuario{
	cursos_inscriptos: Curso[]
	constructor(
		nombre: string,
		email: string | number,
		id_usuario: number,
		rol: RolUsuario,
		cursos_inscriptos: Curso[]
	)

}
