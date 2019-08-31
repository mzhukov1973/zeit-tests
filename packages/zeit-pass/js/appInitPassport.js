/************************************************************/
/* ToDo:                                                    */
/*  - Insure singleton pattern for Passport.js instance     */
/************************************************************/
const passport = require('passport')

const passportInitLocalStrategy = passportStratLocalBackEnd => {
  const PassportStrategy  = require('passport-local').Strategy
  const backEnds_users    = require('./backEnds/users')(passportStratLocalBackEnd)
  passport.use(
    new PassportStrategy(
      { 'usernameField':'username', 'passwordField':'password', 'passReqToCallback':false },
      (username,password,done) => backEnds_users.authenticateByCredObj(
        {'username':username, 'password':password},
        (err,user) => {
          if (err) { return done(err) }
          return done(null, (!user)?false:user, {message:(!user)?'Incorrect username/password.':'Everything is correct.'})
        }
      )
    )
  )
  passport.serializeUser((user,done) => done(null,user.id))
  passport.deserializeUser((id,done) => backEnds_users.findUserById(id,(err,user)=>done(err?err:null,err?null:user)))
}

const passportInitGoogleOAuth20Strategy = () => {
//  const PassportStrategy = require('passport-google-oauth20').OAuth2Strategy
//  passport.use(new GoogleStrategy( {clientID:................, clientSecret:......., callbackURL:'https://mzhukov1973.github.io/pass-express/auth/google/callback'}, (accessToken, refreshToken, profile, done) => User.findOrCreate({googleId:profile.id},(err,user)=>done(err,user)) ))
}

const passportInitGoogleStrategy = () => {
//  const PassportStrategy = require('passport-google')...
//  passport.use()
}

const passportInitTwitterStrategy = () => {
//  const PassportStrategy = require('passport-twitter').Strategy
//  passport.use(new PassportStrategy( {consumerKey:...., consumerSecret:....., callbackURL:'https://mzhukov1973.github.io/pass-express/auth/twitter/callback'}, (token, tokenSecret, profile, done) => User.findOrCreate({twitterId:profile.id}, (err,user)=>done(err?err:null,err?null:user)) ))
}

const passportInitAuth0Strategy = () => {
//  const PassportStrategy = require('passport-auth0')...
//  passport.use()
}

const passportInitGitHub2Auth0Strategy = () => {
//  const PassportStrategy = require('passport-github2')...
//  passport.use()
}



module.exports = (passportStrat='local', passportStratLocalBackEnd='local') => {
  switch (passportStrat) {
    case 'local': 
     passportInitLocalStrategy(passportStratLocalBackEnd)
     break
    case 'google-oauth20':
     passportInitGoogleOAuth20Strategy()
     break
    case 'google':
     passportInitGoogleStrategy()
     break
    case 'twitter':
     passportInitTwitterStrategy()
     break
    case 'auth0':
     passportInitAuth0Strategy()
     break
    case 'github2':
     passportInitGitHub2Strategy()
     break
    default:
     passportInitLocalStrategy(passportStratLocalBackEnd)
     break
  }
  return passport
}
