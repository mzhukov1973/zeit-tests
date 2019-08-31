const helperFuncOne = str => '[/js/utils.js:helperFuncOne(string)]: Has been called. str=\'' + String(str).toString() + '\'.'

const inspIt = (req,res,next) => {
    console.log('==========================================================================')
    console.log('SESSION:'.basicRedBld.underline)
    console.log('req.session (type:'.basicMag   + '\''.basicGrnBld + (typeof req.session)[cCol(typeof req.session)]     + '\''.basicGrnBld + ')'.basicMag)
    console.log('req.sessionID (type:'.basicMag + '\''.basicGrnBld + (typeof req.sessionID)[cCol(typeof req.sessionID)] + '\''.basicGrnBld + ')'.basicMag)
    if (((typeof req.session)==='undefined')||(req.session===null)) {console.log('[' + ('\''+req.route.path+'\'').basicCynBld + '] '+'0. '.basicGrnBld + 'req.session'.basicYel + ' = '.basicRedBld + '\'' + (typeof req.session)[cCol(typeof req.session)] + '\'')} else {Object.entries(req.session).forEach((el,idx,arr)=>{ console.log('[' + ('\''+req.route.path+'\'').basicCynBld + '] ' + (String(idx)+'.').padEnd(3,' ').basicGrnBld + ' req.session'.basicYel + '.' + (String(el[0]).padEnd(27,' ')).basicGrnDim + ' = '.basicRedBld + ('<'+String(typeof el[1])+'>')[cCol(typeof el[1])]) })}
    console.log('--------------------------------------------------------------------------')
    console.log('REQ:'.basicRedBld.underline)
    console.log('req (type:'.basicMag+'\''.basicGrnBld+(typeof req)[cCol(typeof req)]+'\''.basicGrnBld+')'.basicMag)
    console.log('[' + ('\''+req.route.path+'\'').basicCynBld + '] '+'00. '.basicGrnBld + 'req.url'.basicYel + ' = '.basicRedBld + '\'' + (typeof req.url)[cCol(typeof req.url)] + '\'' + ',                %o'.basicWhiteDimBld,    (req.url)                                              )
    console.log('[' + ('\''+req.route.path+'\'').basicCynBld + '] '+'01. '.basicGrnBld + 'req.method'.basicYel + ' = '.basicRedBld + '\'' + (typeof req.method)[cCol(typeof req.method)] + '\'' + ',             %o'.basicWhiteDimBld,    (req.method)                                     )
    console.log('[' + ('\''+req.route.path+'\'').basicCynBld + '] '+'02. '.basicGrnBld + 'req.statusCode'.basicYel + ' = '.basicRedBld + '\'' + (typeof req.statusCode)[cCol(typeof req.statusCode)] + '\'' + ',         %o'.basicWhiteDimBld,    (req.statusCode)                         )
    console.log('[' + ('\''+req.route.path+'\'').basicCynBld + '] '+'03. '.basicGrnBld + 'req.statusMessage'.basicYel + ' = '.basicRedBld + '\'' + (typeof req.statusMessage)[cCol(typeof req.statusMessage)] + '\'' + ',      %o'.basicWhiteDimBld,    (req.statusMessage)                )
    console.log('[' + ('\''+req.route.path+'\'').basicCynBld + '] '+'04. '.basicGrnBld + 'req.baseUrl'.basicYel + ' = '.basicRedBld + '\'' + (typeof req.baseUrl)[cCol(typeof req.baseUrl)] + '\'' + ',            %o'.basicWhiteDimBld,    (req.baseUrl)                                  )
    console.log('[' + ('\''+req.route.path+'\'').basicCynBld + '] '+'05. '.basicGrnBld + 'req.originalUrl'.basicYel + ' = '.basicRedBld + '\'' + (typeof req.originalUrl)[cCol(typeof req.originalUrl)] + '\'' + ',        %o'.basicWhiteDimBld,    (req.originalUrl)                      )
    console.log('[' + ('\''+req.route.path+'\'').basicCynBld + '] '+'06. '.basicGrnBld + 'req._parsedUrl'.basicYel + ' = '.basicRedBld + '\'' + (typeof req._parsedUrl)[cCol(typeof req._parsedUrl)] + '\'' + ',        %o'.basicWhiteDimBld,    (req._parsedUrl)                          )
    console.log('[' + ('\''+req.route.path+'\'').basicCynBld + '] '+'07. '.basicGrnBld + 'req._parsedOriginalUrl'.basicYel + ' = '.basicRedBld + '\'' + (typeof req._parsedOriginalUrl)[cCol(typeof req._parsedOriginalUrl)] + '\'' + ', %o'.basicWhiteDimBld,    (req._parsedOriginalUrl) )
    console.log('[' + ('\''+req.route.path+'\'').basicCynBld + '] '+'08. '.basicGrnBld + 'req.sessionStore'.basicYel + ' = '.basicRedBld + '\'' + (typeof req.sessionStore)[cCol(typeof req.sessionStore)] + '\'' + ',       %o'.basicWhiteDimBld,    (req.sessionStore)                   )
    console.log('[' + ('\''+req.route.path+'\'').basicCynBld + '] '+'09. '.basicGrnBld + 'req.sessionID'.basicYel + ' = '.basicRedBld + '\'' + (typeof req.sessionID)[cCol(typeof req.sessionID)] + '\'' + ',          %o'.basicWhiteDimBld,    (req.sessionID)                            )
    console.log('[' + ('\''+req.route.path+'\'').basicCynBld + '] '+'10. '.basicGrnBld + 'req.session'.basicYel + ' = '.basicRedBld + '\'' + (typeof req.session)[cCol(typeof req.session)] + '\'' + ',            %o'.basicWhiteDimBld,    (req.session)                                  )
    console.log('[' + ('\''+req.route.path+'\'').basicCynBld + '] '+'11. '.basicGrnBld + 'req.route'.basicYel + ' = '.basicRedBld + '\'' + (typeof req.route)[cCol(typeof req.route)] + '\'' + ',              %o'.basicWhiteDimBld,    (req.route)                                        )
    console.log('[' + ('\''+req.route.path+'\'').basicCynBld + '] '+'12. '.basicGrnBld + 'req._passport'.basicYel + ' = '.basicRedBld + '\'' + (typeof req._passport)[cCol(typeof req._passport)] + '\'' + ',          %o'.basicWhiteDimBld,    (req._passport)                            )
    if (((typeof req)==='undefined')||(req===null)) {console.log('[' + ('\''+req.route.path+'\'').basicCynBld + '] '+'0. '.basicGrnBld + 'req'.basicYel + ' = '.basicRedBld + '\'' + (typeof req)[cCol(typeof req)] + '\'')} else {Object.entries(req).forEach((el,idx,arr)=>{ console.log('[' + ('\''+req.route.path+'\'').basicCynBld + '] ' + (String(idx)+'.').padEnd(3,' ').basicGrnBld + ' req'.basicYel + '.' + (String(el[0]).padEnd(27,' ')).basicGrnDim + ' = '.basicRedBld + ('<'+String(typeof el[1])+'>')[cCol(typeof el[1])]) })}
    console.log('--------------------------------------------------------------------------')
    console.log('RES:'.basicRedBld.underline)
    console.log('res (type:'.basicMag+'\''.basicGrnBld+(typeof res)[cCol(typeof res)]+'\''.basicGrnBld+')'.basicMag)
    if (((typeof res)==='undefined')||(res===null)) {console.log('[' + ('\''+req.route.path+'\'').basicCynBld + '] '+'0. '.basicGrnBld + 'res'.basicYel + ' = '.basicRedBld + '\'' + (typeof res)[cCol(typeof res)] + '\'')} else {Object.entries(res).forEach((el,idx,arr)=>{ console.log('[' + ('\''+req.route.path+'\'').basicCynBld + '] ' + (String(idx)+'.').padEnd(3,' ').basicGrnBld + ' res'.basicYel + '.' + (String(el[0]).padEnd(27,' ')).basicGrnDim + ' = '.basicRedBld + ('<'+String(typeof el[1])+'>')[cCol(typeof el[1])]) })}
    console.log('--------------------------------------------------------------------------')
    console.log('ERR:'.basicRedBld.underline)
    console.log('err (type:'.basicMag+'\''.basicGrnBld+(typeof err)[cCol(typeof err)]+'\''.basicGrnBld+')'.basicMag)
    if (((typeof err)==='undefined')||(err===null)) {console.log('[' + ('\''+req.route.path+'\'').basicCynBld + '] '+'0. '.basicGrnBld + 'err'.basicYel + ' = '.basicRedBld + '\'' + (typeof err)[cCol(typeof err)] + '\'')} else {Object.entries(err).forEach((el,idx,arr)=>{ console.log('[' + ('\''+req.route.path+'\'').basicCynBld + '] ' + (String(idx)+'.').padEnd(3,' ').basicGrnBld + ' err'.basicYel + '.' + (String(el[0]).padEnd(27,' ')).basicGrnDim + ' = '.basicRedBld + ('<'+String(typeof el[1])+'>')[cCol(typeof el[1])]) })}
    console.log('--------------------------------------------------------------------------')
    console.log('NEXT:'.basicRedBld.underline)
    console.log('next (type:'.basicMag+'\''.basicGrnBld+(typeof next)[cCol(typeof next)]+'\''.basicGrnBld+')'.basicMag)
    if (((typeof next)==='undefined')||(next===null)) {console.log('[' + ('\''+req.route.path+'\'').basicCynBld + '] '+'0. '.basicGrnBld + 'next'.basicYel + ' = '.basicRedBld + '\'' + (typeof next)[cCol(typeof next)] + '\'')} else {Object.entries(next).forEach((el,idx,arr)=>{ console.log('[' + ('\''+req.route.path+'\'').basicCynBld + '] ' + (String(idx)+'.').padEnd(3,' ').basicGrnBld + ' next'.basicYel + '.' + (String(el[0]).padEnd(27,' ')).basicGrnDim + ' = '.basicRedBld + ('<'+String(typeof el[1])+'>')[cCol(typeof el[1])]) })}
    console.log('--------------------------------------------------------------------------')
    console.log('APP:'.basicRedBld.underline)
    console.log('app (type:'.basicMag+'\''.basicGrnBld+(typeof app)[cCol(typeof app)]+'\''.basicGrnBld+')'.basicMag)
    if (((typeof app)==='undefined')||(app===null)) {console.log('[' + ('\''+req.route.path+'\'').basicCynBld + '] '+'0. '.basicGrnBld + 'app'.basicYel + ' = '.basicRedBld + '\'' + (typeof app)[cCol(typeof app)] + '\'')} else {Object.entries(app).forEach((el,idx,arr)=>{ console.log('[' + ('\''+req.route.path+'\'').basicCynBld + '] ' + (String(idx)+'.').padEnd(3,' ').basicGrnBld + ' app'.basicYel + '.' + (String(el[0]).padEnd(27,' ')).basicGrnDim + ' = '.basicRedBld + ('<'+String(typeof el[1])+'>')[cCol(typeof el[1])]) })}
    console.log('==========================================================================')
    const utilInspectOpt = {'showHidden':false, 'depth':10, 'showProxy':false, 'customInspect':true, 'compact':false, 'sorted':true, 'getters':false, 'colors':true}
    console.log('======['.basicRedBld + ('\''+req.route.path+'\'').basicCynBld + ']=SESSION:========='.basicRedBld)
    if ((typeof req.session)!=='undefined')   {console.log('req.session::: '.basicYelBld   + util.inspect(req.session,utilInspectOpt))  } else {console.log('req.session'.basicRedBld   + ' is ' + 'undefined'.cUndefined)}
    if ((typeof req.sessionID)!=='undefined') {console.log('req.sessionID::: '.basicYelBld + util.inspect(req.sessionID,utilInspectOpt))} else {console.log('req.sessionID'.basicRedBld + ' is ' + 'undefined'.cUndefined)}
    console.log('======SESSION=========='.basicRedBld)
    console.log('======['.basicRedBld + ('\''+req.route.path+'\'').basicCynBld + ']=REQ:============='.basicRedBld)
    if ((typeof req.isAuthenticated)!=='undefined') {console.log('req.isAuthenticated::: '.basicYelBld + util.inspect(req.isAuthenticated,utilInspectOpt) + '; req.isAuthenticated():%o.',req.isAuthenticated())} else {console.log('req.isAuthenticated'.basicRedBld + ' is ' + 'undefined'.cUndefined)}
    if ((typeof req.route)!=='undefined')           {console.log('req.route::: '.basicYelBld           + util.inspect(req.route,utilInspectOpt))                                                                } else {console.log('req.route'.basicRedBld           + ' is ' + 'undefined'.cUndefined)}
    if ((typeof req.xhr)!=='undefined')             {console.log('req.xhr::: '.basicYelBld             + util.inspect(req.xhr,utilInspectOpt))                                                                  } else {console.log('req.xhr'.basicRedBld             + ' is ' + 'undefined'.cUndefined)}
    if ((typeof req._passport)!=='undefined')       {console.log('req._passport::: '.basicYelBld       + util.inspect(req._passport,utilInspectOpt))                                                            } else {console.log('req._passport'.basicRedBld       + ' is ' + 'undefined'.cUndefined)}
    if ((typeof req.params)!=='undefined')          {console.log('req.params::: '.basicYelBld          + util.inspect(req.params,utilInspectOpt))                                                               } else {console.log('req.params'.basicRedBld          + ' is ' + 'undefined'.cUndefined)}
    if ((typeof req._readableState)!=='undefined')  {console.log('req._readableState::: '.basicYelBld  + util.inspect(req._readableState,utilInspectOpt))                                                       } else {console.log('req._readableState'.basicRedBld  + ' is ' + 'undefined'.cUndefined)}
    if ((typeof req._events)!=='undefined')         {console.log('req._events::: '.basicYelBld         + util.inspect(req._events,utilInspectOpt))                                                              } else {console.log('req._events'.basicRedBld         + ' is ' + 'undefined'.cUndefined)}
    if ((typeof req.cookies)!=='undefined')         {console.log('req.cookies::: '.basicYelBld         + util.inspect(req.cookies,utilInspectOpt))                                                              } else {console.log('req.cookies'.basicRedBld         + ' is ' + 'undefined'.cUndefined)}
    console.log('=======================\n ======================\n  =====================\n   ====================\n    ==================='.basicRedBld)
    if ((typeof req)!=='undefined')                 {console.log('req::: '.basicYelBld                 + util.inspect(req,utilInspectOpt))                                                                      } else {console.log('req'.basicRedBld                 + ' is ' + 'undefined'.cUndefined)}
    if ((typeof req)!=='undefined')                 {console.log('req::: '.basicYelBld                 + util.inspect(req,utilInspectOpt))                                                                      } else {console.log('req'.basicRedBld                 + ' is ' + 'undefined'.cUndefined)}
    console.log('    ===================\n   ====================\n  =====================\n ======================\n=======================\n'.basicRedBld)
    console.log('======REQ=============='.basicRedBld)
    console.log('======['.basicRedBld + ('\''+req.route.path+'\'').basicCynBld + ']=RES:============='.basicRedBld)
    if ((typeof res.locals)!=='undefined')      {console.log('res.locals::: '.basicYelBld      + util.inspect(res.locals,utilInspectOpt))     } else {console.log('res.locals'.basicRedBld      + ' is ' + 'undefined'.cUndefined)}
    if ((typeof res.headersSent)!=='undefined') {console.log('res.headersSent::: '.basicYelBld + util.inspect(res.headersSent,utilInspectOpt))} else {console.log('res.headersSent'.basicRedBld + ' is ' + 'undefined'.cUndefined)}
    console.log('======RES=============='.basicRedBld)
    console.log('======['.basicRedBld + ('\''+req.route.path+'\'').basicCynBld + ']=ERR:============='.basicRedBld)
    if ((typeof err)!=='undefined') {console.log('err::: '.basicYelBld + util.inspect(err,utilInspectOpt))} else {console.log('err'.basicRedBld + ' is ' + 'undefined'.cUndefined)}
    console.log('======ERR=============='.basicRedBld)
    console.log('======['.basicRedBld + ('\''+req.route.path+'\'').basicCynBld + ']=NEXT:============'.basicRedBld)
    if ((typeof next)!=='undefined') {console.log('next::: '.basicYelBld + util.inspect(next,utilInspectOpt))} else {console.log('next'.basicRedBld + ' is ' + 'undefined'.cUndefined)}
    console.log('======NEXT============='.basicRedBld)
    console.log('======['.basicRedBld + ('\''+req.route.path+'\'').basicCynBld + ']=APP:============='.basicRedBld)
    if ((typeof app)!=='undefined')           {console.log('app::: '.basicYelBld           + util.inspect(app,utilInspectOpt))          } else {console.log('app'.basicRedBld           + ' is ' + 'undefined'.cUndefined)}
    console.log('======APP=============='.basicRedBld)
    next()
}

const cColors = require('colors')
cColors.setTheme({
  cFunction:['blue','bold'],       cObject:['yellow','bold'],        cString:['green','reset'],
  cNumber:['red','reset'],         cUndefined:['gray','bold','dim'], cNull:['yellow','bold','dim'],     cBoolean:['magenta','reset'],
  basicYel:['yellow',  'reset'],   basicYelDim:['yellow',  'dim'],   basicYelBld:['yellow',  'bold'],   basicYelDimBld:['yellow',  'dim', 'bold'],
  basicGrn:['green',   'reset'],   basicGrnDim:['green',   'dim'],   basicGrnBld:['green',   'bold'],   basicGrnDimBld:['green',   'dim', 'bold'],
  basicRed:['red',     'reset'],   basicRedDim:['red',     'dim'],   basicRedBld:['red',     'bold'],   basicRedDimBld:['red',     'dim', 'bold'],
  basicMag:['magenta', 'reset'],   basicMagDim:['magenta', 'dim'],   basicMagBld:['magenta', 'bold'],   basicMagDimBld:['magenta', 'dim', 'bold'],
  basicCyn:['cyan',    'reset'],   basicCynDim:['cyan',    'dim'],   basicCynBld:['cyan',    'bold'],   basicCynDimBld:['cyan',    'dim', 'bold'],
  basicGra:['gray',    'reset'],   basicGraDim:['gray',    'dim'],   basicGraBld:['gray',    'bold'],   basicGraDimBld:['gray',    'dim', 'bold'],
  basicWhi:['white',   'reset'],   basicWhiDim:['white',   'dim'],   basicWhiBld:['white',   'bold'],   basicWhiDimBld:['white',   'dim', 'bold']
})
const cCol = typStr => 'c'+typStr.substring(0,1).toUpperCase()+typStr.substring(1).toLowerCase()

const uid = require('uid-safe')
const uuid_str = uid.sync(24)

const pathLookup = path => {
  const { initialize:initializeAuthorization, ensureScope, ensurePermission, ensureRole, ensureGroup } = require('connect-ensure-authorization')
  const scp = ensureScope
  const prm = ensurePermission
  const rol = ensureRole
  const grp = ensureGroup
  const pathTab = {
             '/profile/edit': [[scp,'profile:edit'       ]                   ],
          '/secretsLevelOne': [[scp,'sensitiveInfo1:read']                   ],
     '/secretsLevelOne/edit': [[scp,'sensitiveInfo1:edit']                   ],
          '/secretsLevelTwo': [[scp,'sensitiveInfo2:read']                   ],
     '/secretsLevelTwo/edit': [[scp,'sensitiveInfo2:edit']                   ],
          '/homeFolder/edit': [[prm,'homeFolder:w'       ]                   ],
               '/homeFolder': [[prm,'homeFolder:rx'      ]                   ],
     '/sharedFolderOne/edit': [[prm,'sharedFolder1:w'    ]                   ],
          '/sharedFolderOne': [[prm,'sharedFolder1:rx'   ]                   ],
     '/sharedFolderTwo/edit': [[prm,'sharedFolder2:w'    ]                   ],
          '/sharedFolderTwo': [[prm,'sharedFolder2:rx'   ]                   ],
           '/restrictedChat': [[rol,'restrictedCommsUser'], [grp,'finances'] ],
        '/managerialRSSFeed': [[rol,'manager'            ], [grp,'sales'   ] ],
    '/headOfficeCantinaMenu': [[grp,'headOfficeStaff'    ], [rol,'user'    ] ],
             '/securityCams': [[grp,'administrators'     ], [grp,'it'      ] ]
  }

  let result = []
  pathTab[path].forEach(
    (el,idx,arr) => {
      if ((typeof el[0])==='function') {result.push( el[0](el[1]) )}
    }
  )

  initializeAuthorization({redirectTo:null, statusCode:403, message:'Insufficient authorisation credentials.'})
  return result
}
/*
 FOLDERS (VIRTUAL)        ejs TEMPLATES ('/views')                    SECURITY SETTINGS                                        COMMENTS
-----------------------     ----------------------       -------------------------------------------------   ---------------------------------------------
/profile               |        profile.ejs           |                 authentication          |                authentication alone is enough             |
/profile/edit          |        profile.ejs           |  prot + scope('profile:edit')           |(r/w)       same template, different route & locals        |
/secretsLevelOne       |        secOne.ejs            |  prot + scope('sensitiveInfo1:read')    |(r)         same template, different route & locals        |
/secretsLevelOne/edit  |        secOne.ejs            |  prot + scope('sensitiveInfo1:edit')    |(r/w)       same template, different route & locals        |
/secretsLevelTwo       |        secTwo.ejs            |  prot + scope('sensitiveInfo2:read')    |(r)         same template, different route & locals        |
/secretsLevelTwo/edit  |        secTwo.ejs            |  prot + scope('sensitiveInfo2:edit')    |(r/w)       same template, different route & locals        |
/homeFolder/edit       |        homeOne.ejs           |  prot + permission('homeFolder:w')      |(r/w)       same template, different route & locals        |
/homeFolder            |        homeOne.ejs           |  prot + permission('homeFolder:rx')     |(r)         same template, different route & locals        |
/sharedFolderOne/edit  |        sharOne.ejs           |  prot + permission('sharedFolder1:w')   |(r/w)       same template, different route & locals        |
/sharedFolderOne       |        sharOne.ejs           |  prot + permission('sharedFolder1:rx')  |(r)         same template, different route & locals        |
/sharedFolderTwo/edit  |        sharTwo.ejs           |  prot + permission('sharedFolder2:w')   |(r/w)       same template, different route & locals        |
/sharedFolderTwo       |        sharTwo.ejs           |  prot + permission('sharedFolder2:rx')  |(r)         same template, different route & locals        |
/restrictedChat        |       restrChat.ejs          |  prot + role('restrictedCommsUser')     |            same template, different route & locals        |
/managerialRSSFeed     |     managerialRSSFeed.ej     |  prot + role('manager')                 |            same template, different route & locals        |
/headOfficeCantinaMenu |       cantinaMenu.ejs        |  prot + group('headOfficeStaff')        |            same template, different route & locals        |
/securityCams          |       secCams.ejs            |  prot + group('administrators')         |            same template, different route & locals        |
/                      |          home.ejs            |  pub, mixed (auth - optional)           |      content slightly differs, depending om auth status   |
/login                 |          login.ejs           |  pub, mixed (auth - optional)           |      content slightly differs, depending om auth status   |
/logout                |      -----------------       |                    none                 |      does not render - exists only as a redirect target   |
*/






module.exports = {
  'hF1':        helperFuncOne,
  'inspIt':     inspIt,
  'cColors':    cColors,
  'cCol':       cCol,
  'uid':        uid,
  'uuid_str':   uuid_str,
  'pathLookup': pathLookup
}
