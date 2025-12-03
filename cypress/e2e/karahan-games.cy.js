describe('KarahaN Games - E2E Testleri ve Demo Videosu', () => {
  beforeEach(() => {
    // Her testten önce ana sayfaya git
    cy.visit('/index.html')
    cy.wait(3000) // Sayfa yüklenmesi için bekle
    
    // Hoş geldin mesajını kapat (eğer varsa)
    cy.get('body').then(($body) => {
      if ($body.find('#welcome-overlay').length > 0) {
        cy.get('#welcome-overlay').click({ force: true })
        cy.wait(1000)
      }
    })
  })

  it('Ana sayfa yükleniyor ve hoş geldin mesajı görünüyor', () => {
    cy.contains('KarahaN Games').should('be.visible')
    cy.contains('Eğlenceli ve Öğretici Oyunlar').should('be.visible')
    cy.contains('Karakter Seç').should('be.visible')
  })

  it('Karakter seçimi çalışıyor', () => {
    // Hoş geldin mesajını kapat
    cy.get('body').click(500, 500)
    cy.wait(1000)
    
    // Karakter seç butonuna tıkla
    cy.contains('Karakter Seç').click()
    cy.wait(1000)
    
    // Karakter seçim ekranında olduğunu kontrol et
    cy.contains('Karakterini Seç').should('be.visible')
    
    // Bir karakter seç (Kedi)
    cy.contains('Kedi').parent().click()
    cy.wait(1000)
    
    // Ana menüye dönmüş olmalı
    cy.contains('KarahaN Games').should('be.visible')
    cy.contains('Seçilen: Kedi').should('be.visible')
  })

  it('Boyama aktivitesi çalışıyor', () => {
    // Hoş geldin mesajını kapat
    cy.get('body').click(500, 500)
    cy.wait(1000)
    
    // Boyama butonuna tıkla
    cy.contains('Boyama').click()
    cy.wait(1000)
    
    // Boyama ekranında olduğunu kontrol et
    cy.contains('Boyama Yap').should('be.visible')
    cy.get('#coloring-canvas').should('be.visible')
    
    // Renk seç
    cy.get('.color-btn').first().click()
    cy.wait(500)
    
    // Canvas'a çizim yap (mouse event simülasyonu)
    cy.get('#coloring-canvas')
      .trigger('mousedown', { which: 1, pageX: 200, pageY: 200 })
      .trigger('mousemove', { which: 1, pageX: 250, pageY: 250 })
      .trigger('mouseup')
    cy.wait(500)
    
    // Temizle butonuna tıkla
    cy.contains('Temizle').click()
    cy.wait(500)
  })

  it('Hikaye oluşturma çalışıyor', () => {
    // Hoş geldin mesajını kapat
    cy.get('body').click(500, 500)
    cy.wait(1000)
    
    // Hikaye butonuna tıkla
    cy.contains('Hikaye').click()
    cy.wait(1000)
    
    // Hikaye ekranında olduğunu kontrol et
    cy.contains('Hikaye Dinle').should('be.visible')
    
    // Hikaye oluştur butonuna tıkla
    cy.contains('Yeni Hikaye Oluştur').click()
    cy.wait(5000) // API çağrısı için bekle
    
    // Hikaye metni görünmeli
    cy.get('#story-text').should('not.contain', '⏳')
    cy.get('#story-text').should('not.contain', 'Bir hikaye oluşturmak için')
  })

  it('Bulmaca oyunları çalışıyor', () => {
    // Hoş geldin mesajını kapat
    cy.get('body').click(500, 500)
    cy.wait(1000)
    
    // Bulmaca butonuna tıkla
    cy.contains('Bulmaca').click()
    cy.wait(1000)
    
    // Bulmaca ekranında olduğunu kontrol et
    cy.contains('Bulmaca Çöz').should('be.visible')
    
    // Desen oyunu butonuna tıkla
    cy.contains('Desen').click()
    cy.wait(2000) // Animasyon için bekle
    
    // Desen oyunu yüklendiğini kontrol et
    cy.contains('Hayvanları Sırayla Takip Et').should('be.visible')
    
    // Hafıza oyunu butonuna tıkla
    cy.contains('Hafıza').click()
    cy.wait(1000)
    
    // Hafıza oyunu yüklendiğini kontrol et
    cy.contains('Hafıza Oyunu').should('be.visible')
    
    // Bul oyunu butonuna tıkla
    cy.contains('Bul').click()
    cy.wait(1000)
    
    // Bul oyunu yüklendiğini kontrol et
    cy.contains('Hayvanını Bul').should('be.visible')
  })

  it('Video oluşturucu çalışıyor', () => {
    // Hoş geldin mesajını kapat
    cy.get('body').click(500, 500)
    cy.wait(1000)
    
    // Önce bir karakter seç
    cy.contains('Karakter Seç').click()
    cy.wait(1000)
    cy.contains('Kedi').parent().click()
    cy.wait(1000)
    
    // Video oluştur butonuna tıkla
    cy.contains('Video Oluştur').click()
    cy.wait(1000)
    
    // Video ekranında olduğunu kontrol et
    cy.contains('Video Oluştur').should('be.visible')
    
    // Video oluştur butonuna tıkla
    cy.contains('Video Oluştur').click()
    cy.wait(3000) // Video oluşturma için bekle
    
    // Video hazır mesajı görünmeli
    cy.contains('Video hazır').should('be.visible')
  })

  it('Skor sistemi çalışıyor', () => {
    // Hoş geldin mesajını kapat
    cy.get('body').click(500, 500)
    cy.wait(1000)
    
    // Karakter seç
    cy.contains('Karakter Seç').click()
    cy.wait(1000)
    cy.contains('Kedi').parent().click()
    cy.wait(2000)
    
    // Skor görünmeli
    cy.get('#score-display').should('be.visible')
    cy.get('#score-value').should('not.contain', '0')
  })

  it('Ses açma butonu çalışıyor', () => {
    // Ses açma butonunu kontrol et
    cy.get('#audio-toggle-btn').should('be.visible')
    cy.get('#audio-toggle-btn').should('contain', 'Ses Aç')
    
    // Ses açma butonuna tıkla
    cy.get('#audio-toggle-btn').click()
    cy.wait(1000)
    
    // Buton durumu değişmeli
    cy.get('#audio-toggle-btn').should('contain', 'Ses')
  })

  it('Navigasyon çalışıyor', () => {
    // Hoş geldin mesajını kapat
    cy.get('body').click(500, 500)
    cy.wait(1000)
    
    // Tüm ana menü butonlarını test et
    const buttons = ['Boyama', 'Hikaye', 'Bulmaca', 'Video Oluştur']
    
    buttons.forEach(buttonText => {
      cy.contains(buttonText).click()
      cy.wait(1000)
      cy.contains('Geri').click()
      cy.wait(1000)
      cy.contains('KarahaN Games').should('be.visible')
    })
  })

  it('Tam oyun akışı testi', () => {
    // Hoş geldin mesajını kapat
    cy.get('body').click(500, 500)
    cy.wait(1000)
    
    // 1. Karakter seç
    cy.contains('Karakter Seç').click()
    cy.wait(1000)
    cy.contains('Köpek').parent().click()
    cy.wait(2000)
    
    // 2. Boyama yap
    cy.contains('Boyama').click()
    cy.wait(1000)
    cy.get('.color-btn').eq(2).click() // Sarı renk
    cy.wait(500)
    cy.get('#coloring-canvas')
      .trigger('mousedown', { which: 1, pageX: 150, pageY: 150 })
      .trigger('mousemove', { which: 1, pageX: 200, pageY: 200 })
      .trigger('mouseup')
    cy.wait(1000)
    cy.contains('Tamamlandı').click()
    cy.wait(2000)
    
    // 3. Hikaye oluştur
    cy.contains('Geri').click()
    cy.wait(1000)
    cy.contains('Hikaye').click()
    cy.wait(1000)
    cy.contains('Yeni Hikaye Oluştur').click()
    cy.wait(5000)
    
    // 4. Bulmaca oyna
    cy.contains('Geri').click()
    cy.wait(1000)
    cy.contains('Bulmaca').click()
    cy.wait(1000)
    cy.contains('Bul').click()
    cy.wait(2000)
    
    // Ana menüye dön
    cy.contains('Geri').click()
    cy.wait(1000)
    
    // Skor kontrolü
    cy.get('#score-value').should('not.contain', '0')
  })
})

