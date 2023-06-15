#!/bin/bash
# Config variables.
COLLECTION_FILE="examples.postman_collection.json"
REPORT_TITLE="Integration Report"

# Newman report html command.
./node.sh ./node_modules/newman/bin/newman.js run "$COLLECTION_FILE" -r htmlextra --reporter-htmlextra-title "$REPORT_TITLE" --reporter-htmlextra-titleSize 4 --reporter-htmlextra-export ./report-html/report.html

# Call default browser.
firefox "file://`pwd`/report-html/report.html"
