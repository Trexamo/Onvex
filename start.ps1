Write-Host "🚀 Iniciando Logzz Marketplace..." -ForegroundColor Cyan

Write-Host "`n📦 Iniciando backend..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PSScriptRoot\backend'; npm run dev"

Write-Host "🎨 Iniciando frontend..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PSScriptRoot\frontend'; npm run dev"

Write-Host "`n✅ Projetos iniciados!" -ForegroundColor Green
Write-Host "📱 Frontend: http://localhost:3000" -ForegroundColor Cyan
Write-Host "⚙️ Backend API: http://localhost:3001/health" -ForegroundColor Yellow
Write-Host "🔧 Admin: http://localhost:3000/admin" -ForegroundColor Magenta
