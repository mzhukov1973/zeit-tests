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
import colors          from 'colors'
import http            from 'http'
import fs              from 'fs'

const colorsTheme       = {RST:['reset'],U:['underline'],B:['bold'],YD:['yellow','dim'],YN:['yellow'],YB:['yellow','bold'],WD:['white','dim'],WN:['white'],WB:['white','bold'],WDU:['white','dim','underline'],WNU:['white','underline'],WBU:['white','bold','underline'],RD:['red','dim'],RN:['red'],RB:['red','bold'],GD:['green','dim'],GN:['green'],GB:['green','bold'],CD:['cyan','dim'],CN:['cyan'],CB:['cyan','bold'],MD:['magenta','dim'],MN:['magenta'],MB:['magenta','bold'],MDU:['magenta','dim','underline'],MNU:['magenta','underline'],MBU:['magenta','bold','underline']}
const colSafe           = (txtToColour,themeColour) => colors[themeColour](txtToColour)
const c                 = {'RST':t=>colSafe(t,'RST'),'U':t=>colSafe(t,'U'),'B':t=>colSafe(t,'B'),'YD':t=>colSafe(t,'YD'),'YN':t=>colSafe(t,'YN'),'YB':t=>colSafe(t,'YB'),'WD':t=>colSafe(t,'WD'),'WN':t=>colSafe(t,'WN'),'WB':t=>colSafe(t,'WB'),'WDU':t=>colSafe(t,'WDU'),'WNU':t=>colSafe(t,'WNU'),'WBU':t=>colSafe(t,'WBU'),'RD':t=>colSafe(t,'RD'),'RN':t=>colSafe(t,'RN'),'RB':t=>colSafe(t,'RB'),'GD':t=>colSafe(t,'GD'),'GN':t=>colSafe(t,'GN'),'GB':t=>colSafe(t,'GB'),'CD':t=>colSafe(t,'CD'),'CN':t=>colSafe(t,'CN'),'CB':t=>colSafe(t,'CB'),'MD':t=>colSafe(t,'MD'),'MN':t=>colSafe(t,'MN'),'MB':t=>colSafe(t,'MB'),'MDU':t=>colSafe(t,'MDU'),'MNU':t=>colSafe(t,'MNU'),'MBU':t=>colSafe(t,'MBU')}
const logDir            = __dirname + '/logs'
colors.setTheme(colorsTheme)
const logPrefix = c.YN('[')+c.MBU('Zeitβ|³')+c.YN('/')+c.WBU('index.js')+c.YN(']: ')

const httpConfig = {
  port: 8001,
  host: '127.0.0.1',
  webroot: 'public'
}

const httpSrv = http.createServer()
console.log(logPrefix+'HTTP server instance created, listening at port:'+c.MN(httpConfig.port)+'.')

httpSrv.listen(httpConfig.port)
