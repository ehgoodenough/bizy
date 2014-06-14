module.exports = function(passport, mongo)
{
	passport.serializeUser(function(user, done) {done(null, user);});
	passport.deserializeUser(function(user, done) {done(null, user);});
	
	var creds = require("./passport.creds.js");
	
	var callback = function(access, refresh, profile, done)
	{
		profile = profile._json;;
		
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
	
	var GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;
	passport.use(new GoogleStrategy(creds, callback));
}