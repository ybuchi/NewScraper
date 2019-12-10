var request = require("request");
var cheerio = require("cheerio");

//Go to the NYT or some other news website and figure out how to pull in headlines and summaries
var scrape = function(cb){
    request("https://www.nationalgeographic.com/", function(err, res, body){
        var $ = cheerio.load(body);
        console.log("scraping...");
        console.log("This is the body" + body);

        var articles = [];
        $(".promo_content").each(function(i, element){

            
            var head = $(this).children(".promo_content__link").text().trim();
            console.log("This is head: " + head)
            var sum = $(this).children(".LinesEllipsis").text().trim();

            if (head && sum){
                var headNeat = head.replace(/(\r|\n|\n|\r|\t|\s+)/gm, " ").trim();
                var sumNeat = sum.replace(/(\r|\n|\n|\r|\t|\s+)/gm, " ").trim();

                var dataToAdd = {
                    headline : headNeat,
                    summary : sumNeat
                };

                articles.push(dataToAdd);
            }
        });
        cb(articles);
        console.log("These are the articles: " + articles);
    });

};
module.exports = scrape;