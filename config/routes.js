module.exports = function(router){
    //The route that renders the HOME page
    router.get("/", function(req,res){
        res.render("home");
    });

    //The route that will bring us to the saved handlebars page
    router.get("/saved", function(req,res){
        res.render("saved");
    });
};