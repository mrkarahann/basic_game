// ***********************************************************
// This example support/e2e.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands'

// Alternatively you can use CommonJS syntax:
// require('./commands')

// Cypress'e özel ayarlar
Cypress.on('uncaught:exception', (err, runnable) => {
  // Web Speech API hatalarını yoksay
  if (err.message.includes('speechSynthesis') || 
      err.message.includes('SpeechSynthesis')) {
    return false
  }
  // Diğer hataları normal şekilde işle
  return true
})

