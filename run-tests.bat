@echo off
chcp 65001 >nul
echo ========================================
echo KarahaN Games - Cypress Test Videosu
echo ========================================
echo.

echo [1/4] Node.js kontrol ediliyor...
where node >nul 2>&1
if %errorlevel% neq 0 (
    echo.
    echo ========================================
    echo HATA: Node.js bulunamadi!
    echo ========================================
    echo.
    echo Node.js kurulumu gerekli:
    echo 1. https://nodejs.org/ adresine gidin
    echo 2. LTS versiyonunu indirin
    echo 3. Kurun ve bilgisayari yeniden baslatin
    echo.
    echo Alternatif: Windows ekran kaydi kullanin
    echo (Windows + G tuslarina basin)
    echo.
    pause
    exit /b 1
)
echo Node.js bulundu: 
node --version
echo npm versiyonu:
npm --version
echo.

echo [2/4] npm paketleri yukleniyor...
call npm install
if %errorlevel% neq 0 (
    echo HATA: npm install basarisiz!
    pause
    exit /b 1
)
echo.

echo [3/4] Test sunucusu baslatiliyor...
start "Test Server" cmd /k "node test-server.js"
timeout /t 3 /nobreak >nul
echo Test sunucusu baslatildi (http://localhost:8000)
echo.

echo [4/4] Cypress testleri calistiriliyor...
echo Video dosyalari cypress\videos\ klasorune kaydedilecek...
echo.
call npx cypress run
echo.

echo ========================================
echo Testler tamamlandi!
echo Videolar: cypress\videos\ klasorunde
echo ========================================
echo.
echo Test sunucusunu kapatmak icin 'Test Server' penceresini kapatin.
pause

