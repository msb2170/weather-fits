const form = document.querySelector(".top-banner form");
const input = document.querySelector(".top-banner input");
const msg = document.querySelector(".top-banner msg");
const list = document.querySelector(".ajax-section .cities");
const desc = document.querySelector(".fit-rec");


function clothingLogic(data) {
    const {main} = data;
    if (main.temp <= 0) 
            //clothes recommendation logic
            desc.innerHTML = `<h1>You Should Wear...</h1>
            <h3>A thick coat, gloves, a hat, and warm pants</h3>`;
            if (main.temp > 0 && main.temp <= 32) 
            desc.innerHTML = `<h1>You Should Wear...</h1>
            <h3>A warm coat, gloves and a hat</h3>`;
            if (main.temp > 32 && main.temp <= 50) 
            desc.innerHTML = `<h1>You Should Wear...</h1>
            <h3>A warm coat</h3>`;
            if (main.temp > 50 && main.temp <= 70) 
            desc.innerHTML = `<h1>You Should Wear...</h1>
            <h3>A light jacket</h3>`;
            if (main.temp > 70 && main.temp <= 90) 
            desc.innerHTML = `<h1>You Should Wear...</h1>
            <h3>shorts and a t-shirt</h3>`;
            if (main.temp > 90)
            desc.innerHTML = `<h1>You Should Wear...</h1>
            <h3>nothing, if you can get away with it</h3>`
}

function weatherLogic(data) {
    const {main, name, sys, weather} = data
    const icon = `https://openweathermap.org/img/wn/${weather[0]["icon"]}@2x.png`;
            const li = document.createElement("li");
            li.classList.add("city");
            li.setAttribute('id', Date())
            const markup = `
            <h2 class="city-name" data-name=${name}, ${sys.country}:>
            <span>${name}</span>
            <sup>${sys.country}</sup>
            <span class="x-button"><h6>X</h6></span>
            </h2>
            <div class="city-temp">${Math.round(main.temp)}<sup>°F</sup>
            </div>
            <figure>
                <img class="city-icon" src=${icon} alt=${weather[0]["main"]}
                <figcaption>${weather[0]["description"]}</figcaption>
            </figure>
            `;
            li.innerHTML = markup
            list.appendChild(li)
            li.addEventListener("click", () => {
                clothingLogic(data)
            })
            const xBtn = li.querySelector(".x-button");
            xBtn.addEventListener("click", (e) => {
                const element = e.currentTarget.parentElement.parentElement;
                element.remove();
            });
            
}



form.addEventListener("submit", (e) => {
    e.preventDefault();
    const inputVal = input.value
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${inputVal}&appid=&units=imperial`

    fetch(url)
        .then((response) => {
            return response.json()
        }) 
        .then( data => {
            clothingLogic(data)
            weatherLogic(data)
            input.value = '';
        }
        )
        .catch((err) => {
            alert('Please enter a valid city');
            console.log(err);
            input.value = '';
        })
        
});

form.addEventListener("reset", () => {
    desc.innerHTML = ``;
    list.innerHTML = ``;
});
