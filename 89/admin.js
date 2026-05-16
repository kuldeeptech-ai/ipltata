// admin.js

const API_KEY="047b384bf3ae9b2d3427ff0940a4dadc";

function logout(){

localStorage.removeItem("admin_auth");

location.href="login.html";

}

async function searchTMDB(){

const q=
document.getElementById("tmdbInput").value;

if(!q) return;

const res=await fetch(
`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${q}`
);

const data=await res.json();

document.getElementById("tmdbResults").innerHTML=
data.results.map(m=>`

<div class="tmdb-card"
onclick='fillMovie(${JSON.stringify(m)})'>

<img src="https://image.tmdb.org/t/p/w500${m.poster_path}">

<div class="movie-info">

<h3>${m.title}</h3>

<p>${m.release_date||""}</p>

</div>

</div>

`).join("");

}

async function fillMovie(movie){

document.getElementById("title").value=
movie.title;

document.getElementById("poster").value=
"https://image.tmdb.org/t/p/w500"+movie.poster_path;

document.getElementById("backdrop").value=
"https://image.tmdb.org/t/p/original"+movie.backdrop_path;

document.getElementById("desc").value=
movie.overview;

document.getElementById("year").value=
movie.release_date?.split("-")[0];

document.getElementById("rating").value=
movie.vote_average;

const res=await fetch(
`https://api.themoviedb.org/3/movie/${movie.id}/credits?api_key=${API_KEY}`
);

const data=await res.json();

document.getElementById("cast").value=
data.cast
.slice(0,5)
.map(c=>c.name)
.join(", ");

}

function addMovie(){

const movies=
JSON.parse(localStorage.getItem("movies")||"[]");

const title=
document.getElementById("title").value;

const movie={

id:Date.now(),

slug:title.toLowerCase()
.replace(/[^a-z0-9]+/g,"-"),

title:title,

poster:
document.getElementById("poster").value,

backdrop:
document.getElementById("backdrop").value,

video:
document.getElementById("video").value,

genre:
document.getElementById("genre").value,

year:
document.getElementById("year").value,

rating:
document.getElementById("rating").value,

cast:
document.getElementById("cast").value,

desc:
document.getElementById("desc").value,

trending:
document.getElementById("trending").checked

};

movies.unshift(movie);

localStorage.setItem(
"movies",
JSON.stringify(movies)
);

loadAdminMovies();

alert("Movie Added");

}

function deleteMovie(id){

let movies=
JSON.parse(localStorage.getItem("movies")||"[]");

movies=
movies.filter(m=>m.id!==id);

localStorage.setItem(
"movies",
JSON.stringify(movies)
);

loadAdminMovies();

}

function loadAdminMovies(){

const movies=
JSON.parse(localStorage.getItem("movies")||"[]");

document.getElementById("adminMovies").innerHTML=
movies.map(m=>`

<div class="admin-card">

<img src="${m.poster}">

<div class="movie-info">

<h3>${m.title}</h3>

<p>${m.year}</p>

<button
onclick="deleteMovie(${m.id})"
style="
margin-top:10px;
width:100%;
height:45px;
background:#ef4444;
border:none;
border-radius:10px;
color:white;
cursor:pointer;
">
Delete
</button>

</div>

</div>

`).join("");

}

loadAdminMovies();
