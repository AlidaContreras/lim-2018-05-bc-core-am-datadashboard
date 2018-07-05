//vamos a declarar una variable por cada url para jarlarlas
const urlCohorts = '../data/cohorts.json';
const urlUsers = '../data/cohorts/lim-2018-03-pre-core-pw/users.json';
const urlProgress = '../data/cohorts/lim-2018-03-pre-core-pw/progress.json';
// DOM
const selectCohort=document.getElementById('selectCohort');
const selectSede=document.getElementById('selectSede');
//llamando a los Cohorts
const getDataJson=(url,callback)=>{
const request = new XMLHttpRequest();
request.open('GET', callback);
request.onload = callback;
request.onerror= handleError;
cohortsRequest.send();
}
cohortsRequest.onerror = handleError = () => {
	console.log('Ocurrió un error');
}
//funcion para seleccionar cohort segun sede

const cohorts=(event)=>{
	let cohortsfilter='';
	const data =JSON.parse(event.target.responseText);
	for (const value of data) {
		if(((data[i].id).includes(selectSede.value,0)===true)){
			cohortsfilter += '<option>' + data[i].id + '</option>' + '<br>'
		}
	}
	selectCohort.innerHTML=cohortsfilter;
}
