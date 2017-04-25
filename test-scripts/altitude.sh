#!/bin/bash
:

for VAR in {1..2000}; do curl 'http://localhost:3000/test/altitude?altitude='$[$VAR]'&baro='$[$VAR]; sleep 0.05; done;
for VAR in {2000..1}; do curl 'http://localhost:3000/test/altitude?altitude='$[$VAR]'&baro='$[$VAR]; sleep 0.05; done;
