const router = require("express").Router();
const { application } = require("express");
const passport = require("passport");
// const loginCheck = (req, res, next) => {
//   if (!req.user) {
//     res.render("index");
//   } else {
//     next();
//   }
// };

router.get("/login", (req, res) => {
  res.send("Login feature coming soon");
});
router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);
router.get("/facebook", passport.authenticate("facebook"));
router.get(
  "/github",
  passport.authenticate("github", { scope: ["profile", "email"] })
);
router.get("/forgotpassword", (req, res) => {
  res.send("Forgot password feature coming soon");
});
router.get("/signup", (req, res) => {
  res.send("Sign Up process under development.... Will be deployed soon");
});
router.get("/resetpassword", (req, res) => {
  res.send("Reset Password feature coming soon");
});
router.get(
  "/google/redirect",

  passport.authenticate("google"),
  (req, res) => {
    res.redirect("/urlshortner");
  }
);
router.get("/facebook/redirect", (req, res) => {
  res.send("Under development");
});
router.get(
  "/github/redirect",
  passport.authenticate("github", { failureRedirect: "/" }),
  function (req, res) {
    // Successful authentication, redirect home.
    res.redirect("/urlshortner");
  }
);
module.exports = router;
