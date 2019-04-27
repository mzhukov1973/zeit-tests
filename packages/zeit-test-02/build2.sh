#!/bin/bash

rm ./index.js
npx babel src/index.js --out-dir . --presets=@babel/env
