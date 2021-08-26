var cheerio = require("cheerio");
var request = require("request");

request("https://www.vocabulary.com/lists/558097", function(error, response, html) {

  var $ = cheerio.load(html);
  var words = [];
  $("li.entry").each(function(i, element) {
    var word = $(element).children("a").text();
    var definition = $(element).children("div.definition").text();

 words.push({
      word: word,
      definition: definition
    });
  });
  console.log(words);
});
