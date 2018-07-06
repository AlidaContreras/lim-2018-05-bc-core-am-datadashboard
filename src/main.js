//Declaramos variables con las direcciones de los JSON para manejarlos mas facil
const urlCohorts = '../data/cohorts.json';
const urlUsers = '../data/cohorts/lim-2018-03-pre-core-pw/users.json';
const urlProgress = '../data/cohorts/lim-2018-03-pre-core-pw/progress.json';
const selectSede = document.getElementById('selectSede');
// const arraySedes = ['LIM', 'GDL','AQP','SCL','SPL','CDMX'];

//FUNCION PARA CREAR EL SELECT DE SEDES CON UN TEMPLATE
//funcion fetch para jalar la data de cohorts
const viewListCohorts = () => {
	// selectCohorts.innerHTML = "";
	let cohortsJsonArr = [];
	fetch(urlCohorts)
		.then(res => res.json())
		.then(cohortsJson => {
			cohortsJson.map((elementCohorts) => {
				let idCohort = elementCohorts.id;
				if ((idCohort).includes('lim', 0) === true) {
					//aqui tengo que poner en vez de lim, la etiqueta que va a ser seleccionada en el select
					selectCohorts.innerHTML += "<option value='" + idCohort + "'>" + idCohort + "</option>";
					cohortsJsonArr.push(elementCohorts);
				}
				})
				
			});
	} 
	viewListCohorts();


//Funcion para llamar a los Users
const viewListUsers = () => {
	// selectUsers.innerHTML = "";
	let usersJsonArr = [];
	fetch(urlUsers)
		.then(res => res.json())
		.then(usersJson => {
			console.log(usersJson);//UsersJson es el Json sin parsear
			usersJson.map((users) => {
					let roleUsers = users.role;
					let nameUsers = users.name;
					if(((roleUsers)==='student')===true){
						// selectUsers.innerHTML += "<option value='" + nameUsers + "'>" + nameUsers + "</option>";
						tableUsers.innerHTML +=`
						<tr>
						<td> ${nameUsers}</td>
						</tr>
						`
						usersJsonArr.push(users);
						// console.log(typeof(elementUsers));
						//muestro en un select a las alumnas que son estudiantes sin 6 instructores y 2 admin´s
					}

			});
		});
}
viewListUsers();

// const viewListProgress = () => {
// 	selectProgress.innerHTML = "";
// 	let cohortsJsonVariable = [];
// 	fetch(urlProgress)
// 		.then(res => res.json())
// 		.then(cohortsJson => {
// 			console.log(cohortsJson);
// 			cohortsJson.map((elementCohorts) => {
// 			    let idCohort = elementCohorts.id;
// 			    selectProgress.innerHTML += "<option value='" + idCohort + "'>" + idCohort + "</option>";
// 			    cohortsJsonVariable.push(elementCohorts);

// 			});
// 		});
// }
// viewListUsers();
