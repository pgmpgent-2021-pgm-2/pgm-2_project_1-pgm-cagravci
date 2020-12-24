function GitHubApi () {
    this.getSearchUsers = async (name) => {

    }
}

function UserApi () {
    this.getUsers = async (callback) => {
        const HOSTNAME = "127.0.0.1";
        const PORT = 5500;
        const USERS_JSON_API = `http://${HOSTNAME}:${PORT}/static/data/pgm.json`;
        fetch(USERS_JSON_API, {})
                .then(response => response.json())
                .then(json => callback(json))
                .catch((error) => console.error(error));
    }    
}

function WeatherApi () {
    console.log('fetching weather has started...')
    this.getCurrentWeather = async (city, callback) => {
        console.log('weather for city is: ', city)
        const WEATHER_API_KEY = 'fca0a22fc9a44098b85132431202412'
        const WEATHER_API = `http://api.weatherapi.com/v1/current.json?key=${WEATHER_API_KEY}&q=${city}`;
        fetch(WEATHER_API, {})
                .then(response => response.json())
                .then(json => callback(json))
                .catch((error) => console.error(error));
    }    
}

function GhentOpenDataApi () {
    this.getCovidPositiveCases = async (callback) => {
        const GHENT_COVID_API = `https://data.stad.gent/api/records/1.0/search/?dataset=dataset-of-cumulative-number-of-confirmed-cases-by-municipality&q=`;
        fetch(GHENT_COVID_API, {})
                .then(response => response.json())
                .then(json => callback(json))
                .catch((error) => console.error(error));
    }    
}