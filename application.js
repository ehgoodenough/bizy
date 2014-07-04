///////////////////////////////////////////////////
/////////////////////importing////////////////////
/////////////////////////////////////////////////

var express = require("express");
var mongo = require("mongojs");
var passport = require("passport");
var handlebars = require("express3-handlebars");

///////////////////////////////////////////////////
///////////////////instantiating//////////////////
/////////////////////////////////////////////////

var application = express();

///////////////////////////////////////////////////
////////////////////configuring///////////////////
/////////////////////////////////////////////////

application.use(require("cookie-parser")());
application.use(require("body-parser").json());
application.use(require("body-parser").urlencoded({extended: true}));
application.use(require("express-session")({secret: "getting bizy!!", saveUninitialized: true, resave: true}));

///////////////////////////////////////////////////
////////////////////databasing////////////////////
/////////////////////////////////////////////////

var database = mongo("bizy", ["users"]);
require("./placeholders.js")(database);

///////////////////////////////////////////////////
//////////////////authenticating//////////////////
/////////////////////////////////////////////////

passport.serializeUser(function(user, done) {done(null, user);});
passport.deserializeUser(function(user, done) {done(null, user);});

var passport_callbacks = require("./configs/passport.callbacks.js");
var passport_credentials = require("./configs/passport.credentials.js");

var google_credentials = passport_credentials.google;
var google_callback = passport_callbacks.google(database);
var GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;
passport.use(new GoogleStrategy(google_credentials, google_callback));

var facebook_credentials = passport_credentials.facebook;
var facebook_callback = passport_callbacks.facebook(database);
var FacebookStrategy = require("passport-facebook").Strategy;
passport.use(new FacebookStrategy(facebook_credentials, facebook_callback));

var linkedin_credentials = passport_credentials.linkedin;
var linkedin_callback = passport_callbacks.linkedin(database);
var LinkedinStrategy = require("passport-linkedin").Strategy;
passport.use(new LinkedinStrategy(linkedin_credentials, linkedin_callback));

application.use(passport.initialize());
application.use(passport.session());

///////////////////////////////////////////////////
////////////////////templating////////////////////
/////////////////////////////////////////////////

var options = require("./configs/handlebars.options.js");

application.engine("handlebars", handlebars(options));
application.set("view engine", "handlebars");
application.set("views", "./content");

///////////////////////////////////////////////////
/////////////////////routing//////////////////////
/////////////////////////////////////////////////

application.use(require("./utilities/expose-user-details"));

application.use(require("express").static("./resources"));

application.use("/", require("./routes/splash.route.js")());
application.use("/login", require("./routes/login.route.js")(passport, database));
application.use("/profile", require("./routes/profile.route.js")(database));

application.get("/logout", function(request, response) {request.logout(); response.redirect("/");});
application.get("*", function(request, response) {response.render("error");});

///////////////////////////////////////////////////
////////////////////listening/////////////////////
/////////////////////////////////////////////////

var port = process.env.PORT || 1271;
console.log("Listening on " + port);
application.listen(port);