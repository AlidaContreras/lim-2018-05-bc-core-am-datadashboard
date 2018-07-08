//Declaramos variables con las direcciones de los JSON para manejarlos mas facil
const urlCohorts = '../data/cohorts.json';
const urlUsers = '../data/cohorts/lim-2018-03-pre-core-pw/users.json';
const urlProgress = '../data/cohorts/lim-2018-03-pre-core-pw/progress.json';
const selectSede = document.getElementById('selectSede');
const inputName = document.getElementById('inputName');


// const arraySedes = ['LIM', 'GDL','AQP','SCL','SPL','CDMX'];
//_______________________________PARA FILTRAR SEGUN SEDE LIM__________________________________________________//
// 	const arrayDeCohorts = cohorts.filter((elementCohorts) => {
// 	let idCohort = elementCohorts.id ;
//	if ((idCohort).includes('lim', 0) === true) {
// 	//aqui tengo que poner en vez de lim, la etiqueta que va a ser seleccionada en el select
// 	selectCohorts.innerHTML += "<option value='" + idCohort + "'>" + idCohort + "</option>";
//_______________________________PARA FILTRAR SEGUN SEDE LIM__________________________________________________//

//FUNCION PARA CREAR EL SELECT DE SEDES CON UN TEMPLATE
//__________________________funcion fetch para jalar la data de cohorts_______________________________________//
let viewListCohorts = () => {
	// selectCohorts.innerHTML = "";
	let cohortsJsonArr = [];
	fetch(urlCohorts)
		.then(respuesta => respuesta.json())
		.then(cohorts => {
			// console.log(cohorts);//cohorts es el array que contiene a todos los cohort

			selectSede.addEventListener('change', () => {
				let opcionSeleccionadaDeSede = event.target.options[selectSede.selectedIndex];
				console.log(opcionSeleccionadaDeSede.value);

				// let deleteCohorts = () => {
				// 	let listOfCohorts = document.getElementById('selectCohorts');
				// 	let numberOfCohorts = listOfCohorts.length;
				// 	for (i = 0; numberOfCohorts > i; i++) {
				// 		listOfCohorts.remove(0);
				// 	}

					let arrayDeCohorts = cohorts.filter((elementCohorts) => {
						let idCohort = elementCohorts.id;
						(elementCohorts.id).includes(opcionSeleccionadaDeSede.value);
						
						if ((idCohort).includes(opcionSeleccionadaDeSede.value, 0) === true) {
							//aqui tengo que poner en vez de lim, la etiqueta que va a ser seleccionada en el select
							selectCohorts.innerHTML += "<option value='" + idCohort + "'>" + idCohort + "</option>";
						}
						// deleteCohorts();
					})
				// }
			})


			// console.log(Array.isArray(arrayDeCohorts));
			console.log(cohorts);


			//______________Detectar el nombre que el usuario desea buscar_______________________________________________//
			// 	inputName.addEventListener('input', (event) => {
			// 	const valorEscrito = event.target.value;
			// 	const arrayNombresFiltrado = cohorts.filter((cohort) => {
			// 		return cohort.toUpperCase().indexOf(valorEscrito.toUpperCase()) !== -1;
			// 	});
			// 	// console.log(arrayNombresFiltrado);
			// });
			//______________Detectar el nombre que el usuario desea buscar_______________________________________________//
		})
	//__________________________funcion fetch para jalar la data de cohorts_______________________________________//
}


viewListCohorts();


//Funcion para llamar a los Users
const viewListUsers = () => {
	// selectUsers.innerHTML = "";
	fetch(urlUsers)
		.then(res => res.json())
		.then(users => {
			// console.log(usersJson);//UsersJson es el Json sin parsear
			users.map((users) => {
				let roleUsers = users.role;
				let nameUsers = users.name;
				if (((roleUsers) === 'student') === true) {
					tableUsers.innerHTML += `
						<tr>
						<td> ${nameUsers}</td>
						</tr>
						`
				}
			});
		});
}

// viewListUsers();
//llamando al json de Progress
const viewListProgress = () => {
	selectProgress.innerHTML = "";
	fetch(urlProgress)
		.then(res => res.json())
		.then(progress => {
			console.log(progress);
			console.log(typeof (progress));

		});
}
// viewListProgress();