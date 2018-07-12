window.computeUsersStats = (users, progress, courses) => {
	let dataUsers = users;
	let dataProgress = progress;

	//1. vamos a filtrar a las alumnas que tiene su role como estudiante
	let students = dataUsers.filter(user => user.role === 'student');
	//2.conexion entre mis users y el progress
	students = students.map(user => {//en students se va a chancar un array con estudiantes
		//que tienen definido en el rol a 'students'
		//userProgress une a progress y users; userProgress=id del user buscando en progress
		const userProgress = dataProgress[user.id];//userProgress une a progress y users; userProgress=id del user buscando en progress
		//para calcular el percent, exercises, reads y quizzes se hace una funcion general callback
		//porque la forma de obtenerlos es similar, solo cambiariamos los parametros->calcularStats()
		let percent = calcularStats(userProgress);
		let exercises = calcularStats(userProgress, 'practice');
		let reads = calcularStats(userProgress,'read');
		let quizzes = calcularStats(userProgress, 'quiz');
		return ({//aqui creo el objeto stats que me va a devolver los datos requeridos juntos
			id: user.id,
			name: user.name.toUpperCase(),
			stats: {
				percent,//1.
				percentBycourses,//2
				exercises,//3
				reads,//4
				quizzes//5
			},
		})
	})
	//3. 
	//funcion para calcular el % completitud genral
	const calcuPercent = (user) => {
		let count = 0;//acumular todo el puntaje de %
		let percentDeCursos = [];
		courses.map(course => {
			if (user[course]) {
				count += user[course]['percent'];
				percentDeCursos.push(user[courses]['percent']);
			}
		});
		return {
			percent: count / courses.length,
			percentDeCursos
		}
	}


	//funcion para calcular la data de los ejercicios, lecturas y quizzes
	const calcularStats = (user, type) => {

		let [completed, total, scoresum, totalCompletedQuizzes] = [0, 0, 0, 0]
		let complitedDeCursos = courses.map(course => {
			let complitedDelCurso = 0;
			if (user.hasOwnProperty(course)) { // si(el objeto(user).contiene(la propiedad(course)))
				let units = Object.value(user[course]['units']);
				units.map(unit => {
					let parts = Object.value(unit['parts']).filter(part => part.type)
					const calcuData = values => {
						total++;
						completed += value;
						complitedDelCurso += value;
					},
					switch (type) {
						case 'practica':
							parts

							break;

						default:
							break;
					}

				})

			}
			else{
				console.log ('EL USUARIO NO TIENE CURSOS')
			}
		})
		let units = Object.value
	}


	// //valor de retorno
	// usersWithStats: {
	//     stats:{
	//         percent:,//% completitud general del usuario de todos los cursos
	//         exercises:{
	//             total:,//total ejercicios autocorregidos
	//             completed:,//numero de ejercicios autocorregidos completados
	//             percent:,//%de ejercicios autocorregidos completados
	//         },
	//         reads:{
	//             total:,//total de lecturas presentes
	//             completed:,//numero de lecturas completadas por el usuario
	//             percent:,//%de lecturas completadas
	//         },
	//         quizzes:{
	//             total:),//numero total quizzes presentes
	//             completed:,//quizzes completados
	//             percent:,//%quizzes completados
	//             scoreSum:,//suma de todas puntuaciones de los quizzes completos
	//             scoreAvg:,//promedio de puntuacion quizzes
	//         }

	//     }
	// }
}

window.sortUsers = (parametros) => {

}
window.filterUsers = (parametros) => {

}
window.processCohortData = (options) => {

	let courses = Object.keys(options.cohort.coursesIndex);
	console.log(courses);
	let users = computeUsersStats(options.cohortData.users, options.cohortData.progress, courses);
	// users = sortUsers(users,orderBy,orderDirection);
	// search ? users = filterUsers(users,search) : null;
}