module.exports = function(passport, mongo)
{
	var credentials = {
		clientSecret: "jUj8mZt3F3yelQaoP3lyPBiU",
		clientID: "106937785186-n1dej754rouusvsgmrsibdq714pm47ii.apps.googleusercontent.com",
		callbackURL: "http://localhost:1271/login/google/again/"
	}
	
	var callback = function(access, refresh, profile, done)
	{
		profile = profile._json;
		
		mongo.users.findOne({id: profile.id}, {}, function(error, user)
		{
			if(user)
			{
				done(null, user);
			}
			else
			{
				var user = {
					id: profile.id,
					name: profile.name,
					email: profile.email,
					picture: profile.picture
				};
				
				mongo.users.insert(user);
				done(null, user);
			}
		});
	}
	
	passport.serializeUser(function(user, done) {done(null, user);});
	passport.deserializeUser(function(user, done) {done(null, user);});
	
	var GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;
	passport.use(new GoogleStrategy(credentials, callback));
}