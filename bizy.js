var express = require("express");
var mongo = require("mongojs");
var passport = require("passport");


var database = mongo("bizy", ["users"]);


application = express();
application.use(require("cookie-parser")());
application.use(require("body-parser").json());
application.use(require("body-parser").urlencoded({extended: true}));
application.use(require("express-session")({secret: "getting bizy!!"}));
//application.use(passport.initialize());
//application.use(passport.session());


require("./databer.js")(database);
require("./templer.js")(application);
//application.use(require("./auther.js")(database));
//application.use(require("./router.js")(database));


//application.use(express.static(__dirname + "/resource_directory"));
//application.get("/", function(request, response) {response.render("splash");});


var port = process.env.PORT || 1271;
console.log("Listening on " + port);
application.listen(port);