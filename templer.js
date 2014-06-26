module.exports = function(application)
{
	var handlebars = require("express3-handlebars");
	var configuration = require("./templer.configuration.js");
	
	application.engine("handlebars", handlebars(configuration));
	application.set("view engine", "handlebars");
	application.set("views", __dirname + "/content_directory/");
}