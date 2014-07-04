module.exports = function(database)
{
	var route = require("express").Router();
	
	route.use(require("../middleware/authed-access"));

	route.get("/", function(request, response)
	{
		if(request.user.username)
		{
			response.redirect("/profile/" + request.user.username);
		}
		else
		{
			response.render("username");
		}
	});

	route.get("/*", function(request, response, next)
	{
		var path = request.params[0];
		
		database.users.findOne({username: path}, {}, function(error, user)
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