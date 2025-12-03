# 🎥 Demo Video Oluşturma Rehberi

## ⚠️ Önemli: Node.js Gerekli

Cypress testlerini çalıştırmak için **Node.js** kurulu olmalıdır.

## 🚀 Node.js Kurulumu

### Adım 1: Node.js İndir
1. https://nodejs.org/ adresine git
2. **LTS (Long Term Support)** versiyonunu indir (önerilen)
3. İndirilen `.msi` dosyasını çalıştır
4. Kurulum sihirbazını takip et (varsayılan ayarlar yeterli)
5. Kurulumdan sonra **bilgisayarı yeniden başlat**

### Adım 2: Kurulumu Kontrol Et
Yeni bir PowerShell veya CMD penceresi aç ve şunu çalıştır:
```bash
node --version
npm --version
```
Her iki komut da versiyon numarası göstermeli.

## 📹 Video Oluşturma - 3 Yöntem

### Yöntem 1: Cypress ile Otomatik Video (Önerilen)

Node.js kurulduktan sonra:

1. **Paketleri Yükle:**
   ```bash
   cd "C:\ödev_1"
   npm install
   ```

2. **Test Sunucusunu Başlat:**
   Yeni bir terminal penceresi:
   ```bash
   npm run server
   ```
   veya
   ```bash
   python -m http.server 8000
   ```

3. **Testleri Çalıştır:**
   Başka bir terminal:
   ```bash
   npm run test
   ```

4. **Videolar:**
   `cypress/videos/` klasöründe `.mp4` dosyaları oluşacak

### Yöntem 2: Windows Ekran Kaydı (Hızlı)

1. **Windows + G** tuşlarına bas (Xbox Game Bar)
2. **Kayıt** butonuna tıkla
3. Oyunu oyna ve kaydet
4. Video `Videos/Captures/` klasöründe olacak

### Yöntem 3: OBS Studio (Profesyonel)

1. OBS Studio'yu indir: https://obsproject.com/
2. Kur ve aç
3. "Ekran Kaydı" kaynağı ekle
4. "Kayıt Başlat" butonuna tıkla
5. Oyunu oyna
6. "Kayıt Durdur" butonuna tıkla

## 🎬 Demo Video İçeriği Önerisi

Video şunları içermeli:

1. **Giriş (0-10 saniye)**
   - Proje başlığı: "KarahaN Games"
   - Açıklama: "5-6 Yaş Grubu Eğitici Oyun Platformu"

2. **Ana Menü (10-20 saniye)**
   - Hoş geldin mesajı
   - Karakter seçimi
   - Menü butonları

3. **Karakter Seçimi (20-30 saniye)**
   - Karakter seçim ekranı
   - Bir karakter seç (örn: Kedi)
   - Ana menüye dönüş

4. **Boyama Aktivitesi (30-50 saniye)**
   - Boyama ekranına git
   - Renk seç
   - Çizim yap
   - "Tamamlandı" butonuna tıkla

5. **Hikaye (50-70 saniye)**
   - Hikaye ekranına git
   - "Yeni Hikaye Oluştur" butonuna tıkla
   - Hikayeyi göster

6. **Bulmaca Oyunları (70-100 saniye)**
   - Bulmaca ekranına git
   - Desen oyununu göster
   - Bul oyununu göster

7. **Video Oluşturucu (100-120 saniye)**
   - Video ekranına git
   - "Video Oluştur" butonuna tıkla
   - Video animasyonunu göster

8. **Skor Sistemi (120-130 saniye)**
   - Ana menüde skor gösterimi
   - Başarı rozetleri

9. **Kapanış (130-140 saniye)**
   - Proje bilgileri
   - "KarahaN Games" logosu

## 📝 Video Script Örneği

```
[0-5s] Giriş ekranı - "KarahaN Games'e Hoş Geldiniz"
[5-15s] Ana menü gösterimi - Tüm butonlar
[15-25s] Karakter seçimi - Kedi seçiliyor
[25-40s] Boyama aktivitesi - Çizim yapılıyor
[40-55s] Hikaye oluşturma - AI hikaye gösteriliyor
[55-75s] Bulmaca oyunları - Desen ve Bul oyunları
[75-90s] Video oluşturucu - Animasyon gösteriliyor
[90-100s] Skor sistemi - Puanlar ve rozetler
[100-110s] Kapanış - Proje bilgileri
```

## 🎯 Video Kalitesi İpuçları

- **Çözünürlük**: 1280x720 (HD) veya 1920x1080 (Full HD)
- **FPS**: 30 fps yeterli
- **Süre**: 2-3 dakika ideal
- **Ses**: Arka plan müziği eklenebilir (opsiyonel)
- **Yazılar**: Önemli noktalara yazı eklenebilir

## 📤 Video Paylaşımı

Oluşturulan videoyu:
- GitHub'a yükleyebilirsiniz
- YouTube'a yükleyebilirsiniz
- LinkedIn'de paylaşabilirsiniz
- Proje raporuna ekleyebilirsiniz

---

**Not**: Node.js kurulumu için yaklaşık 5 dakika yeterli. Kurulumdan sonra `run-tests.bat` dosyasına çift tıklayarak otomatik video oluşturabilirsiniz.

