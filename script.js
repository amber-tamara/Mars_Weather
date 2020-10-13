const weather = document.querySelector(".js-weather");
const todays_weather = document.querySelector(".js-todaysWeather");
const key = 'api_key=q13Hj7l9gVKsPYaaOcENeHrR3ePvwxdUXNSx3uW1&feedtype=json&ver=1.0';
const URL = "https://api.nasa.gov/insight_weather/?";

function fetchMarsWeather() {
    fetch(`${URL}${key}`)
        .then(function data(response) {
            return response.json()
        }).then(function data(data) {
            weatherData(data)
        })
}


function weatherData(data) {
    extractMostRecentData(data)
    let dataList = Object.entries(data);
    dataList.forEach(extractWeatherdata);
}

function int() {
    fetchMarsWeather()
}

int()

let extractWeatherdata = function (data) {
    const dateOfWeather = data[1].Last_UTC;
    const high_temp = data[1].AT.mx;
    const min_temp = data[1].AT.mn;
    const weatherDatas = {
        high_temp,
        min_temp,
        dateOfWeather
    }
    console.log('extractWeatherdata', weatherDatas)
    convertFahrenheitToCelcuis(weatherDatas)
    getMonthNameFromDate(weatherDatas)
    console.log(weatherDatas)
    paintWeatherData(weatherDatas)
}

function getMonthNameFromDate(data) {
    const monthNames = ["Jan", "Feb", "March", "April", "May", "June",
        "July", "August", "Sept", "Oct", "Nov", "Dec"
    ];

    const d = new Date(data.dateOfWeather)
    const dateOfWeather = ([d.getDate()] + " " + monthNames[d.getMonth()])
    data.dateOfWeather = dateOfWeather
}

function convertFahrenheitToCelcuis(data) {
    console.log(data)
    const deghighF = data.high_temp;
    const deghighC = (deghighF - 32) * (5 / 9);
    const deglowF = data.min_temp;
    const deglowC = (deglowF - 32) * (5 / 9);
    data.high_temp = deghighC
    data.min_temp = deglowC
    console.log(data)
    return data
}

function paintWeatherData(data) {
    //Creating p element to contain high temperature on Mars.
    const high_temp = data.high_temp
    const mxTemp = document.createElement("p");
    mxTemp.innerText = ((`High: ${high_temp}`) > .5) ? "High:" + " " + (Math.ceil(high_temp)) + "°C" : "High:" + " " + (Math.floor(high_temp)) + "°C";
    mxTemp.classList.add("colorText");

    //Creating p element to contain low temperature on Mars.
    const min_temp = data.min_temp
    const mnTemp = document.createElement("p");
    mnTemp.innerText = `${min_temp}` < .5 ? "Low:" + " " + (Math.ceil(min_temp)) + "°C" : "Low:" + " " + (Math.floor(min_temp)) + "°C";
    mnTemp.classList.add("colorText");

    //Date of weather
    const weatherDate = data.dateOfWeather
    const date = document.createElement("h3");
    date.innerText = `${weatherDate}`;
    date.classList.add("colorText");

    //Line break
    const line = document.createElement("div");
    line.classList.add("hl");

    // Create the div to put the data into
    const div = document.createElement("div")

    //Creating a box to contain the information above
    div.appendChild(date);
    div.appendChild(line);
    div.appendChild(mxTemp);
    div.appendChild(mnTemp);
    div.classList.add("infoBox");

    //Appending infoBox to html DIV
    weather.appendChild(div);
}

function extractMostRecentData(data) {
    const weatherArray = Object.entries(data);

    const dateOfWeather = weatherArray[6][1].Last_UTC;
    const high_temp = weatherArray[6][1].AT.mx;
    const min_temp = weatherArray[6][1].AT.mn;

    const latestWeatherinfo = {
        dateOfWeather,
        high_temp,
        min_temp
    }
    getMonthNameFromDate(latestWeatherinfo)
    console.log('extractMostRecentData', latestWeatherinfo)
    convertFahrenheitToCelcuis(latestWeatherinfo)
    latestWeather(latestWeatherinfo)
}

function latestWeather(data) {
    console.log(data)
    //created div
    const boxOne = document.createElement("div");
    const boxTwo = document.createElement("div");

    //Recent date
    // const dateSplit = weatherDate.toString().split(/[-:T]/);
    // const dateSlice = dateSplit.slice(1, 3);
    // const CurrentDate = dateSlice.join("/");
    const currentDate = data.dateOfWeather
    const date = document.createElement("h2");
    date.innerHTML = `${currentDate}`;
    date.classList.add("textAndLine");

    //Recent Highest Temp
    const highTemp = data.high_temp
    const mxTemp = document.createElement("h3");
    mxTemp.innerText = (`High: ${highTemp}` > .5) ? "High:" + " " + (Math.ceil(highTemp)) + "°F" : "High:" + " " + (Math.floor(highTemp)) + "°F";
    mxTemp.classList.add("paddingMainTemp");

    //Recent Low Temp
    const lowTemp = data.min_temp
    const mnTemp = document.createElement("h3");
    mnTemp.innerText = `${lowTemp}` < .5 ? "Low:" + " " + (Math.ceil(lowTemp)) + "°F" : "Low:" + " " + (Math.floor(lowTemp)) + "°F";
    mnTemp.classList.add("paddingMainTemp");

    //Append Sol and date in div
    boxOne.appendChild(date)
    boxTwo.appendChild(mxTemp)
    boxTwo.appendChild(mnTemp)

    //Append temparatures and date in div

    //Appending infoBox to html DIV
    todays_weather.appendChild(boxOne);
    todays_weather.appendChild(boxTwo);
}