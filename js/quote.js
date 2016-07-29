/*
$(document).ready(function() {
  var quotes = [{"quote":"quote1","author":"author1"},{"quote":"quote2","author":"author2"},{"quote":"quote3","author":"author3"},{"quote":"quote4","author":"author4"},{"quote":"quote5","author":"author5"}];
  var index = Math.floor(Math.random()*quotes.length);
  $(".quote-text").text(quotes[index].quote);
  $(".quote-author").text(quotes[index].author);

  $("button").click(function() {
    index = Math.floor(Math.random()*quotes.length);
    $(".quote-text").text(quotes[index].quote);
    $(".quote-author").text(quotes[index].author);
  });
});
*/

function getQuote() {
  $.getJSON("http://api.forismatic.com/api/1.0/?method=getQuote&format=jsonp&lang=en&jsonp=?",function(data) {
    $(".quote-text").text(data.quoteText);
    var author;
    if(data.quoteAuthor == "") {
      author = "\u2014 Unknown";
    } else {
      author = "\u2014 " + data.quoteAuthor;
    }
    $(".quote-author").text(author);
    $("#tweet").attr("href","https://twitter.com/intent/tweet?text=" + encodeURI(data.quoteText + author));
  });
}

$(document).ready(function() {
  getQuote();

  $("#generate").click(function() {
    getQuote();
  });
});
