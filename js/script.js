const apiKey = "34dd9b48f6b5de5af09a0c316933546d";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&lang=pt_br&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

const weatherBox = document.querySelector(".weather-box");
const errorIcon = document.querySelector(".error-icon");
const details = document.querySelector(".details");
const card = document.querySelector(".card");

// ALERTA
const divMessage = document.querySelector('.alert');
msg = "Insira uma cidade!"

function ativar(msg) {
    const message = document.createElement("div");
    message.classList.add("message");
    message.innerText = msg;
    divMessage.appendChild(message);
  
    setTimeout(() => {
      message.style.display = "none";
    }, 4000);
}

async function checkWeather(city) {
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

    if (response.status == 404) {
        card.style.height = '400px';
        weatherBox.style.display = "none";
        details.style.display = "none"
        errorIcon.style.display = "block";
        errorIcon.classList.add('fadeIn');
    } else {
        var data = await response.json();

        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + " Km/h";

        if (data.weather[0].main == "Clouds") {
            weatherIcon.src = "img/clouds.png";
        } else if (data.weather[0].main == "Clear") {
            weatherIcon.src = "img/clear.png";
        } else if (data.weather[0].main == "Rain") {
            weatherIcon.src = "img/rain.png";
        } else if (data.weather[0].main == "Drizzle") {
            weatherIcon.src = "img/drizzle.png";
        } else if (data.weather[0].main == "Mist") {
            weatherIcon.src = "img/mist.png";
        } else if (data.weather[0].main == "Snow") {
            weatherIcon.src = "img/snow.png";
        }

        errorIcon.style.display = "none";
        errorIcon.classList.remove('fadeIn');
        weatherBox.style.display = "block";
        details.style.display = "flex";

        weatherBox.style.display = '';
        details.style.display = '';
        weatherBox.classList.add('fadeIn');
        details.classList.add('fadeIn');
        card.style.height = '600px';
    }
}

searchBtn.addEventListener("click", ()=>{
    if (searchBox.value.length < 1) {
        ativar(msg);
        weatherBox.style.display = "none";
        errorIcon.style.display = "none";
        details.style.display = "none";
        card.style.height = '105px';
    } else {
        checkWeather(searchBox.value);
    }
})

document.addEventListener("keypress", function(e) {
    if (e.key === "Enter") {
        searchBtn.click();
    }
})