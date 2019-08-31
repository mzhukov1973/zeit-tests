#!/bin/bash
inclHelperFuncs=`dirname ${BASH_SOURCE[0]}`"/helperFuncs.sh"
source "${inclHelperFuncs}"
parseCmdLine "${@}"

cd "./${buildDir}"
now deploy
now --target production
cd ..
