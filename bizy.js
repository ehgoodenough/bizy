///////////////////////////////////////////////////
/////////////////////IMPORTING////////////////////
/////////////////////////////////////////////////

var express = require("express");
var mongo = require("mongojs");
var passport = require("passport");
var handlebars = require("express3-handlebars");

///////////////////////////////////////////////////
////////////////////CONFIGURING///////////////////
/////////////////////////////////////////////////

var application = express();
application.use(require("cookie-parser")());
application.use(require("body-parser").json());
application.use(require("body-parser").urlencoded({extended: true}));
application.use(require("express-session")({secret: "getting bizy!!"}));

///////////////////////////////////////////////////
////////////////////DATABASING////////////////////
/////////////////////////////////////////////////

var database = mongo("bizy", ["users"]);
require("./mongodb.placeholders.js")(database);

///////////////////////////////////////////////////
////////////////////TEMPLATING////////////////////
/////////////////////////////////////////////////

var configuration = require("./handlebars.options.js");
application.engine("handlebars", handlebars(configuration));
application.set("views", "./content_directory/");
application.set("view engine", "handlebars");

///////////////////////////////////////////////////
//////////////////AUTHENTICATION//////////////////
/////////////////////////////////////////////////

passport.serializeUser(function(user, done) {done(null, user);});
passport.deserializeUser(function(user, done) {done(null, user);});

var google_credentials = require("./passport.google.credentials.js");
var google_callback = require("./passport.google.callback.js")(database);
var GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;
passport.use(new GoogleStrategy(google_credentials, google_callback));

application.use(passport.initialize());
application.use(passport.session());

application.get("/login/google", passport.authenticate("google", {scope: ["https://www.googleapis.com/auth/userinfo.profile", "https://www.googleapis.com/auth/userinfo.email"]}));
application.get("/login/google/again", passport.authenticate("google", {successRedirect: "/profile", failureRedirect: "/"}));
application.get("/logout", function(request, response) {request.logout(); response.redirect("/");});

///////////////////////////////////////////////////
/////////////////////ROUTING//////////////////////
/////////////////////////////////////////////////

application.use(express.static("./resource_directory"));

application.use("/", require("./routes/splash.route.js"));
application.use("/profile", require("./routes/profile.route.js"));

///////////////////////////////////////////////////
////////////////////LISTENING/////////////////////
/////////////////////////////////////////////////

var port = process.env.PORT || 1271;
console.log("Listening on " + port);
application.listen(port);