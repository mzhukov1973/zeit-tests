#!/bin/bash

rm -f build/*js
mkdir -p build/logs
chmod -R go+rX build

npx babel src --out-dir build --presets=@babel/env
