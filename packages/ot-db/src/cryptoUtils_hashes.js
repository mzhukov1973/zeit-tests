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
import crypto from 'crypto'
import argon2 from 'argon2'
import atob   from 'atob'
import btoa   from 'btoa'
/*
ToDo:
 - bcrypt
 - xxHash64
 - xxHash128
 + Sync/Async option for everyone
 - hashPwVerify for general hashes
*/
/*
------------------------------------------
      let successCallback = derivedKey => console.log("\x1b[1;92mpbkdf2Async success!\x1b[m\nderivedKey.toString('base64'): '\x1b[1;97m%s\x1b[m'", derivedKey.toString('base64'))
      let errorCallback   = err        => console.error("\x1b[1;91mpbkdf2Async error!\x1b[m\nerr.message: '\x1b[91m%s\x1b[m'.", err.message)
      let theAsync = async (pw,N=10)   => {await new Promise((res,rej) => crypto.pbkdf2(pw,'hk/gRttEbH1zISDfHJWxh86p0fMgtG6gbiMl8u4dpN1QEUqhdr1arsKlfE3U4pdHBhtLXjaZqZnGCVElM4uIUg==',N,64,'sha512',(err,derivedKey)=>(typeof err==='undefined'||err===null)?res(derivedKey):rej(err))).then(successCallback).catch(errorCallback)}
------------------------------------------
 Using Array.reduce(...) to force sequential execution of promises:
      let userIDs = [1,2,3]
      userIDs.reduce(async (previousPromise,nextID) => { await previousPromise; return methodThatReturnsAPromise(nextID); }, Promise.resolve())
------------------------------------------
*/


//----------------------General hash/HMAC-related stuff(start):
const hashResult = {'hashObjectName':'', 'storageFormat':'base64', 'calculatedHash':'', 'hashOptions':{}}

const hashPw       = (password, sync=true, hashAlgo='sha512', hashDigest='base64') => {
  const result = Object.assign({}, hashResult, {'hashObjectName':'general', 'storageFormat':(['base64','hex','ascii'].includes(hashDigest)?hashDigest:'base64')})
  result.hashOptions['hashAlgo'] = ['sha512','sha3-512'].includes(hashAlgo) ? hashAlgo : 'sha512'
  result.calculatedHash          = password.length<3 ? false : crypto.createHash(result.hashOptions.hashAlgo).update(password,'utf8').digest(result.storageFormat)
  return {'result':result, 'hashStringToStore':btoa(JSON.stringify(result))}
}
const hashPwVerify = (password, storedHashString=btoa('{}'), sync=true) => {
  const result = JSON.parse(atob(storedHashString))
  return (!result.hashObjectName||result.hashObjectName!=='general') ? false : hashPw(password, sync, result.hashOptions.hashAlgo, result.storageFormat).result.calculatedHash === result.calculatedHash
}
const hashGeneral  = {'hashGen':hashPw, 'hashVerify':hashPwVerify, 'implemented':{'full':false, 'sync':true, 'async':false, 'pw':{'sync':true,'async':false}, 'pwVerify':{'sync':true,'async':false}}}

const pbkdf2Pw = (password='', sync=true, iterations=100000, hashAlgo='sha512', keylen=64, storageFormat='base64', salt) => {
  const result = Object.assign({}, hashResult, {'hashObjectName':'pbkdf2', 'storageFormat':(['base64','hex','ascii'].includes(storageFormat)?storageFormat:'base64')})
  result.hashOptions['iterations'] = iterations
  result.hashOptions['hashAlgo']   = ['sha512','sha3-512'].includes(hashAlgo) ? hashAlgo : 'sha512'
  result.hashOptions['keylen']     = parseInt(keylen)
  result.hashOptions['keylen']     = (result.hashOptions.keylen<16||result.hashOptions.keylen>512) ? 64 : result.hashOptions.keylen
  result.hashOptions['salt']       = !salt?crypto.randomBytes(result.hashOptions.keylen).toString(result.storageFormat):salt
  if (typeof password!=='string'||password.length<8) {
    result.calculatedHash = false
  }
  else if (sync)                                     {
    result.calculatedHash = crypto.pbkdf2Sync(password, Buffer.from(result.hashOptions.salt,result.storageFormat), result.hashOptions.iterations, result.hashOptions.keylen, result.hashOptions.hashAlgo).toString(result.storageFormat)
  }
  else {
    const hashCalculated = derivedKey                                       => {result.calculatedHash = derivedKey.toString(result.storageFormat)}
    const hashCalcError  = err                                              => {result.calculatedHash = false; /*console.warn('\x1b[1;97mpbkdf2Pw\x1b[1;96m(\x1b[1;93m...\x1b[1;96m)\x1b[m \x1b[1;91merror\x1b[m! Error message is: \'\x1b[31m%s\x1b[m\'', err.message);*/}
    const theAsync       = async (password,salt,iterations,keylen,hashAlgo) => {await new Promise((res,rej) => crypto.pbkdf2(password,salt,iterations,keylen,hashAlgo,(err,derivedKey)=>(typeof err==='undefined'||err===null)?res(derivedKey):rej(err))).then(hashCalculated).catch(hashCalcError)}
    theAsync(password,Buffer.from(result.hashOptions.salt,result.storageFormat),result.hashOptions.iterations,result.hashOptions.keylen,result.hashOptions.hashAlgo)
  }
//  console.log("\x1b[1;97mpbkdf2Pw('\x1b[22;33m"+password+"\x1b[1;97m', \x1b[22;33m"+sync+"\x1b[1;97m, \x1b[22;33m"+iterations+"\x1b[1;97m, '\x1b[22;33m"+hashAlgo+"\x1b[1;97m', \x1b[22;33m"+keylen+"\x1b[1;97m, '\x1b[22;33m"+storageFormat+"\x1b[1;97m', \x1b[22;33m"+(!salt?"undefined":"\x1b[1;97m'\x1b[22;33m"+salt+"\x1b[1;97m'")+"\x1b[1;97m):\x1b[m\n\x1b[97mresult:\x1b[m %o.",result)
  return {'result':result, 'hashStringToStore':btoa(JSON.stringify(result))}
}
const pbkdf2PwVerify = (password, storedHashString=btoa('{}'), sync=true) => {
  const result = JSON.parse(atob(storedHashString))
  return (!result.hashObjectName||result.hashObjectName!=='pbkdf2') ? false : pbkdf2Pw(password,sync,result.hashOptions.iterations,result.hashOptions.hashAlgo,result.hashOptions.keylen,result.storageFormat,result.hashOptions.salt).result.calculatedHash === result.calculatedHash
}
const hashPbkdf2     = {'hashGen':pbkdf2Pw, 'hashVerify':pbkdf2PwVerify, 'implemented':{'full':false, 'sync':true, 'async':false, 'pw':{'sync':true,'async':false}, 'pwVerify':{'sync':true,'async':false}}}

const scryptPw       = (password='', sync=true, hashBytesSize=64, storageFormat='base64', salt) => {
  const result = Object.assign({}, hashResult, {'hashObjectName':'scrypt', 'storageFormat':(['base64','hex','ascii'].includes(storageFormat)?storageFormat:'base64')})
  result.hashOptions['hashBytesSize'] = parseInt(hashBytesSize)
  result.hashOptions['hashBytesSize'] = (result.hashOptions.hashBytesSize<16||result.hashOptions.hashBytesSize>512) ? 64 : result.hashOptions.hashBytesSize
  result.hashOptions['salt']          = !salt?crypto.randomBytes(result.hashOptions.hashBytesSize).toString(result.storageFormat):salt
  result.calculatedHash  = (typeof password!=='string'||password.length<8) ? false : crypto.scryptSync(password, Buffer.from(result.hashOptions.salt,result.storageFormat), result.hashOptions.hashBytesSize, {cost:16384,blockSize:8,parallelization:1,maxmem:(32*1024*1024)}).toString(result.storageFormat)
//  console.log("\x1b[1;97mscryptPw('\x1b[22;33m"+password+"\x1b[1;97m', \x1b[22;33m"+sync+"\x1b[1;97m, \x1b[22;33m"+hashBytesSize+"\x1b[1;97m, '\x1b[22;33m"+storageFormat+"\x1b[1;97m', \x1b[22;33m"+(!salt?"undefined":"\x1b[1;97m'\x1b[22;33m"+salt+"\x1b[1;97m'")+"\x1b[1;97m):\x1b[m\n\x1b[97mresult:\x1b[m %o.\n",result)
  return {'result':result, 'hashStringToStore':btoa(JSON.stringify(result))}
}
const scryptPwVerify = (password, storedHashString=btoa('{}'), sync=true) => {
  const result = JSON.parse(atob(storedHashString))
//  console.log("\x1b[1;97mscryptPwVerify('\x1b[22;33m"+password+"\x1b[1;97m', \x1b[22;33m"+atob(storedHashString)+"\x1b[1;97m, \x1b[22;33mtrue\x1b[1;97m):\x1b[m\n\x1b[97mresult:\x1b[m %o\n\x1b[97mscryptPw('"+password+"',"+sync+","+result.hashOptions.hashBytesSize+",'"+result.storageFormat+"',"+result.hashOptions.salt+").result.calculatedHash\x1b[m='\x1b[1;93m"+scryptPw(password,sync,result.hashOptions.hashBytesSize,result.storageFormat,result.hashOptions.salt).result.calculatedHash+"\x1b[m'.\n",result)
  return (!result.hashObjectName||result.hashObjectName!=='scrypt') ? false : scryptPw(password,sync,result.hashOptions.hashBytesSize,result.storageFormat,result.hashOptions.salt).result.calculatedHash === result.calculatedHash
}
const hashScrypt     = {'hashGen':scryptPw, 'hashVerify':scryptPwVerify, 'implemented':{'full':false, 'sync':true, 'async':false, 'pw':{'sync':true,'async':false}, 'pwVerify':{'sync':true,'async':false}}}

const bcryptPw       = (password='', sync=true, hashBytesSize=64, storageFormat='base64') => {
  const result = Object.assign({}, hashResult, {'hashObjectName':'bcrypt', 'storageFormat':(['base64','hex','ascii'].includes(storageFormat)?storageFormat:'base64')})
  result.hashOptions['hashBytesSize'] = parseInt(hashBytesSize)
  result.hashOptions['hashBytesSize'] = (result.hashOptions.hashBytesSize<16||result.hashOptions.hashBytesSize>512) ? 64 : result.hashOptions.hashBytesSize
  result.hashOptions['salt']          = crypto.randomBytes(result.hashOptions.hashBytesSize).toString(result.storageFormat)
  result.calculatedHash               = false
  return {'result':result, 'hashStringToStore':btoa(JSON.stringify(result))}
}
const bcryptPwVerify = (password, storedHashString=btoa('{}'), sync=true) => {
  const result = JSON.parse(atob(storedHashString))
  return (!result.hashObjectName||result.hashObjectName!=='bcrypt') ? false : bcryptPw(password,sync,result.hashOptions.hashBytesSize,result.storageFormat).result.calculatedHash.result.calculatedHash === result.calculatedHash
}
const hashBcrypt     = {'hashGen':bcryptPw, 'hashVerify':bcryptPwVerify, 'implemented':{'full':false, 'sync':false, 'async':false, 'pw':{'sync':false,'async':false}, 'pwVerify':{'sync':true,'async':false}}}

const argon2PrePw       = async (password,sync,type,result) => { let calculatedHash; try {calculatedHash=await argon2.hash(password, {'type':argon2[type], 'memoryCost':65536, 'timeCost':10, 'parallelism':1, 'hashLength':64, 'raw':false})} catch (err) {calculatedHash=false;/*console.warn('Error in argon2Pw! err.message: %o',err.message);*/} result.calculatedHash = await calculatedHash; return await calculatedHash; }
const argon2PrePwVerify = async (password,hash)             => { let verifyResult=false; try {verifyResult = await argon2.verify(hash,password)} catch (err) {verifyResult=false;/*console.warn('Error in argon2PwVerify! err.message: %o',err.message)*/} return verifyResult; }
const argon2Pw       = (password, sync=true, type='argon2id')       => {
  const result = Object.assign({}, hashResult, {'hashObjectName':'argon2','hashOptions':{}})
  type = ['argon2id'].includes(type) ? type : 'argon2id'
  argon2PrePw(password,sync,type,result)
//  argon2PrePw(password,sync,type,result).then( ()=>({'result':result, 'hashStringToStore':btoa(JSON.stringify(result))}) )
  return {'result':result, 'hashStringToStore':btoa(JSON.stringify(result))}
}
const argon2PwVerify = (password, storedHashString=btoa('{}'), sync=true) => {
  const result       = JSON.parse(atob(storedHashString))
  const verifyResult = (!result.hashObjectName||result.hashObjectName!=='argon2') ? false : argon2PrePwVerify(result.calculatedHash,password).then(res=>res)
//  console.log("\x1b[1;97mscryptPwVerify('\x1b[22;33m"+password+"\x1b[1;97m', \x1b[22;33m"+atob(storedHashString)+"\x1b[1;97m, \x1b[22;33mtrue\x1b[1;97m):\x1b[m\n\x1b[97mresult:\x1b[m %o\n\x1b[97mscryptPw('"+password+"',"+sync+","+result.hashOptions.hashBytesSize+",'"+result.storageFormat+"',"+result.hashOptions.salt+").result.calculatedHash\x1b[m='\x1b[1;93m"+scryptPw(password,sync,result.hashOptions.hashBytesSize,result.storageFormat,result.hashOptions.salt).result.calculatedHash+"\x1b[m'.\n",result)
  return verifyResult
}
const hashArgon2     = {'hashGen':argon2Pw, 'hashVerify':argon2PwVerify, 'implemented':{'full':false, 'sync':false, 'async':false, 'pw':{'sync':false,'async':false}, 'pwVerify':{'sync':false,'async':false}}}

const xxHash64Pw       = (password, sync=true)       => {
  const result = Object.assign({}, hashResult, {'hashObjectName':'xxHash64'})
  result.calculatedHash  = false
  return {'result':result, 'hashStringToStore':btoa(JSON.stringify(result))}
}
const xxHash64PwVerify = (password, storedHashString=btoa('{}'), sync=true) => {
  const result = JSON.parse(atob(storedHashString))
  return (!result.hashObjectName||result.hashObjectName!=='xxHash64') ? false : xxHash64Pw(password,sync).result.calculatedHash === result.calculatedHash
}
const hashXXHash64     = {'hashGen':xxHash64Pw, 'hashVerify':xxHash64PwVerify, 'implemented':{'full':false, 'sync':false, 'async':false, 'pw':{'sync':false,'async':false}, 'pwVerify':{'sync':true,'async':false}}}

const xxHash128Pw       = (password, sync=true)       => {
  const result = Object.assign({}, hashResult, {'hashObjectName':'xxHash128'})
  result.calculatedHash  = false
  return {'result':result, 'hashStringToStore':btoa(JSON.stringify(result))}
}
const xxHash128PwVerify = (password, storedHashString=btoa('{}'), sync=true) => {
  const result = JSON.parse(atob(storedHashString))
  return (!result.hashObjectName||result.hashObjectName!=='xxHash128') ? false : xxHash128Pw(password,sync).result.calculatedHash === result.calculatedHash
}
const hashXXHash128     = {'hashGen':xxHash128Pw, 'hashVerify':xxHash128PwVerify, 'implemented':{'full':false, 'sync':false, 'async':false, 'pw':{'sync':false,'async':false}, 'pwVerify':{'sync':true,'async':false}}}

const hashes = {'general':hashGeneral, 'pbkdf2':hashPbkdf2, 'scrypt':hashScrypt, 'bcrypt':hashBcrypt, 'argon2':hashArgon2, 'xxHash64':hashXXHash64, 'xxHash128':hashXXHash128, 'pwVerify':null}

const pwVerify = (password, storedHashString=btoa('{}'), sync=true) => {
  const result = JSON.parse(atob(storedHashString))
  return hashes[result.hashObjectName].hashVerify(password,storedHashString,sync)
}

hashes.pwVerify = pwVerify
//----------------------General hash/HMAC-related stuff(end)


export { hashes as default, hashes }
