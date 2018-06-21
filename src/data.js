var cohort = new XMLHttpRequest();
cohort.open("GET", "../data/cohorts.json");
cohort.onload = function () {
    if (cohort.status >= 200 && cohort.status < 400) {
      var datacohort = JSON.parse(cohort.responseText);
      console.log(datacohort);
      //  recorrerProgress(dataProgress);
    } else {
    }};
cohort.send
// console.log(cohort);


// window.computeUsersStats = (parametros)=>{

// }
// window.sortUsers = (parametros)=>{

// }
// window.filterUsers = (parametros)=>{

// }
// window.processCohortData = (parametros)=>{

// }