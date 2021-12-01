const ELEMENT_SEARCH_BUTTON = document.querySelector('button');
const ELEMENT_SEARCHED_CITY = document.querySelector('#city');
const ELEMENT_LOADING_TEXT = document.querySelector('#load');
const ELEMENT_WEATHER_BOX = document.querySelector('#weather');
const ELEMENT_WEATHER_CITY = ELEMENT_WEATHER_BOX.firstElementChild
const ELEMENT_WEATHER_DESCRIPTION = document.querySelector('#weatherDescription');
const ELEMENT_WEATHER_TEMPRATURE = ELEMENT_WEATHER_BOX.lastElementChild
const Api_Key = '87d6686c3a9ab6f2e3921ded8dad436a';


ELEMENT_SEARCH_BUTTON.addEventListener('click',searchWeather);
function searchWeather(){
    const CITY_NAME= ELEMENT_SEARCHED_CITY.value.trim();
    if(CITY_NAME.length == 0 ){
        return alert("please enter a city name");
    }
    const url = 'http://api.openweathermap.org/data/2.5/weather?q='+CITY_NAME+'&appid='+Api_Key;
    fetchData(url).then(response=>{
        Display(response);

    }).catch(error=>alert(error));
}

function fetchData(url){
    console.log(url)
    return new Promise((resolve , reject)=>{
        const http = new XMLHttpRequest();
        http.open('GET', url);
        http.onload = function(){
            if(http.readyState === 4 && http.status ===200 ){
                const response = JSON.parse(http.responseText);
                resolve(response);
            }
            else{
                reject("Some thing worng happened!!!!")
            }
        }
        http.send();
    });

   
}
function Display(response){
    ELEMENT_WEATHER_DESCRIPTION.textContent = response.weather[0].description.toUpperCase();
    ELEMENT_WEATHER_TEMPRATURE.textContent = (response.main.temp * 1.8 +32).toFixed(2)+'F.';
    ELEMENT_WEATHER_CITY.textContent = response.name.toUpperCase();
    ELEMENT_WEATHER_BOX.style.display="block";
}