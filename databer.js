var placeholders = [
	{
		name: "Lenardo Da Vinci",
		picture: "/images/pics/Leonardo_Da-Vinci-img1.jpg"
	}
];

module.exports = function(mongo)
{
	mongo.users.drop();

	for(var index in placeholders)
	{
		mongo.users.insert(placeholders[index]);
	}
}