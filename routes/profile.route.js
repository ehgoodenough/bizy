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
	
	route.post("/", function(request, response)
	{
		var data = {username: request.body.username};
		var _id = require("mongojs").ObjectId(request.user._id);
		
		database.users.findOne(data, {}, function(error, user)
		{
			if(user)
			{
				request.flash("error", 123);
				response.redirect("/profile");
			}
			else
			{
				database.users.update({_id: _id}, {$set: data}, function()
				{
					request.user.username = request.body.username;
					response.redirect("/profile");
				});
			}
		});
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