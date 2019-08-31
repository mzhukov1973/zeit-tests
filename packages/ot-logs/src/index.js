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
import   fs                                 from 'fs'
import   path                               from 'path'
import   hashes                             from './cryptoUtils'
// import   http                               from 'http'
// import   pino                               from 'pino'
import   logzio                             from 'logzio-nodejs'
import { Timber }                           from '@timberio/node'
import { ITimberLog }                       from '@timberio/types' // <=== Is needed to write our own middleware functions.



////pino-http ==> pino  --- configure and use the logger:
//const pinoHttpOptions = {'logger':pino(), 'genReqId':req=>req.id, 'serializers':{'err':pino.stdSerializers.err,'req':pino.stdSerializers.req,'res':pino.stdSerializers.res}, 'useLevel':'info', 'customLogLevel':(res,err)=>res.statusCode>=400&&res.statusCode<500?'warn':(res.statusCode>=500||err?'error':'info')}
//const pinoHttpLogger  = require('pino-http')(pinoHttpOptions)
//const pinoHttpHandler = (req,res) => {
//  pinoHttpLogger(req,res)
//  req.log.info('Text log msg from ot-logs.umbra-translucens.online to pino via pino-http.')
//  res.end('And another text log msg from ot-logs.umbra-translucens.online to pino via pino-http.')
//}
////const httpServer = http.createServer(pinoHttpHandler)
////httpServer.listen(3000)


// logz.io --- configure the logger:
const logzioOptions = {
  'type':'ot-logs_uc_online___logzio-nodejs', 'token':process.env.logzioAccountToken, 'callback':err=>console.log("\x1b[1;93mLogz.io:\x1b[m \x1b[1;91mError! \x1b[22;31mAn unrecoverable error has occured in the logger.\n\x1b[1;91merr:\x1b[m %o",err),
  'protocol':'https', 'host':'listener.logz.io', 'port':8071,
  'timeout':5000, 'sleepUntilNextRetry':2000, 'sendIntervalMs':10000, 'bufferSize':1, 'numberOfRetries':5, 'debug':false, 'addTimestampWithNanoSecs':false, 'compress':true, 'internalLogger':console, 'supressErrors':false
}                                                                //                100
const logzioLogger = logzio.createLogger(logzioOptions)
// logz.io --- start sending logs:
let logzioTextToLog = 'This is a text log message from ot-logs.umbra-translucens.online to Logz.io via logzio-nodejs.'
let logzioObjToLog  = {'message':'This is a log message from ot-logs.umbra-translucens.online to Logz.io via logzio-nodejs, sent as a property of an object.','prp1':'val1','prp2':234,'prp3':2.71,'prp4':0xaef0,'prp5':[100000,'sha3-512',64,'base64'],'prp6':null,'prp7':false,'prp8':'edеакекекеПРОЛО','prp9':true}
logzioLogger.log(logzioTextToLog)             /* <=== logz.io --- sending text      */
logzioLogger.log(logzioObjToLog)              /* <=== logz.io --- sending an object */
const logzioIntLog       = intervalLogs => logzioLogger.log(intervalLogs.getMessage())
const logzioIntervalLogs = {
  'timerId':         0,
  'timerIntervalMs': 10000,
  'timerKill':       function() {clearInterval(this.timerId)},
  'cntr':       0,
  'cntrMax':    25,
  'msgSrc':     ['Interval log message (attempt to log is made every 10 seconds) #', ' from ot-logs.umbra-translucens.online to Logz.io via logzio-nodejs.'],
  'getMessage': function() {
                  this.cntr++
                  if (this.cntr>=this.cntrMax) {
                    this.timerKill()
                    console.log("\x1b[1;97mlogzioIntervalLogs.getMessage(...)\x1b[m: counter=\x1b[1;91m%d\x1b[1;93m(\x1b[1;91m%d\x1b[1;93m)\x1b[m. Timer has been killed.",this.cntr,this.cntrMax)
                  }
                  console.log("\x1b[1;97mlogzioIntervalLogs.getMessage(...)\x1b[m: counter=\x1b[1;91m%d\x1b[1;93m(\x1b[1;91m%d\x1b[1;93m)\x1b[m.",this.cntr,this.cntrMax)
                  return this.msgSrc[0] + String(this.cntr) + this.msgSrc[1]
                }
}
logzioIntervalLogs.timerId = setInterval(logzioIntLog, logzioIntervalLogs.timerIntervalMs, logzioIntervalLogs)
setTimeout(logzioLogger.sendAndClose,3000000) /* <=== logz.io --- wait for five minutes and shut down connection to the logging service */



// timber.io --- configure the logger:                                    1000
const timberioOptions = {'endpoint':'https://logs.timber.io', 'batchSize':1, 'batchInterval':1000, 'syncMax':5, 'ignoreExceptions':false}
const timberioLogger  = new Timber(process.env.timberioCredentialsAPIKey, process.env.timberioCredentialsSourceId, timberioOptions)
/* Will resolve when synced with Timber.io (or reject if there's an error): */
timberioLogger.debug("Text log msg from ot-logs.umbra-translucens.online to Timber.io via @timberio/node. This message is being logged at 'debug' loglevel.")
timberioLogger.info("Text log msg from ot-logs.umbra-translucens.online to Timber.io via @timberio/node. This message is being logged at 'info' loglevel.")
timberioLogger.warn("Text log msg from ot-logs.umbra-translucens.online to Timber.io via @timberio/node. This message is being logged at 'warn' loglevel.")
timberioLogger.error("Text log msg from ot-logs.umbra-translucens.online to Timber.io via @timberio/node. This message is being logged at 'error' loglevel.")
timberioLogger.log("Text log msg from ot-logs.umbra-translucens.online to Timber.io via @timberio/node.This message is sent via timber.log(...) function, which resturns a promise that resolves when the log message gets synced to Timber.io. N.B.:I assume a typo in API docs and use an instance of Timber logger class (timberioLogger = new Timber(...)) instead of 'timber'.").then(log => {}) //<=== 'log' is the transformed log, after going through middleware
/* Augment your logs with structured data (and add success and reject console.logs): */
timberioLogger.info("'Info' level log message from ot-logs.umbra-translucens.online to Timber.io via @timberio/node. This message will be augmented by middleware and the promise this logging function returns shall resolve (or reject) when the message will get logged to Timber.io.",{'additional_info':'this object is a middleware-sourced addition to the original text log message, augmenting it on its way ti Timber.io logging service.',order_placed:{id:1234,total:500.23}}).then(log=>{console.log("\x1b[1;97mlogger.info(....):\x1b[m At this point, log message is synced to Timber.io! 'log' message after passing all middlewares now lookes like this:\n %o",log)}).catch(err=>console.log("\x1b[1;97mlogger.info(....):\x1b[m \x1b[1;91mError!\x1b[m Promise rejected, log message was \x1b[1;91mnot\x1b[m synced to Timber.io!\n\x1b[1;91merr: \x1b[m %o",err))
/* Here's what a middleware function looks like: */

/* In this example function, we'll add custom 'context' meta to the log representing the currently logged in user. Note: a middleware function is any function that takes an 'ITimberLog' and returns a 'Promise<ITimberLog>'. */
////async function timberioMiddlewareAddCurrentUser(log:ITimberLog): Promise<ITimberLog> { return {...log, 'user':{'id':1000,'name':"Lee"}} }
//const timberioMiddlewareAddCurrentUser = async (log=new ITimberLog()) => ({...log, 'user':{'id':1000,'name':"Lee"}})
/* Then just attach it to the Timber instance with .use(): */
//timberioLogger.use(timberioMiddlewareAddCurrentUser)
//timberioLogger.warn("Text log msg from ot-logs.umbra-translucens.online to Timber.io via @timberio/node. This message is being logged at 'warn' loglevel. Additional middleware has just been added to the logger.")
/* You can also remove the added middleware by calling .remove() with middleware in question as argument: */
//timberioLogger.remove(timberioMiddlewareAddCurrentUser)
//timberioLogger.warn("Text log msg from ot-logs.umbra-translucens.online to Timber.io via @timberio/node. This message is being logged at 'warn' loglevel. Additional middleware has just been removed from the logger.")







const hashType         = 'pbkdf2'
let pbkdf2Options      = [100000, 'sha-512', 64, 'base64']
let pw                 = '330117440119mz114'
let passwordHashString = hashes[hashType].hashGen(pw,true,...pbkdf2Options).hashStringToStore
let verificationResult = hashes.pwVerify(pw, passwordHashString, true)



module.exports = (req, res) => {
  res.end("---passwordHashString:--->\n"+passwordHashString+"\n<---", {encoding:'utf8'})
}

