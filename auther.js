module.exports = function(passport, mongo)
{
	passport.serializeUser(function(user, done) {done(null, user);});
	passport.deserializeUser(function(user, done) {done(null, user);});
	
	
	
	var google_callback = require("./auther.google.callback.js")(mongo);
	var google_credentials = require("./auther.google.credentials.js");

	var GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;
	passport.use(new GoogleStrategy(google_credentials, google_callback));
}