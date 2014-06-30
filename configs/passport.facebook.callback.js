module.exports = function(database)
{
	return function(access, refresh, profile, done)
	{
		console.log(profile);
		profile = profile._json;
		
		database.users.findOne({id: profile.id}, {}, function(error, user)
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
					picture: "http://graph.facebook.com/" + profile.id + "/picture"
				};
				
				database.users.insert(user);
				done(null, user);
			}
		});
	}
}