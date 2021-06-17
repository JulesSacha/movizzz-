const form = document.getElementById('searchForm')
const searchInput = document.getElementById('searchInput')
const result = document.getElementById('result')


let search = "";
let movies = [];

const fetchMovies = async () => {
    movies = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=bb6304bfe05c1e48a6bed9443b9681eb&query=${search}`
    ).then((res) => res.json());
    console.log(movies);

};


const moviesDisplay = async () => {
    await fetchMovies();

    // movies.results.length = 6;

    if (movies.total_results === 0) {
        result.innerHTML = `
    
    <li>${search} n'existe pas dans notre catalogue</li>

    `
    } else {
        result.innerHTML = movies.results.map((movie) =>
            `
    <li>
    <a target="_parent" href="https://www.google.com/search?q=${movie.title}" >

    <h2>${movie.original_title}</h2>
        <div class="card-content">
        <img src="${movie.poster_path == null ? 'assets/unknow.jpg' : 'https://image.tmdb.org/t/p/w500/' + movie.poster_path}"></img>
            <div class="infos">
                <p>${movie.overview}</p>
                <p>Popularité : ${movie.popularity} ⭐ </p>
            </div>
        </div>
        </a>
    
</li>
    `
        )
            .join("");
    }
    


};

fetchMovies();

form.addEventListener('submit', (e) => {
    e.preventDefault();
    search = searchInput.value;
    moviesDisplay();
});


let deferredPrompt;
const addBtn = document.querySelector('.add-button');
addBtn.style.display = 'none';

window.addEventListener('beforeinstallprompt', (e) => {
    // Prevent Chrome 67 and earlier from automatically showing the prompt
    e.preventDefault();
    // Stash the event so it can be triggered later.
    deferredPrompt = e;
    // Update UI to notify the user they can add to home screen
    addBtn.style.display = 'block';
  
    addBtn.addEventListener('click', (e) => {
      // hide our user interface that shows our A2HS button
      addBtn.style.display = 'none';
      // Show the prompt
      deferredPrompt.prompt();
      // Wait for the user to respond to the prompt
      deferredPrompt.userChoice.then((choiceResult) => {
          if (choiceResult.outcome === 'accepted') {
            console.log('User accepted the A2HS prompt');
          } else {
            console.log('User dismissed the A2HS prompt');
          }
          deferredPrompt = null;
        });
    });
  });
   


