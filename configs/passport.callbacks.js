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
					first_name: profile.given_name,
					last_name: profile.family_name,
					email: profile.email,
					google_id: profile.id,
					picture: profile.picture,
					user_name: new String(profile.given_name + "-" + profile.family_name).toLowerCase()
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
					first_name: profile.first_name,
					last_name: profile.last_name,
					email: profile.email,
					facebook_id: profile.id,
					picture: "http://graph.facebook.com/" + profile.id + "/picture?type=large",
					user_name: new String(profile.first_name + "-" + profile.last_name).toLowerCase()
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
					first_name: profile.firstName,
					last_name: profile.lastName,
					email: profile.emailAddress,
					linkedin_id: profile.id,
					picture: profile.pictureUrl,
					user_name: new String(profile.firstName + "-" + profile.lastName).toLowerCase()
				};
				
				database.users.insert(user);
				done(null, user);
			}
		});
	}
}