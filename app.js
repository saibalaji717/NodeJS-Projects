const express = require("express");
const authentication = require("./routes/authentication.js");
const passportSetup = require("./config/passport-setup");
const mongoose = require("mongoose");
const cookieSession = require("cookie-session");
const passport = require("passport");
mongoose
  .connect(
    "mongodb+srv://balaji:balaji@cluster0.j6fdd.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
  )
  .then((res) => {
    console.log("connected");
  });

const app = express();
app.set("view engine", "ejs");
const logoutCheck = (req, res, next) => {
  if (!req.user) {
    res.redirect("/");
  } else {
    next();
  }
};
const loginCheck = (req, res, next) => {
  if (req.user) {
    res.redirect("/urlshortner");
  } else {
    next();
  }
};
app.use(
  cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: ["fghjklfghjk"],
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use("/auth", authentication);
app.get("/", loginCheck, (req, res) => {
  res.render("index");
});
app.get("/urlshortner", logoutCheck, (req, res) => {
  res.render("urlShortner");
});
app.get("*", (req, res) => {
  res.status("404").send("Page not found");
});
app.listen(3000, () => console.log("Server is running in port 3000"));
