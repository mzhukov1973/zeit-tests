/*React************************************************************************/
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
/* A test of streams, socket-based i/o & ffmpeg.                              **************/
/* --------------------------------------------------------------------------------------- */
/* An app to play a client to zeit-test-02's video stream watermarking λ. Streams a video. */
const fs       = require('fs')

const htmlOutput = "<!doctype html>\n<html lang=en>\n <head>\n  <meta charset='utf8'/>\n  <title>UTC-Online Zeit™ Now™ / GitHub™ deployment</title>\n </head>\n <body>\n  <div><strong>Zeit&trade; Now&trade; builder:</strong>&nbsp;<code>@now/node</code></div>\n  <div><strong><code>index.js</code></strong> - done.</div>\n  <hr width='100%'>\n  <div>Yes, really done.</div>\n </body>\n</html>\n"

const gzip = zlib.createGzip()
//const inp = fs.createReadStream('input.txt')
//const out = fs.createWriteStream('input.txt.gz')
//inp.pipe(gzip).pipe(out)





module.exports = (req,res) => {
  res.end(htmlOutput)
}
