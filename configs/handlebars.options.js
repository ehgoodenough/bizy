module.exports.layoutsDir = "./layouts";
module.exports.defaultLayout = "default.layout.handlebars";
module.exports.partialsDir = "./partials";

module.exports.helpers =
{
	"editable": function()
	{
		return this.me.username == this.them.username;
	}
}