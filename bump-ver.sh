#!/bin/bash

VER="$1"
BRANCH="${2:-develop}"

echo Bumping to $VER on $BRANCH

git fetch
git checkout $BRANCH
git reset --hard origin/$BRANCH

# We'll break if tag exists
# git tag -d $TAG || true

# Break on anything
set -e

npm version $VER

# Use the exact version, (VER can be patch, minor, major)
TAG="v`node ./ver.js`"

git tag $TAG
git push origin $BRANCH
git push origin $TAG
