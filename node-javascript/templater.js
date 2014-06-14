module.exports = function(handlebars, express)
{
	handlebars = handlebars(
	{
		layoutsDir: "layout_directory/",
		defaultLayout: "default.layout.handlebars",
		partialsDir: "partials_directory/"
	});

	express.engine("handlebars", handlebars);
	express.set("view engine", "handlebars");
	express.set("views", "content_directory/");
}