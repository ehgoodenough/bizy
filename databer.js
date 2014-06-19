module.exports = function(mongo)
{
	mongo.users.drop();

	var placeholders = require("./databer.placeholders.js");
	
	for(var index in placeholders)
	{
		mongo.users.insert(placeholders[index]);
	}
}