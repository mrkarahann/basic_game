# 🎮 KarahaN Games - 5-6 Yaş Grubu Eğitici Oyun Platformu

[![GitHub](https://img.shields.io/badge/GitHub-mrkarahann-blue)](https://github.com/mrkarahann)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![Google AI](https://img.shields.io/badge/Google_AI-4285F4?style=flat&logo=google&logoColor=white)](https://ai.google.dev/)

🌐 **Canlı Demo**: https://mrkarahann.github.io/basic_game/

> ⚠️ **Not**: GitHub Pages'i etkinleştirmek için repository Settings > Pages bölümünden `main` branch'ini seçin.

## 📋 Proje Hakkında

Bu proje, 5-6 yaş grubu okuma yazma bilmeyen çocuklar için tasarlanmış, görsel ve sesli öğelerle zenginleştirilmiş eğitici bir oyun platformudur. Google AI Studio (Gemini API) entegrasyonu ile hikaye oluşturma ve interaktif öğrenme deneyimi sunar.

## ✨ Özellikler

### 🎯 Ana Özellikler

1. **👤 Karakter Seçimi**
   - 10 farklı hayvan karakteri seçeneği (Kedi, Köpek, Tavşan, Ayı, Aslan, Kurbağa, Tekboynuz, Penguen, Baykuş)
   - Görsel ve interaktif karakter seçim ekranı
   - Seçilen karakterin ana menüde gösterilmesi
   - Başarı rozeti ve puan kazanma

2. **🎨 Boyama Aktivitesi**
   - 9 farklı renk paleti
   - 8 çocuk dostu çizim şablonu (ev, çiçek, araba, ağaç, kelebek, yıldız, kalp, gökkuşağı)
   - Dokunmatik ekran desteği
   - Temizleme ve yeni resim yükleme özellikleri

3. **📚 Hikaye Anlatımı**
   - Google AI Studio (Gemini API) ile otomatik hikaye oluşturma
   - Sesli okuma özelliği (Text-to-Speech)
   - 5-6 yaş grubuna uygun içerikler
   - Görsel hikaye gösterimi

4. **🧩 Bulmaca Oyunları**
   - **Desen Takip Oyunu**: Sıralı desenleri takip etme
   - **Hafıza Oyunu**: Eşleştirme kartları
   - **Bulma Oyunu**: Belirli emoji'leri bulma
   - Başarı geri bildirimleri

5. **🎬 Video Oluşturucu** ⭐ YENİ!
   - Seçilen karakter ile profesyonel animasyonlu video oluşturma
   - 6 saniyelik yıldızlı arka plan animasyonu
   - Zıplama ve döndürme efektleri
   - Video görüntüsü indirme özelliği
   - Başarı rozeti ve puan kazanma

6. **⭐ Skor ve Başarı Sistemi** ⭐ YENİ!
   - Her aktivitede puan kazanma
   - Başarı rozetleri
   - İlerleme takibi
   - Başarı bildirimleri

## 🚀 Kurulum ve Kullanım

### Gereksinimler

- Modern web tarayıcısı (Chrome, Firefox, Safari, Edge)
- İnternet bağlantısı (Google AI Studio API için)

### Kurulum Adımları

1. **Projeyi İndirin**
   ```bash
   git clone <repository-url>
   cd odev_1
   ```

2. **Google AI Studio API Key Alın**
   - [Google AI Studio](https://makersuite.google.com/app/apikey) adresine gidin
   - Yeni bir API key oluşturun
   - `script.js` dosyasındaki `YOUR_GEMINI_API_KEY` yerine API key'inizi ekleyin

3. **Yerel Olarak Çalıştırın**
   - `index.html` dosyasını bir web tarayıcısında açın
   - Veya bir web sunucusu kullanın:
     ```bash
     # Python ile
     python -m http.server 8000
     
     # Node.js ile
     npx serve
     ```

4. **Canlı Yayın (GitHub Pages)**
   - GitHub repository'sine yükleyin
   - Settings > Pages bölümünden GitHub Pages'i etkinleştirin
   - Repository'nin public olması gerekir

## 🎨 Teknolojiler

- **HTML5**: Yapısal iskelet
- **CSS3**: Modern ve responsive tasarım, animasyonlar
- **JavaScript (ES6+)**: İnteraktif özellikler
- **Google AI Studio (Gemini API)**: Hikaye oluşturma
- **Web APIs**: Canvas API, Speech Synthesis API, Web Audio API

## 📱 Responsive Tasarım

Uygulama mobil, tablet ve masaüstü cihazlarda çalışacak şekilde tasarlanmıştır. Dokunmatik ekran desteği mevcuttur.

## 🎯 Hedef Kitle

- **Yaş Grubu**: 5-6 yaş
- **Okuma Yazma**: Gerekmez (tamamen görsel ve sesli)
- **Eğitim Amaçlı**: BİLSEM 6 yaş grubu içeriklerinden ilham alınmıştır

## 🔒 Güvenlik Notları

- API key'lerinizi asla public repository'lerde paylaşmayın
- Production ortamında environment variables kullanın
- API rate limit'lerini göz önünde bulundurun

## 📝 Lisans

Bu proje eğitim amaçlıdır.

## 👥 Katkıda Bulunanlar

- Proje ekibi

## 📞 İletişim

Sorularınız için issue açabilirsiniz.

---

**Not**: Bu proje Google AI Studio (Gemini API) kullanarak geliştirilmiştir. API key'inizi `script.js` dosyasına eklemeyi unutmayın!

