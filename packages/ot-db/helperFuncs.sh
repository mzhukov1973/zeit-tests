#!/bin/bash
function parseCmdLine () {
  if [ -n "${1}" ]; then
   buildDirInt="${1}"
  else
   buildDirInt="build_internal"
  fi
  if [ -n "${2}" ]; then
   buildDir="${2}"
   if [ "${buildDir}" = "." ];then
    echo -e "\x1b[1;91mError!\x1b[22;36m Mandatory parameter has been set to a forbidden value. \x1b[22;36mBuild directory value \x1b[1;96m\"\x1b[1;93m.\x1b[1;96m\"\x1b[22;36m is \x1b[1;91mforbidden\x1b[22;36m. Setting it to the default value of \x1b[1;96m\"\x1b[1;93mbuild\x1b[1;96m\"\x1b[22;36m instead.\x1b[m"
    buildDir="build"
   fi
  else
   buildDir="build"
  fi
  if [ -n "${3}" ]; then
   packageName="${3}"
  else
   packageName=`cat ./package.json | grep -m1 "\"name\":" | grep -o "[^\"]*\",$" | grep -o "[^\",]*"`
  fi
  if [ -n "${4}" ]; then
   packageVersion="${4}"
  else
   packageVersion=`cat ./package.json | grep -m1 "\"version\":" | grep -o "[^\"]*\",$" | grep -o "[^\",]*"`
  fi
#  echo -e "${0}: buildDirInt='${buildDirInt}' buildDir='${buildDir}' packageName='${packageName}' packageVersion='${packageVersion}'"
}
