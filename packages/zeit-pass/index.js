/*******************************************************************************************/
/* ToDo:                                                                                   */
/*  - Insure singleton pattern for session storage backend                                 */
/*  + Move to explicit use of express.Router                                               */
/*******************************************************************************************/

const util                                                                                           = require('util')
const locUtils                                                                                       = require('./js/locUtils')
const inspIt                                                                                         = locUtils.inspIt
const cColors                                                                                        = locUtils.cColors
const cCol                                                                                           = locUtils.cCol
const uid                                                                                            = locUtils.uid
const uuid_str                                                                                       = locUtils.uuid_str
const uuid_str2                                                                                      = uid.sync(24)
const pathLookup                                                                                     = locUtils.pathLookup
const path                                                                                           = require('path')
const express                                                                                        = require('express')
const compression                                                                                    = require('compression')
const ensureLoggedIn                                                                                 = require('connect-ensure-login').ensureLoggedIn
const cors                                                                                           = require('cors')

const f404 = (err,req,res,next) => res.status(404).render('404',ejsLoc('404',err))
const f500 = (err,req,res,next) => res.status(500).render('500',ejsLoc('500',err))

const app = express()

const viewOptions     = { delimiter:'%', strict:true, _with:false, rmWhitespace:true, async:false }
const viewLocalsBasic = {'lang':'en'}
const ejsLoc          = (titlePostfix='',user=false, authorised=false) => Object.assign({}, viewLocalsBasic, {'titlePostfix':titlePostfix,'user':user,'authorised':authorised})
const passportStrat   = 'local', passportStratLocalBackEnd = 'local', sessionStore = 'filestore'
const expressStatOpt  = {'maxAge':0, 'fallthrough':true, 'extensions':false, 'dotfiles':'ignore', 'immutable':false, 'lastModified':true, 'etag':true, 'index':false, 'redirect':true}
const ensLogInOpt     = {redirectTo:'/login', setReturnTo:true}
const passportAuthOpt = {'session':true, 'successRedirect':'/', 'successMessage':true, 'failureRedirect':'/login', 'failureMessage':true}
app.set('title',                  'Zeit™Passᵦ')
app.set('x-powered-by',           false       )
app.set('env',                    'production')
app.set('etag',                   'weak'      )
app.set('view cache',             true        )
app.set('strict routing',         false       )
app.set('query parser',           'simple'    )
app.set('case sensitive routing', false       )
app.set('views',                  __dirname + '/views')
app.set('view engine',            'ejs'               )
app.set('view options',           viewOptions         )
const session  = require('./js/appInitSessions')(sessionStore,  passportStratLocalBackEnd)
const passport = require('./js/appInitPassport')(passportStrat, passportStratLocalBackEnd)
app.use(session)
app.use(passport.initialize())
app.use(passport.session())
app.use(compression({'chunkSize':16384, 'level':9, 'memLevel':9, 'threshold':'1kb', 'windowBits':15}))
app.use(express.urlencoded({'extended':true, 'inflate':true, 'limit':'100kb', 'parameterLimit':1000, 'type':'application/x-www-form-urlencoded'}))
app.use(express.json())
app.use(express.static(path.join(__dirname,'/'),       expressStatOpt))
app.use(express.static(path.join(__dirname,'/static'), expressStatOpt))
app.use(cors())

/* Partially protected folders (content differs, depending on authentication & authorisation states) and public folders. */
app.get( '/',        (req,res,next)=>res.render('home', ejsLoc('',     req.user)) )
app.get( '/login',   (req,res,next)=>res.render('login',ejsLoc('Login',req.user)) )       /* 'true' here means that messagez will be stored in req.session.messages */
app.post('/login',   passport.authenticate('local', passportAuthOpt), (req,res,next)=>res.redirect(req.session.returnTo || '/'))
app.get( '/logout',  (req,res,next)=>{req.logout();res.redirect('/');} )
app.get( '/profile', ensureLoggedIn(ensLogInOpt), (req,res,next)=>res.render('profile',ejsLoc('User Profile',req.user)) )
/* Entirely protected folders (inaccessible unless authenticated and authorised): */
app.get('/profile/edit',          ensureLoggedIn(ensLogInOpt), pathLookup('/profile/edit'         ),  (req,res,next)=>res.render('profile',ejsLoc('User Profile',req.user)) )
app.get('/secretsLevelOne',       ensureLoggedIn(ensLogInOpt), pathLookup('/secretsLevelOne'      ),  (req,res,next)=>res.render('profile',ejsLoc('User Profile',req.user)) )
app.get('/secretsLevelOne/edit',  ensureLoggedIn(ensLogInOpt), pathLookup('/secretsLevelOne/edit' ),  (req,res,next)=>res.render('profile',ejsLoc('User Profile',req.user)) )
app.get('/secretsLevelTwo',       ensureLoggedIn(ensLogInOpt), pathLookup('/secretsLevelTwo'      ),  (req,res,next)=>res.render('profile',ejsLoc('User Profile',req.user)) )
app.get('/secretsLevelTwo/edit',  ensureLoggedIn(ensLogInOpt), pathLookup('/secretsLevelTwo/edit' ),  (req,res,next)=>res.render('profile',ejsLoc('User Profile',req.user)) )
app.get('/homeFolder/edit',       ensureLoggedIn(ensLogInOpt), pathLookup('/homeFolder/edit'      ),  (req,res,next)=>res.render('profile',ejsLoc('User Profile',req.user)) )
app.get('/homeFolder',            ensureLoggedIn(ensLogInOpt), pathLookup('/homeFolder'           ),  (req,res,next)=>res.render('profile',ejsLoc('User Profile',req.user)) )
app.get('/sharedFolderOne/edit',  ensureLoggedIn(ensLogInOpt), pathLookup('/sharedFolderOne/edit' ),  (req,res,next)=>res.render('profile',ejsLoc('User Profile',req.user)) )
app.get('/sharedFolderOne',       ensureLoggedIn(ensLogInOpt), pathLookup('/sharedFolderOne'      ),  (req,res,next)=>res.render('profile',ejsLoc('User Profile',req.user)) )
app.get('/sharedFolderTwo/edit',  ensureLoggedIn(ensLogInOpt), pathLookup('/sharedFolderTwo/edit' ),  (req,res,next)=>res.render('profile',ejsLoc('User Profile',req.user)) )
app.get('/sharedFolderTwo',       ensureLoggedIn(ensLogInOpt), pathLookup('/sharedFolderTwo'      ),  (req,res,next)=>res.render('profile',ejsLoc('User Profile',req.user)) )
app.get('/restrictedChat',        ensureLoggedIn(ensLogInOpt), pathLookup('/restrictedChat'       ),  (req,res,next)=>res.render('profile',ejsLoc('User Profile',req.user)) )
app.get('/managerialRSSFeed',     ensureLoggedIn(ensLogInOpt), pathLookup('/managerialRSSFeed'    ),  (req,res,next)=>res.render('profile',ejsLoc('User Profile',req.user)) )
app.get('/headOfficeCantinaMenu', ensureLoggedIn(ensLogInOpt), pathLookup('/headOfficeCantinaMenu'),  (req,res,next)=>res.render('profile',ejsLoc('User Profile',req.user)) )
app.get('/securityCams',          ensureLoggedIn(ensLogInOpt), pathLookup('/securityCams'         ),  (req,res,next)=>res.render('profile',ejsLoc('User Profile',req.user)) )

//app.get(  '/login',                                                               function(req,res){ res.render('login',   ejsLoc('Login',        req.user))    }  )
//app.get(  '/profile', ensureLoggedIn(),                        function(req,res){ res.render('profile', ejsLoc('User Profile', req.user))    }  )
////app.get(  '/index.html{0,1}[?.]{0,64}',                                           function(req,res){               res.redirect('/')                            }  )
//app.get(  '/logout',                                                              function(req,res){ req.logout(); res.redirect('/');                           }  )
//app.post( '/login',   passport.authenticate('local', {failureRedirect:'/login'}), function(req,res){               res.redirect(req.session.returnTo||'/')      }  )	/* implemented */
////app.get('/auth/google-oauth20', passport.authenticate('google',{scope:['https://www.googleapis.com/auth/plus.login']})                                                   )	/* implemented */
////app.get('/auth/google-oauth20/callback', passport.authenticate('google', {failureRedirect:'/login'}), function(req,res){res.redirect(req.session.returnTo || '/')}       )	/* implemented */
//app.get('/auth/google-oauth20',          function(req,res){ res.render('auth-google')     })	/* placeholders/stubs */
//app.get('/auth/google-oauth20/callback', function(req,res){ res.redirect('/auth/google')  })	/* placeholders/stubs */
//app.get('/auth/google',                  function(req,res){ res.render('auth-google')     })	/* placeholders/stubs */
//app.get('/auth/google/callback',         function(req,res){ res.redirect('/auth/google')  })	/* placeholders/stubs */
//app.get('/auth/twitter',                 function(req,res){ res.render('auth-twitter')    })	/* placeholders/stubs */
//app.get('/auth/twitter/callback',        function(req,res){ res.redirect('/auth/twitter') })	/* placeholders/stubs */
//app.get('/auth/auth0',                   function(req,res){ res.render('auth-auth0')      })	/* placeholders/stubs */
//app.get('/auth/auth0/callback',          function(req,res){ res.redirect('/auth/auth0')   })	/* placeholders/stubs */
//app.get('/auth/github2',                 function(req,res){ res.render('auth-github2')    })	/* placeholders/stubs */
//app.get('/auth/github2/callback',        function(req,res){ res.redirect('/auth/github2') })	/* placeholders/stubs */





app.listen(3004,'127.0.0.1')
