// app.js

const movies=
JSON.parse(localStorage.getItem("movies")||"[]");

window.onload=()=>{

document.getElementById("loader").style.display="none";

loadHero();

loadMovies();

};

function loadHero(){

if(!movies.length) return;

let index=0;

function updateHero(){

const m=movies[index];

document.getElementById("hero").style.backgroundImage=
`url(${m.backdrop})`;

document.getElementById("heroTitle").innerText=
m.title;

document.getElementById("heroDesc").innerText=
m.desc;

document.getElementById("watchHero").onclick=()=>{

location.href=`movie.html?id=${m.slug}`;

};

index++;

if(index>=movies.length){

index=0;

}

}

updateHero();

setInterval(updateHero,4000);

}

function loadMovies(){

const sorted=[
...movies.filter(m=>m.trending),
...movies.filter(m=>!m.trending)
];

document.getElementById("moviesGrid").innerHTML=
sorted.map(m=>`

<div class="movie-card"
onclick="location.href='movie.html?id=${m.slug}'">

<img src="${m.poster}">

<div class="movie-info">

<h3>${m.title}</h3>

<p>⭐ ${m.rating} • ${m.year}</p>

</div>

</div>

`).join("");

}

function searchMovies(){

const q=document
.getElementById("searchInput")
.value
.toLowerCase();

const filtered=movies.filter(m=>

m.title.toLowerCase().includes(q) ||

m.genre.toLowerCase().includes(q)

);

document.getElementById("moviesGrid").innerHTML=
filtered.map(m=>`

<div class="movie-card"
onclick="location.href='movie.html?id=${m.slug}'">

<img src="${m.poster}">

<div class="movie-info">

<h3>${m.title}</h3>

<p>⭐ ${m.rating} • ${m.year}</p>

</div>

</div>

`).join("");

}