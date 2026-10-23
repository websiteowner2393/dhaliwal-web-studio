# PowerShell launcher for vCard Personal Portfolio
Write-Host "==================================================" -ForegroundColor Cyan
Write-Host "  Starting vCard Personal Portfolio Locally..." -ForegroundColor Cyan
Write-Host "==================================================" -ForegroundColor Cyan

if (Get-Command bun -ErrorAction SilentlyContinue) {
    Write-Host "Starting Bun server at http://localhost:3000..." -ForegroundColor Green
    Start-Process "http://localhost:3000"
    bun run server.js
} else {
    Write-Host "Bun not found, opening index.html in default browser..." -ForegroundColor Yellow
    Start-Process (Join-Path $PSScriptRoot "index.html")
}
