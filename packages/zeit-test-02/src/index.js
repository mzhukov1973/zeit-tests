/*JSX**************************************************************************/
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
/* A test of streams, socket-based i/o & ffmpeg. */
import fs   from 'fs'
import path from 'path'
//import http from 'http'

const htmlOutput = "<!doctype html>\n"                                                                                                                             +
                   "<html lang=en>\n"                                                                                                                              +
                   " <head>\n"                                                                                                                                     +
                   "  <meta charset='utf8'/>\n"                                                                                                                    +
                   "  <meta name='viewport'         content='width=device-width, minimum-scale=1, shrink-to-fit=no, initial-scale=1, user-scalable=yes'/>\n"       +
                   "  <meta name='application-name' content='Zeitᵦ|²'/>\n"                                                                                         +
                   "  <meta name='theme-color'      content='#00aba9'/>\n"                                                                                         +
                   "  <meta name='background-color' content='#ffffff'/>\n"                                                                                         +
                   "  <link rel='shortcut icon' type='image/x-icon'  href='/favicon.ico'                sizes='16x16 24x24 32x32 48x48 64x64'/>\n"                 +
                   "  <link rel='icon'          type='image/x-icon'  href='/favicon128.ico'             sizes='16x16 24x24 32x32 48x48 64x64 128x128'/>\n"         +
                   "  <link rel='icon'          type='image/x-icon'  href='/favicon256.ico'             sizes='16x16 24x24 32x32 48x48 64x64 128x128 256x256'/>\n" +
                   "  <link rel='icon'          type='image/png'     href='/favicon-16x16.png'          sizes='16x16'/>\n"                                         +
                   "  <link rel='icon'          type='image/png'     href='/favicon-32x32.png'          sizes='32x32'/>\n"                                         +
                   "  <link rel='icon'          type='image/png'     href='/favicon-36x36.png'          sizes='36x36'/>\n"                                         +
                   "  <link rel='icon'          type='image/png'     href='/favicon-48x48.png'          sizes='48x48'/>\n"                                         +
                   "  <link rel='icon'          type='image/png'     href='/favicon-72x72.png'          sizes='72x72'/>\n"                                         +
                   "  <link rel='icon'          type='image/png'     href='/favicon-96x96.png'          sizes='96x96'/>\n"                                         +
                   "  <link rel='icon'          type='image/png'     href='/android-chrome-192x192.png' sizes='192x192'/>\n"                                       +
                   "  <link rel='icon'          type='image/png'     href='/android-chrome-194x194.png' sizes='194x194'/>\n"                                       +
                   "  <link rel='icon'          type='image/png'     href='/android-chrome-256x256.png' sizes='256x256'/>\n"                                       +
                   "  <link rel='icon'          type='image/png'     href='/android-chrome-512x512.png' sizes='512x512'/>\n"                                       +
                   "  <link rel='icon'          type='image/png'     href='/logo-1024x1024.png'         sizes='1024x1024'/>\n"                                     +
                   "  <link rel='icon'          type='image/svg+xml' href='/logo-1024x1024.svg'         sizes='1024x1024'/>\n"                                     +
                   "  <title>Zeitᵦ|²: UTC-Online Zeit™ Now™ / GitHub™ deployment</title>\n"                                                                        +
                   "  <style>\n"                                                                                                                                   +
                   "   .cont_ext {\n"                                                                                                                              +
                   "     display:flex;\n"                                                                                                                          +
                   "     flex-flow: column nowrap;\n"                                                                                                              +
                   "     justify-content: center;\n"                                                                                                               +
                   "     align-items: center;\n"                                                                                                                   +
                   "     height:100%;\n"                                                                                                                           +
                   "   }\n"                                                                                                                                        +
                   "   .cont_int {\n"                                                                                                                              +
                   "     display:flex;\n"                                                                                                                          +
                   "     flex-flow: column nowrap;\n"                                                                                                              +
                   "     justify-content: center;\n"                                                                                                               +
                   "     align-items: center;\n"                                                                                                                   +
                   "   }\n"                                                                                                                                        +
                   "   .cont_int_01 {\n"                                                                                                                           +
                   "     order:1;\n"                                                                                                                               +
                   "     flex-grow:0;\n"                                                                                                                           +
                   "     font-size:1.5rem;\n"                                                                                                                      +
                   "   }\n"                                                                                                                                        +
                   "   .cont_int_02 {\n"                                                                                                                           +
                   "     order:2;\n"                                                                                                                               +
                   "     flex-grow:1;\n"                                                                                                                           +
                   "     font-size:4rem;\n"                                                                                                                        +
                   "   }\n"                                                                                                                                        +
                   "   html,body {\n"                                                                                                                              +
                   "     height:calc(100% - 4rem);\n"                                                                                                              +
                   "   }\n"                                                                                                                                        +
                   "  </style>\n"                                                                                                                                  +
                   " </head>\n"                                                                                                                                    +
                   " <body>\n"                                                                                                                                     +
                   "  <div class='cont_ext'>\n"                                                                                                                    +
                   "   <div class='cont_int cont_int_01'>\n"                                                                                                       +
                   "    <h1>Zeitᵦ|²</h1>\n"                                                                                                                        +
                   "    <h5>(Zeit Test 02)</h5>\n"                                                                                                                 +
                   "    <h6>Zeit™ Now™ builder:&nbsp;<code>@now/static-build</code></h6>\n"                                                                        +
                   "   </div>\n"                                                                                                                                   +
                   "   <div class='cont_int cont_int_02'>\n"                                                                                                       +
                   "    <h3><code>index.js</code> - done.</h3>\n"                                                                                                  +
                   "    <hr width='100%'>\n"                                                                                                                       +
                   "    <h4><em>Yes, really done.</em></h4>\n"                                                                                                     +
                   "   </div>\n"                                                                                                                                   +
                   "  </div>\n"                                                                                                                                    +
                   " </body>\n"                                                                                                                                    +
                   "</html>\n"

//const inp = fs.createReadStream('input.txt')
//const out = fs.createWriteStream('input.txt.gz')
//inp.pipe(gzip).pipe(out)



module.exports = (req,res) => {
  res.end(htmlOutput)
}
