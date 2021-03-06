function searchMovie() {
    $('#movie-list').html('')
    $.ajax({
        url: 'https://omdbapi.com',
        type: 'get',
        dataType: 'json',
        data: {
            'apikey': '166b57cd',
            's': $('#search-input').val()
        },
        success: function (result) {
            if (result.Response == "True") {
                let movies = result.Search

                $.each(movies, function (i, data) {
                    $('#movie-list').append(`
                    <div class="col-md-4">
                        <div class="card mb-3">
                            <img src="`+ data.Poster + `" class="card-img-top img-fluid" alt="poster of ` + data.Title + `">
                            <div class="card-body">
                                <h5 class="card-title">`+ data.Title + `<span class="text-muted">&nbsp;(` + data.Year + `)</span></h5>
                                <a href="#" class="card-link see-detail" data-toggle="modal" data-target="#exampleModal" data-id="`+ data.imdbID +`">See detail</a>
                            </div>
                        </div>
                    </div>
                    `)
                })

                $('#search-input').val('')

            } else {
                $('#movie-list').html(`
                <div class="col">
                    <h1 class="text-center">`+ result.Error + `</h1>
                </div>
                `)
            }
        }
    })
}

$('#search-button').on('click', function () {
    searchMovie()
})

$('#search-input').on('keyup', function (e) {
    if (e.which === 13) {
        searchMovie()
    }
})

$('#movie-list').on('click', '.see-detail', function() {
    $.ajax({
        url : 'https://omdbapi.com',
        dataType : 'json',
        type : 'get',
        data : {
            'apikey' : '166b57cd',
            'i' : $(this).data('id')
        },
        success : function (movie) {
            if (movie.Response === "True") {
                $('.modal-title').html(movie.Title)
                $('.modal-body').html(`
                <div class="container-fluid">
                    <div class="row">
                        <div class="col-md-4">
                            <img src="`+ movie.Poster +`" class="img-fluid">
                        </div>
                        <div class="col-md-8">
                            <ul class="list-group">
                                <li class="list-group-item">
                                    <p>` + movie.Plot + `</p>
                                </li>
                                <li class="list-group-item"><b>Released:</b> ` + movie.Released + `</li>
                                <li class="list-group-item"><b>Genre:</b> ` + movie.Genre + `</li>
                                <li class="list-group-item"><b>IMDB Rating:</b> ` + movie.Ratings[0].Value + `</li>
                                <li class="list-group-item"><b>Duration:</b> ` + movie.Runtime + `</li>
                                <li class="list-group-item"><b>Director:</b> ` + movie.Director + `</li>
                                <li class="list-group-item"><b>Actors:</b> ` + movie.Actors + `</li>
                                <li class="list-group-item"><b>Awards:</b> ` + movie.Awards + `</li>
                                <li class="list-group-item"><a class="btn btn-primary" href="https://www.imdb.com/title/` + movie.imdbID + `/" target="_blank">Visit IMDB</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
                `)
            }
        }
    })
})

$('#about').on('click', function () {
    
})