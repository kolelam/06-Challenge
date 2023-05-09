// my api key
var APIKey = "ed01e1ba14862e6e261cf365a5ee76f1"
// search button info
var searchInput = document.getElementById("searchvalue");
var searchButton = document.getElementById("searchbtn");
var searchHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];
if (!searchHistory) {
    searchHistory = [];
}
// this function renders the recent search from local storage
function renderHistoryButtons() {
    while (historyButtons.firstChild) {
        historyButtons.removeChild(historyButtons.firstChild);
    }
    searchHistory.forEach(function(city) {
        var button = document.createElement('button');
        button.classList.add('cityButton');
        button.textContent = city;
        button.dataset.city = city;
        historyButtons.appendChild(button);
    });
}
renderHistoryButtons();
// this function starts when the search button is clicked
searchButton.addEventListener("click", function(event){
    var city = searchInput.value;
    // my custom URLs, one for the weather, and week forecast, each with user input cites, and my APIKey
    var weatherurl = ("https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey + "&units=imperial")
    var forecastUrl = ("https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + APIKey + "&units=imperial")
    event.preventDefault()
    // fetching first API
    fetch(weatherurl)
    .then(response => response.json())
    .then(data => {
      console.log(data)
        var cityNameEl= document.getElementById("cityName")
        cityNameEl.innerHTML= (data.name)
        var cityDataCardEl= document.getElementById("cityDataCard")
        cityDataCardEl.innerHTML= ("Weather: " + data.weather[0].description)
        var cityDataCardTemp= document.getElementById("cityDataCardTemp")
        cityDataCardTemp.innerHTML= ("Temp: " + data.main.temp + "°F")
        var cityDataCardHumid= document.getElementById("cityDataCardHumid")
        cityDataCardHumid.innerHTML = ("Humidity: " + data.main.humidity)
        var cityDataCardWind= document.getElementById("cityDataCardWind")
        cityDataCardWind.innerHTML = ("Wind: " + data.wind.speed + "mph")
    })
    .catch(error => {
      console.log(error)
    });
    // fetching second API
    fetch(forecastUrl)
    .then(response => response.json())
    .then(data => {
        console.log(data)
        // day one (today)
        var dayOneDate = document.getElementById("dayOneDate")
        var dayOneWeather = document.getElementById("dayOneWeather")
        var dayOneLow = document.getElementById("dayOneLow")
        var dayOneHigh = document.getElementById("dayOneHigh")

        // using Day.js for correct dates
        dayOneDate.innerHTML = dayjs().format('MMMM-D-YYYY')
        dayOneWeather.innerHTML = (data.list[0].weather[0].main)
        dayOneLow.innerHTML = ("Low: " + data.list[0].main.temp_min + "°F")
        dayOneHigh.innerHTML = ("High: " + data.list[0].main.temp_max + "°F")

        // day two (tomorrow)
        var dayTwoDate = document.getElementById("dayTwoDate")
        var dayTwoWeather = document.getElementById("dayTwoWeather")
        var dayTwoLow = document.getElementById("dayTwoLow")
        var dayTwoHigh = document.getElementById("dayTwoHigh")

        dayTwoDate.innerHTML = dayjs().add(1, 'day').format('MMMM-D-YYYY')
        dayTwoWeather.innerHTML = (data.list[1].weather[0].main)
        dayTwoLow.innerHTML = ("Low: " + data.list[1].main.temp_min + "°F")
        dayTwoHigh.innerHTML = ("High: " + data.list[1].main.temp_max + "°F")

        // day three
        var dayThreeDate = document.getElementById("dayThreeDate")
        var dayThreeWeather = document.getElementById("dayThreeWeather")
        var dayThreeLow = document.getElementById("dayThreeLow")
        var dayThreeHigh = document.getElementById("dayThreeHigh")

        dayThreeDate.innerHTML = dayjs().add(2, 'day').format('MMMM-D-YYYY')
        dayThreeWeather.innerHTML = (data.list[2].weather[0].main)
        dayThreeLow.innerHTML = ("Low: " + data.list[2].main.temp_min + "°F")
        dayThreeHigh.innerHTML = ("High: " + data.list[2].main.temp_max + "°F")

        // day four
        var dayFourDate = document.getElementById("dayFourDate")
        var dayFourWeather = document.getElementById("dayFourWeather")
        var dayFourLow = document.getElementById("dayFourLow")
        var dayFourHigh = document.getElementById("dayFourHigh")

        dayFourDate.innerHTML = dayjs().add(3, 'day').format('MMMM-D-YYYY')
        dayFourWeather.innerHTML = (data.list[3].weather[0].main)
        dayFourLow.innerHTML = ("Low: " + data.list[3].main.temp_min + "°F")
        dayFourHigh.innerHTML = ("High: " + data.list[3].main.temp_max + "°F")

        // day five
        var dayFiveDate = document.getElementById("dayFiveDate")
        var dayFiveWeather = document.getElementById("dayFiveWeather")
        var dayFiveLow = document.getElementById("dayFiveLow")
        var dayFiveHigh = document.getElementById("dayFiveHigh")

        dayFiveDate.innerHTML = dayjs().add(4, 'day').format('MMMM-D-YYYY')
        dayFiveWeather.innerHTML = (data.list[4].weather[0].main)
        dayFiveLow.innerHTML = ("Low: " + data.list[4].main.temp_min + "°F")
        dayFiveHigh.innerHTML = ("High: " + data.list[4].main.temp_max + "°F")
     })
    .catch(error => {
      console.log(error)
    });


    // Search History settings
    var historyButtons = document.getElementById('historyButtons');
    var maxHistoryEntries = 5;
    searchButton.addEventListener('click', function() {
        var city = searchInput.value.trim();
        if (city) {
            searchHistory.unshift(city);
            if (searchHistory.length > maxHistoryEntries) {
                searchHistory.pop();
            }
            localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
            searchInput.value = '';
            renderHistoryButtons();
        }
    });
    historyButtons.addEventListener('click', function(event) {
        var button = event.target.closest('.cityButton');
        if (button) {
            searchInput.value = button.dataset.city;
        }
    });
});