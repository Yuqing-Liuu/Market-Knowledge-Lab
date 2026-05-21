$ErrorActionPreference = "Stop"

$repoUrl = "https://github.com/Yuqing-Liuu/Market-Knowledge-Lab.git"
$root = Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Location -LiteralPath $root

Write-Host "Publishing Market Knowledge Lab to GitHub Pages repo..." -ForegroundColor Cyan
Write-Host "Repo: $repoUrl"
Write-Host ""

if (-not (Test-Path -LiteralPath ".git")) {
  git init
}

$remotes = @(git remote)
if ($remotes -notcontains "origin") {
  git remote add origin $repoUrl
} else {
  $remote = git remote get-url origin
  if ($remote -ne $repoUrl) {
  git remote set-url origin $repoUrl
  }
}

git branch -M main

$name = git config user.name
if (-not $name) {
  git config user.name "Yuqing-Liuu"
}

$email = git config user.email
if (-not $email) {
  git config user.email "Yuqing-Liuu@users.noreply.github.com"
}

git add .gitignore .nojekyll .github/workflows/pages.yml README.md index.html app.js styles.css netlify.toml vercel.json start-server.ps1 OPEN_APP_DIRECT.bat OPEN_INVESTMENT_APP.bat publish-to-github.ps1

$pending = git status --short
if ($pending) {
  git commit -m "Deploy Market Knowledge Lab"
} else {
  Write-Host "No local changes to commit."
}

git pull --rebase origin main
git push -u origin main

Write-Host ""
Write-Host "Done. Now open GitHub > Settings > Pages and set Source to GitHub Actions." -ForegroundColor Green
Write-Host "After the workflow finishes, your app should be at:"
Write-Host "https://yuqing-liuu.github.io/Market-Knowledge-Lab/"
