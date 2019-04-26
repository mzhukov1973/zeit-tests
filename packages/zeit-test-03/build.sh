#!/bin/bash

rm -f build/index.js

npx babel src --out-dir build --presets=@babel/env
