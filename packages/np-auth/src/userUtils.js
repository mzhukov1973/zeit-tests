/*JS***************************************************************************/
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
import   fs                         from 'fs'
import   path                       from 'path'
// import { scryptPw, scryptPwVerify } from './cryptoUtils'
// import { argon2Pw, argon2PwVerify } from './cryptoUtils'
// import { hashScrypt, hashArgon2   } from './cryptoUtils'
import hashes                       from './cryptoUtils'

const intvMsStEnd      = (start=[0,0], end=[0,0]) => ({'start':start[0]*60*60*1000+start[1]*60*1000, 'end':end[0]*60*60*1000+end[1]*60*1000})
const intvMsStDur      = (start=[0,0], dur=[0,0]) => ({'start':start[0]*60*60*1000+start[1]*60*1000, 'end':start[0]*60*60*1000+start[1]*60*1000+dur[0]*60*60*1000+dur[1]*60*1000})
const intvDatStEnd     = (start=[0,0], end=[0,0]) => ({'start':new Date(start[0]*60*60*1000+start[1]*60*1000), 'end':new Date(end[0]*60*60*1000+end[1]*60*1000)})
const intvDatStDur     = (start=[0,0], dur=[0,0]) => ({'start':new Date(start[0]*60*60*1000+start[1]*60*1000), 'end':new Date(start[0]*60*60*1000+start[1]*60*1000+dur[0]*60*60*1000+dur[1]*60*1000)}) 
const captTSt          = (dat=new Date())         => dat.getFullYear()+'-'+(dat.getMonth()+1).toString().padStart(2,'0')+'-'+dat.getDate().toString().padStart(2,'0')+' '+dat.getHours().toString().padStart(2,'0')+':'+dat.getMinutes().toString().padStart(2,'0')+':'+dat.getSeconds().toString().padStart(2,'0')
const lang2Default     = 'en'
const lang2PlusDefault = null
const createI18NString = (valuesToFillWith=[{}]) => {
  if (typeof valuesToFillWith==='string'&&valuesToFillWith.length>0) { valuesToFillWith = [{'value':valuesToFillWith}] }
  const oneLangStringDefault = {'value':null, 'lang2':lang2Default, 'lang2Plus':lang2PlusDefault}
  const i18NStringDefault    = [ oneLangStringDefault ]
  const mergedArr            = []
  const doArr                = valuesToFillWith.length > 0 ? valuesToFillWith : i18NStringDefault
  doArr.forEach( (el,idx) => mergedArr[idx] = !valuesToFillWith[idx] ? i18NStringDefault[idx] : ({'value':((typeof valuesToFillWith[idx].value==='undefined')?oneLangStringDefault.value:valuesToFillWith[idx].value), 'lang2':((typeof valuesToFillWith[idx].lang2==='undefined')?oneLangStringDefault.lang2:valuesToFillWith[idx].lang2), 'lang2Plus':((typeof valuesToFillWith[idx].lang2Plus==='undefined')?oneLangStringDefault.lang2Plus:valuesToFillWith[idx].lang2Plus)}) )
  return mergedArr
}

const genders = [
  {'fullName':createI18NString([{'value':'male','lang2':'en'},{'value':'мужской','lang2':'ru'}]),   'shortName3':createI18NString([{'value':'mal','lang2':'en'},{'value':'муж','lang2':'ru'}]), 'shortName1':createI18NString([{'value':'m','lang2':'en'},{'value':'м','lang2':'ru'}])},
  {'fullName':createI18NString([{'value':'female','lang2':'en'},{'value':'женский','lang2':'ru'}]), 'shortName3':createI18NString([{'value':'fem','lang2':'en'},{'value':'жен','lang2':'ru'}]), 'shortName1':createI18NString([{'value':'f','lang2':'en'},{'value':'ж','lang2':'ru'}])}
]
const phoneTypes   = [
  createI18NString([{'value':'cell',     'lang2':'en'}, {'value':'мобильный',    'lang2':'ru'}]),
  createI18NString([{'value':'landline', 'lang2':'en'}, {'value':'стационарный', 'lang2':'ru'}]),
  createI18NString([{'value':'fax',      'lang2':'en'}, {'value':'факс',         'lang2':'ru'}])
]
const phoneDomains = [
  createI18NString([{'value':'personal', 'lang2':'en'}, {'value':'личный',  'lang2':'ru'}]),
  createI18NString([{'value':'work',     'lang2':'en'}, {'value':'рабочий', 'lang2':'ru'}])
]
const emailTypes   = [
  createI18NString('corporateSrv'),
  createI18NString('publicSrv'),
  createI18NString('thirdPartyPrivateSrv')
]
const emailDomains = [
  createI18NString([{'value':'personal',  'lang2':'en'}, {'value':'личный',        'lang2':'ru'}]),
  createI18NString([{'value':'corporate', 'lang2':'en'}, {'value':'корпоративный', 'lang2':'ru'}])
]

const createAuthorisationRoleRoutePermissions = (valuesToFillWith={}) => {
  const authorisationRoleRoutePermissionsDefault = {
    'read':                true,
    'update':              true,
    'delete':              true,
    'create':              true,
    'lockContent':         true,
    'lockContentLevel':    100,
    'lockVisibility':      true,
    'lockVisibilityLevel': 100
  }
  const mergedObject = {}
  Object.keys(authorisationRoleRoutePermissionsDefault).forEach(el=>mergedObject[el]=(typeof valuesToFillWith[el]==='undefined')?authorisationRoleRoutePermissionsDefault[el]:valuesToFillWith[el])
  return mergedObject
}

const createAuthorisationRoleRoute = (valuesToFillWith={}) => {
  const authorisationRoleRouteDefault = {
    'path':            '.*',
    'subPathsEnabled': true,
    'permissions':     createAuthorisationRoleRoutePermissions()
  }
  const mergedObject = {}
  Object.keys(authorisationRoleRouteDefault).forEach(el=>mergedObject[el]=(typeof valuesToFillWith[el]==='undefined')?authorisationRoleRouteDefault[el]:valuesToFillWith[el])
  return mergedObject
}

const createAuthorisationRole = (valuesToFillWith={}) => {
  const authorisationRoleDefault = {
    'roleName':                     'role00',
    'shortDesc':                    '..role00 in short..',
    'longDesc':                     '..role00 in fine detail..',
    'active':                       true,
    'lastActiveStatusChangeTStamp': captTSt(),
    'routes': [
      createAuthorisationRoleRoute()
    ]
  }
  const mergedObject = {}
  Object.keys(authorisationRoleDefault).forEach(el=>mergedObject[el]=(typeof valuesToFillWith[el]==='undefined')?authorisationRoleDefault[el]:valuesToFillWith[el])
  return mergedObject
}

const createAuthenticationSetup = (valuesToFillWith={}) => {
  const authenticationSetupDefault = {
    'loginNick':                     null,
    'passwordHashString':            null,
    'active':                        true,
    'lastLoginTStamp':               null,
    'maxSessionDuration':            3600,
    'currentSessionStartTStamp':     null,
    'currentToken':                  null,
    'lastTokenRenewalRequestTStamp': null,
    'currentSessionId':              null
  }
  const mergedObject = {}
  Object.keys(authenticationSetupDefault).forEach(el=>mergedObject[el]=(typeof valuesToFillWith[el]==='undefined')?authenticationSetupDefault[el]:valuesToFillWith[el])
  return mergedObject
}

const createPhone = (valuesToFillWith={}) => {
  const phoneDefault = {
    'number':   null,
    'domain':   null,
    'type':     null,
    'visible':  null,
    'smsOk':    true,
    'availabilityIntervalsWorkdays': {'voice':false, 'sms': false},
    'availabilityIntervalsHolidays': {'voice':false, 'sms': false},
    'verified': false
  }
  const mergedObject = {}
  Object.keys(phoneDefault).forEach(el=>mergedObject[el]=(typeof valuesToFillWith[el]==='undefined')?phoneDefault[el]:valuesToFillWith[el])
  return mergedObject
}

const createEmail = (valuesToFillWith={}) => {
  const emailDefault = {
    'address':  null,
    'domain':   null,
    'type':     null,
    'visible':  null,
    'verified': false
  }
  const mergedObject = {}
  Object.keys(emailDefault).forEach(el=>mergedObject[el]=(typeof valuesToFillWith[el]==='undefined')?emailDefault[el]:valuesToFillWith[el])
  return mergedObject
}

const createProfile = (valuesToFillWith={}) => {
  const profileDefault = {
    'publicNick':  createI18NString(),
    'firstName':   createI18NString(),
    'lastName':    createI18NString(),
    'middleName':  createI18NString(),
    'gender':      null,
    'dateOfBirth': null,
    'creationTStamp': captTSt(),
    'phones':      null,
    'emails':      null
  }
  const mergedObject = {}
  Object.keys(profileDefault).forEach(el=>mergedObject[el]=(typeof valuesToFillWith[el]==='undefined')?profileDefault[el]:valuesToFillWith[el])
  return mergedObject
}

const createUserImage = (valuesToFillWith={}) => {
  const userImageDefault = {
    'mime':     'image/png',
    'height':   50,
    'width':    50,
    'src':      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyBAMAAADsEZWCAAAAG1BMVEXMzMyWlpaqqqq3t7exsbGcnJy+vr6jo6PFxcUFpPI/AAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAQUlEQVQ4jWNgGAWjgP6ASdncAEaiAhaGiACmFhCJLsMaIiDAEQEi0WXYEiMCOCJAJIY9KuYGTC0gknpuHwXDGwAA5fsIZw0iYWYAAAAASUVORK5CYII=',
    'type':     'dataURI',
    'comment':  createI18NString('A generic comment.')
  }
  const mergedObject = {}
  Object.keys(userImageDefault).forEach(el=>mergedObject[el]=(typeof valuesToFillWith[el]==='undefined')?userImageDefault[el]:valuesToFillWith[el])
  return mergedObject
}

const createAvatar = (valuesToFillWith={}) => {
  const avatarDefault = {
    'priority':            ['default-placeholder'],
    'cached-placeholder':  null,
    'default-placeholder': createUserImage(),
    'userImages':          []
  }
  const mergedObject = {}
  Object.keys(avatarDefault).forEach(el=>mergedObject[el]=(typeof valuesToFillWith[el]==='undefined')?avatarDefault[el]:valuesToFillWith[el])
  return mergedObject
}

const createUser = (valuesToFillWith={}) => {
  const userDefault = {
    'profile':             createProfile(),
    'avatar':              createAvatar(),
    'authenticationSetup': createAuthenticationSetup(),
    'authorisationRoles':  [ createAuthorisationRole() ]
  }
  const mergedObject = {}
  Object.keys(userDefault).forEach(el=>mergedObject[el]=(typeof valuesToFillWith[el]==='undefined')?userDefault[el]:valuesToFillWith[el])
  return mergedObject
}

const updateUser = (valuesToFillWith={}) => {
  return false
}

const deleteUser = (valuesToFillWith={}) => {
  return false
}

const authenticateUser = (loginNick='',password='',usersArray=[]) => {
  const user = usersArray.find(el => (!el||!JSON.parse(el).authenticationSetup||!JSON.parse(el).authenticationSetup.loginNick||!JSON.parse(el).authenticationSetup.passwordHashString)?false:JSON.parse(el).authenticationSetup.loginNick===loginNick)
//console.log("\n\nuser: '%s'",user)
  const userObj = !user ? false : JSON.parse(user)
//console.log("userObj: %o\n",userObj)
  return !userObj ? false : hashes.pwVerify(password, userObj.authenticationSetup.passwordHashString, true)
}

/*----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/

//const unimaginablySecretObject = { }

export {createAuthorisationRoleRoutePermissions, createAuthorisationRoleRoute, createAuthorisationRole, createAuthenticationSetup, createPhone, createEmail, createProfile, createUserImage, createAvatar, createUser, updateUser, deleteUser, authenticateUser, captTSt, genders, phoneTypes, phoneDomains, emailTypes, emailDomains, createI18NString }
