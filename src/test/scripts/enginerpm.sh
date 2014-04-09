#!/bin/bash
:

for VAR in {0..300}; do curl http://localhost:9000/test/enginerpm?rpm=$[$VAR*10]; sleep 0.05; done;
for VAR in {300..0}; do curl http://localhost:9000/test/enginerpm?rpm=$[$VAR*10]; sleep 0.05; done;