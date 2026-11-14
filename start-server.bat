@echo off
chcp 65001 >nul
cd /d "%~dp0"
echo AQTool site: http://localhost:8090/
echo Press Ctrl+C to stop.
start "" http://localhost:8090/
python -m http.server 8090 --bind 127.0.0.1
pause
