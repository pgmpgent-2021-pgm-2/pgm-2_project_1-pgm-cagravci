function GitHubApi () {
    this.getSearchUsers = async (name) => {

    }
}

function UserApi () {
    this.getUsers = async () => {

    }
}

function WeatherApi () {
    this.getCurrentWeather = async (city) => {
        const WEATHER_API = '';
        fetch(WEATHER_API, {})
                .then(response => response.json())
                .then(json => this.updateCountriesUI(json))
                .catch((error) => console.error(error));
    }
}

function GhentOpenDataApi () {
    this.getCovidPositiveCases = async () => {

    }
}