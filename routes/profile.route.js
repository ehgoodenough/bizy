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
		response.redirect("/profile/" + request.user.user_name);
	});

	route.get("/*", function(request, response, next)
	{
		var path = request.params[0];
		
		database.users.findOne({user_name: path}, {}, function(error, user)
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