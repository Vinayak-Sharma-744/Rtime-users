import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { getRoleByName } from '../services/adminServices';
import { createUser } from '../services/userServices';
import dotenv from "dotenv";
dotenv.config();
// passport configuration
  passport.serializeUser((user: any, done) => {
    done(null, user);
  });
  passport.deserializeUser((user: any, done) => {
    done(null, user);
  });
  
  // google strategy authentication with passport 
  passport.use(new GoogleStrategy({
    clientID: String(process.env.GOOGLE_CLIENT_ID),
    clientSecret: String(process.env.GOOGLE_CLIENT_SECRET),
    callbackURL: String(process.env.GOOGLE_CALLBACK_URL)
  },
    // passport callback function 
    (accessToken: string, refreshToken: string, profile: any, done) => {
      const email = profile.emails?.[0].value;
      if (!email || !email.endsWith("@relinns.com")) {
        return done(null, undefined)
      }
      const userData:any = {
        name: profile.displayName,
        email: profile.emails[0].value,
        profilePic: profile.photos[0].value,
        status: true,
        emp_id: "",
        time: "",
      }
      createUser(userData)
        .then((result: any) => {
        return done(null, result);
      })
        .catch((err) => {
          return done(err, undefined);
        });
      // return done(null, profile);
    }
  ));