$ErrorActionPreference = "Stop"

$root = Split-Path -Parent $MyInvocation.MyCommand.Path
$bundledPython = Join-Path $env:USERPROFILE ".cache\codex-runtimes\codex-primary-runtime\dependencies\python\python.exe"
$python = if (Test-Path -LiteralPath $bundledPython) { $bundledPython } else { "python" }
$port = 8787

Set-Location -LiteralPath $root
Write-Host "Market Knowledge Lab running at http://127.0.0.1:$port/"
Write-Host "Serving $root"
Write-Host "Keep this window open while using the app."
Write-Host ""

& $python -m http.server $port --bind 127.0.0.1
