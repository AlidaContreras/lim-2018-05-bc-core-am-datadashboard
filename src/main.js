//Declaramos variables con las direcciones de los JSON para manejarlos mas facil
const urlCohorts = '../data/cohorts.json';
const urlUsers = '../data/cohorts/lim-2018-03-pre-core-pw/users.json';
const urlProgress = '../data/cohorts/lim-2018-03-pre-core-pw/progress.json';
const selectSede = document.getElementById('selectSede');
const selectCohorts = document.getElementById('selectCohorts')
const inputName = document.getElementById('inputName');

let options = {
	cohort: null,
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
			options.cohort = cohorts;
		})
}
viewListCohorts();

selectSede.addEventListener('change', () => {
		let opcionSeleccionadaDeSede = event.target.options[selectSede.selectedIndex];
		console.log(opcionSeleccionadaDeSede.value);
		selectCohorts.innerHTML = "";
			let cohortsLima = options.cohort.filter((elementCohorts) => {
			let idCohort = elementCohorts.id;
			(elementCohorts.id).includes(opcionSeleccionadaDeSede.value);
			if ((idCohort).includes(opcionSeleccionadaDeSede.value, 0) === true) {
				selectCohorts.innerHTML += "<option value='" + idCohort + "'>" + idCohort + "</option>";
			}
		})
	})


const viewListProgress = () => {
	// selectProgress.innerHTML = "";
	fetch(urlProgress)
		.then(res => res.json())
		.then(progress => {//progress es el documento parseado en este caso es un objeto de objetos
			option.cohortData.progress = progress;
		});
}

const viewListUsers = () => {
	// selectUsers.innerHTML = "";
	fetch(urlUsers)
		.then(res => res.json())
		.then(users => {//users es el documento parseado en este caso es un array de objetos
			option.cohortData.users = users;
			viewListProgress()

			//users es el array del Json parseado
			// const arrayDeNombresFiltados=users.filter((user) => {
			// 	let roleUsers = user.role;
			//  	let		nameUsers = user.name;
			// 	if (((roleUsers) === 'student') === true) {
			// 		tableUsers.innerHTML += `
			// 			<tr>
			// 			<td> ${nameUsers}</td>
			// 			</tr>
			// 			`
			// 		return nameUsers;
			// 	}
			// });
			//______________Detectar el nombre que el usuario desea buscar_______________________________________________//
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
			// 	ulElemento.innerHTML += `
			// 													<li>${user['name']}</li>
			// 													`
			// 	});
			// })
			//______________Detectar el nombre que el usuario desea buscar_______________________________________________//
		});
}

selectCohorts.addEventListener('change',()=>{
	if (selectCohorts.value === 'lim-2018-03-pre-core-pw'){
		console.log ('hola')
	}
	else{
		console.log ('DATA NO EXISTENTE')
	}


})



// viewListUsers();
//__________________________FIN  de la funcion fetch para jalar la data de users_______________________________________//

//__________________________INICIO de la funcion fetch para jalar la data del progress_______________________________________//

// viewListProgress();
//__________________________FIN de la funcion fetch para jalar la data del progress_______________________________________//
// Promise.all([viewListCohorts,viewListUsers,viewListProgress])
// 	.then((values) => {
// 		userStats = window.getComputedStyle(cohorts,users,progress);
// 	})
