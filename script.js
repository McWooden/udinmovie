// const searchButton = document.querySelector('.search-button')
// searchButton.addEventListener('click', function(){
//     const inputKeyword = document.querySelector('.input-keyword')

//     fetch('http://www.omdbapi.com/?apikey=b8b71574&s=' + inputKeyword.value)
//         .then(response => response.json())
//         .then(response => {
//             const movies = response.Search
//             let cards = ''
//             movies.forEach(m => {cards += showCard(m) });
//             const movieContainer = document.querySelector('.movie-container')
//             movieContainer.innerHTML = cards;


//             // Ketika tombol diklik
//             let modalDetailButton = document.querySelectorAll('.modal-detail-button')
//             modalDetailButton.forEach(btn => {
//                 btn.addEventListener('click', function() {
//                     const imdbid = this.dataset.imdbid
//                     fetch('http://www.omdbapi.com/?apikey=b8b71574&i=' + imdbid)
//                         .then(response => response.json())
//                         .then(m => {
//                             const movieDetail = showModal(m)
//                             const modalBody = document.querySelector('.modal-body')
//                             modalBody.innerHTML = movieDetail
//                         })
//                 })
//             });
//         })
    
// })

const searchButton = document.querySelector('.search-button');
searchButton.addEventListener('click', async function () {
    const inputKeyword = document.querySelector('.input-keyword');
    const movies = await getMovies(inputKeyword.value);
    UpdateUI(movies)
})
function getDetail (imdbID) {
    return fetch('http://www.omdbapi.com/?apikey=b8b71574&i=' + imdbID)
    .then(response => response.json())
    .then(m => m)
}
function UpdateUIDetail(m) {
    const movieDetail = showModal(m)
    const modalBody = document.querySelector('.modal-body')
    modalBody.innerHTML = movieDetail
}






// event binding
document.addEventListener('click', async function (e) {
    try {
        if (e.target.classList.contains('modal-detail-button')){
            const imdbid = e.target.dataset.imdbid
            const movieDetail = await getDetail(imdbid)
            UpdateUIDetail(movieDetail)
        }
    } catch (err) {
        alert(err)
    }
})
function getMovies (keyword) {
    return fetch('http://www.omdbapi.com/?apikey=b8b71574&s=' + keyword)
        .then(response => {
            if (!response.ok) {
                throw new Error(response.statusText)
            }
            return response.json()
        })
        .then(response => {
            if (response.Response === 'False') {
                const movieContainer = document.querySelector('.movie-container')
                movieContainer.innerHTML = response.Error;
                throw new Error(response.Error)
            }
            return response.Search
        })
}
function UpdateUI (movies) {
    let cards = ''
            movies.forEach(m => {cards += showCard(m) });
            const movieContainer = document.querySelector('.movie-container')
            movieContainer.innerHTML = cards;
}


// HTML template
function showCard(m) {
    return `<div class="col-md-4 my-3">
    <div class="card">
        <img src="${m.Poster}" class="card-img-top">
        <div class="card-body">
          <h5 class="card-title">${m.Title}</h5>
          <h6 class="card-subtitle mb-2 text-muted">${m.Year}</h6>
          <a href="#" class="btn btn-primary modal-detail-button" data-toggle="modal" data-target="#movieDetailModal" data-imdbid="${m.imdbID}">Show Details</a>
        </div>
      </div>
</div>`
}
function showModal(m) {
    return `<div class="container-fluid">
    <div class="row">
        <div class="col-md-3">
            <img src="${m.Poster}" class="img-fluid">
        </div>
        <div class="col-md">
          <ul class="list-group">
              <li class="list-group-item"><h4>${m.Title} (${m.Year})</h4></li>
              <li class="list-group-item"><strong>Director : </strong>${m.Director}</li>
              <li class="list-group-item"><strong>Actors : </strong>${m.Actors}</li>
              <li class="list-group-item"><strong>Writer : </strong>${m.Writer}</li>
              <li class="list-group-item"><strong>Plot : </strong><br>${m.Plot}</li>
            </ul>
        </div>
    </div>
</div>`
}