/*
  A test of streams, socket-based i/o & ffmpeg.
*/

const fs       = require('fs')
const path     = require('path')
const util     = require('util')
const locUtils = require('./js/utils.js')
let retVal = locUtils.hF1('1. argumentStringNumberOne')
retVal += ("\n" + locUtils.hF1('2. argument Number Two (also a string)'))
retVal += ("\n" + locUtils.hF1('3. third string argument (next one is going to be a number \'6\')'))
retVal += ("\n" + locUtils.hF1(6))
retVal += ("\n" + locUtils.hF1('5. fourth string argument (the next one shall have no argument at all, thus triggering the default value)'))
retVal += ("\n" + locUtils.hF1())
retVal += ("\n" + locUtils.hF1('7. fifth string argument (next one is going to be a null value)'))
retVal += ("\n" + locUtils.hF1(null))
retVal += ("\n" + locUtils.hF1('9. sixth string argument (next one is going to be an undefined value)'))
retVal += ("\n" + locUtils.hF1(undefined))
retVal += ("\n" + locUtils.hF1('11. seventh string argument and we are done.'))
module.exports = (req, res) => {
  res.end('index.js - done.' + locUtils.hF1('SomeStringArgument') + "\n-------\n" + retVal)
}
