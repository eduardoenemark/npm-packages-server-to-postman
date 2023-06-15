@echo off
title NEWMAN HTML REPORT

:: Config variables.
SET COLLECTION_FILE=examples.postman_collection.json
SET REPORT_TITLE=Integration Report

:: Newman report html command.
.\node.bat .\node_modules\newman\bin\newman.js run %COLLECTION_FILE% -r htmlextra --reporter-htmlextra-title "%REPORT_TITLE%" --reporter-htmlextra-titleSize 4 --reporter-htmlextra-export ./report-html/report.html

:: Call default browser.
explorer .\report-html\report.html
