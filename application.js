///////////////////////////////////////////////////
/////////////////////IMPORTING////////////////////
/////////////////////////////////////////////////

var express = require("express");
var mongo = require("mongojs");
var passport = require("passport");
var handlebars = require("express3-handlebars");

///////////////////////////////////////////////////
////////////////////CONFIGURING///////////////////
/////////////////////////////////////////////////

var application = express();

application.use(require("cookie-parser")());
application.use(require("body-parser").json());
application.use(require("body-parser").urlencoded({extended: true}));
application.use(require("express-session")({secret: "getting bizy!!"}));

///////////////////////////////////////////////////
////////////////////DATABASING////////////////////
/////////////////////////////////////////////////

var database = mongo("bizy", ["users"]);
require("./placeholders.js")(database);

///////////////////////////////////////////////////
////////////////////TEMPLATING////////////////////
/////////////////////////////////////////////////

var options = require("./configs/handlebars.options.js");

application.engine("handlebars", handlebars(options));
application.set("view engine", "handlebars");
application.set("views", "./content");

///////////////////////////////////////////////////
//////////////////AUTHENTICATION//////////////////
/////////////////////////////////////////////////

passport.serializeUser(function(user, done) {done(null, user);});
passport.deserializeUser(function(user, done) {done(null, user);});

var GoogleCallback = require("./configs/passport.google.callback.js")(database);
var GoogleCredentials = require("./configs/passport.google.credentials.js");
var GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;
passport.use(new GoogleStrategy(GoogleCredentials, GoogleCallback));

var FacebookStrategy = require("passport-facebook").Strategy;
passport.use(new FacebookStrategy(
	{
		clientID: "919723268054532",
		clientSecret: "85acf133dd81efc2889021d90bc41eb3",
		callbackURL: "http://127.0.0.1:1271/login/facebook/again/",
		enableProof: false
	},
	function(access, refresh, profile, done)
	{
		profile = profile._json;
		console.log(profile);
		
		done(null);
	}
));

application.use(passport.initialize());
application.use(passport.session());

//todo: put this authentication interface into a route module.

application.get("/login/google", passport.authenticate("google", {scope: ["https://www.googleapis.com/auth/userinfo.profile", "https://www.googleapis.com/auth/userinfo.email"]}));
application.get("/login/google/again", passport.authenticate("google", {successRedirect: "/profile", failureRedirect: "/"}));
application.get("/login/facebook", passport.authenticate("facebook"));
application.get("/login/facebook/again", passport.authenticate("facebook", {successRedirect: "/profile", failureRedirect: "/login"}));
application.get("/logout", function(request, response) {request.logout(); response.redirect("/");});

///////////////////////////////////////////////////
/////////////////////ROUTING//////////////////////
/////////////////////////////////////////////////

application.use(express.static("./resources"));

application.use(function(request, response, next)
{
	if(request.isAuthenticated())
	{
		response.locals.me = request.user;
	}
	
	next();
});

application.use("/", require("./routes/splash.route.js")());
application.use("/profile", require("./routes/profile.route.js")(database));

application.get("*", function(request, response)
{
	response.render("error");
});

///////////////////////////////////////////////////
////////////////////LISTENING/////////////////////
/////////////////////////////////////////////////

var port = process.env.PORT || 1271;
console.log("Listening on " + port);
application.listen(port);