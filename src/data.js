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
				percent = dataProgress[user.id].intro.percent;
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
			let calculatePercent = (exerciseCompleted, exerciseTotal) => {
				if (exerciseTotal == 0) {
					return 0;
				} else {
					return ((exerciseCompleted * 100) / exerciseTotal);
				}
			}
			const exercisePercent = calculatePercent(exerciseCompleted, exerciseTotal);
			const readsPercent = calculatePercent(readsCompleted, readsTotal);
			const quizzesPercent = calculatePercent(quizzesCompleted, quizzesTotal);
			const userWithStats = {
				name: user.name,
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
	//return userWithSats
	return usersWithStats;
}
window.sortUsers = (showUsers, orderBy, orderDirection) => {
	//ordenado segun nombre de estudiantes ASCENDENTE Y DESCENDENTE
	let userSort;
	if (orderDirection === 'Ascendente') {
		if (orderBy === 'Nombre') {
			userSort = showUsers.sort((a, b) => {
				return a.name - b.name;
			})
		}
	}
	if (orderDirection === 'Descendente') {
		if (orderBy === 'Nombre') {
			userSort = users.sort((a, b) => {
				return b.name - a.name;
			})
		}
	}
	// //ordenado segun COMPLETITUD de estudiantes ASCENDENTE Y DESCENDENTE
	// if (orderDirection === 'Ascendente') {
	// 	if (orderBy === 'Completitud') {
	// 		userSort = users.sort((a, b) => {
	// 			return a.stats.percent - b.stats.percent;
	// 		})
	// 	}
	// }
	// if (orderDirection === 'Descendente') {
	// 	if (orderBy === 'Completitud') {
	// 		userSort = users.sort((a, b) => {
	// 			return b.stats.percent - a.stats.percent;
	// 		})
	// 	}
	// }
	// //ordenado segun Cantidad de ejercicios completados en ASCENDENTE Y DESCENDENTE
	// if (orderDirection === 'Ascendente') {
	// 	if (orderBy === 'Excercises') {
	// 		userSort = users.sort((a, b) => {
	// 			return a.stats.excercises.total - b.stats.excercises.total;
	// 		})
	// 	}
	// }
	// if (orderDirection === 'Descendente') {
	// 	if (orderBy === 'Excercises') {
	// 		userSort = users.sort((a, b) => {
	// 			return  b.stats.excercises.total - a.stats.excercises.total;
	// 		})
	// 	}
	// }
	// //ordenado segun Cantidad de ejercicios completados en ASCENDENTE Y DESCENDENTE
	// if (orderDirection === 'Ascendente') {
	// 	if (orderBy === 'Quizzes') {
	// 		userSort = users.sort((a, b) => {
	// 			return a.stats.quizzes.total - b.stats.quizzes.total;
	// 		})
	// 	}
	// }
	// if (orderDirection === 'Descendente') {
	// 	if (orderBy === 'Quizzes') {
	// 		userSort = users.sort((a, b) => {
	// 			return  b.stats.quizzes.total - a.stats.quizzes.total;
	// 		})
	// 	}
	// }
	// //ordenado segun Cantidad de QUIZZES completados en ASCENDENTE Y DESCENDENTE
	// if (orderDirection === 'Ascendente') {
	// 	if (orderBy === 'Lecturas') {
	// 		userSort = users.sort((a, b) => {
	// 			return a.stats.reads.total - b.stats.reads.total;
	// 		})
	// 	}
	// }
	// if (orderDirection === 'Descendente') {
	// 	if (orderBy === 'Lecturas') {
	// 		userSort = users.sort((a, b) => {
	// 			return  b.stats.reads.total - a.stats.reads.total;
	// 		})
	// 	}
	// }
	return userSort ? userSort : showUsers;
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
	let students = options.cohortData.users.filter(user => user.role === 'student');
	let showUsers = computeUsersStats(students, options.cohortData.progress, courses);
	console.log(showUsers);
	showUsers = sortUsers(showUsers, options.orderBy, options.orderDirection);
	// showUsers = filterUsers(showUsers, options.search);
	return showUsers;
}