#!/bin/bash

rm -f build/index.js
rm -f build/shelljs.js

npx babel src --out-dir build --presets=@babel/env
