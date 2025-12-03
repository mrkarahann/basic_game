# 🎬 Cypress Video Oluşturma Kılavuzu

## 🚀 Hızlı Başlangıç

### Yöntem 1: Otomatik Script (Önerilen)

1. **`run-tests.bat`** dosyasına çift tıklayın
2. Script otomatik olarak:
   - Node.js kontrolü yapar
   - npm paketlerini yükler
   - Test sunucusunu başlatır
   - Testleri çalıştırır
   - Videoları oluşturur

### Yöntem 2: Manuel Adımlar

#### Adım 1: Node.js Kurulumu
Eğer Node.js yüklü değilse:
1. https://nodejs.org/ adresine gidin
2. LTS versiyonunu indirin ve kurun
3. Kurulumdan sonra bilgisayarı yeniden başlatın

#### Adım 2: Bağımlılıkları Yükle
PowerShell veya Command Prompt'u açın ve proje klasörüne gidin:

```bash
cd "C:\ödev_1"
npm install
```

#### Adım 3: Test Sunucusunu Başlat
Yeni bir terminal penceresi açın:

```bash
cd "C:\ödev_1"
npm run server
```

veya

```bash
python -m http.server 8000
```

Sunucu `http://localhost:8000` adresinde çalışacak.

#### Adım 4: Testleri Çalıştır
Başka bir terminal penceresi açın:

```bash
cd "C:\ödev_1"
npm run test
```

veya

```bash
npx cypress run
```

## 📹 Video Dosyaları

Testler tamamlandığında:
- **Konum**: `cypress/videos/` klasörü
- **Format**: `.mp4`
- **Her test için ayrı video**: Her test senaryosu için ayrı video dosyası

### Video Dosyaları:
- `karahan-games.cy.js.mp4` - Tüm testlerin videosu
- Veya her test için ayrı video (eğer yapılandırıldıysa)

## 🎯 Test Senaryoları

Video şu testleri içerir:

1. ✅ Ana sayfa yükleniyor
2. ✅ Karakter seçimi
3. ✅ Boyama aktivitesi
4. ✅ Hikaye oluşturma
5. ✅ Bulmaca oyunları
6. ✅ Video oluşturucu
7. ✅ Skor sistemi
8. ✅ Ses kontrolü
9. ✅ Navigasyon
10. ✅ Tam oyun akışı

## ⚙️ Sorun Giderme

### "npm bulunamadı" Hatası
- Node.js'in yüklü olduğundan emin olun
- Bilgisayarı yeniden başlatın
- PATH değişkenini kontrol edin

### "Port 8000 kullanımda" Hatası
- Başka bir program port 8000'i kullanıyor olabilir
- `cypress.config.js` dosyasında `baseUrl`'i değiştirin
- Veya o programı kapatın

### Testler Başarısız Oluyor
- Test sunucusunun çalıştığından emin olun
- Tarayıcı konsolunda hata var mı kontrol edin
- API key'in doğru olduğundan emin olun (hikaye testi için)

### Video Oluşturulmuyor
- `cypress.config.js`'de `video: true` olduğundan emin olun
- Disk alanını kontrol edin
- `cypress/videos/` klasörünün yazılabilir olduğundan emin olun

## 📝 Alternatif Komutlar

```bash
# Interaktif mod (test geliştirme)
npm run test:open

# Görsel mod (tarayıcı açık)
npm run test:headed

# Sadece sunucu
npm run server
```

## 🎥 Video Kullanımı

Oluşturulan videoları:
- GitHub'a yükleyebilirsiniz
- YouTube'a yükleyebilirsiniz
- Proje sunumunda kullanabilirsiniz
- Raporunuza ekleyebilirsiniz

## 📊 Video İçeriği

Video şunları gösterir:
- Tüm özelliklerin çalışması
- Kullanıcı arayüzü
- Oyun akışı
- Test sonuçları

---

**Not**: İlk çalıştırmada Cypress indirileceği için biraz zaman alabilir.

