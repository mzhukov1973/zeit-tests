/* A test of streams, socket-based i/o & ffmpeg. */

const fs       = require('fs')
const path     = require('path')
const zlib     = require('zlib')

const htmlOutput = "<!doctype html>\n<html lang=en>\n <head>\n  <meta charset='utf8'/>\n  <title>Zeitβ|²: UTC-Online Zeit™ Now™ / GitHub™ deployment</title>\n </head>\n <body>\n  <div><strong>Zeit&trade; Now&trade; builder:</strong>&nbsp;<code>@now/node</code></div>\n  <div><strong><code>index.js</code></strong> - done.</div>\n  <hr width='100%'>\n  <div>Yes, really done.</div>\n </body>\n</html>\n"

const gzip = zlib.createGzip()
//const inp = fs.createReadStream('input.txt')
//const out = fs.createWriteStream('input.txt.gz')
//inp.pipe(gzip).pipe(out)





module.exports = (req,res) => {
  res.end(htmlOutput)
}
