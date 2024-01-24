//called the api for each city obtains weather details and images by weather type
document.addEventListener("DOMContentLoaded",getCities());
//get cities from JSON and api calls
async function getCities(){
     const response = await fetch("./cities.json");
      if(!response.ok) throw new Error (`${response.status}`);
       const data = await response.json();
       selectCityShowWeather(data)
};
//Get weather information from the 7timer API! for seven days, parameter: civillight, latitude, longitude
async function getWeatherInfo(object){
    const response = await fetch(`http://www.7timer.info/bin/api.pl?lon=${object.longitud}&lat=${object.latitud}&product=civillight&output=json`);
    if(!response.ok) throw new Error(`${response.status}`);
    const data = await response.json();
    const {dataseries}= data;
    object.pronosticoInfo = dataseries; 
    //add the data as a value to the property of the city object
};
async function getWeatherImg(object){
    const response = await fetch(`http://www.7timer.info/bin/civillight.php?lon=${object.longitud}&lat=${object.latitud}&ac=0&lang=en&unit=metric&output=internal&tzshift=0`);
    if(!response.ok) throw new Error(`${response.status}`);
    const data = await response.blob();
    const objectURL = URL.createObjectURL(data)
    object.pronosticoImg = objectURL; 
    //adds as a value the url created with the object that comes from the api to the property of the city object
};
//show the weather for the next seven days in the best twenty cities in Europe
 function showPronostico(object){
    const div = document.getElementById("container");
    const containerImg = document.getElementById("containerImg");
    //template to show the weather according to the city
    let template =`
    <div class="col-12 m-1">
     <h2 class="h2" > ${object.nombre} </h2>
     <img class="imgWeather" src="${object.pronosticoImg}" alt="ayuda visual del pronostico">
    </div>
    `;
    const forecast = object.pronosticoInfo
    for (let index = 0; index < forecast.length; index++) {
        const element = forecast[index];
        const {date, weather, temp2m} = element;
        template += `
        <div class="card m-2 col-lg-2" style="max-width:7rem">
            <div class="card-header">${date}</div>
            <div >
              <p >Weather ${weather} </p>
              <p > temp max ${temp2m.max}</p>
              <p >  temp min ${temp2m.min}</p>
           </div>
        </div>
        `
    }
    div.innerHTML = template;
};
//function with events according to user choice
 function selectCityShowWeather(array){
    const select = document.getElementById("cities");

    select.addEventListener("change", async ()=>{ 
        for (let index = 0; index < array.length; index++) {
            const element = array[index];
            if( element.nombre === select.value){ 
                document.getElementById("container").innerHTML = `<i class="fa fa-spinner fa-pulse fa-5x" style="padding: 4rem;"></i>`
                //load the content of the selected city
                 await getWeatherInfo(element)
                 await getWeatherImg(element)
                showPronostico(element) //shows the weather of the required city
            }
        }
    });
};
