window.computeUsersStats = (users, progress, courses) => {
	let dataUsers = users;
	let dataProgress = progress;
	//1. vamos a filtrar a las alumnas que tiene su role como estudiante
	//Aqui me tienen que salir 727 estudiantes
	const usersWithStats = [];
	
//
	courses.forEach(cadaCourse => {
		dataUsers.forEach((user) => {
			let percent = 0;
			let exerciseTotal = 0;
			let exerciseCompleted = 0;
			let readsTotal = 0;
			let readsCompleted = 0;
			let quizzesTotal = 0;
			let quizzesCompleted = 0;
			let scoreSum = 0;
			let scoreAvg = 0;

			
			if ((dataProgress[user.id]) && (dataProgress[user.id]).hasOwnProperty(cadaCourse)) {
				cadaUnidad = dataProgress[user.id].intro.units;
				Object.keys(cadaUnidad).forEach((nombreCadaUnidad) => {
					const parts = cadaUnidad[nombreCadaUnidad].parts
					Object.keys(parts).forEach((nombreDeParte) => {
						const part = parts[nombreDeParte];
						//
						if (part.hasOwnProperty('exercises')) {
							const exercises = part.exercises;
							Object.keys(exercises).forEach((exerciseName) => {
								const exercise = exercises[exerciseName];
								exerciseTotal += 1;
								if (exercise.completed !== undefined) {
									exerciseCompleted += exercise.completed;
								} else {
									exerciseCompleted = 0;
								}
							});
						}
						if (part.hasOwnProperty('type')) {
							if (part.type === 'read' && readsCompleted !== 0) {
								readsTotal++;
								readsCompleted += part.completed
							} else if (part.type === 'read' && readsCompleted === 0) {
								readsCompleted = 1;
								readsTotal = 1
							}
							if (part.type === 'quiz') {
								quizzesTotal += 1;
								quizzesCompleted += part.completed;
								scoreSum += part.score ? part.score : 0;
								scoreAvg = (scoreSum / quizzesCompleted) ? (scoreSum / quizzesCompleted) : 0;
							}
						}
					})
				})
			}
			let calculatePercent = (completados, totales) => {
				if (totales == 0) {
					return 0;
				} else {
					return ((completados * 100) / totales);
				}
			}

			const percentGeneral = (user) => {
				let count = 0;//acumular todo el puntaje de %
				let percentDeCursos = [];
				courses.map(course => {
					if (user[course]) {
						count += user[course]['percent'];
						percentDeCursos.push(user[courses]['percent']);
					}
				});
				return {
					percenta: count / courses.length,
				}
			}

			const exercisePercent = calculatePercent(exerciseCompleted, exerciseTotal);
			const readsPercent = calculatePercent(readsCompleted, readsTotal);
			const quizzesPercent = calculatePercent(quizzesCompleted, quizzesTotal);
			const userWithStats = {
				name: user.name,
				stats: {
					percent: percentGeneral,
					exercises: {
						total: exerciseTotal,
						completed: exerciseCompleted,
						percent: exercisePercent,
					},
					reads: {
						total: readsTotal,
						completed: readsCompleted,
						percent: Math.round(readsPercent) //aquí se redondea 
					},
					quizzes: {
						total: quizzesTotal,
						completed: quizzesCompleted,
						percent: Math.round(quizzesPercent),
						scoreSum: Math.round(scoreSum),
						scoreAvg: Math.round(scoreAvg)
					}
				}
			}
			usersWithStats.push(userWithStats);
		})
	})
	//return userWithSats
	return usersWithStats;
}
window.sortUsers = (parametros) => {

}
window.filterUsers = (parametros) => {

}
window.processCohortData = (options) => {
	let courses = Object.keys(options.cohort.coursesIndex);
	let students = options.cohortData.users.filter(user => user.role === 'student');
	let showUsers = computeUsersStats(students, options.cohortData.progress, courses);
	console.log(showUsers);
	
	// users = sortUsers(users,orderBy,orderDirection);
	// search ? users = filterUsers(users,search) : null;
}