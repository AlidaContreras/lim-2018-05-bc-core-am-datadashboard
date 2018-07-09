//Declaramos variables con las direcciones de los JSON para manejarlos mas facil
const urlCohorts = '../data/cohorts.json';
const urlUsers = '../data/cohorts/lim-2018-03-pre-core-pw/users.json';
const urlProgress = '../data/cohorts/lim-2018-03-pre-core-pw/progress.json';
const selectSede = document.getElementById('selectSede');
const inputName = document.getElementById('inputName');

//__________________________funcion fetch para jalar la data de cohorts_______________________________________//

const viewListCohorts = () => {
	// selectCohorts.innerHTML = "";
	const cohortsJsonArr = [];
	fetch(urlCohorts)
		.then(respuesta => respuesta.json())
		.then(cohorts => {
			// console.log(cohorts);//cohorts es el array que contiene a todos los cohort
			selectSede.addEventListener('change', () => {
				let opcionSeleccionadaDeSede = event.target.options[selectSede.selectedIndex];
				console.log(opcionSeleccionadaDeSede.value);
				selectCohorts.innerHTML = "";
						cohorts.filter((elementCohorts) => {
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
		})
	//__________________________FIN de la funcion fetch para jalar la data de cohorts_______________________________________//
}



viewListCohorts();


//Funcion para llamar a los Users
const viewListUsers = () => {
	// selectUsers.innerHTML = "";
	fetch(urlUsers)
		.then(res => res.json())
		.then(users => {
			// console.log(usersJson);//UsersJson es el Json sin parsear
		 const arrayDeAlumnasFiltadas	= users.filter((user) => {
				let roleUsers = user.role;
				let nameUsers = user.name;
				if (((roleUsers) === 'student') === true) {
					tableUsers.innerHTML += `
						<tr>
						<td> ${nameUsers}</td>
						</tr>
						`
					return nameUsers ;
				}// console.log(Array.isArray(usersEstudiantes));
			})
			console.log(Array.isArray(arrayDeAlumnasFiltadas));
				//______________Detectar el nombre que el usuario desea buscar_______________________________________________//
				inputName.addEventListener('input', (event,) => {
				const valorEscrito = event.target.value;
				console.log(valorEscrito);
				console.log(arrayDeAlumnasFiltadas);
				const alumnaBuscada = arrayDeAlumnasFiltadas.filter((nombreDeAlumna)=>{
					console.log(nombreDeAlumna);
					return (nombreDeAlumna.toUpperCase().indexOf(valorEscrito.toUpperCase()) !==-1);
				});
				console.log(alumnaBuscada);
				// alumnaBuscada.forEach(filtrada => {
				// 	console.log (filtrada);
				// });
				console.log(alumnaBuscada);
				//______________Detectar el nombre que el usuario desea buscar_______________________________________________//
			})
		});
}
viewListUsers();

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