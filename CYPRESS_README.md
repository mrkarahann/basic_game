# 🎬 Cypress Test ve Video Oluşturma Kılavuzu

## 📋 Kurulum

### 1. Node.js Kurulumu
Cypress çalıştırmak için Node.js gereklidir. [Node.js](https://nodejs.org/) indirip kurun.

### 2. Bağımlılıkları Yükle
```bash
npm install
```

Bu komut Cypress'i ve gerekli bağımlılıkları yükler.

## 🚀 Test Çalıştırma

### Test Modları

#### 1. Interaktif Mod (Test Geliştirme İçin)
```bash
npm run test:open
```
Bu komut Cypress Test Runner'ı açar ve testleri görsel olarak çalıştırabilirsiniz.

#### 2. Headless Mod (Video ile)
```bash
npm run test
```
Bu komut tüm testleri headless modda çalıştırır ve video kaydı yapar.

#### 3. Headed Mod (Görsel)
```bash
npm run test:headed
```
Bu komut testleri görsel modda çalıştırır (tarayıcı penceresi açık).

## 📹 Video Dosyaları

Testler çalıştırıldığında video dosyaları otomatik olarak kaydedilir:
- **Konum**: `cypress/videos/`
- **Format**: `.mp4`
- **Her test için ayrı video**: Her test senaryosu için ayrı video dosyası oluşturulur

## 📸 Ekran Görüntüleri

Hata durumunda ekran görüntüleri otomatik olarak kaydedilir:
- **Konum**: `cypress/screenshots/`
- **Format**: `.png`

## 🎯 Test Senaryoları

Projede şu test senaryoları mevcuttur:

1. **Ana Sayfa Testi**: Sayfa yükleniyor mu?
2. **Karakter Seçimi**: Karakter seçimi çalışıyor mu?
3. **Boyama Aktivitesi**: Boyama özellikleri çalışıyor mu?
4. **Hikaye Oluşturma**: AI hikaye oluşturma çalışıyor mu?
5. **Bulmaca Oyunları**: Tüm bulmaca türleri çalışıyor mu?
6. **Video Oluşturucu**: Video oluşturma çalışıyor mu?
7. **Skor Sistemi**: Skor sistemi çalışıyor mu?
8. **Ses Kontrolü**: Ses açma/kapama çalışıyor mu?
9. **Navigasyon**: Tüm sayfalar arası geçişler çalışıyor mu?
10. **Tam Oyun Akışı**: Tüm özellikler birlikte çalışıyor mu?

## ⚙️ Yapılandırma

### Cypress Yapılandırması (`cypress.config.js`)

- **baseUrl**: Test edilecek URL (varsayılan: `http://localhost:8000`)
- **video**: Video kaydı açık/kapalı (varsayılan: `true`)
- **viewportWidth**: Tarayıcı genişliği (varsayılan: `1280`)
- **viewportHeight**: Tarayıcı yüksekliği (varsayılan: `720`)

### Local Server Başlatma

Testleri çalıştırmadan önce local bir web sunucusu başlatmanız gerekir:

```bash
# Python ile
python -m http.server 8000

# Node.js ile
npx serve -p 8000

# Veya başka bir port kullanıyorsanız cypress.config.js'de değiştirin
```

## 📝 Test Dosyaları

- **Test Dosyası**: `cypress/e2e/karahan-games.cy.js`
- **Support Dosyaları**: `cypress/support/`

## 🎥 Video Kullanımı

### Video İzleme
1. Testleri çalıştırın: `npm run test`
2. Video dosyaları `cypress/videos/` klasöründe oluşturulur
3. Video dosyalarını herhangi bir video oynatıcı ile açabilirsiniz

### Video Paylaşma
- Video dosyalarını GitHub'a yükleyebilirsiniz
- YouTube'a yükleyebilirsiniz
- Proje sunumunda kullanabilirsiniz

## 🔧 Sorun Giderme

### Testler Çalışmıyor
1. Local server'ın çalıştığından emin olun
2. `cypress.config.js`'deki `baseUrl`'i kontrol edin
3. Tarayıcı konsolunda hata var mı kontrol edin

### Video Oluşturulmuyor
1. `cypress.config.js`'de `video: true` olduğundan emin olun
2. Disk alanını kontrol edin
3. `cypress/videos/` klasörünün yazılabilir olduğundan emin olun

### API Hataları
- Google AI Studio API key'i gerekli (hikaye testi için)
- API key yoksa bazı testler başarısız olabilir (normal)

## 📚 Daha Fazla Bilgi

- [Cypress Dokümantasyonu](https://docs.cypress.io/)
- [Cypress Best Practices](https://docs.cypress.io/guides/references/best-practices)

---

**Not**: Testler için local bir web sunucusu gereklidir. GitHub Pages veya başka bir hosting kullanıyorsanız, `baseUrl`'i buna göre güncelleyin.

