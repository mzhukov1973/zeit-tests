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

//----------------------ECDH stuff(start):
//Initialise module from secrets stored in Zeits' Now secrets (exposed via process.env):
const ecdhExp            = {}
let   ecdh               = false
const ecdhPrivateKey     = process.env.ownECDHPrivateKey
const ecdhParams         = (!process.env.ownECDHParameters) ? {'encoding':'base64','curve':'sect571k1','keyFormat':'uncompressed'} : JSON.parse(process.env.ownECDHParameters)
const ecdhClientsPubKeys = (!process.env.preSharedECDHPublicKeys) ? {} : JSON.parse(process.env.preSharedECDHPublicKeys)
const ecdhPreSharedPubs  = Object.keys(ecdhClientsPubKeys)
let   ecdhPubKey         = false
let   ecdhInitDone       = false
let   ecdhInitLog        = ''
const ecdhGetOwnPubKey   = () => ecdh.getPublicKey(ecdhParams.encoding, ecdhParams.keyFormat)
const ecdhCalcSecret     = otherSide => {
  let otherPubKey = false
  if (!otherSide) {return false}
  if (!ecdhClientsPubKeys[otherSide]) {
//    console.log("ecdhCalcSecret Error! ecdhClientsPubKeys['%s'] doesn't exist!",otherSide)
    return false
  } else {
    otherPubKey=ecdhClientsPubKeys[otherSide]
  }
  try {
    return ecdh.computeSecret(otherPubKey, ecdhParams.encoding, ecdhParams.encoding)
  } catch(err) {
//    console.log("ecdh.computeSecret Error! ecdh.computeSecret(otherPublicKey, inputEncoding, outputEncoding) has failed, throwing an error: '%s'.\notherPublicKey='%s'\ninputEncoding='%s'\noutputEncoding='%s'", err.message, otherPubKey, ecdhParams.encoding, ecdhParams.encoding)
  }
  return false
}
const ecdhCalcSecretFromKey = otherPubKey => {
  if (!otherPubKey) {return false}
  try {
    return ecdh.computeSecret(otherPubKey, ecdhParams.encoding, ecdhParams.encoding)
  } catch(err) {
    console.log("ecdh.computeSecret Error! ecdh.computeSecret(otherPublicKey, inputEncoding, outputEncoding) has failed, throwing an error: '%s'.\notherPublicKey='%s'\ninputEncoding='%s'\noutputEncoding='%s'", err.message, otherPubKey, ecdhParams.encoding, ecdhParams.encoding)
  }
  return false
}
const ecdhInit           = () => {
  ecdhInitLog = "ECDH initLog:\n"
  ecdh = crypto.createECDH(ecdhParams.curve)
  ecdhInitLog += "Created ecdh instance with the '"+ecdhParams.curve+"' curve.\n"
  try {
    ecdh.setPrivateKey(ecdhPrivateKey,ecdhParams.encoding)
    ecdhInitLog += "Set ECDH instances' private key to '"+ecdhPrivateKey+"'.\n"
    ecdhPubKey   = ecdhGetOwnPubKey()
    ecdhInitLog += "Got ECDH instances' public key ('"+ecdhPubKey+"')\n"
    ecdhInitDone = true
    ecdhInitLog += "Set ecdhInitDone to true.\n"
  } catch(err) {
//    console.log("ecdh.setPrivateKey Error! ecdh.setPrivateKey(privateKey,encoding) has failed, throwing an error: '%s'.\nprivateKey='%s'\nencoding='%s'", err.message, ecdhPrivateKey, ecdhParams.encoding)
    ecdhInitLog += "Caught error while setting the ECDH instances' private key!\n"
  }
}

//crypto.randomBytes(size[, callback])

//crypto.privateEncrypt(privateKey, buffer)
//crypto.privateDecrypt(privateKey, buffer)
//crypto.publicEncrypt(publicKey, buffer)
//crypto.publicDecrypt(publicKey, buffer)

//crypto.createSign(algorithm[, options])
//sign.update(data[, inputEncoding])
//sign.sign(privateKey[, outputEncoding])
//crypto.createVerify(algorithm[, options])
//verify.update(data[, inputEncoding])
//verify.verify(object, signature[, signatureEncoding])

/*
  const { privateKey, publicKey } = crypto.generateKeyPairSync('rsa',{modulusLength:2048})
  const sign                      = crypto.createSign('SHA256')
    sign.update('some data to sign')
    sign.end()
  const signature = sign.sign(privateKey)
  const verify    = crypto.createVerify('SHA256')
    verify.update('some data to sign')
    verify.end()
    console.log(verify.verify(publicKey, signature)) //<=== Prints: true
*/
ecdhInit()
ecdhExp['calcSecret']     = ecdhCalcSecret
ecdhExp['calcSecretFromKey'] = ecdhCalcSecretFromKey
ecdhExp['preSharedPubs']  = ecdhPreSharedPubs
ecdhExp['pubKey']         = ecdhPubKey
ecdhExp['initDone']       = ecdhInitDone
//ecdhExp['initLog']        = ecdhInitLog
//----------------------ECDH stuff(end)

export {ecdhExp as default, ecdhExp as ecdh }
