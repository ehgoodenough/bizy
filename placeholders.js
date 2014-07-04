var placeholders = [
	{
		username: "davinci",
		firstname: "Leonardo",
		lastname: "Vinci",
		picture: "/images/davinci.jpg"
	}
];

module.exports = function(database)
{
	database.users.drop();
	
	for(var index in placeholders)
	{
		database.users.insert(placeholders[index]);
	}
}