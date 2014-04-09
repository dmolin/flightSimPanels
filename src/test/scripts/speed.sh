#!/bin/bash
:

for VAR in {1..200}; do curl http://localhost:9000/test/speed?indicated=${VAR}; sleep 0.1; done;
for VAR in {199..1}; do curl http://localhost:9000/test/speed?indicated=${VAR}; sleep 0.1; done;