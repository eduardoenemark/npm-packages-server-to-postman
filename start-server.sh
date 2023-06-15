#!/bin/bash
./npm.sh install --verbose
./node.sh -r dotenv/config server.js