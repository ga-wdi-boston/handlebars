var movieTemplate;

$("#load-movies").on('click', function(event){
  $.ajax({
    // DO NOT CHANGE THIS URL
    url: "https://protected-forest-7809.herokuapp.com/movies"
  }).done(function(data){
    //Generate new HTML and put it into #movies.
  }).fail(function(data){
    console.error(data);
  });
});
