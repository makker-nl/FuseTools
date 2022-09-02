#!/bin/bash
SCRIPTPATH=$(dirname $0)
BASEDIR=$SCRIPTPATH/..
. $SCRIPTPATH/dckr_env.sh
echo Tag image as $NS/$IMAGE:$MVN_VER
docker tag $IMAGE $NS/$IMAGE:$MVN_VER
docker tag $IMAGE $NS/$IMAGE:latest
echo push  $NS/$IMAGE:$MVN_VER
docker push $NS/$IMAGE:$MVN_VER
docker push $NS/$IMAGE:latest
