//vamos a declarar una variable por cada url para jarlarlas
const urlUsers = '../data/cohorts/lim-2018-03-pre-core-pw/users.json';
const urlProgress = '../data/cohorts/lim-2018-03-pre-core-pw/progress.json';
const urlCohorts = '../data/cohorts.json';
const listCohorts = document.getElementById('cohorts');
//llamado de datos
const xhr = new XMLHttpRequest();
xhr.open('GET', urlCohorts);
xhr.onload = getCohorts = (urlCohorts) => {
	const data = JSON.parse(event.target.responseText);
	console.log(data);
};
xhr.onerror = handleError = () => {
	console.log('ocurrio un error');
};
xhr.send();


