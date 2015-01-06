#!/bin/bash
:

for VAR in {0..2000}; do curl http://localhost:3000/test/verticalspeed?speed=${VAR}; sleep 0.01; done;
for VAR in {1999..0}; do curl http://localhost:3000/test/verticalspeed?speed=${VAR}; sleep 0.01; done;

for VAR in {0..-2000}; do curl http://localhost:3000/test/verticalspeed?speed=${VAR}; sleep 0.01; done;
for VAR in {-1999..0}; do curl http://localhost:3000/test/verticalspeed?speed=${VAR}; sleep 0.01; done;

