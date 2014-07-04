module.exports = function()
{
	var route = require("express").Router();
	
	route.get("/", function(request, response)
	{
		response.render("splash");
	});
	
	return route;
}