module.exports = function(database)
{
	var route = require("express").Router();
	
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

	route.get("/*", function(request, response, next)
	{
		var path = request.params[0];
		
		database.users.findOne({first_name: new RegExp(path, "i")}, {}, function(error, user)
		{
			if(user)
			{
				response.render("profile", {them: user});
			}
			else
			{
				next();
			}
		});
	});
	
	return route;
}