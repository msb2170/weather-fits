const form = document.querySelector(".top-banner form");
const input = document.querySelector(".top-banner input");
const msg = document.querySelector(".top-banner msg");
const list = document.querySelector(".ajax-section .cities");
const desc = document.querySelector(".fit-rec");



form.addEventListener("submit", (e) => {
    e.preventDefault();
    const inputVal = input.value
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${inputVal}&appid=c6ac1457f388ccda99ace330346b65cc&units=imperial`

    fetch(url)
        .then(response => response.json())
        .then( data => {
            const {main, name, sys, weather} = data
            const icon = `https://openweathermap.org/img/wn/${weather[0]["icon"]}@2x.png`;
            const li = document.createElement("li");
            li.classList.add("city");
            const markup = `
            <h2 class="city-name" data-name=${name}, ${sys.country}:>
            <span>${name}</span>
            <sup>${sys.country}</sup>
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
            if (main.temp <= 0) {
            desc.innerHTML = `<h1>You Should Wear...</h1>
            <h3>A thick coat, gloves, a hat, and warm pants</h3>`
        } else if (main.temp > 0 && main.temp <= 32) {
            desc.innerHTML = `<h1>You Should Wear...</h1>
            <h3>A warm coat, gloves and a hat</h3>`
        } else if (main.temp > 32 && main.temp <= 50) {
            desc.innerHTML = `<h1>You Should Wear...</h1>
            <h3>A warm coat</h3>`
        } else if (main.temp > 50 && main.temp <= 70) {
            desc.innerHTML = `<h1>You Should Wear...</h1>
            <h3>A light jacket</h3>`
        } else if (main.temp > 70 && main.temp <= 90) {
            desc.innerHTML = `<h1>You Should Wear...</h1>
            <h3>shorts and a t-shirt</h3>`
        } else {
            desc.innerHTML = `<h1>You Should Wear...</h1>
            <h3>nothing, if you can get away with it</h3>`
        }
        })
        .catch((err) => {
            msg.textContent(err)
        })
});

