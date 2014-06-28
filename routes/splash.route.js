var route = module.exports = require("express").Router();

route.get("/", function(request, response)
{
	response.render("splash");
});