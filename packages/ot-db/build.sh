#!/bin/bash
inclHelperFuncs=`dirname ${BASH_SOURCE[0]}`"/helperFuncs.sh"
source "${inclHelperFuncs}"
parseCmdLine "${@}"

rm -fr "./${buildDirInt}"
mkdir  "./${buildDirInt}"
rm -fr "./${buildDir}"
mkdir  "./${buildDir}"

npx babel src/*.js --out-dir ./${buildDirInt} --presets=@babel/env
cp -r ./static.src ./${buildDirInt}/static
cp -r ./data.src   ./${buildDirInt}/data
rm -f ./${buildDirInt}/static/images/*1024*svg
rm -f ./${buildDirInt}/static/images/*1024*png

cd ./${buildDir}
ln -s ../${buildDirInt}/*.js   .
ln -s ../${buildDirInt}/static .
ln -s ../${buildDirInt}/data   .
cd ..
