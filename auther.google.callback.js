module.exports = function(mongo)
{
	return function(access, refresh, profile, done)
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
					name: profile.name,
					email: profile.email,
					google_id: profile.id,
					picture: profile.picture
				};
				
				mongo.users.insert(user);
				done(null, user);
			}
		});
	}
}