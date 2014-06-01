module.exports = function(server, passport, mongo)
{
	var prefs = [
		"Wants a short term fling",
		"Looking for a long term partner",
		"Already in an engagement",
		"It's complicated"
	];
	
	function getRandomPref()
	{
		return prefs[Math.floor(Math.random() * prefs.length)];
	}
	
	var dummies = [
		{
			name: "Tom Anderson",
			picture: "images/pics/myspacetom.jpg",
			skills: "HTML,CSS,Web Development,JavaScript,Django,Python,HTML5,Business Management,System Administrator,Networking,Social Networking",
			description: "I like programming, beer, and hanging out with friends."
		},
		{
			name: "Justin Jackson",
			picture: "images/pics/justin-jackson-black-and-white-canada-profile.jpg",
			skills: "Networking,Fiber Optics,cryptography,SSL,Linux,Tanisology",
			description: "I love Java, can’t get enough of Java.  I’m a Java developer on the island of Java drinking Java."
		},
		{
			name: "R. Tis",
			picture: "images/pics/One-Trippy-Profile-Pic.jpg",
			skills: "Rapping,video production,comedy",
			description: "I make music videos and perform Epic Rap Battles of History."
		},
		{
			name: "Alicia Night",
			picture: "images/pics/alicia.png",
			skills: "Visual aesthetics,medieval martial arts,hair styling,photography,stunt doubling,C++",
			description: "I am a renaissance woman."
		},
		{
			name: "Chris Palmer",
			picture: "images/pics/chris_palmer_profile_11.jpg",
			skills: "Java development,Java Enterprise,Java espresso making",
			description: " I love Java, can’t get enough of Java.  I’m a Java developer on the island of Java drinking Java."
		},
		{
			name: "Steve Jobs",
			picture: "images/pics/SteveJobs-Wide.jpg",
			skills: "OSX,C,Marketing,Business Management,Jujitsu,Baking",
			description: "I am a hard working, and successful business manager. I would love to collaborate on innovating ideas."
		},
		{
			name: "Richard Stallman",
			picture: "images/pics/Portrait_-_Denmark_DTU_2007-3-31.jpg",
			skills: "GNU/Linux,GNU/EMACS,Paranoia,GNU/GNU,Installing gentoo,IBM Thinkpads",
			description: "I like furthering the field of computing in odd, but effective ways."
		},
		{
			name: "Lenardo Da Vinci",
			picture: "images/pics/Leonardo_Da-Vinci-img1.jpg",
			skills: "Painting,inventing,sculpting,drawing,math,science,physics,animals,partying,keg-stands,dizzy bat,beer pong",
			description: "I am the man of the renaissance!"
		},
		{
			name: "Conner Stephens",
			picture: "images/pics/connor.jpg",
			skills: "Python,C,Java,Linux,Arch,Debian,Kali,Metasploit,Penetration Testing,Information Security,Music History,Music Performance,Music Theory,Music Composition",
			description: "I like pina-coladas and long walks on the beach. I'm nothing but trouble. lol"
		}
	]
	
	for(var i in dummies)
	{
		dummies[i].skills = dummies[i].skills.split(",");
		dummies[i].preference = getRandomPref();
		dummies[i].email = "edwincstephens@gmail.com";
	}
	
	var connor = dummies[dummies.length-1];
	connor.preference = "Waiting for that *certain someone*";
	
	server.get("/", function(request, response)
	{
		response.render("splash");
	});
	
	server.get("/profile/connor", ensureAuthentication, function(request, response)
	{
		response.render("connor", {me: request.user, them: connor});
	});
	
	server.get("/profile/*", ensureAuthentication, function(request, response)
	{
		var route = request.params[0];
		
		if(route == new String())
		{
			response.render("profile", {me: request.user});
		}
		else
		{
			mongo.users.findOne({id: route}, {}, function(error, user)
			{
				if(user)
				{
					response.render("profile", {me: request.user, them: user});
				}
				else
				{
					response.render("error");
				}
			});
		}
	});
	
	server.get("/next", function(request, response)
	{
		var dummy = dummies.shift();
		dummies.push(dummy);
		
		response.render("profile", {me: request.user, them: dummy});
		/*mongo.users.findOne({}, {}, function(error, user)
		{
			console.log("!", user, error);
			if(user)
			{
				response.redirect("/profile/" + user.id);
			}
		});*/
	});
	
	server.get("/edit", ensureAuthentication, function(request, response)
	{
		response.render("edit", {me: request.user});
	});
	
	server.get("/login/google", passport.authenticate("google", {scope: ["https://www.googleapis.com/auth/userinfo.profile", "https://www.googleapis.com/auth/userinfo.email"]}));
	server.get("/login/google/again", passport.authenticate("google", {successRedirect: "/profile", failureRedirect: "/"}));
	server.get("/logout", function(request, response) {request.logout(); response.redirect("/");});
	
	server.all("*", function(request, response)
	{
		response.render("error", {me: request.user});
	});
}

function ensureAuthentication(request, response, next)
{
	if(request.isAuthenticated())
	{
		return next();
	}
	else
	{
		response.redirect("/");
	}
}