module.exports = function(passport, database)
{
	var route = require("express").Router();
	
	route.get("/", function(request, response) {response.render("login");});
	
	route.get("/google", passport.authenticate("google", {scope: ["https://www.googleapis.com/auth/userinfo.profile", "https://www.googleapis.com/auth/userinfo.email"]}));
	route.get("/facebook", passport.authenticate("facebook", {scope: ["email"]}));
	route.get("/linkedin", passport.authenticate("linkedin", {scope: ["r_basicprofile", 'r_emailaddress']}));
	
	route.get("/google/again", passport.authenticate("google", {successRedirect: "/profile", failureRedirect: "/login"}));
	route.get("/facebook/again", passport.authenticate("facebook", {successRedirect: "/profile", failureRedirect: "/login"}));
	route.get("/linkedin/again", passport.authenticate("linkedin", {successRedirect: "/profile", failureRedirect: "/login"}));
	
	return route;
}