#!/bin/bash
:

#for VAR in {1..90}; do curl http://localhost:3000/test/attitude?pitch=$[$VAR]; sleep 0.05; done;
#for VAR in {90..1}; do curl http://localhost:3000/test/attitude?pitch=$[$VAR]; sleep 0.05; done;
curl http://localhost:3000/test/altitude?altitude=3240
