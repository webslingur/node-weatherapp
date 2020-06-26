console.log("this is app.js");

const weatherForm = document.querySelector("form");
weatherForm.addEventListener("submit", event => {
    event.preventDefault();
    const searchLocation = document.getElementById("search-location");
    fetch(`/weather?address=${searchLocation.value}`).then(response => {
        response.json().then(data => {
            const location = document.getElementById("location");
            const weather = document.getElementById("weather");
            if (data["error"]) {
                console.log(data.error);
                weather.innerHTML = data.error;
            } else {
                console.log(data.location);
                console.log(data.forecast);
                location.innerHTML = data.location;
                weather.innerHTML = data.forecast;
            }
        });
    })
})

