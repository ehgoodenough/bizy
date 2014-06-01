var express = require("express");
var connect = require("connect");

var server = express();

//////////////////////////////////////////////
//////////////////TEMPLATING/////////////////
////////////////////////////////////////////

var handlebars = require("express3-handlebars");
handlebars = handlebars(require("./handlebars.options.js"));

server.engine("handlebars", handlebars);
server.set("view engine", "handlebars");
server.set("views", "content_directory/");

//////////////////////////////////////////////
/////////////////DATABASING//////////////////
////////////////////////////////////////////

var mongo = require("mongojs");
mongo = mongo("getbizy", ["users"]);
mongo.users.drop();

//////////////////////////////////////////////
///////////////AUTHENTICATING////////////////
////////////////////////////////////////////

var passport = require("passport");
require("./passport.config.js")(passport, mongo);

server.use(connect.cookieParser());
server.use(connect.session({secret: "gotbizy"}));
server.use(passport.initialize());
server.use(passport.session());

//////////////////////////////////////////////
///////////////////ROUTING///////////////////
////////////////////////////////////////////

server.use("/", express.static("resource_directory/"));
server.use("/profile", express.static("resource_directory/"));

require("./router.config.js")(server, passport, mongo);

//////////////////////////////////////////////
//////////////////LISTENING//////////////////
////////////////////////////////////////////

var port = process.env.PORT || 1271;
console.log("127.0.0.1:" + port);
server.listen(port);