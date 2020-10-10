const weather = document.querySelector(".js-weather");
const todays_weather = document.querySelector(".js-todaysWeather");
const key = 'api_key=q13Hj7l9gVKsPYaaOcENeHrR3ePvwxdUXNSx3uW1&feedtype=json&ver=1.0';
const URL = "https://api.nasa.gov/insight_weather/?";

function fetchMarsWeather() {
fetch(`${URL}${key}`)
.then(function data(response){
    return response.json()
}).then(function data(data){
    weatherData(data)
})
}

let paintWeatherForcast = function(data){
    const explanation = document.createElement("h2")
    explanation.innerText = `Sol ${data[0]}`
    explanation.classList.add("colorText")
    let marsDate = data[1].Last_UTC

    const date = document.createElement("h3")
    date.classList.add("colorText")
    const high_temp = data[1].AT.mx;
    const min_temp = data[1].AT.mn;
    const mxTemp = document.createElement("p")
    const mnTemp = document.createElement("p")
    mars = marsDate.toString().split(/[-:T]/)
    marsDates = mars.slice(1, 3);

    const marsDatee = marsDates.join("/")
    date.innerText = `${marsDatee}`
  
    mxTemp.innerText = (`High: ${high_temp}` > .5) ? "High:" + " " + (Math.ceil(high_temp)) + "°F" :  "High:" + " " +  (Math.floor(high_temp)) + "°F"
    mnTemp.innerText = `${min_temp}` < .5  ? "Low:" + " " + (Math.ceil(min_temp)) + "°F" :  "Low:" + " " +  (Math.floor(min_temp)) + "°F"
    mnTemp.classList.add("temp")
    mxTemp.classList.add("temp")
    const line = document.createElement("div")
    line.classList.add("hl")
    const infoBox = document.createElement("div")
    infoBox.appendChild(explanation)
    infoBox.appendChild(date)
    infoBox.appendChild(line)
    infoBox.appendChild(mxTemp)
    infoBox.appendChild(mnTemp)
    infoBox.classList.add("infoBox")
    weather.appendChild(infoBox)
}

function latestWeather(data){
    console.log(data)
   const date = Object.entries(data)
   const high_temp = date[6][1].AT.mx
   const min_temp = date[6][1].AT.mn
   const mxTemp = document.createElement("p")
   const mnTemp = document.createElement("p")
   mxTemp.innerText = (`High: ${high_temp}` > .5) ? "High:" + " " + (Math.ceil(high_temp)) + "°F" :  "High:" + " " +  (Math.floor(high_temp)) + "°F"
   mnTemp.innerText = `${min_temp}` < .5  ? "Low:" + " " + (Math.ceil(min_temp)) + "°F" :  "Low:" + " " +  (Math.floor(min_temp)) + "°F"
   datey = date[6][0];
   dates = date[6][1].Last_UTC
   const mars = dates.toString().split(/[-:T]/)
   const marsDates = mars.slice(1, 3);
   const marsDatee = marsDates.join("/")
   const dateHeading = document.createElement("h1")
   dateHeading.innerHTML = `${marsDatee}`
   const box = document.createElement("div")
   box.classList.add("colorText");
   dateHeading.classList.add("colorText");
   box.innerText = `Sol ${datey}`
   todays_weather.appendChild(box)
   todays_weather.appendChild(mxTemp)
   todays_weather.appendChild(mnTemp)
   todays_weather.appendChild(dateHeading)
}

function weatherData(data){
    latestWeather(data)
let dataList = Object.entries(data);
console.log(dataList)
dataList.forEach(paintWeatherForcast);
}

function int() {
    fetchMarsWeather()
}

int()