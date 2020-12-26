function GitHubApi () {
    this.getReposOfUser = async (username, callback) => {
        const GITHUB_API_REPOS = `https://api.github.com/users/${username}/repos?page=1&per_page=50`;
        fetch(GITHUB_API_REPOS, {})
                .then(response => response.json())
                .then(json => callback(json))
                .catch((error) => console.error(error));
    } 
    this.getFollowersOfUser = async (username, callback) => {
        const GITHUB_API_FOLLOWERS = `https://api.github.com/users/${username}/followers?page=1&per_page=100`;
        fetch(GITHUB_API_FOLLOWERS, {})
                .then(response => response.json())
                .then(json => callback(json))
                .catch((error) => console.error(error));
    } 
    this.getSearchUsers = async (name, callback) => {
        const GITHUB_API_USERS = `https://api.github.com/search/users?sort=desc&page=1&per_page=100&q=${name}`;
        fetch(GITHUB_API_USERS, {})
                .then(response => response.json())
                .then(json => callback(json))
                .catch((error) => console.error(error));
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