const passport = require('passport');
require('dotenv').config()
const GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      //callbackURL: process.env.REDIRECT_URI, // This should match the frontend's redirect URL, does not be specified!
    },
    (accessToken, refreshToken, profile, done) => {
      // Here you can handle the user's profile returned by Google
      // and perform any necessary operations (e.g., database updates)
      // or authentication logic.
      // The `profile` object contains user information.
      console.log(profile);
      done(null, profile);
    }
  )
);

// Set up session serialization/deserialization
passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

module.exports = passport;