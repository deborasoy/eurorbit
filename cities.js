document.addEventListener("DOMContentLoaded",getCities());
//get cities from JSON and api calls
async function getCities(){
     const response = await fetch("./cities.json");
      if(!response.ok) throw new Error (`${response.status}`);
       const data = await response.json();
       showCitiesInfo(data)
};

function showCitiesInfo(object){
    const div = document.getElementById("cardsCities");
    //template cities
    let template =``;
    for (let index = 0; index < object.length; index++) {
        const element = object[index];
        const {nombre, descripcion, actividades, enlace} = element
        template += `
        <article>
         <h3> ${nombre} </h3>
         <p>What to do in ${nombre}? In addition to what your mind allows you to dream of, ${actividades}</p>
         <p><i class="fa fa-quote-left fa-2x fa-pull-left fa-border"></i>${descripcion}<span>&#8221;</span></p>
         <p>This beautiful and captivating description belongs to <a href=" ${enlace}" target="_blank">www.tripadvisor.com</a> 
         Visit it and get help to get the most out of your visit to the city.</p>
        </article>
        `;
    }
    div.innerHTML += template;
};