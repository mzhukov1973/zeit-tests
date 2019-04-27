#!/bin/bash

rm -fr index.js

npx babel src/index.js --out-dir . --presets=@babel/env
