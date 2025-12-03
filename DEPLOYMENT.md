# 🚀 Deployment Kılavuzu

## GitHub Pages ile Yayınlama

### Adım 1: GitHub Repository Oluşturma

1. GitHub'da yeni bir repository oluşturun
2. Repository adı: `cocuk-oyun-dunyasi` (veya istediğiniz isim)
3. Repository'yi public yapın (GitHub Pages için gerekli)

### Adım 2: Kodları Yükleme

```bash
# Git repository'sini başlat
git init

# Dosyaları ekle
git add .

# İlk commit
git commit -m "İlk commit: KarahaN Games projesi"

# GitHub repository'sine bağla
git remote add origin https://github.com/KULLANICI_ADI/REPO_ADI.git

# Kodları yükle
git push -u origin main
```

### Adım 3: GitHub Pages'i Etkinleştirme

1. GitHub repository sayfasına gidin
2. **Settings** sekmesine tıklayın
3. Sol menüden **Pages** seçeneğine gidin
4. **Source** bölümünden **main** branch'ini seçin
5. **Save** butonuna tıklayın

### Adım 4: Canlı Link

Birkaç dakika sonra siteniz şu adreste yayında olacak:
```
https://KULLANICI_ADI.github.io/REPO_ADI/
```

## Alternatif: Netlify ile Yayınlama

### Adım 1: Netlify Hesabı

1. [Netlify](https://www.netlify.com/) adresine gidin
2. Ücretsiz hesap oluşturun

### Adım 2: Deploy

1. **New site from Git** seçeneğine tıklayın
2. GitHub repository'nizi seçin
3. Build settings:
   - **Build command**: (boş bırakın)
   - **Publish directory**: `/` (root)
4. **Deploy site** butonuna tıklayın

### Adım 3: Özel Domain (Opsiyonel)

Netlify otomatik olarak bir domain verir. İsterseniz özel domain ekleyebilirsiniz.

## Alternatif: Vercel ile Yayınlama

### Adım 1: Vercel Hesabı

1. [Vercel](https://vercel.com/) adresine gidin
2. GitHub ile giriş yapın

### Adım 2: Deploy

1. **New Project** butonuna tıklayın
2. GitHub repository'nizi seçin
3. **Deploy** butonuna tıklayın

## API Key Yönetimi

### Güvenli Yöntem (Önerilen)

API key'lerinizi public repository'de saklamayın. Bunun yerine:

1. **Netlify/Vercel Environment Variables** kullanın
2. Veya **GitHub Secrets** kullanın (CI/CD için)

### Hızlı Test İçin

Sadece test amaçlıysa, `script.js` dosyasındaki API key'i doğrudan ekleyebilirsiniz. Ancak production için kesinlikle environment variables kullanın.

## Önemli Notlar

⚠️ **API Key Güvenliği**: 
- API key'inizi asla public repository'de paylaşmayın
- Environment variables kullanın
- Rate limiting uygulayın

⚠️ **CORS Sorunları**:
- Google AI Studio API'si CORS desteği sağlar
- Eğer sorun yaşarsanız, bir backend proxy kullanın

⚠️ **Mobil Uyumluluk**:
- Tüm özellikler mobilde test edilmiştir
- Dokunmatik ekran desteği mevcuttur

## Sorun Giderme

### Sayfa Yüklenmiyor
- GitHub Pages'in aktif olduğundan emin olun
- Repository'nin public olduğunu kontrol edin
- Birkaç dakika bekleyin (propagation süresi)

### API Çalışmıyor
- API key'in doğru olduğundan emin olun
- Browser console'da hata mesajlarını kontrol edin
- CORS hatası alıyorsanız backend proxy kullanın

### Mobilde Çalışmıyor
- Responsive tasarımı kontrol edin
- Touch events'in çalıştığını doğrulayın
- Farklı tarayıcılarda test edin

---

**Başarılar! 🎉**

