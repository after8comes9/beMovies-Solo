

//// DOM SELECTORS ////

let registerBtn = document.querySelectorAll(".register");
let signinBtn = document.querySelectorAll(".signin");
let modalReg = document.querySelector(".modalReg");
let greyOut = document.querySelectorAll(".greyOut");
let modalInfo = document.querySelector(".modalInfo");
let comedyBtn = document.querySelector("#comedy");
let dramaBtn = document.querySelector("#drama");
let actionBtn = document.querySelector("#action");
let romanceBtn = document.querySelector("#romance");
let fantasyBtn = document.querySelector("#fantasy");
let animationBtn = document.querySelector("#animation");
let form = document.querySelector('.searchBar');
let searchInput = document.querySelector('#searchInput');
let resultsSwiper = document.querySelector(".swiper1 .swiper-wrapper");
let resultsContainer = document.querySelector(".searchResults");
let noResultsContainer = document.querySelector(".noResults");
let resultsForSpan = document.querySelector(".searchResults p span");
let recentsSwiper = document.querySelector(".swiper2 .swiper-wrapper");
let genresSwiper = document.querySelector(".swiper3 .swiper-wrapper");
let signupBtn = document.querySelector(".signup");
let loginBtn = document.querySelector(".login");



//////////////////////////////////////////////////////////////////



function createSwiper(swiperNumber) {
  const swiper = new Swiper(`.swiper${swiperNumber}`, {

    direction: 'horizontal',
    loop: true,
    slidesPerView: '4',
    spaceBetween: '2%',
  
    navigation: {
      nextEl: `.nextEl${swiperNumber}`,
      prevEl: `.prevEl${swiperNumber}`,
    },

    preventClicks: false,
    preventClicksPropagation: false,
    allowTouchMove: false,
    simulateTouch: false,


  
  });
}


////////////////////////////////


function initHover(){
document.querySelectorAll(".filmListItem").forEach(element => {
  element.addEventListener('mouseover', function (e) {
    element.querySelector(".hoverInfo").style.display = "flex";
})
  element.addEventListener('mouseout', function (e) {
    element.querySelector(".hoverInfo").style.display = "none";

})

})

}

/////////////////////////////////////


const dbInfo = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2M2NiYTQ4MWJkNmZhYWI1YTZmYzhhMDllZGIzMDY3ZCIsInN1YiI6IjY1MzYxYzFlYWJkYWZjMDBlYjhjZTlmYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.chCMzoiDgwmP9VOILY7pC5c8DKUCCm2pq8yfwrrI2sw'
  }
};


////////////// Open Movie Info //////////////

  function addInfoToModal(fetchedData) {
    let modalImage = document.querySelector(".modalInfo .poster");
    let modalTitle = document.querySelector(".modalInfo h1");
    let modalDate = document.querySelector(".modalInfo h2");
    let modalScore = document.querySelector(".modalInfo h3");
    let modalGenre = document.querySelector(".modalInfo h4");
    let modalSummary = document.querySelector(".modalInfo .summary");

    modalImage.innerHTML = `<img src="http://image.tmdb.org/t/p/w185${fetchedData.poster_path}">`;
    modalTitle.innerHTML = "";
    modalTitle.innerText += `${fetchedData.title}`;
    modalDate.innerText = `${fetchedData.release_date.slice(0, 4)}`;
    modalScore.innerText = `${fetchedData.vote_average.toFixed(1)}`;
    modalGenre.innerText = `${fetchedData.genres[0].name}/${fetchedData.genres[1].name}`;
    modalSummary.innerText = `${fetchedData.overview}`;
  }
 
  function moviesById(movieId) {
    fetch(`
    https://api.themoviedb.org/3/movie/${movieId}?language=en-US`, dbInfo)
      .then(response => response.json())
      .then(data => addInfoToModal(data))
      .catch(err => console.error(err));
  }



 function addCastToModal(fetchedData) {
  let modalCast = document.querySelector(".modalInfo .cast .actors");
  modalCast.innerText = `${fetchedData.cast[0].name}, ${fetchedData.cast[1].name}, ${fetchedData.cast[2].name}, ${fetchedData.cast[3].name}, ${fetchedData.cast[4].name}`};
 

 function casters(movieId) {
  fetch(`
  https://api.themoviedb.org/3/movie/${movieId}/credits?language=en-US'`, dbInfo)
    .then(response => response.json())
    .then(data => addCastToModal(data))
    .catch(err => console.error(err));
}


function initSwiperLinks(swiperNumber) {
  let posters = document.querySelectorAll(`.swiper${swiperNumber} .filmListItem`);

  posters.forEach(element => {
    element.addEventListener('click', function (e) {
      e.preventDefault();
      moviesById(element.id);
      casters(element.id);
      modalInfo.style.display = "block";
      disableScroll()
  })})
  }


//////////////////////////////////////////////////////////////////

function disableScroll() {
    document.body.classList.add("stopScrolling"); 
} 

function enableScroll() { 
    document.body.classList.remove("stopScrolling"); 
} 

registerBtn.forEach(element => {
  element.addEventListener('click', function (e) {
    e.preventDefault();
    modalReg.style.display = "block";
    disableScroll()
    document.querySelector(".signup").classList.add("signupactive");
    document.querySelector(".login").classList.remove("loginactive");
    document.querySelector(".reglog #submit").value = "Register";
})})

signupBtn.addEventListener('click', function (e) {
  e.preventDefault();
  document.querySelector(".signup").classList.add("signupactive");
  document.querySelector(".login").classList.remove("loginactive");
  document.querySelector(".reglog #submit").value = "Register";
})


signinBtn.forEach(element => {
  element.addEventListener('click', function (e) {
    e.preventDefault();
    modalReg.style.display = "block";
    disableScroll()
    document.querySelector(".login").classList.add("loginactive");
    document.querySelector(".signup").classList.remove("signupactive");
    document.querySelector(".reglog #submit").value = "Login";
})})

loginBtn.addEventListener('click', function (e) {
  e.preventDefault();
  document.querySelector(".login").classList.add("loginactive");
  document.querySelector(".signup").classList.remove("signupactive");
  document.querySelector(".reglog #submit").value = "Login";
})

greyOut.forEach(element => {
  element.addEventListener('click', function (e) {
    e.preventDefault();
    modalReg.style.display = "none";
    modalInfo.style.display = "none";
    enableScroll()
})})


//////////////////////////////////////////////////////////////////

form.addEventListener('submit', function (event) {
  event.preventDefault();
  searchMovies(searchInput.value);
});


//////////////////////////////////////////////////////////////////


function displaySearchResults(movies) {

  if (searchInput.value === "") {
    noResultsContainer.style.display = "block";
    noResultsContainer.innerHTML = `Please enter a search term`;
    resultsContainer.style.display = "none";


  } else   if (movies.length > 0) {
    noResultsContainer.style.display = "none";
    resultsContainer.style.display = "block";
    resultsForSpan.innerHTML = `${searchInput.value}`;
    resultsSwiper.innerHTML = "";
    movies.forEach(searchInput => {
      resultsSwiper.innerHTML +=
      ` <div class="swiper-slide">
      <div class="filmListItem" id="${searchInput.id}">
        <div class="hoverInfo">
        <h1>${searchInput.title}</h1>
        <h2>${searchInput.release_date.slice(0, 4)}</h2>
        <h3>${searchInput.genre_ids}</h3>
        <img src="img/star.svg">
        <h4>${searchInput.vote_average.toFixed(1)}</h4>
        </div>
        <div class="poster">
          <img src="http://image.tmdb.org/t/p/w185${searchInput.poster_path}" alt="${searchInput.title}">
        </div>
      </div>`;
    });

    createSwiper(1);
    initSwiperLinks(1)
    initHover();
  }

  else {
    noResultsContainer.style.display = "block";
    noResultsContainer.innerHTML = `There are no results for "${searchInput.value}"`;
    resultsContainer.style.display = "none";
  }
}



//////////////////////////////////////////////////////////////////


function searchMovies(search) {
  fetch(`
  https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_text_query=${search}`, dbInfo)
    .then(response => response.json())
    .then(data => displaySearchResults(data.results))
    .catch(err => console.error(err));
}

///////////////////////////////////////////////////////////////////

function displayRecentMovies(apiData) {
  for (i = 0; i < apiData.length; i++) {
    recentsSwiper.innerHTML += `<div class="swiper-slide">
    <div class="filmListItem" id="${apiData[i].id}">
      <div class="hoverInfo">
      <h1>${apiData[i].title}</h1>
      <h2>${apiData[i].release_date.slice(0, 4)}</h2>
      <h3>${apiData[i].genre_ids}</h3>
      <img src="img/star.svg">
      <h4>${apiData[i].vote_average.toFixed(1)}</h4>
      </div>
      <div class="poster">
        <img src="https://image.tmdb.org/t/p/original${apiData[i].poster_path}" alt="${apiData[i].title}"></div>
      </div>
    </div>
      `;
}

createSwiper(2);
initSwiperLinks(2);
initHover();


}


function recentMovies() {
  fetch(`
  https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1`, dbInfo)
    .then(response => response.json())
    .then(data => displayRecentMovies(data.results))
    .catch(err => console.error(err));
}

recentMovies();


///////////////////////////////////////////////////////////////////

function displayMoviesByGenre(apiData) {
  genresSwiper.innerHTML = "";
  for (i = 0; i < apiData.length; i++) {
    genresSwiper.innerHTML += `<div class="swiper-slide">
    <div class="filmListItem" id="${apiData[i].id}">
      <div class="hoverInfo">
        <h1>${apiData[i].title}</h1>
        <h2>${apiData[i].release_date.slice(0, 4)}</h2>
        <h3>${apiData[i].genre_ids}</h3>
        <img src="img/star.svg">
        <h4>${apiData[i].vote_average.toFixed(1)}</h4>
      </div>
      <div class="poster">
        <img src="https://image.tmdb.org/t/p/original${apiData[i].poster_path}" alt="${apiData[i].title}">
      </div>
    </div>`;
}

createSwiper(3);
initSwiperLinks(3);
initHover();

}


function moviesByGenre(genre) {
  fetch(`
  https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=${genre}`, dbInfo)
    .then(response => response.json())
    .then(data => displayMoviesByGenre(data.results))
    .catch(err => console.error(err));
}


moviesByGenre(`35`);


///////////////////////////////////////////////////////////////////


function resetGenreButtons() {
  comedyBtn.classList.remove("activeGenre");
  dramaBtn.classList.remove("activeGenre");
  actionBtn.classList.remove("activeGenre");
  romanceBtn.classList.remove("activeGenre");
  fantasyBtn.classList.remove("activeGenre");
  animationBtn.classList.remove("activeGenre");
}

comedyBtn.addEventListener('click', function (e) {
  e.preventDefault();
  moviesByGenre(`35`);
  resetGenreButtons()
  comedyBtn.classList.add("activeGenre");
})

dramaBtn.addEventListener('click', function (e) {
  e.preventDefault();
  moviesByGenre(`18`);
  resetGenreButtons()
  dramaBtn.classList.add("activeGenre");
})

actionBtn.addEventListener('click', function (e) {
  e.preventDefault();
  moviesByGenre(`28`);
  resetGenreButtons()
  actionBtn.classList.add("activeGenre");
})

romanceBtn.addEventListener('click', function (e) {
  e.preventDefault();
  moviesByGenre(`10749`);
  resetGenreButtons()
  romanceBtn.classList.add("activeGenre");
})

fantasyBtn.addEventListener('click', function (e) {
  e.preventDefault();
  moviesByGenre(`14`);
  resetGenreButtons()
  fantasyBtn.classList.add("activeGenre");
})

animationBtn.addEventListener('click', function (e) {
  e.preventDefault();
  moviesByGenre(`16`);
  resetGenreButtons()
  animationBtn.classList.add("activeGenre");
})

///////////////////////////////////////////////////////////////////