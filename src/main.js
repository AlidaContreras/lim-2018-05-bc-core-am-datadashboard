//Declaramos variables con las direcciones de los JSON para manejarlos mas facil
const urlCohorts = '../data/cohorts.json';
const urlUsers = '../data/cohorts/lim-2018-03-pre-core-pw/users.json';
const urlProgress = '../data/cohorts/lim-2018-03-pre-core-pw/progress.json';
const selectSede = document.getElementById('selectSede');
const selectCohorts = document.getElementById('selectCohorts')
const studentsAll = document.getElementById('studentsAll')
const selectOfdirection = document.getElementById('selectOfdirection')
const OrderType = document.getElementById('OrderType')
// const inputName = document.getElementById('inputName');

let options = {
	cohort: 0,
	cohortData: {
		users: null,
		progress: null
	},
	orderBy:'Nombre',
	orderDirection:'Ascendente',
	search: '',
};
//__________________________INICIO funcion fetch para jalar la data de cohorts_______________________________________//
const viewListCohorts = () => {
	fetch(urlCohorts)
		.then(respuesta => respuesta.json())
		.then(cohorts => {//cohorts es el documento parseado en este caso es un array de objetos

			selectSede.addEventListener('change', () => {
				let opcionSeleccionadaDeSede = event.target.options[selectSede.selectedIndex];
				console.log(opcionSeleccionadaDeSede.value);
				selectCohorts.innerHTML = '';
				let cohortsLima = cohorts.filter((elementCohorts) => {
					let idCohort = elementCohorts.id;
					(elementCohorts.id).includes(opcionSeleccionadaDeSede.value);
					if ((idCohort).includes(opcionSeleccionadaDeSede.value, 0) === true) {
						return selectCohorts.innerHTML += "<option value='" + idCohort + "'>" + idCohort + "</option>";
					}
				})
				let cohort = cohortsLima.filter((elCohort) => {
					if (elCohort.id === 'lim-2018-03-pre-core-pw') {
						return (elCohort);
					}
				})
				// console.log(cohort[0])
				options.cohort = cohort[0];
			})
		})
}
viewListCohorts();

const viewListProgress = () => {
	// selectProgress.innerHTML = '';
	fetch(urlProgress)
		.then(res => res.json())
		.then(progress => {//progress es el documento parseado en este caso es un objeto de objetos
			options.cohortData.progress = progress;
			processCohortData(options);

			const tableOfEstudents = processCohortData(options);
			for (let user of tableOfEstudents) {
				studentsAll.innerHTML +=
					//Tabla de estudiantes que se pinta en pantalla al hacer click en el cohort
			`<div>
			<td id= 'tablestudent'>${user['name']}</td>
			<td>${user.stats['percent']}</td>
			<td>${user.stats.exercises['percent']}</td>
			<td>${user.stats.quizzes['percent']}</td>
			<td>${user.stats.reads['percent']}</td>
			</div>
			`;
			}

		});
}

const viewListUsers = () => {
	// selectUsers.innerHTML = '';
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

searchBox.addEventListener('input', (event) => {
	options.search = event.target.value;
	const guardado = processCohortData(options);//guardado es el array que me devuelve
	studentsAll.innerHTML = '';
	guardado.forEach((user) => {
		studentsAll.innerHTML +=
		`
		<tbody id='showEstudents'>
		<td >${user['name']}</td>
		<td>${user.stats['percent']}</td>
		<td>${user.stats.exercises['total']}</td>
		<td>${user.stats.quizzes['completed']}</td>
		<td>${user.stats.quizzes['percent']}</td>
		<td>${user.stats.reads['completed']}</td>
		</tbody>
		`;
	});

})

selectOfdirection.addEventListener('change',(event)=>{
	options.selectOfdirection = event.target.value;
	options.orderBy = OrderType.value;

	const dataOrderBy = processCohortData(options);
	showEstudents.innerHTML = '';
	viewListProgress(dataOrderBy);




})
