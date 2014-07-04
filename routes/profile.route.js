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
				request.flash("error", {message: "That username already exists!"});
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

	route.get("/:username", function(request, response, next)
	{
		var path = request.params.username;
		
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

	route.get("/:username/edit", function(request, response, next)
	{
		if(request.user.username == request.params.username)
		{
			response.render("edit");
		}
		else
		{
			response.redirect("/profile/" + request.params.username);
		}
	});

	route.post("/:username/edit", function(request, response, next)
	{
		if(request.user.username == request.params.username)
		{
			var _id = require("mongojs").ObjectId(request.user._id);
			database.users.update({_id: _id}, {$set: request.body});
			
			request.user.username = request.body.username;
			request.user.description = request.body.description;
			
			response.redirect("/profile/" + request.user.username);
		}
		else
		{
			response.redirect("/profile/" + request.params.username);
		}
	});
	
	return route;
}