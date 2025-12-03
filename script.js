// Global değişkenler
let selectedCharacter = null;
let selectedColor = '#FF0000';
let isDrawing = false;
let currentPuzzleType = 'pattern';
let geminiAPI = null;
let userScore = 0;
let achievements = {
    characterSelected: false,
    coloringCompleted: false,
    storyCreated: false,
    puzzleSolved: 0,
    videoCreated: false
};

// Google AI Studio (Gemini API) başlatma
async function initializeGemini() {
    // API key'i buraya ekleyin (güvenlik için environment variable kullanılmalı)
    // Not: Production'da API key'i environment variable olarak saklayın
    const API_KEY = 'AIzaSyAjCS4KM7QtfDrK2zpW2Uea8hL3GP0aQaU'; // Google AI Studio API Key
    
    if (API_KEY === 'YOUR_GEMINI_API_KEY') {
        console.warn('Gemini API key bulunamadı. Bazı özellikler çalışmayabilir.');
        return null;
    }
    
    try {
        // CDN'den yüklenen GoogleGenerativeAI kullanılıyor
        if (typeof GoogleGenerativeAI === 'undefined' && typeof window.GoogleGenerativeAI === 'undefined') {
            console.error('Google Generative AI kütüphanesi yüklenemedi.');
            return null;
        }
        const GenerativeAI = GoogleGenerativeAI || window.GoogleGenerativeAI;
        geminiAPI = new GenerativeAI(API_KEY);
        return geminiAPI;
    } catch (error) {
        console.error('Gemini API başlatılamadı:', error);
        return null;
    }
}

// Sayfa yüklendiğinde
document.addEventListener('DOMContentLoaded', async () => {
    initializeGemini();
    setupColoringCanvas();
    loadPuzzleType('pattern');
    playSound('start');
    
    // Sesli okuma butonu ekle
    addAudioControls();
    
    // Hoş geldin mesajı göster
    showWelcomeMessage();
});

// Hoş geldin mesajı göster
function showWelcomeMessage() {
    // Arka plan overlay
    const overlay = document.createElement('div');
    overlay.id = 'welcome-overlay';
    overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.7);
        z-index: 10000;
        display: flex;
        align-items: center;
        justify-content: center;
    `;
    
    const welcomeMsg = document.createElement('div');
    welcomeMsg.id = 'welcome-message';
    welcomeMsg.style.cssText = `
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        padding: 50px 60px;
        border-radius: 30px;
        font-size: 1.8em;
        font-weight: bold;
        text-align: center;
        z-index: 10001;
        box-shadow: 0 20px 60px rgba(0,0,0,0.8);
        font-family: 'Comic Neue', cursive;
        max-width: 500px;
        animation: fadeIn 0.5s;
        cursor: pointer;
    `;
    welcomeMsg.innerHTML = `
        <div style="font-size: 4em; margin-bottom: 20px;">🎮</div>
        <div style="margin-bottom: 20px; font-size: 1.2em;">KarahaN Games'e Hoş Geldin!</div>
        <div style="font-size: 0.9em; margin-bottom: 25px; opacity: 0.95; line-height: 1.5;">Oyunlara başlamak için buraya tıkla!</div>
        <div style="font-size: 0.8em; opacity: 0.9; padding: 15px; background: rgba(255,255,255,0.2); border-radius: 15px;">🔊 Sesli okuma için sağ üstteki butonu kullan</div>
    `;
    
    overlay.appendChild(welcomeMsg);
    document.body.appendChild(overlay);
    
    // Herhangi bir yere tıklanınca mesajı kaldır ve sesli okumayı başlat
    const removeWelcome = () => {
        overlay.style.animation = 'fadeOut 0.5s';
        welcomeMsg.style.animation = 'fadeOut 0.5s';
        setTimeout(() => {
            if (overlay.parentNode) {
                overlay.parentNode.removeChild(overlay);
            }
        }, 500);
        
        userInteracted = true;
        setTimeout(() => {
            speakText('KarahaN Games\'e hoş geldin! Oyunlara başlamak için karakter seç!', { rate: 0.85 });
        }, 600);
    };
    
    overlay.onclick = removeWelcome;
    welcomeMsg.onclick = (e) => e.stopPropagation();
    
    // 8 saniye sonra otomatik kaldır
    setTimeout(() => {
        if (document.getElementById('welcome-overlay')) {
            removeWelcome();
        }
    }, 8000);
}

// Sesli Okuma Sistemi
let speechSynthesisEnabled = true;
let userInteracted = false; // Kullanıcı etkileşimi kontrolü

function speakText(text, options = {}) {
    if (!speechSynthesisEnabled || !('speechSynthesis' in window)) {
        return;
    }
    
    // Kullanıcı etkileşimi olmadan çalışmayı dene (bazı tarayıcılarda çalışmayabilir)
    if (!userInteracted) {
        console.log('Sesli okuma için kullanıcı etkileşimi gerekli');
        return;
    }
    
    // Önceki okumayı durdur
    speechSynthesis.cancel();
    
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'tr-TR';
    utterance.rate = options.rate || 0.9;
    utterance.pitch = options.pitch || 1.1;
    utterance.volume = options.volume || 1;
    
    utterance.onerror = (error) => {
        console.warn('Sesli okuma hatası:', error);
        // Hata olsa bile devam et
    };
    
    try {
        speechSynthesis.speak(utterance);
    } catch (error) {
        console.warn('Sesli okuma başlatılamadı:', error);
    }
}

// Kullanıcı etkileşimini algıla - tüm sayfaya tıklama eventi
document.addEventListener('click', (e) => {
    // Ses açma butonuna tıklanmışsa özel işlem yapma
    if (e.target.id === 'audio-toggle-btn' || e.target.closest('#audio-toggle-btn')) {
        return;
    }
    
    // Hoş geldin mesajına tıklanmışsa özel işlem yapma
    if (e.target.id === 'welcome-message' || e.target.closest('#welcome-overlay')) {
        return;
    }
    
    if (!userInteracted) {
        userInteracted = true;
        // İlk tıklamada hoş geldin mesajını söyle
        setTimeout(() => {
            speakText('KarahaN Games\'e hoş geldin! Oyunlara başlamak için karakter seç!', { rate: 0.85 });
        }, 300);
    }
}, { once: false });

document.addEventListener('touchstart', (e) => {
    if (e.target.id === 'audio-toggle-btn' || e.target.closest('#audio-toggle-btn')) {
        return;
    }
    
    if (!userInteracted) {
        userInteracted = true;
        setTimeout(() => {
            speakText('KarahaN Games\'e hoş geldin! Oyunlara başlamak için karakter seç!', { rate: 0.85 });
        }, 300);
    }
}, { once: false });

// Ekran başlıklarını sesli oku
const screenTitles = {
    'main-menu': 'Ana Menü',
    'character-selection': 'Karakter Seçimi',
    'coloring': 'Boyama Yap',
    'story': 'Hikaye Dinle',
    'puzzle': 'Bulmaca Çöz',
    'video-creator': 'Video Oluştur'
};

// Ses kontrol butonları ekle
function addAudioControls() {
    // Ses açma/kapama butonu
    const audioBtn = document.createElement('button');
    audioBtn.id = 'audio-toggle-btn';
    audioBtn.className = 'audio-control-btn';
    audioBtn.innerHTML = '🔊 Ses Aç';
    audioBtn.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        border: none;
        border-radius: 50px;
        padding: 18px 30px;
        font-size: 1.2em;
        font-weight: bold;
        cursor: pointer;
        z-index: 10002;
        box-shadow: 0 8px 20px rgba(0,0,0,0.4);
        font-family: 'Comic Neue', cursive;
        transition: all 0.3s;
        animation: pulse 2s infinite;
    `;
    
    audioBtn.onmouseenter = () => {
        audioBtn.style.transform = 'scale(1.1)';
        audioBtn.style.boxShadow = '0 10px 25px rgba(0,0,0,0.5)';
    };
    
    audioBtn.onmouseleave = () => {
        audioBtn.style.transform = 'scale(1)';
        audioBtn.style.boxShadow = '0 8px 20px rgba(0,0,0,0.4)';
    };
    
    audioBtn.onclick = () => {
        userInteracted = true; // Kullanıcı etkileşimi işaretle
        
        if (speechSynthesisEnabled) {
            speechSynthesisEnabled = false;
            speechSynthesis.cancel();
            audioBtn.innerHTML = '🔇 Ses Kapalı';
            audioBtn.style.background = 'linear-gradient(135deg, #999 0%, #666 100%)';
            audioBtn.style.animation = 'none';
        } else {
            speechSynthesisEnabled = true;
            audioBtn.innerHTML = '🔊 Ses Açık';
            audioBtn.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
            audioBtn.style.animation = 'pulse 2s infinite';
            setTimeout(() => {
                speakText('Ses açıldı! KarahaN Games\'e hoş geldin! Oyunlara başlamak için karakter seç!', { rate: 0.85 });
            }, 300);
        }
    };
    
    document.body.appendChild(audioBtn);
}

// Ekran değiştirme
function showScreen(screenId) {
    // Kullanıcı etkileşimi işaretle
    userInteracted = true;
    
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });
    document.getElementById(screenId).classList.add('active');
    playSound('click');
    
    // Ekran başlığını sesli oku
    const title = screenTitles[screenId] || '';
    if (title) {
        setTimeout(() => {
            speakText(title, { rate: 0.8 });
        }, 300);
    }
}

// Skor ve Başarı Sistemi
function updateScore(points) {
    userScore += points;
    const scoreDisplay = document.getElementById('score-display');
    const scoreValue = document.getElementById('score-value');
    
    if (scoreDisplay) {
        scoreDisplay.style.display = 'flex';
        if (scoreValue) {
            scoreValue.textContent = userScore;
            scoreValue.style.animation = 'pulse 0.5s';
            setTimeout(() => {
                scoreValue.style.animation = '';
            }, 500);
        }
    }
    
    checkAchievements();
}

function checkAchievements() {
    const badge = document.getElementById('achievements-badge');
    const totalAchievements = Object.values(achievements).filter(a => 
        typeof a === 'boolean' ? a : a > 0
    ).length;
    
    if (totalAchievements >= 3 && badge) {
        badge.style.display = 'inline-block';
    }
}

function unlockAchievement(name) {
    if (!achievements[name]) {
        achievements[name] = true;
        updateScore(10);
        showAchievementNotification(name);
    }
}

function showAchievementNotification(name) {
    const notifications = {
        characterSelected: '🎉 Karakter Seçildi! +10 puan',
        coloringCompleted: '🎨 Boyama Tamamlandı! +10 puan',
        storyCreated: '📚 Hikaye Oluşturuldu! +10 puan',
        videoCreated: '🎬 Video Oluşturuldu! +10 puan'
    };
    
    const notification = document.createElement('div');
    notification.className = 'achievement-notification';
    notification.textContent = notifications[name] || '🏆 Başarı Açıldı! +10 puan';
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        padding: 20px 30px;
        border-radius: 15px;
        font-size: 1.2em;
        font-weight: bold;
        z-index: 10000;
        animation: slideIn 0.5s;
        box-shadow: 0 10px 30px rgba(0,0,0,0.3);
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.5s';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 500);
    }, 3000);
}

// Karakter seçimi
function selectCharacter(emoji, name) {
    selectedCharacter = { emoji, name };
    
    // Ana menüde göster
    const display = document.getElementById('selected-character-display');
    display.innerHTML = `
        <div class="character-placeholder selected">
            <span class="character-emoji">${emoji}</span>
            <p>Seçilen: ${name}</p>
        </div>
    `;
    display.classList.add('selected');
    
    // Seçili karakteri işaretle
    document.querySelectorAll('.character-card').forEach(card => {
        card.classList.remove('selected');
    });
    event.currentTarget.classList.add('selected');
    
    unlockAchievement('characterSelected');
    playSound('success');
    
    // Sesli mesaj
    speakText(`${name} karakterini seçtin! Harika!`, { rate: 0.85 });
    
    showScreen('main-menu');
}

// Ses efektleri
function playSound(type) {
    // Web Audio API ile basit ses efektleri
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    switch(type) {
        case 'click':
            oscillator.frequency.value = 800;
            gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.1);
            break;
        case 'success':
            oscillator.frequency.value = 1000;
            gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2);
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.2);
            break;
        case 'start':
            // Başlangıç melodisi
            [440, 554, 659].forEach((freq, i) => {
                setTimeout(() => {
                    const osc = audioContext.createOscillator();
                    const gain = audioContext.createGain();
                    osc.connect(gain);
                    gain.connect(audioContext.destination);
                    osc.frequency.value = freq;
                    gain.gain.setValueAtTime(0.2, audioContext.currentTime);
                    gain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
                    osc.start(audioContext.currentTime);
                    osc.stop(audioContext.currentTime + 0.3);
                }, i * 150);
            });
            break;
    }
}

// Boyama Canvas Kurulumu
function setupColoringCanvas() {
    const canvas = document.getElementById('coloring-canvas');
    const ctx = canvas.getContext('2d');
    
    // Varsayılan çizim
    drawColoringTemplate(ctx);
    
    // Çizim olayları
    canvas.addEventListener('mousedown', (e) => {
        isDrawing = true;
        draw(ctx, e);
    });
    
    canvas.addEventListener('mousemove', (e) => {
        if (isDrawing) {
            draw(ctx, e);
        }
    });
    
    canvas.addEventListener('mouseup', () => {
        isDrawing = false;
    });
    
    canvas.addEventListener('mouseleave', () => {
        isDrawing = false;
    });
    
    // Touch events (mobil için)
    canvas.addEventListener('touchstart', (e) => {
        e.preventDefault();
        isDrawing = true;
        const touch = e.touches[0];
        const rect = canvas.getBoundingClientRect();
        draw(ctx, {
            clientX: touch.clientX,
            clientY: touch.clientY,
            target: { getBoundingClientRect: () => rect }
        });
    });
    
    canvas.addEventListener('touchmove', (e) => {
        e.preventDefault();
        if (isDrawing) {
            const touch = e.touches[0];
            const rect = canvas.getBoundingClientRect();
            draw(ctx, {
                clientX: touch.clientX,
                clientY: touch.clientY,
                target: { getBoundingClientRect: () => rect }
            });
        }
    });
    
    canvas.addEventListener('touchend', () => {
        isDrawing = false;
    });
}

function draw(ctx, e) {
    const rect = e.target.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    ctx.fillStyle = selectedColor;
    ctx.beginPath();
    ctx.arc(x, y, 10, 0, Math.PI * 2);
    ctx.fill();
}

function selectColor(color) {
    selectedColor = color;
    document.querySelectorAll('.color-btn').forEach(btn => {
        btn.classList.remove('selected');
    });
    event.currentTarget.classList.add('selected');
    playSound('click');
}

function clearCanvas() {
    const canvas = document.getElementById('coloring-canvas');
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawColoringTemplate(ctx);
    playSound('click');
}

function drawColoringTemplate(ctx) {
    // Basit bir çizim şablonu
    ctx.strokeStyle = '#333';
    ctx.lineWidth = 3;
    
    // Basit bir ev çizimi
    ctx.beginPath();
    ctx.moveTo(200, 100);
    ctx.lineTo(150, 200);
    ctx.lineTo(250, 200);
    ctx.closePath();
    ctx.stroke();
    
    ctx.beginPath();
    ctx.rect(150, 200, 100, 150);
    ctx.stroke();
    
    ctx.beginPath();
    ctx.rect(180, 250, 40, 50);
    ctx.stroke();
    
    // Güneş
    ctx.beginPath();
    ctx.arc(320, 80, 30, 0, Math.PI * 2);
    ctx.stroke();
}

function loadColoringTemplate() {
    const canvas = document.getElementById('coloring-canvas');
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Rastgele bir şablon seç
    const templates = [
        () => drawColoringTemplate(ctx),
        () => drawFlower(ctx),
        () => drawCar(ctx),
        () => drawTree(ctx),
        () => drawButterfly(ctx),
        () => drawStar(ctx),
        () => drawHeart(ctx),
        () => drawRainbow(ctx)
    ];
    
    const randomTemplate = templates[Math.floor(Math.random() * templates.length)];
    randomTemplate();
    playSound('click');
}

function completeColoring() {
    const canvas = document.getElementById('coloring-canvas');
    const ctx = canvas.getContext('2d');
    
    // Canvas'ın dolu olup olmadığını kontrol et
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const pixels = imageData.data;
    let coloredPixels = 0;
    
    for (let i = 0; i < pixels.length; i += 4) {
        // Beyaz ve şeffaf olmayan pikselleri say
        if (pixels[i] !== 255 || pixels[i + 1] !== 255 || pixels[i + 2] !== 255 || pixels[i + 3] !== 0) {
            coloredPixels++;
        }
    }
    
    if (coloredPixels < 100) {
        if (confirm('Boyama henüz tamamlanmamış görünüyor. Yine de tamamlandı olarak işaretlemek istiyor musunuz?')) {
            markColoringComplete();
        }
    } else {
        markColoringComplete();
    }
}

function markColoringComplete() {
    unlockAchievement('coloringCompleted');
    updateScore(15);
    playSound('success');
    
    // Başarı mesajı göster
    const coloringContainer = document.querySelector('.coloring-container');
    const successMsg = document.createElement('div');
    successMsg.className = 'success-message';
    successMsg.textContent = '🎨 Harika! Boyaman tamamlandı! +15 puan';
    successMsg.style.marginTop = '20px';
    successMsg.style.animation = 'fadeIn 0.5s';
    
    coloringContainer.appendChild(successMsg);
    
    // Sesli mesaj
    speakText('Harika! Boyaman tamamlandı! On beş puan kazandın!', { rate: 0.85 });
    
    setTimeout(() => {
        successMsg.style.animation = 'fadeOut 0.5s';
        setTimeout(() => {
            if (successMsg.parentNode) {
                successMsg.parentNode.removeChild(successMsg);
            }
            // Yeni resim yükle
            loadColoringTemplate();
        }, 500);
    }, 2000);
}

function drawFlower(ctx) {
    ctx.strokeStyle = '#333';
    ctx.lineWidth = 3;
    
    // Çiçek
    const centerX = 200, centerY = 200;
    for (let i = 0; i < 8; i++) {
        const angle = (i * Math.PI * 2) / 8;
        const x = centerX + Math.cos(angle) * 50;
        const y = centerY + Math.sin(angle) * 50;
        ctx.beginPath();
        ctx.arc(x, y, 30, 0, Math.PI * 2);
        ctx.stroke();
    }
    ctx.beginPath();
    ctx.arc(centerX, centerY, 20, 0, Math.PI * 2);
    ctx.stroke();
}

function drawCar(ctx) {
    ctx.strokeStyle = '#333';
    ctx.lineWidth = 3;
    
    ctx.beginPath();
    ctx.rect(100, 200, 200, 80);
    ctx.stroke();
    
    ctx.beginPath();
    ctx.rect(130, 150, 80, 50);
    ctx.stroke();
    
    ctx.beginPath();
    ctx.arc(140, 280, 25, 0, Math.PI * 2);
    ctx.stroke();
    
    ctx.beginPath();
    ctx.arc(260, 280, 25, 0, Math.PI * 2);
    ctx.stroke();
}

function drawTree(ctx) {
    ctx.strokeStyle = '#333';
    ctx.lineWidth = 3;
    
    // Gövde
    ctx.beginPath();
    ctx.rect(190, 250, 20, 100);
    ctx.stroke();
    
    // Yapraklar
    ctx.beginPath();
    ctx.arc(200, 200, 60, 0, Math.PI * 2);
    ctx.stroke();
}

function drawButterfly(ctx) {
    ctx.strokeStyle = '#333';
    ctx.lineWidth = 3;
    
    const centerX = 200, centerY = 200;
    
    // Sol kanat
    ctx.beginPath();
    ctx.ellipse(centerX - 40, centerY, 50, 40, -0.5, 0, Math.PI * 2);
    ctx.stroke();
    
    // Sağ kanat
    ctx.beginPath();
    ctx.ellipse(centerX + 40, centerY, 50, 40, 0.5, 0, Math.PI * 2);
    ctx.stroke();
    
    // Gövde
    ctx.beginPath();
    ctx.rect(centerX - 5, centerY - 30, 10, 60);
    ctx.stroke();
    
    // Antenler
    ctx.beginPath();
    ctx.moveTo(centerX, centerY - 30);
    ctx.lineTo(centerX - 10, centerY - 50);
    ctx.moveTo(centerX, centerY - 30);
    ctx.lineTo(centerX + 10, centerY - 50);
    ctx.stroke();
}

function drawStar(ctx) {
    ctx.strokeStyle = '#333';
    ctx.fillStyle = 'transparent';
    ctx.lineWidth = 3;
    
    const centerX = 200, centerY = 200, outerRadius = 60, innerRadius = 30;
    const spikes = 5;
    
    ctx.beginPath();
    for (let i = 0; i < spikes * 2; i++) {
        const radius = i % 2 === 0 ? outerRadius : innerRadius;
        const angle = (i * Math.PI) / spikes - Math.PI / 2;
        const x = centerX + radius * Math.cos(angle);
        const y = centerY + radius * Math.sin(angle);
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
    }
    ctx.closePath();
    ctx.stroke();
}

function drawHeart(ctx) {
    ctx.strokeStyle = '#333';
    ctx.lineWidth = 3;
    
    const centerX = 200, centerY = 220, size = 50;
    
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.bezierCurveTo(centerX, centerY - size, centerX - size, centerY - size * 1.5, centerX - size, centerY);
    ctx.bezierCurveTo(centerX - size, centerY + size * 0.5, centerX, centerY + size, centerX, centerY + size * 1.5);
    ctx.bezierCurveTo(centerX, centerY + size, centerX + size, centerY + size * 0.5, centerX + size, centerY);
    ctx.bezierCurveTo(centerX + size, centerY - size * 1.5, centerX, centerY - size, centerX, centerY);
    ctx.stroke();
}

function drawRainbow(ctx) {
    ctx.lineWidth = 8;
    
    const centerX = 200, centerY = 250;
    const radius = 80;
    const colors = ['#FF0000', '#FF7F00', '#FFFF00', '#00FF00', '#0000FF', '#4B0082', '#9400D3'];
    
    for (let i = 0; i < colors.length; i++) {
        ctx.strokeStyle = colors[i];
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius - i * 8, 0, Math.PI);
        ctx.stroke();
    }
    
    // Bulutlar
    ctx.strokeStyle = '#333';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(centerX - 60, centerY - radius, 20, 0, Math.PI * 2);
    ctx.arc(centerX - 40, centerY - radius, 25, 0, Math.PI * 2);
    ctx.arc(centerX - 20, centerY - radius, 20, 0, Math.PI * 2);
    ctx.stroke();
    
    ctx.beginPath();
    ctx.arc(centerX + 60, centerY - radius, 20, 0, Math.PI * 2);
    ctx.arc(centerX + 40, centerY - radius, 25, 0, Math.PI * 2);
    ctx.arc(centerX + 20, centerY - radius, 20, 0, Math.PI * 2);
    ctx.stroke();
}

// Hikaye Oluşturma (Gemini AI ile)
async function generateStory() {
    const storyText = document.getElementById('story-text');
    const storyImage = document.getElementById('story-image');
    
    storyText.innerHTML = '<p>⏳ Hikaye oluşturuluyor...</p>';
    
    if (!geminiAPI) {
        // API yoksa örnek hikaye
        const sampleStories = [
            {
                text: "Bir zamanlar küçük bir kedi vardı. Bu kedi çok meraklıydı ve her gün yeni şeyler keşfetmeyi severdi. Bir gün büyük bir bahçede rengarenk kelebekler gördü. Kelebeklerle oynamak istedi ama onlar çok hızlıydı. Sonunda bir kelebeğin üzerine konduğu çiçeği buldu ve orada güzel bir öğle uykusu çekti. 🌸",
                emoji: "🐱"
            },
            {
                text: "Küçük bir köpek, sahibiyle parka gitti. Orada birçok arkadaş buldu: kuşlar, sincaplar ve diğer köpekler. Hep birlikte top oynadılar ve çok eğlendiler. Güneş batarken, yorgun ama mutlu bir şekilde eve döndüler. 🐶",
                emoji: "🐶"
            }
        ];
        
        const story = sampleStories[Math.floor(Math.random() * sampleStories.length)];
        storyText.innerHTML = `<p>${story.text}</p>`;
        storyImage.innerHTML = `<span class="story-emoji">${story.emoji}</span>`;
        unlockAchievement('storyCreated');
        updateScore(20);
        playSound('success');
        return;
    }
    
    try {
        const model = geminiAPI.getGenerativeModel({ model: 'gemini-pro' });
        const prompt = `5-6 yaş grubu çocuklar için kısa, eğlenceli ve öğretici bir hikaye yaz. Hikaye 3-4 cümle uzunluğunda olsun. Türkçe yaz. Karakterler hayvanlar olabilir.`;
        
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();
        
        // Metni temizle ve formatla
        const cleanText = text.replace(/\*\*/g, '').trim();
        
        storyText.innerHTML = `<p>${cleanText}</p>`;
        storyImage.innerHTML = `<span class="story-emoji">📖</span>`;
        unlockAchievement('storyCreated');
        updateScore(20);
        playSound('success');
        
        // Hikayeyi sesli oku
        setTimeout(() => {
            speakText(cleanText, { rate: 0.85 });
        }, 500);
    } catch (error) {
        console.error('Hikaye oluşturma hatası:', error);
        storyText.innerHTML = '<p>❌ Hikaye oluşturulamadı. Lütfen API key\'inizi kontrol edin ve tekrar deneyin.</p>';
    }
}

function readStory() {
    // Sesli okuma özelliği kaldırıldı - tarayıcı uyumluluk sorunları nedeniyle
    alert('Sesli okuma özelliği şu anda kullanılamıyor. Hikayeyi yüksek sesle okuyabilirsiniz! 📚');
    playSound('click');
}

// Bulmaca Yükleme
function loadPuzzleType(type) {
    currentPuzzleType = type;
    const content = document.getElementById('puzzle-content');
    
    // Aktif butonu işaretle
    document.querySelectorAll('.puzzle-type-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.currentTarget.classList.add('active');
    
    switch(type) {
        case 'pattern':
            loadPatternPuzzle(content);
            break;
        case 'memory':
            loadMemoryPuzzle(content);
            break;
        case 'find':
            loadFindPuzzle(content);
            break;
    }
    playSound('click');
}

function loadPatternPuzzle(container) {
    const animals = ['🐱', '🐶', '🐰', '🐻', '🦁', '🐸', '🐯', '🐨'];
    const sequence = [];
    
    // Bölüm sayısını kontrol et
    if (!window.patternLevel) {
        window.patternLevel = 1;
    }
    
    // Seviyeye göre hayvan sayısı (4, 5, 6)
    const animalCount = Math.min(4 + Math.floor(window.patternLevel / 2), 6);
    
    // Hayvanlı bir desen oluştur
    for (let i = 0; i < animalCount; i++) {
        sequence.push(animals[Math.floor(Math.random() * animals.length)]);
    }
    
    container.innerHTML = `
        <h3 style="font-size: 1.5em; margin-bottom: 20px;">Hayvanları Sırayla Takip Et! 👆</h3>
        <p style="margin-bottom: 10px; font-size: 1.1em; color: #667eea;">Hayvanlar sırayla yanacak, sonra sen aynı sırayla tıkla!</p>
        <p style="margin-bottom: 20px; font-size: 1em; color: #f5576c; font-weight: bold;">Bölüm ${window.patternLevel}</p>
        <div class="pattern-puzzle">
            ${sequence.map((emoji, index) => `
                <div class="pattern-item animal-card" data-emoji="${emoji}" 
                     onclick="checkPatternSequence(${index}, '${emoji}')">
                    ${emoji}
                </div>
            `).join('')}
        </div>
        <p id="pattern-feedback" style="margin-top: 20px; font-size: 1.2em;"></p>
    `;
    
    // Sesli yönlendirme
    setTimeout(() => {
        speakText(`Bölüm ${window.patternLevel}. Hayvanları sırayla takip et. Hayvanlar sırayla yanacak, sonra sen aynı sırayla tıkla!`, { rate: 0.8 });
    }, 500);
    
    // Deseni göster - hayvanlar sırayla yansın
    let currentIndex = 0;
    const items = container.querySelectorAll('.pattern-item');
    
    // Önce tüm kartları devre dışı bırak
    items.forEach(item => {
        item.style.pointerEvents = 'none';
        item.style.opacity = '0.5';
    });
    
    const showSequence = () => {
        if (currentIndex < sequence.length) {
            // Kartı parlat
            items[currentIndex].style.opacity = '1';
            items[currentIndex].style.transform = 'scale(1.3)';
            items[currentIndex].style.boxShadow = '0 0 20px rgba(102, 126, 234, 0.8)';
            
            setTimeout(() => {
                items[currentIndex].style.transform = 'scale(1)';
                items[currentIndex].style.boxShadow = '';
                items[currentIndex].style.opacity = '0.5';
                currentIndex++;
                
                if (currentIndex < sequence.length) {
                    setTimeout(showSequence, 600);
                } else {
                    // Tüm desen gösterildi, şimdi oyuncu tıklayabilir
                    setTimeout(() => {
                        items.forEach(item => {
                            item.style.pointerEvents = 'auto';
                            item.style.opacity = '1';
                        });
                        const feedback = document.getElementById('pattern-feedback');
                        feedback.textContent = 'Şimdi sen aynı sırayla tıkla! 👆';
                        feedback.style.color = '#667eea';
                        feedback.style.fontWeight = 'bold';
                        speakText('Şimdi sen aynı sırayla tıkla!', { rate: 0.85 });
                    }, 500);
                }
            }, 500);
        }
    };
    
    setTimeout(showSequence, 1000);
    window.patternSequence = sequence;
    window.patternIndex = 0;
}

function getColorForEmoji(emoji) {
    const colors = {
        '🔴': '#ffcccc',
        '🟡': '#ffffcc',
        '🔵': '#ccccff',
        '🟢': '#ccffcc',
        '🟠': '#ffe6cc',
        '🟣': '#f0ccff',
        '⚫': '#e6e6e6',
        '⚪': '#ffffff'
    };
    return colors[emoji] || '#f8f9fa';
}

function checkPatternSequence(index, emoji) {
    if (!window.patternSequence) return;
    
    const feedback = document.getElementById('pattern-feedback');
    const items = document.querySelectorAll('.pattern-item');
    
    // Tıklanan kartı vurgula
    if (items[index]) {
        items[index].style.transform = 'scale(1.2)';
        setTimeout(() => {
            items[index].style.transform = 'scale(1)';
        }, 200);
    }
    
    if (window.patternSequence[window.patternIndex] === emoji) {
        window.patternIndex++;
        feedback.textContent = `Harika! ${window.patternIndex}/${window.patternSequence.length} ✅`;
        playSound('success');
        
        if (window.patternIndex >= window.patternSequence.length) {
            const currentLevel = window.patternLevel;
            window.patternLevel++;
            const bonusScore = 15 + (currentLevel * 5);
            feedback.innerHTML = `<div class="success-message">🎉 Tebrikler! Bölüm ${currentLevel} tamamlandı! +${bonusScore} puan</div>`;
            achievements.puzzleSolved++;
            updateScore(bonusScore);
            
            // 3 bölüm tamamlanınca sıfırla
            if (window.patternLevel > 3) {
                setTimeout(() => {
                    window.patternLevel = 1;
                    const container = document.getElementById('puzzle-content');
                    feedback.innerHTML = '<div class="success-message">🎊 Harika! Tüm bölümleri tamamladın! Yeni oyun başlıyor...</div>';
                    setTimeout(() => {
                        loadPatternPuzzle(container);
                    }, 2000);
                }, 2000);
            } else {
                setTimeout(() => {
                    const container = document.getElementById('puzzle-content');
                    loadPatternPuzzle(container);
                }, 2000);
            }
        }
    } else {
        feedback.textContent = 'Yanlış sıra! Tekrar dene! 🔄';
        feedback.style.color = '#f5576c';
        window.patternIndex = 0;
        playSound('click');
        
        // Tekrar göster
        setTimeout(() => {
            loadPuzzleType('pattern');
        }, 1500);
    }
}

function loadMemoryPuzzle(container) {
    const emojis = ['🐱', '🐶', '🐰', '🐻', '🦁', '🐸', '🐯', '🐨'];
    const pairs = [...emojis, ...emojis].sort(() => Math.random() - 0.5);
    
    container.innerHTML = `
        <h3 style="font-size: 1.5em; margin-bottom: 20px;">Hafıza Oyunu! 🧠</h3>
        <div class="memory-grid">
            ${pairs.map((emoji, index) => `
                <div class="memory-card" data-emoji="${emoji}" data-index="${index}" 
                     onclick="flipMemoryCard(this)">
                    ❓
                </div>
            `).join('')}
        </div>
        <p id="memory-feedback" style="margin-top: 20px; font-size: 1.2em;"></p>
    `;
    
    window.memoryCards = [];
    window.memoryPairs = 0;
}

function flipMemoryCard(card) {
    if (card.classList.contains('flipped') || window.memoryCards.length >= 2) return;
    
    card.classList.add('flipped');
    card.textContent = card.dataset.emoji;
    window.memoryCards.push(card);
    
    if (window.memoryCards.length === 2) {
        const [card1, card2] = window.memoryCards;
        if (card1.dataset.emoji === card2.dataset.emoji) {
            // Eşleşme bulundu
            setTimeout(() => {
                card1.style.opacity = '0.5';
                card2.style.opacity = '0.5';
                window.memoryPairs++;
                window.memoryCards = [];
                
                const feedback = document.getElementById('memory-feedback');
                updateScore(5); // Her eşleşme için puan
                if (window.memoryPairs >= 8) {
                    feedback.innerHTML = '<div class="success-message">🎉 Harika! Tüm eşleşmeleri buldun!</div>';
                    achievements.puzzleSolved++;
                    updateScore(20); // Bonus puan
                    setTimeout(() => loadPuzzleType('memory'), 2000);
                } else {
                    feedback.textContent = `Eşleşme bulundu! ${window.memoryPairs}/8 ✅`;
                }
                playSound('success');
            }, 500);
        } else {
            // Eşleşme yok
            setTimeout(() => {
                card1.classList.remove('flipped');
                card2.classList.remove('flipped');
                card1.textContent = '❓';
                card2.textContent = '❓';
                window.memoryCards = [];
                playSound('click');
            }, 1000);
        }
    }
}

function loadFindPuzzle(container) {
    const allEmojis = ['🐱', '🐶', '🐰', '🐻', '🦁', '🐸', '🐯', '🐨', '🐼', '🐷', 
                       '🐮', '🐴', '🐭', '🐹', '🦊', '🐺', '🐗', '🦄', '🐧', '🦉'];
    
    // Bölüm sayısını kontrol et
    if (!window.findLevel) {
        window.findLevel = 1;
    }
    
    // Hedef emoji'yi seç (tekrar eden emoji olmaması için)
    const uniqueEmojis = [...new Set(allEmojis)];
    const targetEmoji = uniqueEmojis[Math.floor(Math.random() * uniqueEmojis.length)];
    const grid = [];
    
    // Seviyeye göre bulunması gereken sayı (3, 4, 5)
    const findCount = Math.min(3 + Math.floor(window.findLevel / 2), 5);
    
    // Hedef emoji'yi belirlenen sayıda ekle
    for (let i = 0; i < findCount; i++) {
        grid.push(targetEmoji);
    }
    
    // Diğer emoji'lerle doldur (hedef emoji hariç)
    const otherEmojis = allEmojis.filter(e => e !== targetEmoji);
    while (grid.length < 25) {
        const randomEmoji = otherEmojis[Math.floor(Math.random() * otherEmojis.length)];
        grid.push(randomEmoji);
    }
    
    // Karıştır
    for (let i = grid.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [grid[i], grid[j]] = [grid[j], grid[i]];
    }
    
    // Hayvan ismini bul
    const animalNames = {
        '🐱': 'Kedi', '🐶': 'Köpek', '🐰': 'Tavşan', '🐻': 'Ayı', '🦁': 'Aslan',
        '🐸': 'Kurbağa', '🐯': 'Kaplan', '🐨': 'Koala', '🐼': 'Panda', '🐷': 'Domuz',
        '🐮': 'İnek', '🐴': 'At', '🐭': 'Fare', '🐹': 'Hamster', '🦊': 'Tilki',
        '🐺': 'Kurt', '🐗': 'Yaban Domuzu', '🦄': 'Tekboynuz', '🐧': 'Penguen', '🦉': 'Baykuş'
    };
    const animalName = animalNames[targetEmoji] || 'Hayvan';
    
    container.innerHTML = `
        <h3 style="font-size: 1.5em; margin-bottom: 20px;">${targetEmoji} Hayvanını Bul! 🔍</h3>
        <p style="margin-bottom: 10px; font-size: 1.1em; color: #667eea;">Bu hayvanı ${findCount} kez bulmalısın!</p>
        <p style="margin-bottom: 20px; font-size: 1em; color: #f5576c; font-weight: bold;">Bölüm ${window.findLevel}</p>
    `;
    
    // Sesli yönlendirme
    setTimeout(() => {
        speakText(`Bölüm ${window.findLevel}. ${animalName} hayvanını bul. Bu hayvanı ${findCount} kez bulmalısın!`, { rate: 0.8 });
    }, 500);
    
    container.innerHTML = `
        <h3 style="font-size: 1.5em; margin-bottom: 20px;">${targetEmoji} Hayvanını Bul! 🔍</h3>
        <p style="margin-bottom: 10px; font-size: 1.1em; color: #667eea;">Bu hayvanı ${findCount} kez bulmalısın!</p>
        <p style="margin-bottom: 20px; font-size: 1em; color: #f5576c; font-weight: bold;">Bölüm ${window.findLevel}</p>
        <div class="find-grid">
            ${grid.map((emoji, index) => `
                <div class="find-item" data-emoji="${emoji}" data-index="${index}"
                     onclick="checkFindItem(this, '${targetEmoji}')">
                    ${emoji}
                </div>
            `).join('')}
        </div>
        <p id="find-feedback" style="margin-top: 20px; font-size: 1.2em;"></p>
    `;
    
    window.findTarget = targetEmoji;
    window.findCount = 0;
    window.findTotal = findCount; // Toplam bulunması gereken sayı
}

function checkFindItem(item, target) {
    if (item.classList.contains('found')) {
        playSound('click');
        return;
    }
    
    const itemEmoji = item.dataset.emoji;
    const feedback = document.getElementById('find-feedback');
    
    if (itemEmoji === target) {
        item.classList.add('found');
        window.findCount++;
        playSound('success');
        updateScore(5); // Her bulma için puan
        
        if (window.findCount >= window.findTotal) {
            const currentLevel = window.findLevel;
            window.findLevel++;
            const bonusScore = 15 + (currentLevel * 5);
            feedback.innerHTML = `<div class="success-message">🎉 Harika! Bölüm ${currentLevel} tamamlandı! +${bonusScore} puan</div>`;
            achievements.puzzleSolved++;
            updateScore(bonusScore);
            
            // 3 bölüm tamamlanınca sıfırla
            if (window.findLevel > 3) {
                setTimeout(() => {
                    window.findLevel = 1;
                    const container = document.getElementById('puzzle-content');
                    feedback.innerHTML = '<div class="success-message">🎊 Harika! Tüm bölümleri tamamladın! Yeni oyun başlıyor...</div>';
                    setTimeout(() => {
                        loadFindPuzzle(container);
                    }, 2000);
                }, 2000);
            } else {
                setTimeout(() => {
                    const container = document.getElementById('puzzle-content');
                    loadFindPuzzle(container);
                }, 2000);
            }
        } else {
            feedback.textContent = `${window.findCount}/${window.findTotal} bulundu! ✅`;
            feedback.style.color = '#667eea';
        }
    } else {
        feedback.textContent = 'Bu değil! Tekrar dene! 🔄';
        feedback.style.color = '#f5576c';
        playSound('click');
        speakText('Bu değil! Tekrar dene!', { rate: 0.9, volume: 0.8 });
    }
}

// Video Oluşturma - Geliştirilmiş Versiyon
let videoCanvas = null;
let videoAnimationId = null;

async function createVideo() {
    const preview = document.getElementById('video-preview');
    const downloadBtn = document.getElementById('download-btn');
    
    // Önceki animasyonu durdur
    if (videoAnimationId) {
        cancelAnimationFrame(videoAnimationId);
    }
    
    preview.innerHTML = '<p>⏳ Video oluşturuluyor...</p>';
    
    // Canvas oluştur
    if (!videoCanvas) {
        videoCanvas = document.createElement('canvas');
        videoCanvas.width = 600;
        videoCanvas.height = 400;
        videoCanvas.style.width = '100%';
        videoCanvas.style.height = 'auto';
        videoCanvas.style.border = '3px solid #667eea';
        videoCanvas.style.borderRadius = '15px';
        videoCanvas.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
    }
    
    const ctx = videoCanvas.getContext('2d');
    const character = selectedCharacter ? selectedCharacter.emoji : '🎮';
    const characterName = selectedCharacter ? selectedCharacter.name : 'Oyun';
    
    // Canvas'ı preview'e ekle
    preview.innerHTML = '';
    preview.appendChild(videoCanvas);
    
    // Animasyon değişkenleri
    let frame = 0;
    const totalFrames = 180; // 6 saniye (30fps)
    window.videoFrames = []; // İndirme için frame'leri sakla
    
    // Animasyon fonksiyonu
    function animate() {
        ctx.clearRect(0, 0, videoCanvas.width, videoCanvas.height);
        
        // Arka plan gradient
        const gradient = ctx.createLinearGradient(0, 0, videoCanvas.width, videoCanvas.height);
        gradient.addColorStop(0, '#667eea');
        gradient.addColorStop(1, '#764ba2');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, videoCanvas.width, videoCanvas.height);
        
        // Yıldızlar efekti
        for (let i = 0; i < 20; i++) {
            const x = (i * 30 + frame * 2) % videoCanvas.width;
            const y = (i * 25) % videoCanvas.height;
            ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
            ctx.beginPath();
            ctx.arc(x, y, 2, 0, Math.PI * 2);
            ctx.fill();
        }
        
        // Karakter animasyonu (zıplama, döndürme)
        const centerX = videoCanvas.width / 2;
        const centerY = videoCanvas.height / 2;
        const bounceY = centerY + Math.sin(frame * 0.15) * 40;
        const rotation = frame * 0.05;
        const scale = 1 + Math.sin(frame * 0.1) * 0.2;
        
        ctx.save();
        ctx.translate(centerX, bounceY);
        ctx.rotate(rotation);
        ctx.scale(scale, scale);
        ctx.font = 'bold 120px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillStyle = '#ffffff';
        ctx.strokeStyle = '#333';
        ctx.lineWidth = 3;
        ctx.strokeText(character, 0, 0);
        ctx.fillText(character, 0, 0);
        ctx.restore();
        
        // Başlık animasyonu
        ctx.font = 'bold 40px Comic Neue';
        ctx.fillStyle = '#ffffff';
        ctx.textAlign = 'center';
        const titleY = 80 + Math.sin(frame * 0.08) * 5;
        ctx.fillText('KarahaN Games', centerX, titleY);
        
        // Skor gösterimi
        const scoreDisplay = document.getElementById('score-value');
        const currentScore = scoreDisplay ? parseInt(scoreDisplay.textContent) || 0 : userScore;
        
        ctx.font = 'bold 35px Comic Neue';
        ctx.fillStyle = '#ffff00';
        ctx.strokeStyle = '#333';
        ctx.lineWidth = 2;
        const scoreY = 130 + Math.sin(frame * 0.1) * 3;
        const scoreText = `⭐ Skor: ${currentScore}`;
        ctx.strokeText(scoreText, centerX, scoreY);
        ctx.fillText(scoreText, centerX, scoreY);
        
        // Karakter ismi
        ctx.font = '30px Comic Neue';
        ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
        ctx.fillText(`${characterName} ile Eğlen!`, centerX, videoCanvas.height - 50);
        
        // Frame'i kaydet (indirme için)
        if (frame % 2 === 0) { // Her 2 frame'de bir kaydet (performans için)
            window.videoFrames.push(videoCanvas.toDataURL('image/png'));
        }
        
        frame++;
        
        if (frame < totalFrames) {
            videoAnimationId = requestAnimationFrame(animate);
        } else {
            // Animasyon tamamlandı
            downloadBtn.style.display = 'inline-block';
            unlockAchievement('videoCreated');
            updateScore(25);
            playSound('success');
            
            // Başarı mesajı
            const successMsg = document.createElement('div');
            successMsg.className = 'success-message';
            successMsg.style.marginTop = '20px';
            successMsg.textContent = '✅ Video hazır! İndirebilirsiniz.';
            preview.appendChild(successMsg);
        }
    }
    
    // Animasyonu başlat
    animate();
}

function downloadVideo() {
    if (!window.videoFrames || window.videoFrames.length === 0) {
        alert('Önce bir video oluşturun!');
        return;
    }
    
    // Canvas'tan son frame'i al
    const canvas = document.createElement('canvas');
    canvas.width = 600;
    canvas.height = 400;
    const ctx = canvas.getContext('2d');
    
    // İlk frame'i çiz
    const img = new Image();
    img.onload = function() {
        ctx.drawImage(img, 0, 0);
        
        // Canvas'ı PNG olarak indir
        canvas.toBlob(function(blob) {
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `karahan-games-${selectedCharacter ? selectedCharacter.name : 'video'}-${Date.now()}.png`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
            
            playSound('success');
        }, 'image/png');
    };
    img.src = window.videoFrames[0];
    
    // Alternatif: Tüm frame'leri zip olarak indirmek için (daha gelişmiş)
    alert('Video görüntüsü indirildi! 🎉\n\nNot: Tam video dosyası için tüm frame\'ler gerekir. Bu özellik geliştirilme aşamasındadır.');
}

