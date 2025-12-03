# 🔑 Google AI Studio API Key Kurulumu

## Adım 1: Google AI Studio'ya Giriş

1. [Google AI Studio](https://makersuite.google.com/app/apikey) adresine gidin
2. Google hesabınızla giriş yapın

## Adım 2: API Key Oluşturma

1. **"Get API Key"** veya **"Create API Key"** butonuna tıklayın
2. Yeni bir proje oluşturun veya mevcut bir projeyi seçin
3. API key'iniz otomatik olarak oluşturulacak

## Adım 3: API Key'i Projeye Ekleme

### Yöntem 1: Doğrudan Kodda (Sadece Test İçin)

`script.js` dosyasını açın ve şu satırı bulun:

```javascript
const API_KEY = 'YOUR_GEMINI_API_KEY';
```

`YOUR_GEMINI_API_KEY` yerine oluşturduğunuz API key'i yapıştırın:

```javascript
const API_KEY = 'AIzaSyC...'; // Gerçek API key'iniz
```

⚠️ **UYARI**: Bu yöntem sadece test için uygundur. Production'da asla kullanmayın!

### Yöntem 2: Environment Variable (Önerilen - Production)

#### Local Development

1. Proje klasöründe `.env` dosyası oluşturun:

```env
GEMINI_API_KEY=AIzaSyC...
```

2. `script.js` dosyasını güncelleyin:

```javascript
const API_KEY = process.env.GEMINI_API_KEY || 'YOUR_GEMINI_API_KEY';
```

#### GitHub Pages / Netlify / Vercel

**Netlify:**
1. Site Settings > Environment Variables
2. Key: `GEMINI_API_KEY`
3. Value: API key'iniz

**Vercel:**
1. Project Settings > Environment Variables
2. Key: `GEMINI_API_KEY`
3. Value: API key'iniz

**GitHub Pages:**
GitHub Pages static hosting olduğu için environment variables desteklemez. 
Alternatif olarak:
- Backend proxy kullanın
- Veya API key'i client-side'da saklayın (güvenlik riski var)

## Adım 4: API Key Güvenliği

### ✅ Yapılması Gerekenler

- API key'i `.gitignore` dosyasına ekleyin
- Environment variables kullanın
- Rate limiting uygulayın
- API key'i sadece gerekli yerlerde kullanın

### ❌ Yapılmaması Gerekenler

- API key'i public repository'de paylaşmayın
- API key'i screenshot'larda göstermeyin
- API key'i commit mesajlarında yazmayın
- API key'i client-side'da hardcode etmeyin (mümkünse)

## Adım 5: Test Etme

1. `index.html` dosyasını tarayıcıda açın
2. "Hikaye" bölümüne gidin
3. "Yeni Hikaye Oluştur" butonuna tıklayın
4. Hikaye oluşturuluyorsa API key çalışıyordur

## Sorun Giderme

### "API key bulunamadı" Hatası

- API key'in doğru kopyalandığından emin olun
- Tırnak işaretlerini kontrol edin
- `script.js` dosyasında doğru yerde olduğundan emin olun

### "CORS" Hatası

- Google AI Studio API'si CORS destekler
- Eğer hata alıyorsanız, tarayıcı console'unu kontrol edin
- Gerekirse backend proxy kullanın

### "Quota exceeded" Hatası

- API key'iniz için quota limiti aşılmış olabilir
- Google Cloud Console'dan quota'yı kontrol edin
- Ücretsiz tier limitlerini kontrol edin

### "Invalid API key" Hatası

- API key'in doğru olduğundan emin olun
- API key'in aktif olduğunu kontrol edin
- Yeni bir API key oluşturmayı deneyin

## API Key Formatı

Google AI Studio API key'leri genellikle şu formatta olur:
```
AIzaSyC... (yaklaşık 39 karakter)
```

## Rate Limits

Google AI Studio ücretsiz tier için:
- Dakikada ~15 istek
- Günde ~1500 istek

Bu limitler aşılırsa, bir süre bekleyin veya paid tier'a geçin.

## Daha Fazla Bilgi

- [Google AI Studio Dokümantasyonu](https://ai.google.dev/docs)
- [Gemini API Kılavuzu](https://ai.google.dev/tutorials/web_quickstart)
- [API Key Güvenliği](https://ai.google.dev/gemini-api/docs/api-key)

---

**Önemli**: API key'inizi asla paylaşmayın ve public repository'lere yüklemeyin!

