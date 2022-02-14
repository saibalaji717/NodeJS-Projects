const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const FacebookStrategy = require("passport-facebook");
const GitHubStrategy = require("passport-github2").Strategy;
const userDB = require("../mongoose/userSchema");
const keys = require("./keys.js");
const chalk = require("chalk");
passport.serializeUser((user, done) => {
  done(null, user.id);
});
passport.deserializeUser((id, done) => {
  userDB.findById(id).then((user) => {
    done(null, user);
  });
});

passport.use(
  new GoogleStrategy(
    {
      //setting up new strategy
      callbackURL: "/auth/google/redirect",
      clientID: keys.clientID,
      clientSecret: keys.clientSecret,
    },
    (accessToken, refreshToken, profile, done) => {
      // console.log(chalk.bgRed("Profie values"));
      // console.log(chalk.bgBlue(JSON.stringify(profile)));
      // console.log(profile._json.name);
      // console.log(profile._json.email);
      // console.log(profile._json.sub);
      userDB.findOne({ googleID: profile._json.sub }).then((user) => {
        console.log(user, "search response");

        if (user) {
          console.log("User already present");
          done(null, user);
        } else {
          userDB
            .create({
              googleID: profile._json.sub,
              name: profile._json.name,
              username: profile._json.email,
            })
            .then((user) => {
              console.log(user, "data creation");
              done(null, user);
            });
        }
      });

      //callback function
    }
  )
);
passport.use(
  new GitHubStrategy(
    {
      clientID: "29b0c2a2aa31e826e029",
      clientSecret: "c151dd75ee275cec965f20471c736cb24a060a03",
      callbackURL: "http://localhost:3000/auth/github/redirect",
    },
    function (accessToken, refreshToken, profile, done) {
      console.log(chalk.bgRed(JSON.stringify(profile)));
      userDB.findOne({ gitID: profile.id }).then((user) => {
        console.log(user, "search response");

        if (user) {
          console.log("User already present");
          done(null, user);
        } else {
          userDB
            .create({
              gitID: profile.id,
              name: profile.displayName,
              username: profile.username,
            })
            .then((user) => {
              console.log(user, "data creation");
              done(null, user);
            });
        }
      });
    }
  )
);
passport.use(
  new FacebookStrategy(
    {
      clientID: 497241535078208,
      clientSecret: "94d05ff1e325a48601cb274e4cab2483",
      callbackURL: "http://localhost:3000/auth/facebook/redirect",
    },
    function (accessToken, refreshToken, profile, cb) {
      console.log(chalk.bgRed(JSON.stringify(profile)));
    }
  )
);
