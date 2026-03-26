# dev.ps1 - Desenvolvimento com auto-reload

Write-Host "🚀 Iniciando ONVEX em modo desenvolvimento..." -ForegroundColor Cyan

# Mata processos antigos
taskkill /F /IM node.exe 2>$null
Start-Sleep -Seconds 2

# Limpa cache
Remove-Item -Path "frontend\.next" -Recurse -Force -ErrorAction SilentlyContinue

# Inicia backend com nodemon (reinicia automaticamente)
Write-Host "📦 Iniciando backend..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PSScriptRoot\backend'; Write-Host '⚙️ Backend com nodemon - reinicia sozinho' -ForegroundColor Green; npm run dev"

Start-Sleep -Seconds 2

# Inicia frontend (já tem hot reload)
Write-Host "🎨 Iniciando frontend..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PSScriptRoot\frontend'; Write-Host '🎨 Frontend - hot reload ativo' -ForegroundColor Green; npm run dev"

Write-Host "`n✅ AMBOS OS SERVIDORES COM AUTO-RELOAD!" -ForegroundColor Green
Write-Host "📱 Frontend: http://localhost:3000 (atualiza sozinho ao salvar)" -ForegroundColor Cyan
Write-Host "⚙️ Backend: http://localhost:3001 (reinicia sozinho ao salvar)" -ForegroundColor Yellow
Write-Host "`n💡 DICA: Ao modificar qualquer arquivo, os servidores reiniciam automaticamente!" -ForegroundColor Magenta
Write-Host "🛑 Para parar: feche as janelas do PowerShell" -ForegroundColor Red
