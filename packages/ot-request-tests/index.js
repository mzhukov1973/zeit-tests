const request = require('request')
const crypto  = require('crypto')

const urlToFetch       = 'https://ot-db.umbra-translucens.online/db'
const dbPubKey         = 'BAFZzhtQbUa7JVlOvELQ8UKsP7ZkVmsQbTZJHwAygEGxzcX0gvn55LGubobfT7tndQrOjnGmC5fZlsIML90Gs9zJGUWz8oh7ugMQ/WJQMTuiGRsTxokMlJOe0UPf6wyH2w0io2tfb13FF0Yk4Ei7rWUc09kaEowNLOJ40A2Sfs9TMyJazPV/Znf7Veo1SnnQBQ=='
const knownNames       = ['np-auth','ot-logs']
const knownPrivateKeys = {
  'np-auth': 'AUIE7f32WNhhubQ7TJ4WZSsCrmpr46jrLsCRr9C+VZNTs/tQGgHi+NGVkg28YHUfsDtC2ytGUvkP9F8Ins/NL8OsQHpRhYL6',
  'ot-logs': 'ofy15kqWUfNs+O4eHpKb+B5gXzLxHUfnQKKLNN47fjhwDDSK3j0z4bWRo+b/0U00f4R7VRJm0zoA8x6kziLr99g9Le10ySE='
}
const myName           = 'np-auth'
const myPassword       = '123mzhukov456mz4'

const ecdh     = crypto.createECDH('sect571k1')
if (knownNames.includes(myName)) {ecdh.setPrivateKey(knownPrivateKeys[myName],'base64')} else {ecdh.generateKeys('base64','uncompressed')}
const myPubKey = ecdh.getPublicKey('base64','uncompressed')
const calcSec  = ecdh.computeSecret(dbPubKey,'base64','base64')
//const cipher              = crypto.createCipheriv('aes256', calcSec, null)
//let   myPasswordEncrypted = cipher.update(myPassword, 'utf8', 'base64')
//myPasswordEncrypted       += cipher.final('base64')
const requestOptions = {
  url: urlToFetch,
  headers: {
    'X-Cli-Pub':  knownNames.includes(myName)?'':myPubKey,
    'X-Cli-Pass': knownNames.includes(myName)?'':myPassword,
    'X-Cli-Nam':  myName,
    'X-Calc-Sec': calcSec
  }
}
const requestCallback = (error,response,body) => {
  console.log('\x1b[1;91merror:\t\t\t\t\x1b[m%o', error)
  console.log('\x1b[1;93mresponse.statusCode:\x1b[m\t\t%o \x1b[1;93m(\x1b[m%o\x1b[1;93m)\x1b[m', response && response.statusCode, response && response.statusMessage)
  console.log('\x1b[1;93mresponse.httpVersion:\x1b[m\t\t%o\x1b[1;93m.\x1b[m%o \x1b[1;93m(\x1b[m%o\x1b[1;93m)\x1b[m', response && response.httpVersionMajor, response && response.httpVersionMinor, response && response.httpVersion)
  console.log('\x1b[1;93mresponse.complete:\x1b[m\t\t%o\x1b[m', response && response.complete)
////  console.log('\x1b[1;93mresponse.httpVersion:\x1b[m\t\t%o\x1b[m', response && response.httpVersion)
  console.log("\x1b[1;93mresponse.headers['x-db-sec']:\x1b[m\t%o\x1b[m", response && response.headers['x-db-sec'])
  console.log(calcSec===response.headers['x-db-sec']?"\x1b[1;96mSecrets (\x1b[1;95mX-DB-Sec \x1b[1;96mand\x1b[1;95m ecdh.computeSecret(\x1b[22;3;95mot-db_pre-shared_public_key\x1b[1;23;95m,\x1b[22;3;95m'base64'\x1b[1;23;95m,\x1b[22;3;95m'base64'\x1b[1;23;95m)\x1b[1;96m) match! The remote host is what it should be!\x1b[m":"\x1b[1;91mSecrets (\x1b[1;95mX-DB-Sec \x1b[1;96mand\x1b[1;95m ecdh.computeSecret(\x1b[22;3;95mot-db_pre-shared_public_key\x1b[1;23;95m,\x1b[22;3;95m'base64'\x1b[1;23;95m,\x1b[22;3;95m'base64'\x1b[1;23;95m)\x1b[1;96m) don't match! The remote host is NOT what it should be!\x1b[m" )
  console.log("\x1b[1;96mbody:=============================\n\x1b[m%s\n\x1b[1;96m==================================\x1b[m", body)
}

console.log("\x1b[1;97murlToFetch:\t\t\t\x1b[22;95m%s\x1b[m", urlToFetch)
request(requestOptions, requestCallback)

/* request.get('https://ot-db.umbra-translucens.online').on('response', function(response){console.log(response.statusCode); console.log(response.headers['content-type']);}).pipe(request.put('http://mysite.com/img.png')) */
/* request.get('https://ot-db.umbra-translucens.online', {'auth': {'user':'username', 'pass':'password', 'sendImmediately':false}})                                                                                          */
