var route = module.exports = require("express").Router();

route.use(function(request, response, next)
{
	if(request.isAuthenticated())
	{
		return next();
	}
	else
	{
		response.redirect("/");
	}
});

route.get("/", function(request, response)
{
	response.render("profile");
});