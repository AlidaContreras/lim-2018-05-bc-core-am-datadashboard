window.computeUsersStats = (users, progress, courses) => {
	//1. vamos a filtrar a las alumnas que tiene su role como estudiante
	//Aqui me tienen que salir 727 estudiantes
	const usersWithStats = [];
	courses.forEach(cadaCourse => {
		users.forEach((user) => {
			let percent = 0;
			let exerciseTotal = 0;
			let exerciseCompleted = 0;
			let readsTotal = 0;
			let readsCompleted = 0;
			let quizzesTotal = 0;
			let quizzesCompleted = 0;
			let scoreSum = 0;
			let scoreAvg = 0;
			if ((progress[user.id]) && (progress[user.id]).hasOwnProperty(cadaCourse)) {
				percent = progress[user.id][cadaCourse].percent;
				cadaUnidad = progress[user.id][cadaCourse].units;
				Object.keys(cadaUnidad).forEach((nombreCadaUnidad) => {
					const parts = cadaUnidad[nombreCadaUnidad].parts
					Object.keys(parts).forEach((nombreDeParte) => {
						const part = parts[nombreDeParte];
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
			const exercisePercent = exerciseTotal ? Math.round(exerciseCompleted*100/ exerciseTotal) : exerciseTotal;
			const readsPercent = readsTotal ? Math.round(readsCompleted*100/ readsTotal) : readsTotal;
			const quizzesPercent = quizzesTotal ? Math.round(quizzesCompleted *100/quizzesTotal) : quizzesTotal ;
			const userWithStats = {
				name: user.name.toUpperCase(),
				stats: {
					percent: percent,
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
	return usersWithStats;
}
window.sortUsers = (users, orderBy, orderDirection) => {
	let userSort;
	//ordenado segun nombre de estudiantes ASCENDENTE Y DESCENDENTE
	if (orderBy == 'name') {
		userSort = users.sort((a, b) => {
			if (a.name > b.name) {
				return 1
			} else if (a.name < b.name) {
				return -1
			}
			return 0
		});
		if (orderDirection == 'Ascendente') {
			return userSort;
		} else if (orderDirection == 'Descendente') {
			return userSort.reverse();
		}
	};
	if (orderBy == 'completitud') {
		userSort = users.sort((a, b) => {
			if (a.stats.percent < b.stats.percent) {
				return 1
			} else if (a.stats.percent > b.stats.percent) {
				return -1
			}
			return 0
		});
		if (orderDirection == 'Ascendente') {
			return userSort;
		} else if (orderDirection == 'Descendente') {
			return userSort.reverse();
		}
	};
	if (orderBy == 'ejercicios') {
		userSort = users.sort((a, b) => {
			if (a.stats.exercises.percent < b.stats.exercises.percent) {
				return 1
			} else if (a.stats.exercises.percent > b.stats.exercises.percent) {
				return -1
			}
			return 0
		});
		if (orderDirection == 'Ascendente') {
			return userSort;
		} else if (orderDirection == 'Descendente') {
			return userSort.reverse();
		}
	};
	if (orderBy == 'quizzes') {
		userSort = users.sort((a, b) => {
			if (a.stats.quizzes.percent < b.stats.quizzes.percent) {
				return 1
			} else if (a.stats.quizzes.percent > b.stats.quizzes.percent) {
				return -1
			}
			return 0
		});
		if (orderDirection == 'Ascendente') {
			return userSort;
		} else if (orderDirection == 'Descendente') {
			return userSort.reverse();
		}
	};
	if (orderBy == 'lecturas') {
		userSort = users.sort((a, b) => {
			if (a.stats.reads.percent < b.stats.reads.percent) {
				return 1
			} else if (a.stats.reads.percent > b.stats.reads.percent) {
				return -1
			}
			return 0
		});
		if (orderDirection == 'Ascendente') {
			return userSort;
		} else if (orderDirection == 'Descendente') {
			return userSort.reverse();
		}
	};
	return userSort;
}
window.filterUsers = (users, search) => {
	const alumnaBuscada = users.filter((user) => {
		if (user.name !== undefined) {
			let nombres = user.name;
			return (nombres.toUpperCase().indexOf(search.toUpperCase()) !== -1);
		}
	})
	return alumnaBuscada;
}
window.processCohortData = (options) => {
	const courses = Object.keys(options.cohort.coursesIndex);
	console.log(courses)
	let showUsers;
	let students = options.cohortData.users.filter(user => user.role === 'student');
	showUsers = computeUsersStats(students, options.cohortData.progress, courses);
	showUsers = sortUsers(showUsers, options.orderBy, options.orderDirection);
	showUsers = filterUsers(showUsers, options.search);
	console.log(showUsers);
	return showUsers;
}
//user es la data en bruto obtenida del JSON la que tiene 735 estudiantes
//dataUser es la copia de user(735) con la que trabajamos en este doc para no afectar la referencia
//students es el arreglo de estudiantes filtradas con el role de students que son 727(contiene los mismos datos que user o dataUser)
//showUsers es el arreglo de estudiantes que tienen el objeto stats con sus calificaciones
