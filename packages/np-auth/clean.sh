#!/bin/bash
inclHelperFuncs=`dirname ${BASH_SOURCE[0]}`"/helperFuncs.sh"
source "${inclHelperFuncs}"
parseCmdLine "${@}"

rm -fr "./${buildDirInt}"
rm -fr "./${buildDir}"
