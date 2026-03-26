@echo off
title ONVEX - Iniciando Servidores
color 0A
echo ========================================
echo    ?? ONVEX MARKETPLACE ??
echo ========================================
echo.

echo ?? Parando servidores antigos...
taskkill /F /IM node.exe >nul 2>&1
timeout /t 2 /nobreak >nul

echo.
echo ?? Limpando cache...
if exist "frontend\.next" rmdir /s /q "frontend\.next"

echo.
echo ?? Iniciando BACKEND (porta 3001)...
start "ONVEX - BACKEND" powershell -NoExit -Command "cd backend; Write-Host '? BACKEND RODANDO EM http://localhost:3001' -ForegroundColor Green; npm run dev"

timeout /t 3 /nobreak >nul

echo.
echo ?? Iniciando FRONTEND (porta 3000)...
start "ONVEX - FRONTEND" powershell -NoExit -Command "cd frontend; Write-Host '? FRONTEND RODANDO EM http://localhost:3000' -ForegroundColor Green; npm run dev"

echo.
echo ========================================
echo    ? SERVIDORES INICIADOS!
echo ========================================
echo.
echo ?? Frontend: http://localhost:3000
echo ?? Backend:  http://localhost:3001/health
echo.
echo ?? DICA: Os servidores reiniciam sozinhos quando voc? salva arquivos!
echo ?? Para parar, feche as janelas do PowerShell
echo.
pause
