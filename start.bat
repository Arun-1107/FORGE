@echo off
title FORGE Fitness Platform
echo ==============================================
echo   STARTING FORGE FITNESS PLATFORM (MERN)
echo ==============================================
cd /d "%~dp0"
echo Starting servers and launching browser...
timeout /t 2 /nobreak >nul
start "" http://localhost:5173
npm.cmd run dev
pause
