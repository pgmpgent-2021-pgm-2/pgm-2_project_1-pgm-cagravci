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
            let $pgmTeamList = document.querySelectorAll('.pgm-persons__item')
            $pgmTeamList.forEach(item => {
                item.addEventListener('click', event => {
                    this.updateUserDetails(item)
                })             
            });
        },
        updateUserDetails (item) {
            console.log('the following user is selected: ', item.id)
            console.log('updating user detail is started...')
            //find the user in our json file
            let str = '';
            for (const key in this.users) {
                let user = this.users[key];
                if (user.portfolio['GitHub gebruikersnaam'] === item.id) {
                    str = `
                    <img src="${user.thumbnail}"
                    alt="">
                <p class="person__fname">${user.voornaam} ${user.familienaam}</p>
                <p class="person__student">${(user.isStudentboolean) ? 'student' : 'docent'}</p>
                <p class="person__slogan">${user.lijfspreuk}</p>`
                }
                document.querySelector('.person__header').innerHTML = str;
            }

            //update the details of the selected person
            this.fetchDetailsOfUser(item.id); //fetch repos -- followers...


        },
        async fetchDetailsOfUser(username) {
            let userDetail = new GitHubApi();
            //get repo of the selected github username
            userDetail.getReposOfUser(username, repos => {
                console.log('the repos are fetched: ', repos)
                this.updateUserRepos(repos);
            })
            //get followers of the selected github username
            userDetail.getFollowersOfUser(username, followers => {
                console.log('the followers are fetched: ', followers)
                this.updateUserFollowers(followers);
            })
        },
        updateUserRepos(repos) {
            console.log('updating user repos has started...')
            console.log('example of a repo: ', repos[0])

            let str = '';
            for (const key in repos) {
                let repo = repos[key]
                str += `
                <li class="person__repos__item">
                    <div class="person__repos__name">
                        <a href="${repo.clone_url} target="_blank"">
                            <h3>${repo.full_name}</h3>
                        </a>
                    </div>
                    <div class="person__repos__description">
                        <p>${repo.name}</p>
                    </div>
                    <ul class="person__repos__details">
                        <li>
                            <svg enable-background="new 0 0 24 24" height="512" viewBox="0 0 24 24" width="512" xmlns="http://www.w3.org/2000/svg"><path d="m12 .5c-6.63 0-12 5.28-12 11.792 0 5.211 3.438 9.63 8.205 11.188.6.111.82-.254.82-.567 0-.28-.01-1.022-.015-2.005-3.338.711-4.042-1.582-4.042-1.582-.546-1.361-1.335-1.725-1.335-1.725-1.087-.731.084-.716.084-.716 1.205.082 1.838 1.215 1.838 1.215 1.07 1.803 2.809 1.282 3.495.981.108-.763.417-1.282.76-1.577-2.665-.295-5.466-1.309-5.466-5.827 0-1.287.465-2.339 1.235-3.164-.135-.298-.54-1.497.105-3.121 0 0 1.005-.316 3.3 1.209.96-.262 1.98-.392 3-.398 1.02.006 2.04.136 3 .398 2.28-1.525 3.285-1.209 3.285-1.209.645 1.624.24 2.823.12 3.121.765.825 1.23 1.877 1.23 3.164 0 4.53-2.805 5.527-5.475 5.817.42.354.81 1.077.81 2.182 0 1.578-.015 2.846-.015 3.229 0 .309.21.678.825.56 4.801-1.548 8.236-5.97 8.236-11.173 0-6.512-5.373-11.792-12-11.792z"/></svg>
                            <p>${repo.size} KB</p>
                        </li>
                        <li>
                            <svg enable-background="new 0 0 24 24" height="512" viewBox="0 0 24 24" width="512" xmlns="http://www.w3.org/2000/svg"><path d="m12 .5c-6.63 0-12 5.28-12 11.792 0 5.211 3.438 9.63 8.205 11.188.6.111.82-.254.82-.567 0-.28-.01-1.022-.015-2.005-3.338.711-4.042-1.582-4.042-1.582-.546-1.361-1.335-1.725-1.335-1.725-1.087-.731.084-.716.084-.716 1.205.082 1.838 1.215 1.838 1.215 1.07 1.803 2.809 1.282 3.495.981.108-.763.417-1.282.76-1.577-2.665-.295-5.466-1.309-5.466-5.827 0-1.287.465-2.339 1.235-3.164-.135-.298-.54-1.497.105-3.121 0 0 1.005-.316 3.3 1.209.96-.262 1.98-.392 3-.398 1.02.006 2.04.136 3 .398 2.28-1.525 3.285-1.209 3.285-1.209.645 1.624.24 2.823.12 3.121.765.825 1.23 1.877 1.23 3.164 0 4.53-2.805 5.527-5.475 5.817.42.354.81 1.077.81 2.182 0 1.578-.015 2.846-.015 3.229 0 .309.21.678.825.56 4.801-1.548 8.236-5.97 8.236-11.173 0-6.512-5.373-11.792-12-11.792z"/></svg>
                            <p>${repo.default_branch}</p>
                        </li>
                        <li>
                            <svg enable-background="new 0 0 24 24" height="512" viewBox="0 0 24 24" width="512" xmlns="http://www.w3.org/2000/svg"><path d="m12 .5c-6.63 0-12 5.28-12 11.792 0 5.211 3.438 9.63 8.205 11.188.6.111.82-.254.82-.567 0-.28-.01-1.022-.015-2.005-3.338.711-4.042-1.582-4.042-1.582-.546-1.361-1.335-1.725-1.335-1.725-1.087-.731.084-.716.084-.716 1.205.082 1.838 1.215 1.838 1.215 1.07 1.803 2.809 1.282 3.495.981.108-.763.417-1.282.76-1.577-2.665-.295-5.466-1.309-5.466-5.827 0-1.287.465-2.339 1.235-3.164-.135-.298-.54-1.497.105-3.121 0 0 1.005-.316 3.3 1.209.96-.262 1.98-.392 3-.398 1.02.006 2.04.136 3 .398 2.28-1.525 3.285-1.209 3.285-1.209.645 1.624.24 2.823.12 3.121.765.825 1.23 1.877 1.23 3.164 0 4.53-2.805 5.527-5.475 5.817.42.354.81 1.077.81 2.182 0 1.578-.015 2.846-.015 3.229 0 .309.21.678.825.56 4.801-1.548 8.236-5.97 8.236-11.173 0-6.512-5.373-11.792-12-11.792z"/></svg>
                            <p>${repo.license !== null ? repo.license.key : 'no license'}</p>
                        </li>
                        <li>
                            <svg enable-background="new 0 0 24 24" height="512" viewBox="0 0 24 24" width="512" xmlns="http://www.w3.org/2000/svg"><path d="m12 .5c-6.63 0-12 5.28-12 11.792 0 5.211 3.438 9.63 8.205 11.188.6.111.82-.254.82-.567 0-.28-.01-1.022-.015-2.005-3.338.711-4.042-1.582-4.042-1.582-.546-1.361-1.335-1.725-1.335-1.725-1.087-.731.084-.716.084-.716 1.205.082 1.838 1.215 1.838 1.215 1.07 1.803 2.809 1.282 3.495.981.108-.763.417-1.282.76-1.577-2.665-.295-5.466-1.309-5.466-5.827 0-1.287.465-2.339 1.235-3.164-.135-.298-.54-1.497.105-3.121 0 0 1.005-.316 3.3 1.209.96-.262 1.98-.392 3-.398 1.02.006 2.04.136 3 .398 2.28-1.525 3.285-1.209 3.285-1.209.645 1.624.24 2.823.12 3.121.765.825 1.23 1.877 1.23 3.164 0 4.53-2.805 5.527-5.475 5.817.42.354.81 1.077.81 2.182 0 1.578-.015 2.846-.015 3.229 0 .309.21.678.825.56 4.801-1.548 8.236-5.97 8.236-11.173 0-6.512-5.373-11.792-12-11.792z"/></svg>
                            <p>${repo.private ? 'private' : 'public'}</p>
                        </li>
                        <li>
                            <svg enable-background="new 0 0 24 24" height="512" viewBox="0 0 24 24" width="512" xmlns="http://www.w3.org/2000/svg"><path d="m12 .5c-6.63 0-12 5.28-12 11.792 0 5.211 3.438 9.63 8.205 11.188.6.111.82-.254.82-.567 0-.28-.01-1.022-.015-2.005-3.338.711-4.042-1.582-4.042-1.582-.546-1.361-1.335-1.725-1.335-1.725-1.087-.731.084-.716.084-.716 1.205.082 1.838 1.215 1.838 1.215 1.07 1.803 2.809 1.282 3.495.981.108-.763.417-1.282.76-1.577-2.665-.295-5.466-1.309-5.466-5.827 0-1.287.465-2.339 1.235-3.164-.135-.298-.54-1.497.105-3.121 0 0 1.005-.316 3.3 1.209.96-.262 1.98-.392 3-.398 1.02.006 2.04.136 3 .398 2.28-1.525 3.285-1.209 3.285-1.209.645 1.624.24 2.823.12 3.121.765.825 1.23 1.877 1.23 3.164 0 4.53-2.805 5.527-5.475 5.817.42.354.81 1.077.81 2.182 0 1.578-.015 2.846-.015 3.229 0 .309.21.678.825.56 4.801-1.548 8.236-5.97 8.236-11.173 0-6.512-5.373-11.792-12-11.792z"/></svg>
                            <p>${repo.forks_count}</p>
                        </li>
                        <li>
                            <svg enable-background="new 0 0 24 24" height="512" viewBox="0 0 24 24" width="512" xmlns="http://www.w3.org/2000/svg"><path d="m12 .5c-6.63 0-12 5.28-12 11.792 0 5.211 3.438 9.63 8.205 11.188.6.111.82-.254.82-.567 0-.28-.01-1.022-.015-2.005-3.338.711-4.042-1.582-4.042-1.582-.546-1.361-1.335-1.725-1.335-1.725-1.087-.731.084-.716.084-.716 1.205.082 1.838 1.215 1.838 1.215 1.07 1.803 2.809 1.282 3.495.981.108-.763.417-1.282.76-1.577-2.665-.295-5.466-1.309-5.466-5.827 0-1.287.465-2.339 1.235-3.164-.135-.298-.54-1.497.105-3.121 0 0 1.005-.316 3.3 1.209.96-.262 1.98-.392 3-.398 1.02.006 2.04.136 3 .398 2.28-1.525 3.285-1.209 3.285-1.209.645 1.624.24 2.823.12 3.121.765.825 1.23 1.877 1.23 3.164 0 4.53-2.805 5.527-5.475 5.817.42.354.81 1.077.81 2.182 0 1.578-.015 2.846-.015 3.229 0 .309.21.678.825.56 4.801-1.548 8.236-5.97 8.236-11.173 0-6.512-5.373-11.792-12-11.792z"/></svg>
                            <p>${repo.open_issues_count}</p>
                        </li>
                        <li>
                            <svg enable-background="new 0 0 24 24" height="512" viewBox="0 0 24 24" width="512" xmlns="http://www.w3.org/2000/svg"><path d="m12 .5c-6.63 0-12 5.28-12 11.792 0 5.211 3.438 9.63 8.205 11.188.6.111.82-.254.82-.567 0-.28-.01-1.022-.015-2.005-3.338.711-4.042-1.582-4.042-1.582-.546-1.361-1.335-1.725-1.335-1.725-1.087-.731.084-.716.084-.716 1.205.082 1.838 1.215 1.838 1.215 1.07 1.803 2.809 1.282 3.495.981.108-.763.417-1.282.76-1.577-2.665-.295-5.466-1.309-5.466-5.827 0-1.287.465-2.339 1.235-3.164-.135-.298-.54-1.497.105-3.121 0 0 1.005-.316 3.3 1.209.96-.262 1.98-.392 3-.398 1.02.006 2.04.136 3 .398 2.28-1.525 3.285-1.209 3.285-1.209.645 1.624.24 2.823.12 3.121.765.825 1.23 1.877 1.23 3.164 0 4.53-2.805 5.527-5.475 5.817.42.354.81 1.077.81 2.182 0 1.578-.015 2.846-.015 3.229 0 .309.21.678.825.56 4.801-1.548 8.236-5.97 8.236-11.173 0-6.512-5.373-11.792-12-11.792z"/></svg>
                            <p>${repo.watchers}</p>
                        </li>
                    </ul>
                </li>`
            }
            document.querySelector('.person__repos__list').innerHTML = str;
        },
        updateUserFollowers(followers) {
            console.log('updating user followers has started...')
            console.log('example of a follower: ', followers[0])

            let str = '';
            if (followers.length >= 1) {
                for (const key in followers) {
                                let follow = followers[key]
                                str += `
                                        <li class="person__followers__item">
                                            <img src="${follow.avatar_url}" alt="">
                                            <p>${follow.login}</p>
                                        </li>`
                            }
                           
            } else {
                str = `
                <h2>Geen volgers!</2>`
            }
             document.querySelector('.person__followers__list').innerHTML = str;
        },
        async fetchUsers() {
            let pgmUsers = new UserApi();
            pgmUsers.getUsers(users => {
                console.log('pgm users are fetched: ', users);
                this.users = users;
                this.updatePGMUsers(users);
                this.registerListeners();
            });
        },
        updatePGMUsers(users) {
            console.log('updating the pgm users has started...')
            let str = '';
           for (const key in users) {
               let user = users[key];
               str += `
               <li class="">
               <a class="pgm-persons__item" href="#" id="${user.portfolio['GitHub gebruikersnaam']}">
                    <div class="pgm-persons__img">
                            <img src="${user.thumbnail}" alt="">
                    </div>
                    <div class="pgm-persons__sname">
                        <h4>${user.portfolio['GitHub gebruikersnaam']}</h4>
                    </div>
                    <div class="pgm-persons__fname">
                        <p>${user.voornaam} ${user.familienaam}</p>
                    </div>
                </a>
                </li>`
           }

           document.querySelector('.pgm-persons__list').innerHTML = str;

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