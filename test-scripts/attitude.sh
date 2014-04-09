#!/bin/bash
:

# PITCH
for VAR in {1..90}; do curl http://localhost:3000/test/attitude?pitch=$[$VAR]; sleep 0.05; done;
for VAR in {90..1}; do curl http://localhost:3000/test/attitude?pitch=$[$VAR]; sleep 0.05; done;

# ROLL
for VAR in {0..90}; do curl 'http://localhost:3000/test/attitude?pitch=0&roll='$[$VAR]; sleep 0.05; done;
for VAR in {90..0}; do curl 'http://localhost:3000/test/attitude?pitch=0&roll='$[$VAR]; sleep 0.05; done;

for VAR in {0..-90}; do curl 'http://localhost:3000/test/attitude?pitch=0&roll='$[$VAR]; sleep 0.05; done;
for VAR in {-90..0}; do curl 'http://localhost:3000/test/attitude?pitch=0&roll='$[$VAR]; sleep 0.05; done;


# BOTH
for VAR in {0..90}; do curl 'http://localhost:3000/test/attitude?pitch='$[$VAR]'&roll='$[$VAR]; sleep 0.05; done;
for VAR in {90..0}; do curl 'http://localhost:3000/test/attitude?pitch='$[$VAR]'&roll='$[$VAR]; sleep 0.05; done;

for VAR in {0..-90}; do curl 'http://localhost:3000/test/attitude?pitch='$[$VAR]'&roll='$[$VAR]; sleep 0.05; done;
for VAR in {-90..0}; do curl 'http://localhost:3000/test/attitude?pitch='$[$VAR]'&roll='$[$VAR]; sleep 0.05; done;

