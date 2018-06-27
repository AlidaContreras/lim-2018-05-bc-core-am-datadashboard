llamando=()=>{
xhr = new XMLHttpRequest();
xhr.open('GET','../data/cohorts.json');
xhr.onload=handleSuccess;
xhr.onerror=handleError;
xhr.send();
}
const handleError=()=>{
    console.log('ocurrio un error :( ')
    }
const handleSuccess =()=>{
    const data = JSON.parse(xhr.responseText);
    console.log(data);
}




// window.computeUsersStats = (parametros)=>{

// }
// window.sortUsers = (parametros)=>{

// }
// window.filterUsers = (parametros)=>{

// }
// window.processCohortData = (parametros)=>{

// }