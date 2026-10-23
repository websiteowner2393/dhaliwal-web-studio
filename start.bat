@echo off
title vCard Personal Portfolio - Local Server
echo ==================================================
echo   Starting vCard Personal Portfolio Locally...
echo ==================================================

where bun >nul 2>nul
if %ERRORLEVEL% equ 0 (
    echo Using Bun to serve local files...
    start "" http://localhost:3000
    bun run server.js
) else (
    echo Bun not found in PATH, launching index.html in your default browser...
    start "" index.html
    echo Done! Press any key to exit.
    pause >nul
)
