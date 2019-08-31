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
import colors          from 'colors'
import hlsServer       from './hls-server'
import http            from 'http'
import fs              from 'fs'

const colorsTheme       = {RST:['reset'],U:['underline'],B:['bold'],YD:['yellow','dim'],YN:['yellow'],YB:['yellow','bold'],WD:['white','dim'],WN:['white'],WB:['white','bold'],WDU:['white','dim','underline'],WNU:['white','underline'],WBU:['white','bold','underline'],RD:['red','dim'],RN:['red'],RB:['red','bold'],GD:['green','dim'],GN:['green'],GB:['green','bold'],CD:['cyan','dim'],CN:['cyan'],CB:['cyan','bold'],MD:['magenta','dim'],MN:['magenta'],MB:['magenta','bold'],MDU:['magenta','dim','underline'],MNU:['magenta','underline'],MBU:['magenta','bold','underline']}
const colSafe           = (txtToColour,themeColour) => colors[themeColour](txtToColour)
const c                 = {'RST':t=>colSafe(t,'RST'),'U':t=>colSafe(t,'U'),'B':t=>colSafe(t,'B'),'YD':t=>colSafe(t,'YD'),'YN':t=>colSafe(t,'YN'),'YB':t=>colSafe(t,'YB'),'WD':t=>colSafe(t,'WD'),'WN':t=>colSafe(t,'WN'),'WB':t=>colSafe(t,'WB'),'WDU':t=>colSafe(t,'WDU'),'WNU':t=>colSafe(t,'WNU'),'WBU':t=>colSafe(t,'WBU'),'RD':t=>colSafe(t,'RD'),'RN':t=>colSafe(t,'RN'),'RB':t=>colSafe(t,'RB'),'GD':t=>colSafe(t,'GD'),'GN':t=>colSafe(t,'GN'),'GB':t=>colSafe(t,'GB'),'CD':t=>colSafe(t,'CD'),'CN':t=>colSafe(t,'CN'),'CB':t=>colSafe(t,'CB'),'MD':t=>colSafe(t,'MD'),'MN':t=>colSafe(t,'MN'),'MB':t=>colSafe(t,'MB'),'MDU':t=>colSafe(t,'MDU'),'MNU':t=>colSafe(t,'MNU'),'MBU':t=>colSafe(t,'MBU')}
const logDir            = __dirname + '/logs'
colors.setTheme(colorsTheme)
const logPrefix = c.YN('[')+c.MBU('Zeitβ|²ᶜ')+c.YN('/')+c.WBU('index.js')+c.YN(']: ')

const httpConfig = {
  port: 8001,
  host: '127.0.0.1',
}

const hlsConfig = {
  provider: {
    exists: function (req, cb) {
      const logPrefix    = c.YN('[')+c.MBU('Zeitβ|²ᶜ')+c.YN('/')+c.WBU('index.js')+c.YN('/')+c.WBU('hlsConfig.provider.exists(req,cb)')+c.YN(']: ')
      try {
        if (fs.existsSync(req.filePath)) {
        } else {
          cb(null, false)
        }
        cb(null, true)
      } catch(err) {
        cb(new Error('Server Error!'))
      }
    },
    getManifestStream: function (req, cb) { /* return the correct .m3u8 file ('req' is the http request, 'cb' must be called with error-first arguments) */
      const logPrefix = c.YN('[')+c.MBU('Zeitβ|²ᶜ')+c.YN('/')+c.WBU('index.js')+c.YN('/')+c.WBU('hlsConfig.provider.getManifestStream(req,cb)')+c.YN(']: ')
      try {
        const manifestStream = fs.createReadStream(req.filePath, {highWaterMark:64*1024})
        cb(null, manifestStream)
      } catch(err) {
        cb(new Error('Unable to create stream for manifest ('+c.RN('.m3u8')+') file for streaming!'), null)
      }
    },
    getSegmentStream: function (req, cb) { /* return the correct .ts file ('req' is the http request, 'cb' must be called with error-first arguments) */
      const logPrefix = c.YN('[')+c.MBU('Zeitβ|²ᶜ')+c.YN('/')+c.WBU('index.js')+c.YN('/')+c.WBU('hlsConfig.provider.getSegmentStream(req,cb)')+c.YN(']: ')
      try {
        const segmentStream = fs.createReadStream(req.filePath)
        cb(null, segmentStream)
      } catch(err) {
        cb(new Error('Unable to find source '+c.RN('.ts')+' file for streaming!!'), null)
      }
    }
  },
  path: '/hls',          /* Base URI to output HLS streams */
  dir: 'source_videos'  /* Directory where input files are stored */
}

const httpSrv = http.createServer()
const hlsSrv  = new hlsServer(httpSrv, hlsConfig)
console.log(logPrefix+'HLS server instance created, listening at '+c.MN('http://'+httpConfig.host+':'+httpConfig.port)+'.')

httpSrv.listen(httpConfig.port,httpConfig.host)

const hlsPushOptions = {
  urlToPushTo: 'https://zeit-test-02.umbra-translucens.onine',
  pushCredentials: {
    currentToken: 'a_token',
    priv_key: 'privkeyprivkeyprivkey',
    pub_key:  'pubkey'
  }
}

console.log(logPrefix+'HLS push started, pushing to '+c.MN(hlsPushOptions.urlToPushTo)+'.')




