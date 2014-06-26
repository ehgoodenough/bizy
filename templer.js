module.exports = function(application, handlebars)
{
	var templer = handlebars(CONFIGURATION);
	application.engine("handlebars", templer);
	application.set("view engine", "handlebars");
	application.set("views", CONTENT_DIRECTORY);
}

var CONTENT_DIRECTORY = "content_directory/";
var CONFIGURATION = require("./templer.configuration.js");