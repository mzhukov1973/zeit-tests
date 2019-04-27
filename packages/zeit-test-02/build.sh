#!/bin/bash

rm -fr build
mkdir -p build/logs
#cp now.json   build
cp .nowignore build
cp *ico       build
cp *png       build
cp *svg       build
cp *css       build
cp *woff2     build
cp *html      build
npx babel index.js --out-dir build --presets=@babel/env
