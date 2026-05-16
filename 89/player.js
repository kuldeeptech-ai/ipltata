// player.js

const params=
new URLSearchParams(location.search);

const slug=params.get("id");

const movies=
JSON.parse(localStorage.getItem("movies")||"[]");

const movie=
movies.find(m=>m.slug===slug);

if(movie){

document.title=movie.title;

document.getElementById("movieBanner")
.style.backgroundImage=
`url(${movie.backdrop})`;

document.getElementById("movieTitle")
.innerText=movie.title;

document.getElementById("movieRating")
.innerText="⭐ "+movie.rating;

document.getElementById("movieYear")
.innerText=movie.year;

document.getElementById("movieGenre")
.innerText=movie.genre;

document.getElementById("movieDesc")
.innerText=movie.desc;

document.getElementById("movieCast")
.innerText=movie.cast;

document.getElementById("ogTitle")
.setAttribute("content",movie.title);

document.getElementById("ogImage")
.setAttribute("content",movie.poster);

document.getElementById("ogDesc")
.setAttribute("content",movie.desc);

loadPlayer(movie.video);

loadRelated();

}

function loadPlayer(url){

if(url.includes(".m3u8")){

document.getElementById("playerBox").innerHTML=
`
<video id="video" controls autoplay></video>
`;

const script=document.createElement("script");

script.src=
"https://cdn.jsdelivr.net/npm/hls.js@latest";

document.body.appendChild(script);

script.onload=()=>{

const video=
document.getElementById("video");

if(Hls.isSupported()){

const hls=new Hls();

hls.loadSource(url);

hls.attachMedia(video);

}

};

return;

}

if(
url.includes(".mp4") ||
url.includes(".webm")
){

document.getElementById("playerBox").innerHTML=
`
<video controls autoplay>

<source src="${url}">

</video>
`;

return;

}

document.getElementById("playerBox").innerHTML=
`
<iframe
src="${url}"
allowfullscreen
allow="autoplay">
</iframe>
`;

}

function loadRelated(){

const related=
movies.filter(m=>

m.genre===movie.genre &&

m.slug!==movie.slug

)
.slice(0,6);

document.getElementById("relatedGrid").innerHTML=
related.map(r=>`

<div class="related-card"
onclick="location.href='movie.html?id=${r.slug}'">

<img src="${r.poster}">

<div class="movie-info">

<h3>${r.title}</h3>

</div>

</div>

`).join("");

}