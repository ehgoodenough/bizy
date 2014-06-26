var express = require("express");
var mongo = require("mongojs");
var passport = require("passport");
var handlebars = require("express3-handlebars");


//mongo = mongo("bizy", ["users"]);


application = express();
application.use(require("cookie-parser")());
application.use(require("body-parser").json());
application.use(require("body-parser").urlencoded({extended: true}));
application.use(require("express-session")({secret: "getting bizy!!"}));

application.use(passport.initialize());
application.use(passport.session());


require("./templer.js")(application, handlebars);


application.use(express.static(__dirname + "/resource_directory"));
application.get("/", function(request, response) {response.render("splash");});


var port = process.env.PORT || 1271;
console.log("Listening on " + port);
application.listen(port);