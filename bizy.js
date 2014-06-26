var express = require("express");
var connect = require("connect");
var mongo = require("mongojs");
var passport = require("passport");
var flash = require("connect-flash");
var handlebars = require("express3-handlebars");


express = express();
express.use(flash());
express.use(connect.json());
express.use(connect.urlencoded());
express.use(connect.cookieParser());
express.use(connect.session({secret: "getting bizy"}));
express.use(passport.initialize());
express.use(passport.session());


mongo = mongo("bizy", ["users"]);


require("./databer.js")(mongo);
require("./auther.js")(passport, mongo);
require("./viewer.js")(handlebars, express);
require("./router.js")(express, passport, mongo);


var port = process.env.PORT || 1271;
console.log("Listening on " + port);
express.listen(port);