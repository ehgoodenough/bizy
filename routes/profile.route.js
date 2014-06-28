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

/*route.get("/profile/*", function(request, response)
{
	var path = request.params[0];

	mongo.users.findOne({id: path}, {}, function(error, user)
	{
		if(user)
		{
			response.render("profile", {user: user});
		}
		else
		{
			response.render("error");
		}
	});
});*/