#!/bin/bash
SCRIPTPATH=$(dirname $0)
BASEDIR=$SCRIPTPATH/..
CONFDIR=$(readlink -f $BASEDIR/configuration/)
docker run \
  -p 8080:8080 \
  fusetools
