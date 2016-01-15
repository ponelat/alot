#!/bin/sh

ag --nocolor --no-numbers " NS " "$1" | cut -f1 -d" " | LANG=C sort -u | tr A-Z a-z
