#!/bin/bash
SCRIPTPATH=$(dirname $0)
BASEDIR=$SCRIPTPATH/..
docker build --tag fusetools $BASEDIR
