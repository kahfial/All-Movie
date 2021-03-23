function searchMovie(){
    $('#movie-list').html('');

    $.ajax({
        url:'http://omdbapi.com',
        type: 'get',
        dataType: 'json',
        data: {
            'apikey' : '2cf04108',
            's' : $('#search-input').val()
        },
        success: function(result){
            if (result.Response === "True"){
                let movies = result.Search;
                
                $.each(movies, function(i, data){

                    $('#movie-list').append(`
                                             
                            <div class="col-sm-12 col-lg-6">
                                <div class="card h-100">
                                    <img src="`+ data.Poster+`" class="card-img-top width-200px" alt="...">
                                    <div class="card-body">
                                        <h5 class="card-title">`+ data.Title+`</h5>
                                        <h6 class="card-subtitle mb-2 text-muted">`+data.Year+`</h6>
                                        <a href="#" class="card-link see-detail" data-toggle="modal" data-target="#exampleModal" data-id="`+ data.imdbID+`" >See Detail</a>
                                    </div>
                                </div>
                            </div>
                                         
                    `);
                });

                $('#search-input').val('');

            }else{
                $('#movie-list').html(`
                <div class="col">
                <h1 class="text-center">`+ result.Error + `</h1>
                </div>
                `)
            }
            
        }
    });
}
$('#search-button').on('click',function(){
    searchMovie();

});

$('#search-input').on('keyup', function(e){
    if(e.which === 13){
        searchMovie();
    }
});

 
$('#movie-list').on('click','.see-detail', function(){

    
    
    $.ajax({
        url:'http://omdbapi.com',
        type: 'get',
        dataType: 'json',
        data: {
            'apikey' : '2cf04108',
            'i' : $(this).data('id')
        },
        success: function(movie){
            if(movie.Response === "True"){
                $('.modal-body').html(`
                    <div class="container-fluid">
                        <div class="row">
                            <div class="col-md-4">
                                <img src="`+ movie.Poster+`" class="img-fluid">
                            </div>

                            <div class="col-md-8">
                                <ul class="list-group">
                                    <li class="list-group-item"><h3>`+ movie.Title+`</h3></li>
                                    <li class="list-group-item">Relesed : `+ movie.Released+`</li>
                                    <li class="list-group-item">Genre : `+ movie.Genre+`</li>
                                    <li class="list-group-item">Actors : `+ movie.Actors+`</li>
                                    <li class="list-group-item">Director : `+ movie.Director+`</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                
                `);
            }
        }
    });
});

$('.modal').on('hidden.bs.modal', function(e) { 
        $(this).removeData();
    }) ; 