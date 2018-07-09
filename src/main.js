//Declaramos variables con las direcciones de los JSON para manejarlos mas facil
const urlCohorts = '../data/cohorts.json';
const urlUsers = '../data/cohorts/lim-2018-03-pre-core-pw/users.json';
const urlProgress = '../data/cohorts/lim-2018-03-pre-core-pw/progress.json';
const selectSede = document.getElementById('selectSede');
const inputName = document.getElementById('inputName');

//__________________________INICIO funcion fetch para jalar la data de cohorts_______________________________________//

const viewListCohorts = () => {
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
						selectCohorts.innerHTML += "<option value='" + idCohort + "'>" + idCohort + "</option>";
					}
				})
			})
		})
}
viewListCohorts();
//__________________________FIN de la funcion fetch para jalar la data de cohorts_______________________________________//

//__________________________INICIO de la funcion fetch para jalar la data de users_______________________________________//
const viewListUsers = () => {
	// selectUsers.innerHTML = "";
	fetch(urlUsers)
		.then(res => res.json())
		.then(users => {
			// console.log(users);//users es el array del Json parseado
			const arrayDeNombresFiltados=users.filter((user) => {
				let roleUsers = user.role;
			 			nameUsers = user.name;
				if (((roleUsers) === 'student') === true) {
					tableUsers.innerHTML += `
						<tr>
						<td> ${nameUsers}</td>
						</tr>
						`
					return nameUsers;
				}
			});

			//______________Detectar el nombre que el usuario desea buscar_______________________________________________//
			inputName.addEventListener('input', (event) => {
				const valorEscrito = event.target.value;
				console.log(valorEscrito);
				// console.log(arrayDeNombresFiltados);
				const alumnaBuscada = arrayDeNombresFiltados.filter((user) => {
					const nombres = user['name'];
					
					return (nombres.toUpperCase().indexOf(valorEscrito.toUpperCase()) !== -1);
					
				});
				console.log(alumnaBuscada);
				const ulElemento = document.getElementById('listaAlumnaBuscada');
				ulElemento.innerHTML = "";
				alumnaBuscada.forEach((user) => {
				ulElemento.innerHTML += `
																<li>${user['name']}</li>
																`
				});
			})
				//______________Detectar el nombre que el usuario desea buscar_______________________________________________//
		});
}
viewListUsers();
//__________________________FIN  de la funcion fetch para jalar la data de users_______________________________________//

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