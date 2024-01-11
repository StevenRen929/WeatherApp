//need a api key
const apikey = "5d50cb77a4d850371ce5a430e31c9b24";

//using Dom
const weatherDataEl = document.getElementById('weather-data');
const cityInputEl = document.getElementById('city-input');
const formEl = document.querySelector('form');

const getWeatherData = async (cityValue)=>{
    console.log('cityValue',cityValue);
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${apikey}&units=metric`;
    //try catch 配合async 用
    try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Network response was not ok')
        }
        const data = await response.json();
        console.log('data',data)
        const temperature = Math.round(data.main.temp);
        const description = data.weather[0].description;
        const icon = data.weather[0].icon;
        const details = [
            `Feels like: ${Math.round(data.main.feels_like)}`,
            `Humidity: ${data.main.humidity}%`,
            `Wind Speed: ${data.wind.speed} m/s`
        ]

      weatherDataEl.querySelector(
        '.icon'
        ).innerHTML = `<img src ="https://openweathermap.org/img/wn/${icon}.png" alt ="weather icon"/>`
      weatherDataEl.querySelector(
        ".temperature"
      ).textContent = `${temperature}°C`;
      weatherDataEl.querySelector(".description").textContent = description;
      weatherDataEl.querySelector(".details").innerHTML = details.map(detail =>`<div>${detail}</div>`).join("");
    } catch (error) {
        weatherDataEl.querySelector(".icon").innerHTML= "";
        weatherDataEl.querySelector(".temperature").textContent= "";
        weatherDataEl.querySelector(".details").innerHTML= "";
       weatherDataEl.querySelector(".description").innerHTML= "An error occur, please try agian later";

      }
}



formEl.addEventListener('submit',(event)=>{
    event.preventDefault();//防止跳转
    const cityValue = cityInputEl.value; //get the value from user input
    getWeatherData(cityValue);

})

