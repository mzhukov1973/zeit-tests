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
import { hashes, ecdh } from './cryptoUtils'
import   * as storUtils from './storUtils'



const getSec     = other => ecdh.preSharedPubs.includes(other) ? ecdh.calcSecret(other) : false

//const { applyMiddleware, createSet } = require('micro-mw')
//async function myMiddleware(req,res) {
//  // Do some action based on the request
//  let someObj = async requestPromise(url, { json: true })
//  req.someObj = someObj
//}
//module.exports = applyMiddleware([ myMiddleware ], (req, res) {
//  res.end((respString0+"\n\n------------------------------------\n\n"+respString), {encoding:'utf8'})
//})

module.exports = (req,res) => {
  if (ecdh.initDone===true) {
    const xCalcSecret         = Object.keys(req.headers).includes('x-calc-sec') ? req.headers['x-calc-sec'] : ''
    const xCliPub             = Object.keys(req.headers).includes('x-cli-pub')  ? req.headers['x-cli-pub']  : ''
    const xCliPass            = Object.keys(req.headers).includes('x-cli-pass') ? req.headers['x-cli-pass'] : ''
    const xCliName            = Object.keys(req.headers).includes('x-cli-nam')  ? req.headers['x-cli-nam']  : ''
    const clientPubValid      = xCalcSecret===(ecdh.preSharedPubs.includes(xCliName)?getSec(xCliName):ecdh.calcSecretFromKey(xCliPub))
    const clientAuthenticated = clientPubValid && ecdh.preSharedPubs.includes(xCliName)
    res.setHeader('X-DB-Sec', (ecdh.preSharedPubs.includes(xCliName)?getSec(xCliName):ecdh.calcSecretFromKey(xCliPub)))
//    const cliPayload          = .......
//    const storeCliPayloadRes  = storePayload(cliPayload)
    const storeCliPayloadRes  = false
//    ...........
    res.end(
      (
       "remoteSecret:\t\t"           + xCalcSecret                                                                                                                   +
       "\nclientPub:\t\t"            + xCliPub                                                                                                                       +
       "\nclientPass:\t\t"           + xCliPass                                                                                                                      +
       "\nlocalSecret:\t\t"          + (ecdh.preSharedPubs.includes(xCliName) ? getSec(xCliName) : ecdh.calcSecretFromKey(xCliPub))                                  +
       "\nclientPubValid:\t\t"       + (clientPubValid?'\x1b[1;92m':'\x1b[1;91m')+clientPubValid+'\x1b[m'                                                            +
       "\nclientAuthenticated:\t"    + (clientAuthenticated?'\x1b[1;92m':'\x1b[1;91m')+clientAuthenticated+'\x1b[m'                                                  +
       "\nstoreCliPayloadRes:\t"     + (storeCliPayloadRes!==false?'\x1b[1;92m':'\x1b[1;91m')+clientAuthenticated+'\x1b[m'                                           +
       "\nRemote name recognised:\t" + ((clientPubValid&&ecdh.preSharedPubs.includes(xCliName)) ? '\x1b[1;92m'+xCliName+'\x1b[m' : '\x1b[1;91mnot recognised\x1b[m')
      ),
      {encoding:'utf8'}
    )
  } else {
    res.end("ecdh.initDone is not true, unable to do anything!",{encoding:'utf8'})
  }
}
