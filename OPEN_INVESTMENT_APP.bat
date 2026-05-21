@echo off
setlocal
set "APP_DIR=%~dp0"
set "PYTHON_EXE=%USERPROFILE%\.cache\codex-runtimes\codex-primary-runtime\dependencies\python\python.exe"

if not exist "%PYTHON_EXE%" (
  set "PYTHON_EXE=python"
)

start "Market Knowledge Lab Server" cmd.exe /k "cd /d "%APP_DIR%" && echo Market Knowledge Lab && echo Serving: %APP_DIR% && echo URL: http://127.0.0.1:8787/ && echo Keep this window open. && echo. && "%PYTHON_EXE%" -m http.server 8787 --bind 127.0.0.1"
timeout /t 2 /nobreak >nul
start "" "http://127.0.0.1:8787/"
