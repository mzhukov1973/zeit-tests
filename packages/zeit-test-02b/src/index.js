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
import NodeMediaServer from './node-media-server'

const colorsTheme       = {RST:['reset'],U:['underline'],B:['bold'],YD:['yellow','dim'],YN:['yellow'],YB:['yellow','bold'],WD:['white','dim'],WN:['white'],WB:['white','bold'],WDU:['white','dim','underline'],WNU:['white','underline'],WBU:['white','bold','underline'],RD:['red','dim'],RN:['red'],RB:['red','bold'],GD:['green','dim'],GN:['green'],GB:['green','bold'],CD:['cyan','dim'],CN:['cyan'],CB:['cyan','bold'],MD:['magenta','dim'],MN:['magenta'],MB:['magenta','bold'],MDU:['magenta','dim','underline'],MNU:['magenta','underline'],MBU:['magenta','bold','underline']}
const colSafe           = (txtToColour,themeColour) => colors[themeColour](txtToColour)
const c                 = {'RST':t=>colSafe(t,'RST'),'U':t=>colSafe(t,'U'),'B':t=>colSafe(t,'B'),'YD':t=>colSafe(t,'YD'),'YN':t=>colSafe(t,'YN'),'YB':t=>colSafe(t,'YB'),'WD':t=>colSafe(t,'WD'),'WN':t=>colSafe(t,'WN'),'WB':t=>colSafe(t,'WB'),'WDU':t=>colSafe(t,'WDU'),'WNU':t=>colSafe(t,'WNU'),'WBU':t=>colSafe(t,'WBU'),'RD':t=>colSafe(t,'RD'),'RN':t=>colSafe(t,'RN'),'RB':t=>colSafe(t,'RB'),'GD':t=>colSafe(t,'GD'),'GN':t=>colSafe(t,'GN'),'GB':t=>colSafe(t,'GB'),'CD':t=>colSafe(t,'CD'),'CN':t=>colSafe(t,'CN'),'CB':t=>colSafe(t,'CB'),'MD':t=>colSafe(t,'MD'),'MN':t=>colSafe(t,'MN'),'MB':t=>colSafe(t,'MB'),'MDU':t=>colSafe(t,'MDU'),'MNU':t=>colSafe(t,'MNU'),'MBU':t=>colSafe(t,'MBU')}
const logDir            = __dirname + '/logs'
colors.setTheme(colorsTheme)
const logPrefix = c.YN('[')+c.MBU('Zeitβ|²ᵇ')+c.YN('/')+c.WBU('index.js')+c.YN(']: ')
/* const logPrefix = c.YN('[')+c.MBU('Zeitβ|²ᵇ')+c.YN('/')+c.WBU('index.js')+c.YN('/')+c.WNU('processBinaryRequest(..)')+c.YN(']: ') */

const nmsConfig = {
  rtmp: {
    port:         1935,
    chunk_size:   60000,
    gop_cache:    true,
    ping:         30,
    ping_timeout: 60
  },
  http: {
    port:         8002,
    webroot:      'public',
    mediaroot:    'source_videos',
    allow_origin: '*'
  },
  trans: {
    ffmpeg: '/usr/local/bin/ffmpeg',
    tasks: [
      {
        app:       'live',
        vc:        "copy",
        vcParam:   [],
        ac:        "aac",
        acParam:   ['-ab', '64k', '-ac', '1', '-ar', '44100'],
        hls:       true,
        hlsFlags:  '[hls_time=2:hls_list_size=3:hls_flags=delete_segments]',
        dash:      true,
        dashFlags: '[f=dash:window_size=3:extra_window_size=5]'
      }
    ]
  }
}

/* Remux to HLS/DASH live stream: */
/*
const config = {
  rtmp: {
    port: 1935,
    chunk_size: 60000,
    gop_cache: true,
    ping: 30,
    ping_timeout: 60
  },
  http: {
    port: 8000,
    mediaroot: './source_videos',
    allow_origin: '*'
  },
  trans: {
    ffmpeg: '/usr/local/bin/ffmpeg',
    tasks: [
      {
        app: 'live',
        hls: true,
        hlsFlags: '[hls_time=2:hls_list_size=3:hls_flags=delete_segments]',
        dash: true,
        dashFlags: '[f=dash:window_size=3:extra_window_size=5]'
      }
    ]
  }
}
*/

/* Remux to HLS/DASH live stream with audio transcode: */
/*
const config = {
  rtmp: {
    port: 1935,
    chunk_size: 60000,
    gop_cache: true,
    ping: 30,
    ping_timeout: 60
  },
  http: {
    port: 8000,
    mediaroot: './source_videos',
    allow_origin: '*'
  },
  trans: {
    ffmpeg: '/usr/local/bin/ffmpeg',
    tasks: [
      {
        app:       'live',
        vc:        "copy",
        vcParam:   [],
        ac:        "aac",
        acParam:   ['-ab', '64k', '-ac', '1', '-ar', '44100'],
        hls:       true,
        hlsFlags:  '[hls_time=2:hls_list_size=3:hls_flags=delete_segments]',
        dash:      true,
        dashFlags: '[f=dash:window_size=3:extra_window_size=5]'
      }
    ]
  }
}
*/
/* Rtsp/Rtmp Relay - static pull. */
/* The static pull mode is executed at service startup and reconnects after failure. It could be a live stream or a file. In theory, it is not limited to RTSP or RTMP protocol. */
/*
relay: {
  ffmpeg: '/usr/local/bin/ffmpeg',
  tasks: [
    {
      app:  'cctv',
      mode: 'static',
      edge: 'rtsp://admin:admin888@192.168.0.149:554/ISAPI/streaming/channels/101',
      name: '0_149_101',
      rtsp_transport : 'tcp' //['udp', 'tcp', 'udp_multicast', 'http']
    }, {
      app:  'iptv',
      mode: 'static',
      edge: 'rtmp://live.hkstv.hk.lxdns.com/live/hks',
      name: 'hks'
    }, {
      app:  'mv',
      mode: 'static',
      edge: '/Volumes/ExtData/Movies/Dancing.Queen-SD.mp4',
      name: 'dq'
    }
  ]
}
*/

/* Rtsp/Rtmp Relay - dynamic pull. */
/* When the local server receives a play request. If the stream does not exist, pull the stream from the configured edge server to local. When the stream is not played by the client, it automatically disconnects. */
/*
relay: {
  ffmpeg: '/usr/local/bin/ffmpeg',
  tasks: [
    {
      app: 'live',
      mode: 'pull',
      edge: 'rtmp://192.168.0.20',
    }
  ]
}
*/

/* Rtsp/Rtmp Relay - dynamic push. */
/* When the local server receives a publish request. Automatically push the stream to the edge server. */
/*
relay: {
  ffmpeg: '/usr/local/bin/ffmpeg',
  tasks: [
    {
      app: 'live',
      mode: 'push',
      edge: 'rtmp://192.168.0.10',
    }
  ]
}
*/

const nms = new NodeMediaServer(nmsConfig)
console.log(logPrefix+'Node media server instance created, listening at '+c.MN('http://localhost:'+nmsConfig.http.port)+' / '+c.MN('https://localhost:'+nmsConfig.https.port)+'.')

nms.run()

/*
nms.on('preConnect', (id, args) => {
  const logPrefix = c.YN('[')+c.MBU('Zeitβ|²ᵇ')+c.YN('/')+c.WBU('index.js')+c.YN('/')+c.CB('preConnect')+c.YN(']: ')
  console.log(logPrefix, `id=${id} args=${JSON.stringify(args)}`)
  // let session = nms.getSession(id);
  // session.reject();
})

nms.on('postConnect', (id, args) => {
  const logPrefix = c.YN('[')+c.MBU('Zeitβ|²ᵇ')+c.YN('/')+c.WBU('index.js')+c.YN('/')+c.CB('postConnect')+c.YN(']: ')
  console.log(logPrefix, `id=${id} args=${JSON.stringify(args)}`)
})

nms.on('doneConnect', (id, args) => {
  const logPrefix = c.YN('[')+c.MBU('Zeitβ|²ᵇ')+c.YN('/')+c.WBU('index.js')+c.YN('/')+c.CB('doneConnect')+c.YN(']: ')
  console.log(logPrefix, `id=${id} args=${JSON.stringify(args)}`)
})

nms.on('prePublish', (id, StreamPath, args) => {
  const logPrefix = c.YN('[')+c.MBU('Zeitβ|²ᵇ')+c.YN('/')+c.WBU('index.js')+c.YN('/')+c.CB('prePublish')+c.YN(']: ')
  console.log(logPrefix, `id=${id} StreamPath=${StreamPath} args=${JSON.stringify(args)}`)
  // let session = nms.getSession(id)
  // session.reject()
})

nms.on('postPublish', (id, StreamPath, args) => {
  const logPrefix = c.YN('[')+c.MBU('Zeitβ|²ᵇ')+c.YN('/')+c.WBU('index.js')+c.YN('/')+c.CB('postPublish')+c.YN(']: ')
  console.log(logPrefix, `id=${id} StreamPath=${StreamPath} args=${JSON.stringify(args)}`)
})

nms.on('donePublish', (id, StreamPath, args) => {
  const logPrefix = c.YN('[')+c.MBU('Zeitβ|²ᵇ')+c.YN('/')+c.WBU('index.js')+c.YN('/')+c.CB('donePublish')+c.YN(']: ')
  console.log(logPrefix, `id=${id} StreamPath=${StreamPath} args=${JSON.stringify(args)}`)
})

nms.on('prePlay', (id, StreamPath, args) => {
  const logPrefix = c.YN('[')+c.MBU('Zeitβ|²ᵇ')+c.YN('/')+c.WBU('index.js')+c.YN('/')+c.CB('prePlay')+c.YN(']: ')
  console.log(logPrefix, `id=${id} StreamPath=${StreamPath} args=${JSON.stringify(args)}`)
  // let session = nms.getSession(id);
  // session.reject();
})

nms.on('postPlay', (id, StreamPath, args) => {
  const logPrefix = c.YN('[')+c.MBU('Zeitβ|²ᵇ')+c.YN('/')+c.WBU('index.js')+c.YN('/')+c.CB('postPlay')+c.YN(']: ')
  console.log(logPrefix, `id=${id} StreamPath=${StreamPath} args=${JSON.stringify(args)}`)
})

nms.on('donePlay', (id, StreamPath, args) => {
  const logPrefix = c.YN('[')+c.MBU('Zeitβ|²ᵇ')+c.YN('/')+c.WBU('index.js')+c.YN('/')+c.CB('donePlay')+c.YN(']: ')
  console.log(logPrefix, `id=${id} StreamPath=${StreamPath} args=${JSON.stringify(args)}`)
})
*/