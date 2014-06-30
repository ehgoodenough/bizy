module.exports = function(database)
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
					picture: profile.picture
				};
				
				database.users.insert(user);
				done(null, user);
			}
		});
	}
}