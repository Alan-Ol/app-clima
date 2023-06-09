const wrapper = document.querySelector(".wrapper"),
inputPart = document.querySelector(".input-part"),
infoTxt = inputPart.querySelector(".info-txt"),
inputField = inputPart.querySelector("input"),
locationBtn = inputPart.querySelector("button"),
weatherPart = wrapper.querySelector(".weather-part"),
wIcon = weatherPart.querySelector("img"),
arrowBack = wrapper.querySelector("header i");

let apiKey = `5f49e47452d0dbe58c102c44846d5a61`
let api;



inputField.addEventListener("keyup", e =>{
    if(e.key == "Enter" && inputField.value != ""){
        requestApi(inputField.value)
    }
})


locationBtn.addEventListener("click", ()=>{
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(onSuccess, onError)
    }else{
        alert("Lo siento, intentelo de nuevo")
    }
})

function onSuccess(position){
    const{latitude, longitude} = position.coords;
    api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`
    fetchData()   
}

function onError(error){
    infoTxt.innerText = error.message;
    infoTxt.classList.add("error")
}
function requestApi(city){
    api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
    fetchData();

}

function fetchData(){
    infoTxt.innerText = "buscando..."
    infoTxt.classList.add("pending")
    fetch(api).then(response => response.json()).then(result => weatherDetails(result));

}

function weatherDetails(info){
    infoTxt.classList.replace("pending", "error")
    if(info.cod == "404"){
        infoTxt.innerText = `${inputField.value} no es una ciudad valida`
    }else{

        const city = info.name;
        const country = info.sys.country;
        const {description, id} = info.weather[0];
        const {feels_like, humidity, temp} = info.main;

        if(id == 800){
            wIcon.src = "./img/clear.svg"
        }else if(id >= 200 && id <= 232){
            wIcon.src = "./img/strom.svg"
        }else if(id >= 600 && id <= 622){
            wIcon.src = "./img/snow.svg"
        }else if(id >= 701 && id <= 781){
            wIcon.src = "./img/haze.svg"
        }else if(id >= 801 && id <= 804){
            wIcon.src = "./img/cloud.svg"
        }else if((id >= 300 && id <= 321) || (id >= 500 && id <= 521))  {
            wIcon.src = "./img/rain.svg"
        }


        wrapper.querySelector(".temp .numb").innerText = Math.floor(temp);
        wrapper.querySelector(".weather").innerText = description;
        wrapper.querySelector(".location span").innerText = `${city}, ${country}`;
        wrapper.querySelector(".temp .numb-2").innerText = Math.floor(feels_like);
        wrapper.querySelector(".humidity span").innerText = `${humidity}%`;

        infoTxt.classList.remove("pending", "error");
        wrapper.classList.add("active");
    }
    console.log(info)
}

arrowBack.addEventListener("click", ()=>{
    wrapper.classList.remove("active");

})