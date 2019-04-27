#!/bin/bash

rm -fr build

npx babel src --out-dir build --presets=@babel/env
cd build
mkdir logs
ln -s  ../copy_to_build/now.json ./now.json
ln -s  ../copy_to_build/.nowignore ./.nowignore
ln -s  ../copy_to_build/public ./public
ln -s  ../copy_to_build/source_files ./source_files
cd ..
