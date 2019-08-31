#!/home/mzhukov/.nvm/current/bin/node
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
const fs   = require('fs')
const path = require('path')
const argv = require('yargs')
  .usage("\n\n\x1b[1;97m==============================================================================================================================\x1b[m\n\x1b[1;4mUsage:\x1b[m\n\x1b[95m$0\x1b[m \x1b[1;97m-p\x1b[1;93m|\x1b[1;97m--projName\x1b[m \x1b[1;93m\"\x1b[22;3;37mproject-name\x1b[1;93m\"\x1b[m \x1b[1;97m-d\x1b[1;93m|\x1b[1;97m--domainAlias\x1b[m \x1b[1;93m\"\x1b[22;3;37mdomain-to-alias-zeit-now-deployment-to\x1b[1;93m\"\x1b[m \x1b[1;97m-b\x1b[1;93m|\x1b[1;97m--buildDir\x1b[m \x1b[1;93m\"\x1b[22;3;37mbuild-dir-relative-to-./\x1b[1;93m\"\x1b[m")
  .example('\x1b[95m$0\x1b[m \x1b[1;97m-p \x1b[22;3;37mprojectNumberOne\x1b[m \x1b[1;97m-d \x1b[22;3;37mproject-number-001.umbra-translucens.online\x1b[m',                             'Generate a \x1b[93mnow.json\x1b[m file for project named \x1b[1;93m\'\x1b[22;3;37mprojectNumberOne\x1b[1;93m\'\x1b[m with \x1b[1;93m\'\x1b[22;3;37mbuild/\x1b[1;93m\'\x1b[m as build directory and alias it to \x1b[22;3;37mhttps://project-number-001.umbra-translucens.online\x1b[m.\n')
  .example('\x1b[95m$0\x1b[m \x1b[1;97m--projName\x1b[91m=\x1b[22;3;37mprojectNumberThree \x1b[1;97m--domainAlias\x1b[91m=\x1b[22;3;37mproject-number-003.umbra-translucens.com\x1b[m', 'Generate a \x1b[93mnow.json\x1b[m file for project named \x1b[1;93m\'\x1b[22;3;37mprojectNumberThree\x1b[1;93m\'\x1b[m with \x1b[1;93m\'\x1b[22;3;37mbuild/\x1b[1;93m\'\x1b[m as build directory and alias it to \x1b[22;3;37mhttps://project-number-003.umbra-translucens.com\x1b[m.\n')
  .example('\x1b[95m$0\x1b[m \x1b[1;97m--projName\x1b[91m=\x1b[22;3;37mprojectNumberTen\x1b[m',                                                                                         'Generate a \x1b[93mnow.json\x1b[m file for project named \x1b[1;93m\'\x1b[22;3;37mprojectNumberTen\x1b[1;93m\'\x1b[m with \x1b[1;93m\'\x1b[22;3;37mbuild/\x1b[1;93m\'\x1b[m as build directory and alias it to \x1b[22;3;37mhttps://projectnumberten.umbra-translucens.online\x1b[m.\n')
  .example('\x1b[95m$0\x1b[m \x1b[1;97m--projName\x1b[91m=\x1b[22;3;37mprojectNumberTen\x1b[m \x1b[1;97m--buildDir\x1b[91m=\x1b[22;3;37mbuild\x1b[m ',                                  'Generate a \x1b[93mnow.json\x1b[m file for project named \x1b[1;93m\'\x1b[22;3;37mprojectNumberTen\x1b[1;93m\'\x1b[m with \x1b[1;93m\'\x1b[22;3;37mbuild/build\x1b[1;93m\'\x1b[m as build directory and alias it to \x1b[22;3;37mhttps://projectnumberten.umbra-translucens.online\x1b[m.\n')
  .alias('p', 'projName')
  .nargs('p', 1)
  .describe('p', "\x1b[97mZeit\x1b[91m™ \x1b[97mNow\x1b[91m™\x1b[m project name to use")
  .string('p')
  .demandOption(['p'],"Please provide a name for the \x1b[97mNow\x1b[91m™\x1b[m project (if \x1b[1;97m-d\x1b[22;93m|\x1b[1;97m--domainAlias\x1b[m is not set, it defaults to the value of this argument).\n\x1b[1;97m==============================================================================================================================\x1b[m\n\n\n")
  .alias('d', 'domainAlias')
  .nargs('d', 1)
  .describe('d', 'Domain name to alias project to when deploying at \x1b[97mZeit\x1b[91m™\x1b[m')
  .string('d')
  .alias('b', 'buildDir')
  .nargs('b', 1)
  .default('b','build')
  .describe('b', 'Build directory, defaults to \'build\'')
  .string('b')
  .help('h')
  .alias('h', 'help')
  .epilog("\n\x1b[1;97m------------------------------------------------------------------------------------------------------------------------------\x1b[m\n\x1b[1;97m  Copyright 2019 \x1b[22mMaxim Zhukov.\x1b[m\n\x1b[96m      \x1b[1m-\x1b[m e-mail: \x1b[93mmzhukov31415dev@gmail.com\x1b[m,\n\x1b[96m      \x1b[1m-\x1b[m GitHub:\x1b[93m https://github.com/mzhukov1973\x1b[m.\n\n")
  .wrap(null)
  .argv

if (argv.buildDir==='.') {argv.buildDir='build'}
console.log('projName:\'%s\', domainAlias:\'%s\', buildDir:\'%s\',',argv.projName,argv.domainAlias,argv.buildDir)

try {
  fs.accessSync(argv.buildDir, fs.constants.F_OK | fs.constants.W_OK | fs.constants.X_OK)
} catch(err) {
  console.warn('\x1b[1;93mnow__prepare_deploy.js\x1b[m \x1b[91merror\x1b[m! \''+argv.buildDir+'\' directory either doesn\'t exist, is not writable or not executable by this process, exiting...')
  process.exit(-2)
}

if (fs.existsSync(argv.buildDir+'/now.json')) {
  try {
    fs.accessSync(argv.buildDir+'/now.json', fs.constants.W_OK)
  } catch(err) {
    console.warn('\x1b[1;93mnow__prepare_deploy.js\x1b[m \x1b[91merror\x1b[m! \''+argv.buildDir+'/now.json\' exists, but is not writable by this process, exiting...')
    process.exit(-3)
  }
}

if (fs.existsSync(argv.buildDir+'/package.json')) {
  try {
    fs.accessSync(argv.buildDir+'/package.json', fs.constants.W_OK)
  } catch(err) {
    console.warn('\x1b[1;93mnow__prepare_deploy.js\x1b[m \x1b[91merror\x1b[m! \''+argv.buildDir+'/package.json\' exists, but is not writable by this process, exiting...')
    process.exit(-4)
  }
}

const constructNowJSON_Template = (projName,domainAlias,buildDir) => {
  if ((!projName)||(String(projName).length==0)) {projName = path.basename(path.resolve('.'))}
  domainAlias = ((!domainAlias)||(String(domainAlias).length==0))?projName.toLowerCase():domainAlias
  return "{                                                                                                                                 \n" +
    "  \"version\": 2,                                                                                                                      \n" +
    "  \"name\": \""    + projName    + "\",                                                                                                \n" +
    "  \"project\": \"" + projName    + "\",                                                                                                \n" +
    "  \"alias\": [ \"" + domainAlias + "\" ],                                                                                              \n" +
    "  \"public\": false,                                                                                                                   \n" +
    "  \"github\": {                                                                                                                        \n" +
    "    \"enabled\":            false,                                                                                                     \n" +
    "    \"autoAlias\":          true,                                                                                                      \n" +
    "    \"autoJobCancelation\": true,                                                                                                      \n" +
    "    \"silent\":             false                                                                                                      \n" +
    "  },                                                                                                                                   \n" +
    "  \"env\": {                                                                                                                           \n" +
    "    \"ownECDHPrivateKey\":           \"@ot-db___own-ecdh-private-key\",                                                                \n" +
    "    \"ownECDHParameters\":           \"@ot-db___own-ecdh-params\",                                                                     \n" +
    "    \"preSharedECDHPublicKeys\":     \"@ot-db___pre-shared-ecdh-public-keys\"                                                          \n" +
    "  },                                                                                                                                   \n" +
    "  \"builds\": [                                                                                                                        \n" +
    "    { \"src\":\"index.js\",        \"use\":\"@now/node\"   },                                                                          \n" +
    "    { \"src\":\"*.js\",            \"use\":\"@now/static\" },                                                                          \n" +
    "    { \"src\":\"static/**\",       \"use\":\"@now/static\" },                                                                          \n" +
    "    { \"src\":\"data/**\",         \"use\":\"@now/static\" }                                                                           \n" +
    "  ],                                                                                                                                   \n" +
    "  \"routes\": [                                                                                                                        \n" +
    "    { \"src\":\"^/db/(.*).js\",             \"dest\":\"/$1.js\",                 \"headers\":{\"cache-control\":\"s-maxage=0\"}     }, \n" +
    "    { \"src\":\"^/db/(.*)\",                \"dest\":\"/index.js\",              \"headers\":{\"cache-control\":\"s-maxage=0\"}     }, \n" +
    "    { \"src\":\"^/db\",                     \"dest\":\"/index.js\",              \"headers\":{\"cache-control\":\"s-maxage=0\"}     }, \n" +
    "    { \"src\":\"^/images/(.*)\",            \"dest\":\"/static/images/$1\",      \"headers\":{\"cache-control\":\"s-maxage=86400\"} }, \n" +
    "    { \"src\":\"^/fonts/(.*)\",             \"dest\":\"/static/fonts/$1\",       \"headers\":{\"cache-control\":\"s-maxage=86400\"} }, \n" +
    "    { \"src\":\"^/css/(.*)\",               \"dest\":\"/static/css/$1\",         \"headers\":{\"cache-control\":\"s-maxage=86400\"} }, \n" +
    "    { \"src\":\"^/doc/(.*)\",               \"dest\":\"/static/404.html\",       \"headers\":{\"cache-control\":\"s-maxage=86400\"} }, \n" +
    "    { \"src\":\"^/doc\",                    \"dest\":\"/static/404.html\",       \"headers\":{\"cache-control\":\"s-maxage=86400\"} }, \n" +
    "    { \"src\":\"^/(.*).ico\",               \"dest\":\"/static/$1.ico\",         \"headers\":{\"cache-control\":\"s-maxage=86400\"} }, \n" +
    "    { \"src\":\"^/(.*).png\",               \"dest\":\"/static/$1.png\",         \"headers\":{\"cache-control\":\"s-maxage=86400\"} }, \n" +
    "    { \"src\":\"^/index.html\",             \"dest\":\"/static/index.html\",     \"headers\":{\"cache-control\":\"s-maxage=86400\"} }, \n" +
    "    { \"src\":\"^/(.*)\",                   \"dest\":\"/static/index.html\",     \"headers\":{\"cache-control\":\"s-maxage=86400\"} }, \n" +
    "    { \"src\":\"^(.*)\",                    \"dest\":\"/static/index.html\",     \"headers\":{\"cache-control\":\"s-maxage=86400\"} }  \n" +
    "  ]                                                                                                                                    \n" +
    "}"
}
fs.writeFileSync(argv.buildDir+'/now.json', constructNowJSON_Template(argv.projName,argv.domainAlias,argv.buildDir), {encoding:'utf8',flag:'w'})
fs.chmodSync(argv.buildDir+'/now.json', 0o644)

const constructPackageJSON_Template = (projName,domainAlias,buildDir) => {
  const origPkgJSONObj = JSON.parse(fs.readFileSync('./package.json',{encoding:'utf8',flag:'r'}))
  origPkgJSONObj.scripts = {}
  origPkgJSONObj.main    = origPkgJSONObj.main.replace(RegExp(buildDir+'/','g'),'')
  origPkgJSONObj.files.forEach((el,idx,arr)=>arr[idx]=el.replace(RegExp(buildDir+'/','g'),''))
  return JSON.stringify(origPkgJSONObj)
}
fs.writeFileSync(argv.buildDir+'/package.json', constructPackageJSON_Template(argv.projName,argv.domainAlias,argv.buildDir), {encoding:'utf8',flag:'w'})
fs.chmodSync(argv.buildDir+'/package.json', 0o644)

process.exit(0)
