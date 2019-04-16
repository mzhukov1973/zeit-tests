/*
  A test of streams, socket-based i/o & ffmpeg.
*/

const fs       = require('fs')
const path     = require('path')

module.exports = (req, res) => {
  res.end("<!doctype html><html lang=en><head><meta charset='utf8'/><title>Zeit Test 2</title></head><body><div><strong>Zeit&trade; Now&trade; builder:</strong>&nbsp;<code>@now/node</code></div><div><strong><code>index.js</code></strong> - done.</div><hr width='80%'><div>Yes, really done.</div></body></html>")
}
