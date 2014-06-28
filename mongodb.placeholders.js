module.exports = function(database)
{
	database.users.drop();
	
	for(var index in placeholders)
	{
		database.users.insert(placeholders[index]);
	}
}

var placeholders = [
	{
		name: "Lenardo Da Vinci",
		picture: "/images/davinci.jpg"
	}
];