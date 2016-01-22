#!/bin/bash

# Download coms
HOST='rz.verisign-grs.com'   # change the ipaddress accordingly
USER=$ZONE_FTP_USER
OUTDIR=${ZONE_OUTDIR-:/var/lib/zonefiles}
PASSWD=$ZONE_FTP_PASSWORD
ftp -inv $HOST<<EOF
quote USER $USER
quote PASS $PASSWD
bin
lcd $OUTDIR
mget com.zone.gz
bye
EOF
