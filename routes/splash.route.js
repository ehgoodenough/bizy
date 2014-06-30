var route = module.exports = require("express").Router();

route.get("/", function(request, response)
{
	response.render("splash");
});

route.get("/login", function(request, response)
{
	response.render("login");
});