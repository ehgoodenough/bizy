module.exports = function(request, response, next)
{
	if(request.isAuthenticated())
	{
		response.locals.me = request.user;
	}
	
	next();
}