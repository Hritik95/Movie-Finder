const api_url = "http://www.omdbapi.com/?i=tt3896198&apikey=f2a6d35e&s=";
const api_url_search = "http://www.omdbapi.com/?apikey=f2a6d35e&i=";

var search_input = document.getElementById("input_box");
var card = document.getElementsByClassName("movie_card")[0];

document.getElementsByClassName("search_button")[0].addEventListener("click", function(){
    console.log(search_input.value);
    const query = search_input.value;
    if (query){
        get_movies(api_url+query);
    }
});

async function get_movies(url){
    const resp = await fetch(url);
    const respData = await resp.json();
    console.log(respData);
    show_movies(respData.Search);
}

function show_movies(movies){
    card.innerHTML = "";
    movies.forEach(async function(movie){
        const movieData = await fetch(api_url_search+movie.imdbID);
        const movieDataobj = await movieData.json();
        movie_display(movieDataobj);
    });
}

function movie_display(imovie){
    const movieElm = document.createElement("div");
    movieElm.classList.add("movie-card");
    movieElm.innerHTML = `
        <div class="card">
        <img src = "${imovie.Poster}" alt = "Poster" width = "300px" height = "300px"/>
        <br>
        <div class = "movie_description">
            <span class = "movie_title"><b>Title</b><span class="value">${imovie.Title}</span></span>
            <span class = "movie_title"><b>Rating</b><span class="value">${imovie.imdbRating}</span></span>
            <span class = "movie_title"><b>Director</b><span class="value">${imovie.Director}</span></span>
            <span class = "movie_title"><b>Released Date</b><span class="value">${imovie.Released}</span></span>
            <span class = "movie_title"><b>Genre</b><span class="value">${imovie.Genre}</span></span>
        </div>
    </div>
    `;
    card.appendChild(movieElm);
}