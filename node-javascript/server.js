var express = require("express");
var connect = require("connect");
var passport = require("passport");
var flash = require("connect-flash");
var handlebars = require("express3-handlebars");


var mongo = require("mongojs");
mongo = mongo("getbizy", ["users"]);
mongo.users.drop();


var express = express();
express.use(flash());
express.use(connect.json());
express.use(connect.urlencoded());
express.use(connect.cookieParser());
express.use(connect.session({secret: "bizy!"}));
express.use(passport.initialize());
express.use(passport.session());


require("./templater.js")(handlebars, express);
require("./authenticator.js")(passport, mongo);
require("./router.js")(express, passport, mongo);


var port = process.env.PORT || 1271;
console.log("127.0.0.1:" + port);
express.listen(port);