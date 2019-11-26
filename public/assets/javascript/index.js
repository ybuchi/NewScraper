$(document).ready(function(){

    var articleContainer = $(".article-container");
    $(document).on("click", ".btn.save", handleArticleSave);
    $(document).on("click", ".scrape-new", handleArticleScrape);

    initPage();

//Initialize Page
    function initPage(){
        //empty the article container
        articleContainer.empty();
        //AJAX call
        $.get("/api/headlines?saved=false")
        .then(function(data){
            if (data && data.length){
                renderArticles(data);
            }
            else {
                //Give a message that we don't have any articles
                renderEmpty();
            }
        });
    }

//Render Articles
    function renderArticles(articles) {
        var articlePanels = [];
        for (var i = 0; i < articles.length; i++) {
            articlePanels.push(createPanel(articles[i]));
        }
        articleContainer.append(articlePanels);
    }

    function createPanel(article) {
        var panel = 
            $(["<div class='panel panel-default'>",
            "div class='panel-heading'>",
            "<h3>",
            article.headline,
            "<a class='btn btn-success save'>",
            "Save Article",
            "</a>",
            "</h3",
            "</div>",
            "<div class='panel-body'>",
            article.summary,
            "</div>",
            "</div>"].join(""));

        panel.data("id", article._id);

        return panel;

    }

//Render Empty 
    function renderEmpty() {
        var emptyAlert = 
            $(["<div class='alert alert-warning text-center>",
            "<h4>Uh Oh. Looks like we don't have any new articles.</h4>",
            "</div>",
            "<div class='panel panel-default>",
            "<div class='panel-heading text-center",
            "<h3>What Would You Like To Do ?</h3>",
            "</div>",
            "<div class='panel-body text-center",
            "<h4><a class='scrape-new'>Try Scraping New Articles</a></h4>",
            "<h4><a href='/saved'>Go To Saved Articles</a></h4>",
            "</div>",
            "</div>"
        ].join(""));

        articleContainer.append(emptyAlert);
    }

//Article Save
    function handleArticleSave() {
        articleToSave.saved = true;

        //make an AJAX call
        $.ajax({
            method: "PATCH",
            url: "/api/headlines",
            data: articleToSave
        })
        .then(function(data){
            //Mongoose sends a key of "ok"
            if (data.ok) {
                initPage();

            }
        });
    }

//Article Scrape
    function handleArticleScrape() {
        $.get("/api/fetch")
            .then(function(data){
                initPage();
                bootbox.alert("<h3 class='text-center m-top-80>" + data.message + "<h3>");
            });

    }

});