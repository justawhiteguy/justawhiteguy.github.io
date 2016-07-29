function search() {
  var searchTerm = document.getElementById('search-field').value;
  console.log(searchTerm);
  $.ajax({
    url: 'https://en.wikipedia.org/w/api.php?action=opensearch&search=' + searchTerm,
    dataType: 'jsonp'
  })
    .fail(function(err) {
      console.log(err);
    })
    .success(function(data) {
      displayResults(data);
    });
}

function displayResults(inp) {
  var len = inp[1].length;
  document.getElementById('results').innerHTML = '';
  if(len===0) {
    document.getElementById('results').innerHTML += '<div class="well text-center"><p class="result-header">Your query returned no results</p></div>';
  } else {
    for(var i = 0; i < len; i++) {
      document.getElementById('results').innerHTML += '<a href="' + inp[3][i] + '" target="_blank"><div class="well"><p class="result-header">'
        + inp[1][i] + '</p><p class="result-description">' + inp[2][i] + '</p></div></a>';
    }
  }
}
