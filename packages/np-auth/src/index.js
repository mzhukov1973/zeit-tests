/******************************************************************************/
/*  Copyright 2019 Maxim Zhukov                                               */
/*                                                                            */
/*  Licensed under the Apache License, Version 2.0 (the "License");           */
/*  you may not use this file except in compliance with the License.          */
/*  You may obtain a copy of the License at                                   */
/*                                                                            */
/*      http://www.apache.org/licenses/LICENSE-2.0                            */
/*                                                                            */
/*  Unless required by applicable law or agreed to in writing, software       */
/*  distributed under the License is distributed on an "AS IS" BASIS,         */
/*  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.  */
/*  See the License for the specific language governing permissions and       */
/*  limitations under the License.                                            */
/******************************************************************************/
import fs             from 'fs'
import path           from 'path'
import hashes         from './cryptoUtils'
import * as userUtils from './userUtils'



const newUserOptions = {
  'profile': userUtils.createProfile({
    'publicNick':  userUtils.createI18NString('mzhukov31415'),
    'firstName':   userUtils.createI18NString([{'value':'Maxim',        'lang2':'en'}, {'value':'Максим',     'lang2':'ru'}]),
    'lastName':    userUtils.createI18NString([{'value':'Zhukov',       'lang2':'en'}, {'value':'Жуков',      'lang2':'ru'}]),
    'middleName':  userUtils.createI18NString([{'value':'Alexeyevitch', 'lang2':'en'}, {'value':'Алексеевич', 'lang2':'ru'}]),
    'gender':      userUtils.genders.findIndex(el=>(el.fullName.find(elel=>elel.lang2==='en').value==='male')),
    'dateOfBirth': '1973-08-29',
    'creationTStamp': userUtils.captTSt(),
    'phones': [
      userUtils.createPhone({
        'number':   '+7(965)187-7866',
        'domain':   0,
        'type':     0,
        'visible':  'all',
        'smsOk':    true,
        'availabilityIntervalsWorkdays': {'voice':[['10:00:00','13:00:00'],['14:00:00','18:00:00']], 'sms':[['00:00:00','23:59:59']]},
        'availabilityIntervalsHolidays': {'voice':false,                                             'sms':[['10:00:00','20:00:00']]},
        'verified': true
      }),
      userUtils.createPhone({
        'number':   '+7(499)143-1590',
        'domain':   userUtils.phoneDomains.findIndex(el=>(el.lang2==='en'&&el.value==='personal')), /* Or, simply, 0.*/
        'type':     userUtils.phoneTypes.findIndex(el=>(el.lang2==='en'&&el.value==='landline')),   /* Or, simply, 1.*/
        'visible':  'none',
        'smsOk':    false,
        'availabilityIntervalsWorkdays': {'voice':false, 'sms': false},
        'availabilityIntervalsHolidays': {'voice':false, 'sms': false},
        'verified': true
      })
    ],
    'emails': [
      userUtils.createEmail({
        'address':  'mzhukov31415@gmail.com',
        'domain':   0,
        'type':     1,
        'visible':  'all',
        'verified': true
      }),
      userUtils.createEmail({
        'address':  'mzhukov31415dev@gmail.com',
        'domain':   0,
        'type':     1,
        'visible':  'all',
        'verified': false
      }),
      userUtils.createEmail({
        'address':  'maxim.zhukov.1973@mail.ru',
        'domain':   userUtils.emailDomains.findIndex(el=>(el.lang2==='en'&&el.value==='personal')), /* Or, simply, 0.*/
        'type':     userUtils.emailTypes.findIndex(el=>(el.lang2==='en'&&el.value==='publicSrv')),  /* Or, simply, 1.*/
        'visible':  'none',
        'verified': true
      })
    ]
  }),
  'avatar': userUtils.createAvatar(),
  'authenticationSetup': userUtils.createAuthenticationSetup({
    'loginNick':                     null,
    'passwordHashString':            null,
    'active':                        true,
    'maxSessionDuration':            3600
  }),
  'authorisationRoles': [
    userUtils.createAuthorisationRole({
      'roleName':                     userUtils.createI18NString('userEverypathReadonly'),
      'shortDesc':                    userUtils.createI18NString('userEverypathReadonly - matches any path and subpath, but allows exclusively readonly access (no creates, deletes or updates).'),
      'longDesc':                     userUtils.createI18NString('Authorisation role \'userEverypathReadonly\'. It matches any path and subpath, but doesn\'t allow anything except for readonly access (no creates, deletes or updates).'),
      'active':                       true,
      'lastActiveStatusChangeTStamp': userUtils.captTSt(),
      'routes': [
        userUtils.createAuthorisationRoleRoute({
          'permissions':userUtils.createAuthorisationRoleRoutePermissions({'read':true, 'update':false, 'delete':false, 'create':false, 'lockContent':false, 'lockContentLevel':100, 'lockVisibility':false, 'lockVisibilityLevel':100})
        })
      ]
    })
  ]
}

/*
const users     = []
const cr        = (usr_base, pw='', algo='general', options=[]) => {
  if (!usr_base) {
    const u_b = ((!usr_base?(typeof usr_base==='undefined'?'undefined':(usr_base===null?'null':(typeof usr_base==='string'&&usr_base.length===0?"''":"<"+(typeof usr_base)+">"+usr_base.toString()))):"'"+usr_base+"'")+'\x1b[m\x1b[1m,').padEnd(18,' ')
    console.log("\x1b[1mcr(\x1b[1;4;5;91m"+u_b+"'"+pw+"', '"+algo+"', ["+options+"]):\x1b[m\t\x1b[1;91mError!\x1b[m \x1b[1;93musr_base\x1b[m (string) is a mandatory parameter, but is either omitted, set to undefined, null or a zero-length string!");return false;
  }
  const usr = usr_base+'_'+algo
  newUserOptions.authenticationSetup.loginNick          = usr
//  return Promise.resolve(hashes[algo].hashGen(pw,true,...options)).then(res => {
//    newUserOptions.authenticationSetup.passwordHashString = res.hashStringToStore
//    console.log("res: <%s>%o",(typeof res),res)
//    users.push(JSON.stringify(userUtils.createUser(newUserOptions)))
//  })
  newUserOptions.authenticationSetup.passwordHashString = hashes[algo].hashGen(pw,true,...options).hashStringToStore
  users.push(JSON.stringify(userUtils.createUser(newUserOptions)))
}
const authCheck = (usr, pw) => {
  if ((!usr)||(!pw)) {
    const u_t1    = '\x1b[1;93musr\x1b[m (string)'
    const p_t1    = '\x1b[1;93mpw\x1b[m (string)'
    const one_t2  = ' is a mandatory parameter'
    const both_t2 = ' are mandatory parameters'
    const u_b     = !usr ? "\x1b[1;4;5;91m"+((!usr?(typeof usr==='undefined'?'undefined':(usr===null?'null':(typeof usr==='string'&&usr.length===0?"''":"<"+(typeof usr)+">"+usr.toString()))):"'"+usr+"'")+'\x1b[m\x1b[1m,').padEnd(18,' ') : "'"+usr+"', "
    const p_b     = !pw ? "\x1b[1;4;5;91m"+((!pw?(typeof pw==='undefined'?'undefined':(pw===null?'null':(typeof pw==='string'&&pw.length===0?"''":"<"+(typeof pw)+">"+pw.toString()))):"'"+pw+"'")+'\x1b[m\x1b[1m').padEnd(18,' ') : "'"+pw+"'"
    const t       = (!usr)&&(!pw) ? u_t1+' and '+p_t1+both_t2 : (!usr ? u_t1+one_t2 : p_t1+one_t2)
    console.log("\x1b[1mauthCheck("+u_b+p_b+"):\x1b[m\t\x1b[1;91mError!\x1b[m "+t+", but is either omitted, set to undefined, null or a zero-length string!")
    return false
  }
  let authResult = false
  const authResultSuccess = userUtils.authenticateUser(usr, pw, users)
  const authResultFailure = userUtils.authenticateUser(usr, '--wrong-pw--', users)
  console.log("\x1b[1;92mauthenticateUser('\x1b[22;93m%s\x1b[1;92m','\x1b[22;93m%s\x1b[1;92m',\x1b[22;93musers\x1b[1;92m)\x1b[m\t= <%s>%o",   usr, pw, (typeof authResultSuccess), authResultSuccess)
  console.log("\x1b[1;92mauthenticateUser('\x1b[22;93m%s\x1b[1;92m','\x1b[22;93m%s\x1b[1;92m',\x1b[22;93musers\x1b[1;92m)\x1b[m\t= <%s>%o\n", usr, pw, (typeof authResultFailure), authResultFailure)
}
console.clear()
cr('mzhukov01', '330117330119mz1', 'scrypt',  []                   )
//cr('mzhukov02', '330117330119mz2', 'scrypt',  [128]                ).then(res=>{console.log("resresres02A: %o",res);console.log("resresres02B: %o",users);})
cr('mzhukov02', '330117330119mz2', 'scrypt',  [128]                )
cr('mzhukov03', '330117330119mz3', 'scrypt',  [32]                 )
//cr('mzhukov04', '330117330119mz4', 'argon2',  []                   ).then(res=>{console.log("resresres04A: %o",res);console.log("resresres04B: %o",users);})
//cr('mzhukov04', '330117330119mz4', 'argon2',  []                   )
cr('mzhukov05', '330117330119mz5', 'pbkdf2',  []                   )
cr('mzhukov06', '330117330119mz6', 'pbkdf2',  [100000,'sha3-512']  )
cr('mzhukov07', '330117330119mz7', 'pbkdf2',  [100000,'sha-512',32])
cr('mzhukov08', '330117330119mz8', 'general', []                   )
cr('mzhukov09', '330117330119mz9', 'general', ['sha3-512']         )
//users.forEach((el,idx)=>console.log("\n\x1b[1;91m[%d] \x1b[22;91m%s\x1b[m\t==>\t\x1b[97m%s\x1b[m", idx, JSON.parse(el).authenticationSetup.loginNick, JSON.parse(el).authenticationSetup.passwordHashString))
console.log("\n=======================================================")
authCheck('mzhukov01_scrypt',  '330117330119mz1')
authCheck('mzhukov02_scrypt',  '330117330119mz2')
authCheck('mzhukov03_scrypt',  '330117330119mz3')
//authCheck('mzhukov04_argon2',  '330117330119mz4')
authCheck('mzhukov05_pbkdf2',  '330117330119mz5')
authCheck('mzhukov06_pbkdf2',  '330117330119mz6')
authCheck('mzhukov07_pbkdf2',  '330117330119mz7')
authCheck('mzhukov08_general', '330117330119mz8')
authCheck('mzhukov09_general', '330117330119mz9')
console.log("=======================================================\n")
*/

module.exports = (req, res) => {
  newUserOptions.authenticationSetup.loginNick          = 'mzhukov05_pbkdf2'
  newUserOptions.authenticationSetup.passwordHashString = hashes.pbkdf2.hashGen('330117330119mz5',true).hashStringToStore
  res.end("<!doctype html>\n<html>\n <head>\n  <meta charset=utf8>\n  <title>test-test-TEST</title>\n </head>\n <body>\n  <h1>Response string:</h1>\n  <h5>\n   "+JSON.stringify(newUserOptions)+"\n  </h5>\n </body>\n</html>\n", {encoding:'utf8'})
//  res.end('response string', {encoding:'utf8'})
}
