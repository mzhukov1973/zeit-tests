/*
  A test of streams, socket-based i/o & ffmpeg.
*/

const fs       = require('fs')
const path     = require('path')
const util     = require('util')

module.exports = (req, res) => {
  res.end("index.js - done.\n-------\nYes, really done.")
}
