#!/bin/sh

OUTFILE=${1-:coms.clean}

[ -n "$ZONES_DOWNLOAD" ] && ./ftp-coms.sh
[ -n "$ZONES_DOWNLOAD" ] && gunzip com.zone

split -C 300m com.zone
SPLITS=`ls x* | wc -l | cut -f1 -d' '`
echo Processing $SPLITS files...
for i in  `ls x*`
do
  cut -f1-2 -d' ' $i | grep -F ' NS' | cut -f1 -d' ' | tr A-Z a-z > tmp.cut
  LANG=C sort -u tmp.cut > "$i"
  echo Sorted "$i"
done

sort -u -m x* -o $OUTFILE
rm x*
echo Done $SPLITS splits and `wc -l coms.clean | numfmt --to=si` clean dot coms
