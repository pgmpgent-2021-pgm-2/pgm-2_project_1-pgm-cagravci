void (() => {
    const app = {
        initialize (){
            this.cacheElements();
            //fetch API data for covid cases
            this.fetchGhentCovidPositiveCases();
            //fetch API data for weather in city
            this.fetchWeather();
            //fetch API data for users
            this.fetchUsers();
        
            this.registerListeners();
        },
        cacheElements () {

        },
        registerListeners () {

        },
        async fetchUsers() {
            let pgmUsers = new UserApi();
            pgmUsers.getUsers(users => {
                console.log('pgm users are fetched: ', users);
                this.updatePGMUsers(users);
            });
        },
        updatePGMUsers(users) {
            console.log('updating the pgm users has started...')
           for (const key in users) {
               console.log(users[key])
           }

        },
        async fetchGhentCovidPositiveCases() {
            let covidData = new GhentOpenDataApi();
            covidData.getCovidPositiveCases(covidCases => {
                console.log('covid cases are fetched: ', covidCases)
                this.updateGhentCovidPositiveCases(covidCases)
            })
        },
        updateGhentCovidPositiveCases(covidCases) {
            console.log('updating the cases has started...')

            document.querySelector('.nav__items').innerHTML += `
            <li class="nav__item">
                ${covidCases.records[0].fields.cases}
            </li>`
        },
        async fetchWeather () {
            let weather = new WeatherApi();
            weather.getCurrentWeather('ghent', weather => {
                console.log('weather is fetched: ', weather)
                this.updateWeather(weather);
            })
        },
        updateWeather (weather) {
            console.log('updating the weather on page has started...')
            document.querySelector('.nav__items').innerHTML += `
            <li class="nav__item">
                ${weather.location.name}
            </li>
            <li class="nav__item">
                ${weather.current.condition.text}
            </li>
            <li class="nav__item">
                <img src="${weather.current.condition.icon}" alt="weather-icon">
            </li>
            <li class="nav__item">
                ${weather.current.temp_c}°C
            </li>`
            
        }
    }
    app.initialize();
})();