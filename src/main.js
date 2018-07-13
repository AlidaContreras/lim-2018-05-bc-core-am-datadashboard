//Declaramos variables con las direcciones de los JSON para manejarlos mas facil
const urlCohorts = '../data/cohorts.json';
const urlUsers = '../data/cohorts/lim-2018-03-pre-core-pw/users.json';
const urlProgress = '../data/cohorts/lim-2018-03-pre-core-pw/progress.json';
const selectSede = document.getElementById('selectSede');
const selectCohorts = document.getElementById('selectCohorts')
const inputName = document.getElementById('inputName');

let options = {
	cohort: 0,
	cohortData: {
		users: null,
		progress: null
	}
	// orderBy:,
	// orderDirection:,
	// search:,
}
//__________________________INICIO funcion fetch para jalar la data de cohorts_______________________________________//
const viewListCohorts = () => {
	fetch(urlCohorts)
		.then(respuesta => respuesta.json())
		.then(cohorts => {//cohorts es el documento parseado en este caso es un array de objetos

			selectSede.addEventListener('change', () => {
				let opcionSeleccionadaDeSede = event.target.options[selectSede.selectedIndex];
				console.log(opcionSeleccionadaDeSede.value);
				selectCohorts.innerHTML = "";
				let cohortsLima = cohorts.filter((elementCohorts) => {
					let idCohort = elementCohorts.id;
					(elementCohorts.id).includes(opcionSeleccionadaDeSede.value);
					if ((idCohort).includes(opcionSeleccionadaDeSede.value, 0) === true) {
						return selectCohorts.innerHTML += "<option value='" + idCohort + "'>" + idCohort + "</option>";
					}
				})
				let cohort = cohortsLima.filter((elCohort) => {
					if (elCohort.id === "lim-2018-03-pre-core-pw") {
						return (elCohort);
					}
				})
				console.log(cohort[0])
				options.cohort = cohort[0];
			})
		})
}
viewListCohorts();

const viewListProgress = () => {
	// selectProgress.innerHTML = "";
	fetch(urlProgress)
		.then(res => res.json())
		.then(progress => {//progress es el documento parseado en este caso es un objeto de objetos
			options.cohortData.progress = progress;
			processCohortData(options);

		});
		
}

const viewListUsers = () => {
	// selectUsers.innerHTML = "";
	fetch(urlUsers)
		.then(res => res.json())
		.then(users => {//users es el documento parseado en este caso es un array de objetos
			options.cohortData.users = users;
			viewListProgress();
		})
}

selectCohorts.addEventListener('change', () => {
	if (selectCohorts.value === 'lim-2018-03-pre-core-pw') {
		viewListUsers();
	}
	else {
		console.log('DATA NO EXISTENTE')
	}


})

// // ESTO ME DEBE PINTAR EN PANTALLA A LAS ESTUDIANTES(SOLO NOMBRES)
// const arrayDeNombresFiltados = users.filter((user) => {
// 	let roleUsers = user.role;
// 	let nameUsers = user.name;
// 	if (((roleUsers) === 'student') === true) {
// 		tableUsers.innerHTML += `
// 			<tr>
// 			<td> ${nameUsers}</td>
// 			</tr>
// 			`
// 		return nameUsers;
// 	}
// });
// //______________Detectar el nombre que el usuario desea buscar_______________________________________________//
// inputName.addEventListener('input', (event) => {
// 	const valorEscrito = event.target.value;
// 	console.log(valorEscrito);
// 	// console.log(arrayDeNombresFiltados);
// 	const alumnaBuscada = arrayDeNombresFiltados.filter((user) => {
// 		const nombres = user['name'];
// 		return (nombres.toUpperCase().indexOf(valorEscrito.toUpperCase()) !== -1);
// 	});
// 	const ulElemento = document.getElementById('listaAlumnaBuscada');
// 	ulElemento.innerHTML = "";
// 	alumnaBuscada.forEach((user) => {
// 		ulElemento.innerHTML += `
// 													<li>${user['name']}</li>
// 													`
// 	});
// })


