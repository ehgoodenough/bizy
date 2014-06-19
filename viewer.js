module.exports = function(handlebars, express)
{
	var configuration = require("./viewer.configuration.js");
	
	handlebars = handlebars(configuration);
	
	express.engine("handlebars", handlebars);
	express.set("view engine", "handlebars");
	express.set("views", "content_directory/");
}