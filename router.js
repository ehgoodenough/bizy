module.exports = function(express, passport, mongo)
{
	//*express.use(require("connect").logger());
	express.use(require("express").static(__dirname + "/resource_directory"));

	express.use(function(request, response, next)
	{
		if(request.isAuthenticated())
		{
			response.locals.me = request.user;
		}

		next();
	});
	
	express.get("/", function(request, response)
	{
		response.render("splash");
	});
	
	express.get("/profile", ensureAuthentication, function(request, response)
	{
		response.render("profile");
	});

	express.get("/profile/*", ensureAuthentication, function(request, response)
	{
		var route = request.params[0];

		mongo.users.findOne({id: route}, {}, function(error, user)
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
	});
	
	express.get("/edit", ensureAuthentication, function(request, response)
	{
		response.render("edit");
	});
	
	express.get("/login/google", passport.authenticate("google", {scope: ["https://www.googleapis.com/auth/userinfo.profile", "https://www.googleapis.com/auth/userinfo.email"]}));
	express.get("/login/google/again", passport.authenticate("google", {successRedirect: "/profile", failureRedirect: "/"}));
	express.get("/logout", function(request, response) {request.logout(); response.redirect("/");});
	
	express.get("*", function(request, response)
	{
		response.render("error");
	});
}



function ensureAuthentication(request, response, next)
{
	if(request.isAuthenticated())
	{
		return next();
	}
	else
	{
		response.redirect("/");
	}
}