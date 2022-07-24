//We'll be using API from TMDB site from which we'll extract data and display it to the user as per the user's request.
const API_KEY = 'api_key=1cf50e6248dc270629e802686245c2c8';
const BASE_URL = 'https://api.themoviedb.org/3';
const API_URL = BASE_URL + '/discover/movie?sort_by=popularity.desc&' + API_KEY;
//We get this part of img URL from the documentation of the TMDB bcuz URL in the poster-path of API contains the remaining part of this URL:
const IMG_URL = 'https://image.tmdb.org/t/p/w500';
//We'll also create search URL from TMDB DOCUMENTATION:
const searchURL = BASE_URL + '/search/movie?' + API_KEY;

//Selecting elements from the DOM:
const main = document.querySelector("main");
const form = document.querySelector("form");


//This function fetches data from the API:
function getMovies(url) {
    //Pass the URL into the fetch:
    fetch(url)
        //Return JSON:
        .then(res => res.json())
        //After whatever [(data) => represents entire data which is stored in the URL]  I get I'll see in the console here:  
        .then(data => {
            console.log(data.results);
            showMovies(data.results);
        })
}


getMovies(API_URL);


// This function highlights what to display on the web page:
function showMovies(data) {
    main.innerHTML = "";
    data.forEach(movie => {
        //We want these things from our API to be displayed on the web page for each image:
        const { title, overview, poster_path, vote_average } = movie;
        const movie1 = document.createElement("div");
        movie1.classList.add("movie");
        //IMG SRC = IMG_UR; + POSTER_PATH:
        movie1.innerHTML = `
        <img src="${IMG_URL + poster_path}" alt="${title}">

            <div class="movie-info">
                <h3>${title}</h3>
                <span class="${getColor(vote_average)}">
                    <p>${vote_average}</p>
                </span>
            </div>

            <div class="overview">
              ${overview}
            </div>
        `
        main.append(movie1);
    })
}

//This function will define each rating of a movie by its color:
function getColor(vote) {
    if (vote >= 8) {
        return "green";
    } else if (vote >= 5) {
        return "orange"
    }
    else {
        return "red"
    }
}

//Now we'll link everything with the input i.e. whatever the user requests for, we'll only display that content:
//We select the button & fired a click event, also disabled the browser default behavior:
form.addEventListener("submit", function (event) {
    //Defaultbehavior of the browser is that whenever I click the the button, the browser automatically submit the form and refresh the page.
    //We don't want refreshing the page so we add event.preventDefault():
    event.preventDefault();
    //I tried first of all selecting input element by queryselector and creating its const but that doesn't work somehow. It only works this way if we r adding it with .value:
    const searchTerm = document.getElementById("search").value;
    //if user types a search term then we'll display data from API only:
    if (searchTerm) {
        getMovies(searchURL + '&query=' + searchTerm)
    } else {
        getMovies(API_URL);
    }
})

//For the popup:
const button = document.querySelector(".closebtn");
button.addEventListener("click", function () {
    document.querySelector(".popup").style.display = "none";
})
const submit = document.querySelector(".submitbtn");
submit.addEventListener("click", function (event) {
    event.preventDefault();
    document.querySelector(".popup").style.display = "none";
})



