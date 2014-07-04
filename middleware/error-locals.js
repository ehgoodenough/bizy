module.exports = function(request, response, next)
{
	response.locals.error = request.flash("error");
	next();
}