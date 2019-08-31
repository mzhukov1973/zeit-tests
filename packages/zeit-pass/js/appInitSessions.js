/************************************************************/
/* ToDo:                                                    */
/*  - Insure singleton pattern for session storage backend  */
/************************************************************/
const expressSession  = require('express-session')
const sessionSecret   = 'keyboard cat' /* N.B.: Should import it here via Zeit's Now's @secret thing. */
const globSessOptions = {
  name:              'connect.sid',
  cookie:            { path:'/', httpOnly:true, secure:false, maxAge:30*24*60*60*1000 },
  resave:            false,
  saveUninitialized: false,
  secret:            sessionSecret
}
const useExpressSessionStore     = () => expressSession(globSessOptions)
const usePgSessionStore          = passportStratLocalBackEnd => expressSession(Object.assign({},globSessOptions,{store:new (require('connect-pg-simple')(expressSession))({pgPromise:require('./backEnds/sessionStorage')(passportStratLocalBackEnd).db, tableName:'sessions'})}))
const useSQLite3SessionStore     = () => expressSession(Object.assign({},globSessOptions,{store:new (require('connect-sqlite3')(expressSession))({table:'sessions', db:'sessionStoreSQLite3.db'})}))
const useMemorystoreSessionStore = () => expressSession(Object.assign({},globSessOptions,{store:new (require('memorystore')(expressSession))({checkPeriod:24*60*60*1000, max:20})}))
const useFilestoreSessionStore   = () => expressSession(Object.assign({},globSessOptions,{
  store:new (require('session-file-store')(expressSession))({
    ttl:              3600,
    path:             './data/SessionStore.FileStore',
    secret:           globSessOptions.secret,
    retries:          5,
    reapInterval:     3600,
    reapAsync:        true,
    reapSyncFallback: true,
    logFn:            logMsg=>{/*console.log(logMsg)*/},
    encryptEncoding:  'hex',
    encoding:         'utf8',
    encoder:          JSON.stringify,
    decoder:          JSON.parse,
    fileExtension:    '.session.json',
    keyFunction:      (secret,sessionId)=>secret+sessionId
  })
}))

const sessionObjectToUse = (sessionStore,passportStratLocalBackEnd) => {
  if (sessionStore==='express')           { return useExpressSessionStore()                     }
  if (sessionStore==='connect-pg-simple') { return usePgSessionStore(passportStratLocalBackEnd) }
  if (sessionStore==='connect-sqlite3')   { return useSQLite3SessionStore()                     }
  if (sessionStore==='memorystore')       { return useMemorystoreSessionStore()                 }
  if (sessionStore==='filestore')         { return useFilestoreSessionStore()                   }
}

module.exports = (sessionStore='express', passportStratLocalBackEnd='local') => {
  return sessionObjectToUse(sessionStore, passportStratLocalBackEnd) /* Export initialised expressSession instance to be used in the app. */
}
