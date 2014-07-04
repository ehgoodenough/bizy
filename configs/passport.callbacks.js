module.exports.google = function(database)
{
	return function(access, refresh, profile, done)
	{
		profile = profile._json;
		
		database.users.findOne({google_id: profile.id}, {}, function(error, user)
		{
			if(user)
			{
				done(null, user);
			}
			else
			{
				var user = {
					firstname: profile.given_name,
					lastname: profile.family_name,
					email: profile.email,
					google_id: profile.id,
					picture: profile.picture
				};
				
				database.users.insert(user);
				done(null, user);
			}
		});
	}
}

module.exports.facebook = function(database)
{
	return function(access, refresh, profile, done)
	{
		profile = profile._json;
		
		database.users.findOne({facebook_id: profile.id}, {}, function(error, user)
		{
			if(user)
			{
				done(null, user);
			}
			else
			{
				var user = {
					firstname: profile.first_name,
					lastname: profile.last_name,
					email: profile.email,
					facebook_id: profile.id,
					picture: "http://graph.facebook.com/" + profile.id + "/picture?type=large"
				};
				
				database.users.insert(user);
				done(null, user);
			}
		});
	}
}

module.exports.linkedin = function(database)
{
	return function(access, refresh, profile, done)
	{
		profile = profile._json;
		
		database.users.findOne({linkedin_id: profile.id}, {}, function(error, user)
		{
			if(user)
			{
				done(null, user);
			}
			else
			{
				var user = {
					firstname: profile.firstName,
					lastname: profile.lastName,
					email: profile.emailAddress,
					linkedin_id: profile.id,
					picture: profile.pictureUrl
				};
				
				database.users.insert(user);
				done(null, user);
			}
		});
	}
}